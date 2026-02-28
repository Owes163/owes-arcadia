import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function GameCard({ game, addToCart }) {

  const cardRef = useRef(null);
  const navigate = useNavigate();

  // 🛑 Safety check
  if (!game) return null;

  // 🎮 3D Tilt Effect
  const handleMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 15;
    const rotateY = ((x / rect.width) - 0.5) * -15;

    cardRef.current.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const resetTilt = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <div className="perspective-[1200px]">

      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        className="bg-[#141414] rounded-2xl overflow-hidden shadow-xl transition-all duration-300"
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* Image → Game Detail */}
        <Link to={`/game/${game.id}`}>
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-56 object-cover hover:scale-105 transition duration-500"
          />
        </Link>

        {/* Content */}
        <div className="p-6">

          <h2 className="text-xl font-bold mb-2">
            {game.name}
          </h2>

          <p className="text-purple-400 font-semibold mb-4">
            ₹ {game.price}
          </p>

          {/* Buy Now → Direct Checkout */}
          <button
            onClick={() => navigate("/checkout", { state: { game } })}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl mb-3"
          >
            Buy Now
          </button>

          {/* Add To Cart */}
          <button
            onClick={() => addToCart(game)}
            className="w-full bg-[#222] hover:bg-[#333] py-3 rounded-xl"
          >
            Add To Cart
          </button>

        </div>
      </div>
    </div>
  );
}

export default GameCard;