import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsFillCartCheckFill, BsArrowLeft } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaPowerOff, FaUser } from "react-icons/fa";
import { useEffect } from "react";
import { FaShoppingBag, FaSignOutAlt,FaUserAlt } from "react-icons/fa";

const Navbar = ({
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Add state for profile section

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCartClick = () => {
    setIsCartOpen(false); // Close the dropdown when a category link is clicked
  };

  const handleCategoryClick = () => {
    setIsDropdownOpen(false); // Close the dropdown when a category link is clicked
  };

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    }
    //eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setIsProfileOpen(false);
    window.location.href = "/";
  };

  const userImage = user?.image || "/user.png";

  return (
    <header className="text-gray-600 body-font w-full sticky top-0 bg-white z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Image height={65} width={175} src="/logo1.svg" alt="" />
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <Link
            href="/"
            className="mr-5 focus-within:font-bold focus-within:text-gray-900 hover:text-gray-900"
          >
            Home
          </Link>
          <div className="relative">
            <button
              className="mr-5 hover:text-gray-900"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              aria-expanded={isDropdownOpen ? "true" : "false"}
            >
              Categories
            </button>
            {/* Render the dropdown only when isDropdownOpen is true */}
            {isDropdownOpen && (
              <div
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="absolute z-10 bg-white rounded-md drop-shadow-xl  p-4 top-full left-0 w-48 shadow-black "
              >
                <Link
                  className="block py-2 px-4 hover:bg-gray-100"
                  href="/tshirts"
                  onClick={handleCategoryClick}
                >
                  T-shirts
                </Link>
                <Link
                  className="block py-2 px-4 hover:bg-gray-100"
                  href="/hoodies"
                  onClick={handleCategoryClick}
                >
                  Hoodies
                </Link>
                <Link
                  className="block py-2 px-4 hover:bg-gray-100"
                  href="/mugs"
                  onClick={handleCategoryClick}
                >
                  Mugs
                </Link>
                <Link
                  className="block py-2 px-4 hover:bg-gray-100"
                  href="/stickers"
                  onClick={handleCategoryClick}
                >
                  Stickers
                </Link>
                {/* Add more categories as needed */}
              </div>
            )}
          </div>
        </nav>
        <div className="relative flex justify-between items-center gap-4 text-2xl my-4">
          {isLogin ? (
            <button
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
              aria-expanded={isProfileOpen ? "true" : "false"}
              className=""
            >
              <BiUserCircle className="mr-2" />
            </button>
          ) : (
            <Link href="/login">
              <div className="relative w-12 h-6 rounded-xl bg-red-500 hover:">
                <FaPowerOff className="absolute top-1/2 left-3 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl" />
                <span className="absolute top-5 text-base pt-2 ">Log In</span>
              </div>
            </Link>
          )}
          {
            // Render the profile section only when isProfileOpen is true
            isProfileOpen && (
              <div
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
                className="absolute z-10 bg-white rounded-md drop-shadow-2xl  p-4  top-full -right-[38vw] md:right-0 w-64 shadow-black shadow text-base space-y-5 transition duration-200"
              >
                <div className="bg-white ">
                  {/* User Image */}
                  <div className="flex justify-start space-x-3 items-center">
                    <Image
                      src={userImage}
                      alt="User Image"
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-gray-300"
                    />
                    <h2 className="text-center text-lg font-semibold my-2">
                    {user?.name || "Guest User"}
                  </h2>
                  </div>

                  {/* User Name */}
                  

                  {/* Orders */}
                  <Link
                    href="/orders"
                    className="flex items-center justify-between p-2 my-2 hover:bg-gray-100 rounded-md"
                  >
                    <span>Orders</span>
                    <FaShoppingBag />
                  </Link>

                  {/* Other Options */}
                  <Link
                    href="/profile"
                    className="flex items-center justify-between p-2 my-2 hover:bg-gray-100 rounded-md"
                  >
                    <span>Account Details</span>
                    <FaUserAlt />
                  </Link>
                  {/* Add more options as needed */}

                 

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 flex items-center justify-center w-full"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )
          }

          <div className="relative">
            {!isCartOpen && (
              <button
                onClick={handleCartToggle}
                aria-expanded={isCartOpen ? "true" : "false"}
                className="p-1"
              >
                <BsFillCartCheckFill className="mr-2 " />
              </button>
            )}
            {isCartOpen && (
              <button
                onClick={handleCartToggle}
                aria-expanded={isCartOpen ? "true" : "false"}
                className="p-1"
              >
                <AiFillCloseCircle className="mr-2 " />
              </button>
            )}
            {isCartOpen && (
              <div className="absolute z-10 bg-white rounded-md drop-shadow-2xl  p-6 py-8 top-full -right-[38vw] md:right-0 w-96 shadow-black shadow text-base space-y-5 transition duration-200">
                <div className="flex justify-between">
                  <h1 className="font-bold">Shopping Cart</h1>
                  <button
                    onClick={clearCart}
                    className="hover:underline text-indigo-500 hover:text-blue-700"
                  >
                    Clear Cart
                  </button>
                </div>
                <hr className="my-2" />
                <div className="items">
                  {Object.keys(cart).length === 0 && (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <h1 className="text-lg font-semibold">
                        Your cart is empty
                      </h1>
                    </div>
                  )}
                  {Object.keys(cart).map((k) => (
                    <div key={k} className="flex items-center space-x-6 mt-3">
                      {/* Display item details */}
                      <div className="w-16 h-16 rounded-md  border border-black px-2">
                        <img src={cart[k].img} alt="" />
                      </div>
                      <div className="flex-grow flex flex-col space-y-3">
                        <h2 className="text-lg font-semibold">
                          {cart[k].name} ({cart[k].size}/ {cart[k].variant})
                        </h2>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <button
                              className="px-2 py-1 bg-gray-200 rounded"
                              onClick={() => removeFromCart(k)} // Call removeFromCart with itemCode
                            >
                              -
                            </button>
                            <h2>{cart[k].qty}</h2>
                            <button
                              className="px-2 py-1 bg-gray-200 rounded"
                              onClick={() =>
                                addToCart(
                                  k,
                                  1,
                                  cart[k].price,
                                  cart[k].name,
                                  cart[k].size,
                                  cart[k].variant
                                )
                              } // Call addToCart with item details
                            >
                              +
                            </button>
                          </div>
                          <h2 className="text-lg font-semibold">
                            ₹ {cart[k].price * cart[k].qty}
                          </h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="">
                    <h2 className=" font-bold mt-14">Order Summary</h2>
                    <hr className="my-5" />
                    <div className="my-2 flex items-center justify-between space-x-2">
                      <h2 className="font-bold">Total Items</h2>
                      <h2>
                        x
                        {Object.values(cart).reduce(
                          (total, item) => total + item.qty,
                          0
                        )}
                      </h2>
                    </div>
                    <div className="flex items-center space-x-2 justify-between">
                      <h2 className="font-bold">SubTotal</h2>
                      <h2>₹ {subTotal}</h2>
                    </div>
                  </div>
                  <div>
                    <div className="mt-6">
                      <h1 className=" font-bold">PROMO CODE</h1>
                      <div className="flex items-center justify-between space-x-2 mt-2">
                        <input
                          type="text"
                          placeholder="Enter Promo Code"
                          className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        <button className="px-4 py-2 bg-red-500 text-white rounded">
                          Apply
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <h3
                          onClick={handleCartClick}
                          className="cursor-pointer flex items-center justify-between text-blue-500"
                        >
                          <BsArrowLeft className="mr-1" /> Continue Shopping
                        </h3>
                        <Link href="/checkout">
                          <button
                            onClick={handleCartToggle}
                            className={`${
                              Object.keys(cart).length === 0
                                ? "bg-green-300 cursor-not-allowed"
                                : "bg-green-600"
                            } px-6 py-2 font-medium text-white rounded`}
                            disabled={Object.keys(cart).length === 0}
                          >
                            Checkout
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="shadow-black shadow-md drop-shadow-lg border" />
    </header>
  );
};

// export async function getServerSideProps (ctx)  {
//   const { token } = parseCookies(ctx);
//   if (!token) {
//     return {
//       props: {
//         user: null,
//       },
//     };
//   }
//   const res = await fetch(`${baseUrl}/api/profile`, {
//     headers: {
//       Authorization: token,
//     },
//   });
//   const data = await res.json();
//   if (data.error) {
//     return {
//       props: {
//         user: null,
//       },
//     };
//   }
//   return {
//     props: {
//       user: data.user,
//     },
//   };
// };

export default Navbar;
