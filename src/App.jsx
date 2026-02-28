// React Router
import { Routes, Route, useLocation } from "react-router-dom";

// React
import { useState, useEffect, useRef } from "react";

// GSAP
import gsap from "gsap";

// Layout
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Pages
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

function App() {

  // 🛒 Cart State
  const [cart, setCart] = useState([]);

  const location = useLocation();
  const pageRef = useRef(null);
  const overlayRef = useRef(null);

  // Add to Cart
  const addToCart = (game) => setCart((prev) => [...prev, game]);

  // Remove from Cart
  const removeFromCart = (index) =>
    setCart((prev) => prev.filter((_, i) => i !== index));

  // 🎬 Clean Cinematic Page Transition
  useEffect(() => {

    const tl = gsap.timeline();

    tl.to(pageRef.current, {
      scale: 0.96,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    })

    .fromTo(
      overlayRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.5, ease: "power3.inOut" },
      "-=0.2"
    )

    .set(pageRef.current, { scale: 1.04, opacity: 0 })

    .to(pageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.7,
      ease: "expo.out",
    })

    .to(overlayRef.current, {
      x: "-100%",
      duration: 0.6,
      ease: "power3.inOut",
    });

  }, [location]);

  return (
    <>
      <Navbar cartCount={cart.length} />

      {/* Page Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-50 translate-x-full pointer-events-none"
      />

      {/* Animated Page Wrapper */}
      <div ref={pageRef}>

        <Routes>

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

          <Route
            path="/games"
            element={<Games addToCart={addToCart} />}
          />

          <Route
            path="/game/:id"
            element={<GameDetail addToCart={addToCart} />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
              />
            }
          />

          <Route path="/checkout" element={<Checkout />} />

          {/* ✅ STEP 3 ADDED */}
          <Route path="/success" element={<Success />} />

        </Routes>

      </div>
    </>
  );
}

export default App;