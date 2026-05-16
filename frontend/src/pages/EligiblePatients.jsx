import { useEffect, useState } from "react";
import axios from "axios";

function EligiblePatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/eligible-patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 px-4 py-12">
      <div className="pointer-events-none absolute left-0 top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-5xl rounded-[2rem] border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 shadow-[0_35px_90px_rgba(15,23,42,0.7)] backdrop-blur-xl ring-1 ring-slate-700">
        <div className="mb-8 text-center">
      
          <h2 className="mt-4 text-3xl font-semibold text-white">Eligible Candidates</h2>
          
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-slate-600 bg-slate-800 shadow-[0_20px_45px_rgba(15,23,42,0.25)]">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Age</th>
                <th className="px-5 py-4">Sex</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900">
                  <td className="px-5 py-4">{p.name}</td>
                  <td className="px-5 py-4">{p.age}</td>
                  <td className="px-5 py-4">{p.sex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {patients.length === 0 && (
          <p className="mt-6 text-center text-slate-400">No eligible patients found.</p>
        )}
      </div>
    </div>
  );
}

export default EligiblePatients;
