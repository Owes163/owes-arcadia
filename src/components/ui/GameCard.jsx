import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function GameCard({ game, addToCart, addToWishlist }) {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  /* ==============================
     Safety Check
  ============================== */
  if (!game) return null;

  /* ==============================
     3D Tilt Effect (Optimized)
  ============================== */
  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 12;
    const rotateY = ((x / rect.width) - 0.5) * -12;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  };

  const resetTilt = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  /* ==============================
     Wishlist Toggle
  ============================== */
  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (addToWishlist) addToWishlist(game);
  };

  return (
    <div className="perspective-[1200px] group">

      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        className="
          bg-[#141414]
          rounded-2xl
          overflow-hidden
          shadow-xl
          transition-all
          duration-300
          border border-transparent
          group-hover:border-purple-600
        "
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* ================= IMAGE ================= */}
        <div className="relative">
          <Link to={`/game/${game.id}`}>
            <img
              src={game.image}
              alt={game.name}
              className="
                w-full
                h-56
                object-cover
                transition-transform
                duration-500
                group-hover:scale-110
              "
            />
          </Link>

          {/* Wishlist Icon */}
          <button
            onClick={handleWishlist}
            className="
              absolute top-4 right-4
              bg-black/60
              backdrop-blur-md
              p-2
              rounded-full
              hover:scale-110
              transition
            "
          >
            {isWishlisted ? (
              <AiFillHeart className="text-pink-500 text-xl animate-pulse" />
            ) : (
              <AiOutlineHeart className="text-white text-xl hover:text-pink-400" />
            )}
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-6">

          <h2 className="text-xl font-bold mb-2">
            {game.name}
          </h2>

          <p className="text-purple-400 font-semibold mb-4">
            ₹ {game.price}
          </p>

          {/* Buy Now */}
          <button
            onClick={() =>
              navigate("/checkout", { state: { game } })
            }
            className="
              w-full
              bg-purple-600
              hover:bg-purple-700
              py-3
              rounded-xl
              mb-3
              transition-all
              duration-300
              hover:scale-[1.02]
            "
          >
            Buy Now
          </button>

          {/* Add To Cart */}
          <button
            onClick={() => addToCart(game)}
            className="
              w-full
              bg-[#222]
              hover:bg-[#333]
              py-3
              rounded-xl
              transition-all
              duration-300
              hover:scale-[1.02]
            "
          >
            Add To Cart
          </button>

        </div>
      </div>
    </div>
  );
}

export default GameCard;