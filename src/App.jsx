// Router
import { Routes, Route, useLocation } from "react-router-dom";

// React
import { useState, useEffect, useRef } from "react";

// GSAP
import gsap from "gsap";
import ScrollProgress from "./components/ui/ScrollProgress";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Sections
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Features from "./components/sections/Features";
import Story from "./components/sections/Story";
import Contact from "./components/sections/Contact";

// Pages
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";

function App() {
  // Global state
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const location = useLocation();
  const pageRef = useRef(null);
  const overlayRef = useRef(null);

  // Cart
  const addToCart = (game) =>
    setCart((prev) => [...prev, game]);

  const removeFromCart = (index) =>
    setCart((prev) => prev.filter((_, i) => i !== index));

  // Wishlist
  const addToWishlist = (game) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === game.id);
      return exists
        ? prev.filter((item) => item.id !== game.id)
        : [...prev, game];
    });
  };

  const removeFromWishlist = (id) =>
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );

  // Page transition
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(pageRef.current, {
      scale: 0.96,
      opacity: 0,
      duration: 0.4,
    })
      .fromTo(
        overlayRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5 },
        "-=0.2"
      )
      .set(pageRef.current, { scale: 1.04, opacity: 0 })
      .to(pageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
      })
      .to(overlayRef.current, {
        x: "-100%",
        duration: 0.6,
      });

    return () => tl.kill();
  }, [location]);

  return (
    <>
      <ScrollProgress />

      <Navbar
        cartCount={cart.length}
        wishlistCount={wishlist.length}
      />

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-50 translate-x-full pointer-events-none"
      />

      <div ref={pageRef}>
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Features />
                <Story />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* Games */}
          <Route
            path="/games"
            element={
              <Games
                addToCart={addToCart}
                addToWishlist={addToWishlist}
              />
            }
          />

          {/* Game Detail */}
          <Route
            path="/game/:id"
            element={
              <GameDetail
                addToCart={addToCart}
                addToWishlist={addToWishlist}
              />
            }
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
              />
            }
          />

          {/* Wishlist */}
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
                addToCart={addToCart}
              />
            }
          />

          {/* Gallery */}
          <Route path="/gallery" element={<Gallery />} />

          {/* Other */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>
    </>
  );
}

export default App;