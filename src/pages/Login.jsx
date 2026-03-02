import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.email && form.password) {
      navigate("/");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b1a] px-6">

      <div className="backdrop-blur-xl bg-white/5 border border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.2)] rounded-3xl w-full max-w-md p-10">

        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Welcome Back <span className="text-purple-400">Gamer</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d1224] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d1224] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition duration-300"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}