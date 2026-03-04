import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">      
      <div className="bg-white shadow-lg rounded-xl p-10 text-center w-96">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Clinical Trial Eligibility System
        </h1>
        <div className="flex justify-center gap-6">          
          <Link to="/login">
            <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-lg transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;