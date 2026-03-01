import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  /* ==============================
     RECEIVE CART SAFELY
  ============================== */
  const cart = location.state?.cart || [];

  const [loading, setLoading] = useState(false);

  /* ==============================
     REDIRECT IF EMPTY
  ============================== */
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  /* ==============================
     TOTAL CALCULATION
  ============================== */
  const total = cart.reduce(
    (sum, item) => sum + (item.finalPrice || item.price),
    0
  );

  /* ==============================
     HANDLE PAYMENT (Mock)
  ============================== */
  const handlePayment = () => {
    setLoading(true);

    const timer = setTimeout(() => {
      navigate("/success");
    }, 2000);

    return () => clearTimeout(timer);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-16">

      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="bg-[#141414] p-8 rounded-2xl max-w-2xl">

        {/* ================= ITEM LIST ================= */}
        <div className="space-y-4 mb-8">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-[#222] pb-2"
            >
              <span>{item.name}</span>
              <span>₹ {item.finalPrice || item.price}</span>
            </div>
          ))}
        </div>

        {/* ================= TOTAL ================= */}
        <h2 className="text-2xl mb-8">
          Total: ₹ {total}
        </h2>

        {/* ================= PAYMENT BUTTON ================= */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-4 rounded-xl text-lg transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processing..." : "Proceed To Payment"}
        </button>

      </div>
    </div>
  );
}

export default Checkout;