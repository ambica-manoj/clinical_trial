import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "./config/api";

function PredictionForm() {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [models, setModels] = useState({});
  const initialForm = {
    NAME: "",
    HAEMATOCRIT: "",
    HAEMOGLOBINS: "",
    ERYTHROCYTE: "",
    LEUCOCYTE: "",
    THROMBOCYTE: "",
    MCH: "",
    MCHC: "",
    MCV: "",
    AGE: "",
    SEX: "M",
  };
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/predict`, form);
      setResult(response.data.final_prediction);
      setModels(response.data.model_predictions);
      setForm(initialForm);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 px-4 py-12">
      <div className="pointer-events-none absolute left-0 top-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-32 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl rounded-[2rem] border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 shadow-[0_35px_90px_rgba(15,23,42,0.7)] backdrop-blur-xl ring-1 ring-slate-700">
        <div className="mb-8 text-center">
          <h1 className="text-xl uppercase tracking-[0.24em] text-slate-300">Patient prediction</h1>
        
          <h4 className="mt-3 max-w-2xl mx-auto text-sm leading-7 text-slate-300">
            Enter patient blood test values to generate an immediate eligibility prediction and explore models.
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2 rounded-3xl border border-slate-600 bg-slate-800 p-5 shadow-sm shadow-slate-950/20">
            <label className="text-sm font-medium text-slate-100">Patient Name</label>
            <input
              type="text"
              name="NAME"
              value={form.NAME}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div className="space-y-2 rounded-3xl border border-slate-600 bg-slate-800 p-5 shadow-sm shadow-slate-950/20">
            <label className="text-sm font-medium text-slate-100">Hematocrit Level (%)</label>
            <p className="text-xs text-slate-400">Normal range: 36–53%</p>
            <input
              type="number"
              step="any"
              name="HAEMATOCRIT"
              value={form.HAEMATOCRIT}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div className="space-y-2 rounded-3xl border border-slate-600 bg-slate-800 p-5 shadow-sm shadow-slate-950/20">
            <label className="text-sm font-medium text-slate-100">Hemoglobin (g/dL)</label>
            <p className="text-xs text-slate-400">Normal range: 12–17 g/dL</p>
            <input
              type="number"
              step="any"
              name="HAEMOGLOBINS"
              value={form.HAEMOGLOBINS}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div className="space-y-2 rounded-3xl border border-slate-600 bg-slate-800 p-5 shadow-sm shadow-slate-950/20">
            <label className="text-sm font-medium text-slate-100">Red Blood Cell Count</label>
            <p className="text-xs text-slate-400">Normal range: 4.0–6.0 million/µL</p>
            <input
              type="number"
              step="any"
              name="ERYTHROCYTE"
              value={form.ERYTHROCYTE}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div className="space-y-2 rounded-3xl border border-slate-600 bg-slate-800 p-5 shadow-sm shadow-slate-950/20">
            <label className="text-sm font-medium text-slate-100">White Blood Cell Count</label>
            <p className="text-xs text-slate-400">Normal range: 4–11 thousand/µL</p>
            <input
              type="number"
              step="any"
              name="LEUCOCYTE"
              value={form.LEUCOCYTE}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div className="space-y-2 rounded-3xl border border-slate-600 bg-slate-800 p-5 shadow-sm shadow-slate-950/20">
            <label className="text-sm font-medium text-slate-100">Platelet Count</label>
            <p className="text-xs text-slate-400">Normal range: 150–450 thousand/µL</p>
            <input
              type="number"
              step="any"
              name="THROMBOCYTE"
              value={form.THROMBOCYTE}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div className="space-y-2 rounded-3xl border border-slate-600 bg-slate-800 p-5 shadow-sm">
            <label className="text-sm font-medium text-slate-100">MCH</label>
            <p className="text-xs text-slate-400">Normal range: 27–33 pg</p>
            <input
              type="number"
              step="any"
              name="MCH"
              value={form.MCH}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div className="space-y-2 rounded-3xl border border-slate-600 bg-slate-800 p-5 shadow-sm">
            <label className="text-sm font-medium text-slate-100">MCHC</label>
            <p className="text-xs text-slate-400">Normal range: 32–36 g/dL</p>
            <input
              type="number"
              step="any"
              name="MCHC"
              value={form.MCHC}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div className="space-y-2 rounded-3xl border border-slate-600 bg-slate-800 p-5 shadow-sm">
            <label className="text-sm font-medium text-slate-100">MCV</label>
            <p className="text-xs text-slate-400">Normal range: 80–100 fL</p>
            <input
              type="number"
              step="any"
              name="MCV"
              value={form.MCV}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div className="space-y-2 rounded-3xl border border-slate-600 bg-slate-800 p-5 shadow-sm">
            <label className="text-sm font-medium text-slate-100">Age</label>
            <input
              type="number"
              name="AGE"
              value={form.AGE}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div className="space-y-2 rounded-3xl border border-slate-600 bg-slate-800 p-5 shadow-sm">
            <label className="text-sm font-medium text-slate-100">Gender</label>
            <select
              name="SEX"
              value={form.SEX}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20">

              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="col-span-full rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-sky-500/30"
          >
            Predict Eligibility
          </button>
        </form>

        {result && (
          <div className="mt-10 rounded-[1.75rem] border border-slate-700 bg-slate-950 p-6 shadow-xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-slate-100 text-center">
              Final Prediction: <span className="text-sky-300">{result}</span>
            </h3>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-700 bg-slate-900">
              <table className="w-full text-left text-sm text-slate-200">
                <thead className="bg-slate-900 text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Model</th>
                    <th className="px-4 py-3">Prediction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {Object.entries(models).map(([model, prediction]) => (
                    <tr key={model} className="hover:bg-slate-900">
                      <td className="px-4 py-3">{model}</td>
                      <td className="px-4 py-3">{prediction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate("/eligible-patients")}
          className="mt-8 rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-600"
        >
          View Eligible Patients
        </button>
      </div>
    </div>
  );
}

export default PredictionForm;
