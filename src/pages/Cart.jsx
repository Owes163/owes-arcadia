import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

function Cart({ cart, removeFromCart }) {

  const navigate = useNavigate();
  const containerRef = useRef(null);

  /* ==============================
     TOTAL CALCULATION
  ============================== */
  const total = cart.reduce(
    (sum, item) => sum + (item.finalPrice || item.price),
    0
  );

  /* ==============================
     ENTRY ANIMATION
  ============================== */
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }, [cart]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-16 relative">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-purple-800/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <h1 className="text-4xl mb-10 font-bold tracking-wide">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center mt-32">
          <h2 className="text-2xl text-gray-400 mb-6">
            Your cart is empty 🛒
          </h2>
          <button
            onClick={() => navigate("/games")}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl transition"
          >
            Explore Games
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">

          {/* ================= CART ITEMS ================= */}
          <div
            ref={containerRef}
            className="lg:col-span-2 space-y-6"
          >
            {cart.map((item, index) => (
              <div
                key={index}
                className="
                  flex justify-between items-center
                  bg-[#141414]
                  p-6
                  rounded-xl
                  border border-transparent
                  hover:border-purple-600
                  transition-all duration-300
                "
              >
                <div className="flex items-center gap-6">
                  
                  {/* Image */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-20 object-cover rounded-lg"
                    />
                  )}

                  {/* Info */}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.name}
                    </h3>
                    <p className="text-purple-400">
                      ₹ {item.finalPrice || item.price}
                    </p>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="
            bg-[#141414]
            p-8
            rounded-2xl
            h-fit
            sticky top-32
            border border-purple-700/40
          ">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between text-xl font-semibold mb-8">
              <span>Total</span>
              <span className="text-purple-400">
                ₹ {total}
              </span>
            </div>

            <button
              onClick={() =>
                navigate("/checkout", { state: { cart } })
              }
              className="
                w-full
                bg-green-600
                hover:bg-green-700
                py-3
                rounded-xl
                transition-all
                duration-300
                hover:scale-[1.02]
              "
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;