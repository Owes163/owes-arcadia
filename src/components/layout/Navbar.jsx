import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Games", path: "/games" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/" },
];

const NavBar = ({ cartCount }) => {
  const navRef = useRef(null);
  const audioRef = useRef(null);

  const { y } = useWindowScroll();

  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Scroll behaviour
  useEffect(() => {
    setScrolled(y > 20);

    if (y > lastScroll) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setLastScroll(y);
  }, [y]);

  // GSAP animation
  useEffect(() => {
    gsap.to(navRef.current, {
      y: visible ? 0 : -120,
      opacity: visible ? 1 : 0,
      duration: 0.3,
    });
  }, [visible]);

  // Audio toggle
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => {});
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <div
      ref={navRef}
      className={clsx(
        "fixed top-4 inset-x-6 z-50 transition-all duration-500",
        {
          "bg-black/60 backdrop-blur-xl rounded-xl shadow-lg":
            scrolled,
        }
      )}
    >
      <nav className="flex items-center justify-between h-16 px-8">

        {/* LEFT - Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wider">
          OWES ARCADIA
        </Link>

        {/* CENTER - Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="relative text-white font-medium group"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* RIGHT - Icons + Music */}
        <div className="flex items-center gap-6 text-white">

          <FiSearch className="cursor-pointer hover:text-purple-400 transition-colors" />

          <Link to="/cart" className="relative">
            <AiOutlineShoppingCart className="text-xl hover:text-purple-400 transition-colors" />
            <span className="absolute -top-2 -right-3 bg-purple-600 text-xs px-2 py-0.5 rounded-full">
              {cartCount || 0}
            </span>
          </Link>

          <FiUser className="cursor-pointer hover:text-purple-400 transition-colors" />

          {/* 🎵 MUSIC BUTTON */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <audio
              ref={audioRef}
              className="hidden"
              src="/audio/loop.mp3"
              loop
            />

            <span className="text-sm font-semibold tracking-wide">
              {isPlaying ? "Music On" : "Music Off"}
            </span>

            <div className="flex items-end gap-[2px]">
              {[1, 2, 3].map((bar) => (
                <div
                  key={bar}
                  className={clsx(
                    "w-[3px] bg-purple-500 transition-all duration-300",
                    isPlaying ? "h-4 animate-pulse" : "h-2"
                  )}
                />
              ))}
            </div>
          </button>

        </div>
      </nav>
    </div>
  );
};

export default NavBar;