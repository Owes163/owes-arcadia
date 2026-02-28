import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {

  const location = useLocation();
  const navigate = useNavigate();

  // 🛒 Receive full cart
  const cart = location.state?.cart || [];

  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 px-16">
        No Items To Checkout
      </div>
    );
  }

  // 💰 Calculate total
  const total = cart.reduce(
    (sum, item) => sum + (item.finalPrice || item.price),
    0
  );

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/success");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-16">

      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="bg-[#141414] p-8 rounded-2xl max-w-2xl">

        {/* 🧾 List All Games */}
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

        {/* 💰 Total */}
        <h2 className="text-2xl mb-8">
          Total: ₹ {total}
        </h2>

        {/* 💳 Payment Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-4 rounded-xl text-lg ${
            loading
              ? "bg-gray-600"
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