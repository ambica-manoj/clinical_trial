import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      alert("Registration successful");
      navigate("/login");
    } catch {
      alert("User already exists");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 px-4 py-16">
      <div className="pointer-events-none absolute right-8 top-12 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-10 bottom-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Create account</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Register</h2>
          <p className="mt-2 text-sm text-slate-400">Create your account to start predicting patient eligibility.</p>
        </div>

        <div className="space-y-4">
          <label className="block text-left text-sm font-medium text-slate-200">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
          />
        </div>

        <div className="mt-4 space-y-4">
          <label className="block text-left text-sm font-medium text-slate-200">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
          />
        </div>

        <button
          onClick={registerUser}
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/30"
        >
          Register
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-violet-300 hover:text-white">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
