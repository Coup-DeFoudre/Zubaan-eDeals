import React, { useEffect, useState} from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import Head from "next/head";
import router, { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0)
  const Router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => setProgress(50));
    router.events.on("routeChangeComplete", () => setProgress(100));
    try {
      if (typeof localStorage !== "undefined") {
        const cart = localStorage.getItem("cart");
        if (cart) {
          setCart(JSON.parse(cart));
        }
        const savedTotal = localStorage.getItem("total");
        if (savedTotal) {
          setSubTotal(JSON.parse(savedTotal));
        }
      }
    } catch (error) {
      if (typeof localStorage !== "undefined") {
        localStorage.clear();
      }
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
  }, []);  

  const saveTotal = (total) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("total", JSON.stringify(total));
    }
  };

  const saveCart = (mycart) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(mycart));
    }
    let total = 0;
    for (const item in mycart) {
      total += mycart[item].qty * mycart[item].price;
    }
    setSubTotal(total);
    saveTotal(total);
  };

  const addToCart = (itemCode, qty, price, name, size, variant, img) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { qty, price, name, size, variant, img };
    }
    setCart(newCart);
    saveCart(newCart);
    toast.success("Item added to cart");
  };

  const clearCart = () => {
    if (Object.keys(cart).length === 0) {
      toast.error("Cart is already empty");
      return;
    }
    setCart({});
    saveCart({});
    toast.error("Cart cleared");
  };
  const buyNow = (itemcode, qty, price, name, size, variant, img) => {
    let newCart = { itemcode: { qty: 1, price, name, size, variant, img } };
    setCart(newCart);
    saveCart(newCart);
    Router.push("/checkout");
  };

  const removeFromCart = (itemCode) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty -= 1;
    }
    if (newCart[itemCode].qty === 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
    toast.error("Item removed from cart");
  };
 

  return (
    <>
      <Head>
        <title>Zubaan-e-deals - Khareedari Hontho Par!</title>
        <meta
          name="description"
          content="Discover Silent Savings and Exciting Deals at Zubaan-eDeals! Shop smartly in hushed tones and enjoy exclusive discounts on a wide range of products. Unlock the power of quiet bargains and start saving today. Explore the best online shopping experience with Zubaan-eDeals!"
        />
      </Head>
      <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar
        user={user}
        key={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />

      <main className="">
        <Toaster />
        <Component
          buyNow={buyNow}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
          {...pageProps}
        />
      </main>

      <Footer />
    </>
  );
}
