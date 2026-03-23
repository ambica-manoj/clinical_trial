import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:5000/login", {
        username,
        password
      });
      navigate("/predict");
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center px-4">

      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-10 text-center w-full max-w-md border border-white/30">

        <h2 className="text-2xl font-bold text-indigo-600 text-center mb-6">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-300"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-indigo-300"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;