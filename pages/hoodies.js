import React from "react";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Hoodies = ({ products }) => {
  // Destructure products from props

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {Object.keys(products).length === 0 && (
            <div className="flex justify-center items-center w-full h-96">
              <h1 className="text-3xl text-gray-900">Sorry Stock is all gone <br/>
               plese wait ! new stock coming soon....</h1>
              
              </div>
              )}
          {Object.keys(products).map((item, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link
                href={`/products/${products[item].slug}`}
                className="block relative h-auto max-h-96 rounded-md overflow-hidden shadow-black shadow-sm drop-shadow-xl"
              >
                <img
                  alt="ecommerce"
                  className="object-contain  object-center w-full h-full block"
                  src={products[item].img}
                />
              </Link>
              <div className="mt-4">
                <Link href={`/products/${products[item].slug}`}>
                  {" "}
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {products[item].category}
                  </h3>
                </Link>
                <Link className="" href={`/products/${products[item].slug}`}>
                  {" "}
                  <h2 className="text-gray-900 title-font text-lg  hover:text-red-700 font-medium">
                    {products[item].title}
                  </h2>
                </Link>
                <p className="mt-1">{products[item].price}</p>
                <div className="mt-1">
                  {products[item].size.includes("S") && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      S
                    </span>
                  )}
                  {products[item].size.includes("M") && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      M
                    </span>
                  )}
                  {products[item].size.includes("L") && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      L
                    </span>
                  )}
                  {products[item].size.includes("XL") && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      XL
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  {products[item].color.includes("red") && (
                    <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {products[item].color.includes("green") && (
                    <button className="border-2 border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {products[item].color.includes("blue") && (
                    <button className="border-2 border-gray-300 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  try {
    const products = await Product.find({ category: "hoodies" });
    let hoodies = {};

    for (let item of products) {
      if (item.title in hoodies) {
        if (item.availableQty > 0) {
          if (
            !hoodies[item.title].color.some(
              (color) => color.name === item.color
            )
          ) {
            hoodies[item.title].color.push({ name: item.color });
          }
          if (
            !hoodies[item.title].size.some((size) => size.name === item.size)
          ) {
            hoodies[item.title].size.push({ name: item.size });
          }
        }
      } else {
        hoodies[item.title] = JSON.parse(JSON.stringify(item));
        if (item.availableQty > 0) {
          hoodies[item.title].color = [item.color];
          hoodies[item.title].size = [item.size];
        } else {
          hoodies[item.title].color = [];
          hoodies[item.title].size = [];
        }
      }
    }
    return {
      props: {
        products: JSON.parse(JSON.stringify(hoodies)),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default Hoodies;
