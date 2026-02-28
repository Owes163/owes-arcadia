import { useNavigate } from "react-router-dom";

function Cart({ cart, removeFromCart }) {

  const navigate = useNavigate();

  // 🧮 Total calculation
  const total = cart.reduce(
    (sum, item) => sum + (item.finalPrice || item.price),
    0
  );

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-16">

      <h1 className="text-4xl mb-10">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between bg-[#141414] p-4 rounded-lg"
              >
                <span>{item.name}</span>
                <div className="flex gap-6">
                  <span>₹ {item.finalPrice || item.price}</span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <h2 className="text-2xl mb-6">
            Total: ₹ {total}
          </h2>

          {/* ✅ Purchase Button */}
          <button
  onClick={() =>
    navigate("/checkout", { state: { cart } })
  }
  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
>
  Purchase
</button>
        </>
      )}
    </div>
  );
}

export default Cart;