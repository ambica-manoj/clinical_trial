import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      navigate("/predict");
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 px-4 py-16">
      <div className="pointer-events-none absolute left-10 top-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          
          <h2 className="mt-4 text-3xl font-semibold text-white">Login</h2>
          <p className="mt-2 text-sm text-slate-400">Sign in to submit patient data and view predictions.</p>
        </div>

        <div className="space-y-4">
          <label className="block text-left text-sm font-medium text-slate-200">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          />
        </div>

        <div className="mt-4 space-y-4">
          <label className="block text-left text-sm font-medium text-slate-200">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
          />
        </div>

        <button
          onClick={handleLogin}
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-sky-500/30"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
          New here?{' '}
          <Link to="/register" className="font-semibold text-sky-300 hover:text-white">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
