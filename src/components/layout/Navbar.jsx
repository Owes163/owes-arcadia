import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Games", path: "/games" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/" },
];

const NavBar = ({ cartCount = 0, wishlistCount = 0 }) => {
  const navRef = useRef(null);
  const audioRef = useRef(null);
  const dropdownRef = useRef(null);

  const { y } = useWindowScroll();

  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  /* ==============================
     Scroll Behaviour
  ============================== */
  useEffect(() => {
    setScrolled(y > 20);

    if (y > lastScroll) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setLastScroll(y);
  }, [y]);

  /* ==============================
     GSAP Navbar Animation
  ============================== */
  useEffect(() => {
    gsap.to(navRef.current, {
      y: visible ? 0 : -120,
      opacity: visible ? 1 : 0,
      duration: 0.3,
    });
  }, [visible]);

  /* ==============================
     Background Music Toggle
  ============================== */
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => {});
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  /* ==============================
     Close dropdown on outside click
  ============================== */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {/* ================= LEFT - LOGO ================= */}
        <Link
          to="/"
          className="text-2xl font-bold text-white tracking-wider"
        >
          OWES ARCADIA
        </Link>

        {/* ================= CENTER - NAV LINKS ================= */}
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

        {/* ================= RIGHT - ICONS ================= */}
        <div className="flex items-center gap-6 text-white relative">

          {/* Search */}
          <FiSearch className="cursor-pointer hover:text-purple-400 transition-colors text-xl" />

          {/* Wishlist */}
          <Link to="/wishlist" className="relative group">
            <AiOutlineHeart className="text-xl hover:text-pink-500 transition-colors group-hover:scale-110 duration-300" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-600 text-xs px-2 py-0.5 rounded-full animate-pulse">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <AiOutlineShoppingCart className="text-xl hover:text-purple-400 transition-colors group-hover:scale-110 duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-purple-600 text-xs px-2 py-0.5 rounded-full animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* ================= USER DROPDOWN ================= */}
          <div className="relative" ref={dropdownRef}>
            <FiUser
              onClick={() =>
                setShowUserMenu((prev) => !prev)
              }
              className="cursor-pointer text-xl hover:text-purple-400 transition-colors"
            />

            {showUserMenu && (
              <div className="absolute right-0 mt-4 w-44 bg-black/95 backdrop-blur-xl border border-purple-600 rounded-lg shadow-lg overflow-hidden animate-fadeIn">
                <Link
                  to="/login"
                  className="block px-4 py-3 text-sm hover:bg-purple-600/30 transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 text-sm hover:bg-purple-600/30 transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* ================= MUSIC BUTTON ================= */}
          <button
            onClick={() =>
              setIsPlaying((prev) => !prev)
            }
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
                    isPlaying
                      ? "h-4 animate-pulse"
                      : "h-2"
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