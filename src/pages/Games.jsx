import { useState, useEffect, useRef, useMemo } from "react";
import games from "../data/games";
import GameCard from "../components/ui/GameCard";
import gsap from "gsap";

function Games({ addToCart, addToWishlist }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const gridRef = useRef(null);

  const categories = [
    "All",
    "Action",
    "Adventure",
    "Racing",
    "RPG",
    "Sandbox",
  ];

  /* Filter games */
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || game.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  /* Animate cards */
  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [filteredGames]);

  return (
    <div className="relative min-h-screen text-white pt-32 px-12 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[900px] h-[600px] bg-purple-900/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 
        w-[700px] h-[500px] bg-purple-700/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold mb-8 tracking-wide">
        Explore Games
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search games..."
        className="p-4 rounded-xl bg-[#1a1a1a]/80 backdrop-blur-md mb-8 w-full 
        border border-[#222]
        focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filter */}
      <div className="flex gap-4 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full transition ${
              category === cat
                ? "bg-purple-600 scale-105 shadow-xl shadow-purple-800/40"
                : "bg-[#1a1a1a]/80 hover:bg-[#2a2a2a]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
          />
        ))}
      </div>

    </div>
  );
}

export default Games;