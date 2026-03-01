import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400 border-t border-[#222] mt-24">

      {/* Background Glow */}
      <div className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-700/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left */}
          <div className="text-center md:text-left">
            <p className="text-sm">
              © 2026 <span className="text-white font-semibold">Owes Arcadia</span>
            </p>
            <p className="text-xs mt-1 text-gray-500">
              Built by Owes Shaikh
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 text-lg">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Right */}
          <div>
            <a
              href="#privacy-policy"
              className="text-sm hover:text-white transition"
            >
              Privacy Policy
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;