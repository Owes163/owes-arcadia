import games from "../data/games";
import { FiDownload, FiZoomIn } from "react-icons/fi";
import { useRef } from "react";

const Gallery = () => {
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 18;
    const rotateY = (rect.width / 2 - x) / 18;

    card.style.transform = `
      perspective(1400px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05,1.05,1.05)
    `;
  };

  const resetTilt = (index) => {
    const card = cardRefs.current[index];
    card.style.transform = `
      perspective(1400px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1,1,1)
    `;
  };

  return (
    <section className="min-h-screen bg-black text-white py-24 px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-20">
          Game <span className="text-purple-500">Gallery</span>
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">

          {games.map((game, index) => (
            <div
              key={game.id}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => resetTilt(index)}
              className="group relative rounded-2xl overflow-hidden transition-all duration-300 bg-white/5 backdrop-blur-lg shadow-2xl"
            >
              {/* IMAGE */}
              <img
                src={game.image}
                alt={game.name}
                className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* TITLE */}
              <div className="absolute bottom-6 left-6 z-20">
                <h2 className="text-lg font-semibold tracking-wide">
                  {game.name}
                </h2>
                <p className="text-purple-400 text-sm font-medium">
                  ₹ {game.price}
                </p>
              </div>

              {/* ICONS */}
              <div className="absolute top-5 right-5 flex gap-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">

                <button className="bg-black/70 backdrop-blur-md p-2 rounded-full hover:bg-purple-600 transition-all duration-300 hover:scale-110">
                  <FiZoomIn size={18} />
                </button>

                <a
                  href={game.image}
                  download
                  className="bg-black/70 backdrop-blur-md p-2 rounded-full hover:bg-purple-600 transition-all duration-300 hover:scale-110"
                >
                  <FiDownload size={18} />
                </a>

              </div>

              {/* SHINE EFFECT */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Gallery;