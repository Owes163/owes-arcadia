import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#070b1a] border-t border-purple-500/20 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-white">
            Owes <span className="text-purple-400">Arcadia</span>
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            © 2026 Owes Shaikh. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-xl">

          <a
            href="mailto:ozzyshaikh163@gmail.com"
            className="text-gray-300 hover:text-purple-400 transition duration-300"
          >
            <FaEnvelope />
          </a>

          <a
            href="https://www.linkedin.com/in/owes-shaikh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-purple-400 transition duration-300"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/Owes163"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-purple-400 transition duration-300"
          >
            <FaGithub />
          </a>

        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-purple-500/10 py-4 text-center text-xs text-gray-500">
        Built with ❤️ by Owes Shaikh
      </div>

    </footer>
  );
}