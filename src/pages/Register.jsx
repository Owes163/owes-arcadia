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

    alert("Registration Successful 🎮🔥");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a] flex items-center justify-center px-6">
      <div className="bg-[#111827] border border-purple-600 rounded-2xl shadow-2xl w-full max-w-md p-8">

        <h2 className="text-3xl font-bold text-center mb-6">
          Join <span className="text-purple-500">Arcadia</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block mb-2 text-sm">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 bg-[#0d0f1a] border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-[#0d0f1a] border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 bg-[#0d0f1a] border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 bg-[#0d0f1a] border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-3 rounded-lg font-semibold"
          >
            Register
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}