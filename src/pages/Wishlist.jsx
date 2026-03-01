import { useNavigate } from "react-router-dom";

function Wishlist({ wishlist, removeFromWishlist, addToCart }) {

  const navigate = useNavigate();

  const total = wishlist.reduce(
    (sum, item) => sum + (item.finalPrice || item.price),
    0
  );

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 px-16 text-center">
        <h1 className="text-4xl mb-6">Your Wishlist</h1>
        <p className="text-gray-400 mb-8">No games added yet.</p>
        <button
          onClick={() => navigate("/games")}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
        >
          Explore Games
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-16">

      <h1 className="text-4xl mb-10">Your Wishlist</h1>

      <div className="grid lg:grid-cols-3 gap-12">

        {/* Wishlist Items */}
        <div className="lg:col-span-2 space-y-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-[#141414] p-6 rounded-xl"
            >
              <div className="flex items-center gap-6">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-20 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-purple-400">
                    ₹ {item.finalPrice || item.price}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                >
                  Add To Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-[#141414] p-8 rounded-2xl h-fit border border-purple-700/40">
          <h2 className="text-2xl font-bold mb-6">
            Wishlist Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Total Items</span>
            <span>{wishlist.length}</span>
          </div>

          <div className="flex justify-between text-xl font-semibold">
            <span>Total Value</span>
            <span className="text-purple-400">
              ₹ {total}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Wishlist;