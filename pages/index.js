import FeaturesSection from "@/components/FeaturesSection";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main
        className={`${inter.className}`}
      >
       <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src="/StoreBanner.png"
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Welcome to Zubaan-eDeals
              </h1>
              <p className="mb-8 leading-relaxed">
                Discover Silent Savings and Exciting Deals!
                Shop smartly in hushed tones and enjoy exclusive discounts on a wide range of products.
              </p>
              <div className="flex justify-center">
                <button
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Explore Deals
                </button>
              </div>
            </div>
          </div>
        </section>
        <FeaturesSection />
      </main>
    </>
  );
}
