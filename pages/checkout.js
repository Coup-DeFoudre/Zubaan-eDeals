// components/Checkout.js
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY } from "../config";
import { toast, Toaster } from "react-hot-toast";


const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe(STRIPE_PUBLIC_KEY);
      setStripe(stripeInstance);
    };

    initializeStripe();
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const session = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subTotal,cart }), // Send subTotal to the server
    }).then((res) => res.json());

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
      toast.error("Payment failed");
    } else {
      toast.success("Payment successful");
      clearCart();
    }
  };

  return (
    <>
    <Toaster/>
      <h1 className="text-center text-3xl font-bold italic mt-10">CheckOut</h1>

      <form className="max-w-2xl mx-auto my-4 p-4 ">
        <div>
          <h2 className="my-5 font-bold text-2xl">1. Delivery Details</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address:
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City:
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="zipCode"
            >
              Zip Code:
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <h2 className="my-5 font-bold text-2xl">2. Review cart</h2>
          <div className=" py-5 text-base space-y-5 ">
            <div className="items">
              {Object.keys(cart).length === 0 && (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <h1 className="text-lg font-semibold">Your cart is empty</h1>
                </div>
              )}
              {Object.keys(cart).map((k) => (
                <div key={k} className="flex items-center space-x-6 mt-3">
                  {/* Display item details */}
                  <div className="w-16 h-16 rounded-md  border border-black px-2">
                    <img src={cart[k].img} alt="" />
                  </div>
                  <div className="flex-grow flex flex-col space-y-3">
                    <h2 className="text-lg font-semibold">{cart[k].name}</h2>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <h2>
                          ({cart[k].size}/{cart[k].variant}) x{cart[k].qty}
                        </h2>
                      </div>
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
            </div>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => handleCheckout(e)}
        >
          Place Order
        </button>
      </form>
    </>
  );
};

export default Checkout;
