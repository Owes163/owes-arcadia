import { useState, useEffect, useRef } from "react";
import games from "../data/games";
import GameCard from "../components/ui/GameCard";
import gsap from "gsap";

function Games({ addToCart }) {

  // 🔎 Search state
  const [search, setSearch] = useState("");

  // 🎮 Category filter state
  const [category, setCategory] = useState("All");

  // 📦 Grid reference for animation
  const gridRef = useRef(null);

  // 📂 Available categories
  const categories = [
    "All",
    "Action",
    "Adventure",
    "Racing",
    "RPG",
    "Sandbox",
  ];

  // 🔥 Filter logic (Search + Category)
  const filteredGames = games.filter((game) => {

    const matchesSearch = game.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || game.category === category;

    return matchesSearch && matchesCategory;
  });

  // ✨ Animate cards whenever filter/search changes
  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.07,
        duration: 0.7,
        ease: "power3.out",
      }
    );
  }, [filteredGames]);

  return (
    <div className="relative min-h-screen text-white pt-32 px-12 overflow-hidden">

      {/* 🔥 Premium Background Layer */}
      <div className="absolute inset-0 -z-10 bg-black">

        {/* Center glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[900px] h-[600px] 
        bg-purple-900/20 
        blur-[150px] rounded-full" />

        {/* Bottom right glow */}
        <div className="absolute bottom-0 right-0 
        w-[700px] h-[500px] 
        bg-purple-700/10 
        blur-[130px] rounded-full" />

        {/* Soft dark gradient */}
        <div className="absolute inset-0 
        bg-gradient-to-b 
        from-black 
        via-[#0a0a0f] 
        to-black" />

      </div>

      {/* 🔥 Page Title */}
      <h1 className="text-5xl font-bold mb-8 tracking-wide">
        Explore Games
      </h1>

      {/* 🔎 Search Input */}
      <input
        type="text"
        placeholder="Search games..."
        className="p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-md mb-8 w-full 
        border border-[#222]
        focus:outline-none focus:ring-2 focus:ring-purple-600 
        transition-all duration-300"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎮 Category Buttons */}
      <div className="flex gap-4 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              category === cat
                ? "bg-purple-600 scale-105 shadow-xl shadow-purple-800/40"
                : "bg-[#1a1a1a]/80 backdrop-blur-md hover:bg-[#2a2a2a]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🧱 Games Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filteredGames.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            addToCart={addToCart}
            index={index}
          />
        ))}
      </div>

    </div>
  );
}

export default Games;