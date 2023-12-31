import React, { useState } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Product from "@/models/Product";

const Slug = ({ addToCart, product, variants, buyNow }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pincode, setPincode] = useState("");
  const [availability, setAvailability] = useState(null);
  const handleCheckAvailability = async () => {
    const pins = await fetch("http://localhost:3000/api/pincode");
    const pindata = await pins.json();
    if (pindata.includes(Number(pincode))) {
      setAvailability(true);
      setPincode("");
    } else {
      setAvailability(false);
      setPincode("");
    }
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-14 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full h-auto object-contain  object-top rounded xl:h-[45vh] md:px-32 lg:px-0"
            src={product.img}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Zubaan-e-deals
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {slug}
            </h1>
            {/* <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div> */}
            <p className="leading-relaxed">{product.description}.</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>

                {product.color.includes("red") && (
                  <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                )}
                {product.color.includes("green") && (
                  <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                )}
                {product.color.includes("blue") && (
                  <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
                )}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    {product.size.includes("S") && <option>SM</option>}
                    {product.size.includes("M") && <option>M</option>}
                    {product.size.includes("L") && <option>L</option>}
                    {product.size.includes("XL") && <option>XL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ₹{product.price}
              </span>
              <button
                onClick={() => {
                  addToCart(
                    slug,
                    1,
                    product.price,
                    product.title,
                    product.size,
                    product.color,
                    product.img
                  );
                }}
                className="flex ml-auto mx-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Add to cart
              </button>
              <button
                onClick={() => {
                  buyNow(
                    slug,
                    1,
                    product.price,
                    product.title,
                    product.size,
                    product.color,
                    product.img
                  );
                }}
                className="flex mx-2 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
              >
                Buy Now
              </button>
              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button> */}
            </div>
            <div className="mt-6">
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              />
              <button
                onClick={handleCheckAvailability}
                disabled={pincode.length !== 6}
                className="px-4 py-2 ml-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 "
              >
                Check for Availability
              </button>
              {availability !== null && (
                <p
                  className={`mt-4 ${
                    availability ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {availability
                    ? "Product available in your area."
                    : "Product not available in your area."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Find the product by slug
  let product = await Product.findOne({ slug: context.query.slug });

  if (!product) {
    // Handle the case where the product is not found
    return {
      notFound: true, // Return a 404 Not Found response
    };
  }

  // Find variants based on the product's title
  let variants = await Product.find({ title: product.title , category: product.category});

  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}

export default Slug;
