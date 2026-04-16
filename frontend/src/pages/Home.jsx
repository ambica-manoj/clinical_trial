import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute left-10 bottom-10 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-16">
        <div className="space-y-6 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_100px_-40px_rgba(15,23,42,0.8)] backdrop-blur-xl">
          <div className="text-center">
            <span className="inline-flex rounded-full algn-center bg-indigo-500/15 px-4 py-1 text-sm font-semibold text-indigo-200 ring-1 ring-indigo-400/20">
              Hybrid Models for Optimizing Clinical Trial Recruitment
            </span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Clinical Trial System for fast, accurate eligibility decisions
          </h1>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition duration-200 hover:scale-[1.01] hover:shadow-indigo-500/30"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-100 transition duration-200 hover:border-white/20 hover:bg-white/15"
            >
              Register
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <h2 className="text-base font-semibold text-white">Quick Predictions</h2>
              <p className="mt-2 text-sm text-slate-400">Enter patient data and get eligibility insights instantly.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-base font-semibold text-white">Secure workflow</h2>
              <p className="mt-2 text-sm text-slate-400">Built with modern form design and clean, thoughtful interactions.</p>
            </div>
          </div>
          <Link
            to="/eligible-patients"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/20 transition duration-200 hover:scale-[1.01] hover:shadow-emerald-500/30"
          >
            View Eligible Patients
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
