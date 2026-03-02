import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b1a] px-6">

      <div className="backdrop-blur-xl bg-white/5 border border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.2)] rounded-3xl w-full max-w-sm p-8">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Join <span className="text-purple-400">Arcadia</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#0d1224] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#0d1224] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#0d1224] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#0d1224] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
          />

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition duration-300"
          >
            Register
          </button>

        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}