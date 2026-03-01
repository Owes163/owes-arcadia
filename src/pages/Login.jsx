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

    // Temporary Dummy Login
    if (form.email && form.password) {
      alert("Login Successful 🚀");
      navigate("/"); // Redirect to Home
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a] flex items-center justify-center px-6">
      <div className="bg-[#111827] border border-purple-600 rounded-2xl shadow-2xl w-full max-w-md p-8">

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back <span className="text-purple-500">Gamer</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 bg-[#0d0f1a] border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}