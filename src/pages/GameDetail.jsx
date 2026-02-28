import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import games from "../data/games";

function GameDetail({ addToCart }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const game = games.find((g) => g.id === Number(id));

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">
        Game Not Found
      </div>
    );
  }

  const [mainImage, setMainImage] = useState(game.image);

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-16">

      <div className="grid lg:grid-cols-3 gap-12">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <img
            src={mainImage}
            alt={game.name}
            className="w-full h-[450px] object-cover rounded-xl mb-6"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#141414] p-8 rounded-2xl shadow-2xl h-fit">

          <h1 className="text-3xl font-bold mb-6">
            {game.name}
          </h1>

          <p className="text-2xl font-semibold mb-6 text-purple-400">
            ₹ {game.price}
          </p>

          <button
            onClick={() =>
              navigate("/checkout", { state: { game } })
            }
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl mb-4"
          >
            Buy Now
          </button>

          <button
            onClick={() => {
              addToCart(game);
              navigate("/cart");
            }}
            className="w-full bg-[#222] hover:bg-[#333] py-3 rounded-xl"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default GameDetail;