import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  /* ==============================
     AUTO REDIRECT WITH COUNTDOWN
  ============================== */
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 3000);

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="bg-[#141414] p-12 rounded-2xl text-center shadow-2xl border border-green-700/30 max-w-md w-full">

        {/* Animated Check Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-600/20 flex items-center justify-center animate-pulse">
            <span className="text-green-500 text-4xl font-bold">
              ✓
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">
          Payment Successful
        </h1>

        <p className="text-gray-400 mb-6">
          Your game has been added to your library.
        </p>

        {/* Countdown */}
        <p className="text-sm text-gray-500 mb-6">
          Redirecting to home in {countdown}...
        </p>

        {/* Manual Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl transition"
        >
          Go To Home Now
        </button>

      </div>
    </div>
  );
}

export default Success;