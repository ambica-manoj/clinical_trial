import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center px-4">

      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-10 text-center w-full max-w-md border border-white/30">

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-3">
          Clinical Trial System
        </h1>

        {/* Subtitle */}
        <p className="text-white/80 mb-8 text-sm">
          Predict patient eligibility using advanced medical data analysis
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">

          <Link to="/login">
            <button className="w-full bg-white text-indigo-600 font-semibold py-2 rounded-lg hover:scale-105 hover:bg-gray-100 transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="w-full bg-indigo-700 text-white py-2 rounded-lg hover:scale-105 hover:bg-indigo-800 transition">
              Register
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Home;