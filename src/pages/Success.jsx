import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {

  const navigate = useNavigate();

  // Auto redirect after 3 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

      <div className="bg-[#141414] p-10 rounded-2xl text-center">

        <div className="text-green-500 text-6xl mb-6">
          ✓
        </div>

        <h1 className="text-3xl font-bold mb-4">
          Payment Successful
        </h1>

        <p className="text-gray-400">
          Your game has been added to your library.
        </p>

        <p className="text-sm text-gray-600 mt-4">
          Redirecting to home...
        </p>

      </div>
    </div>
  );
}

export default Success;