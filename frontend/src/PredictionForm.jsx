import { useState } from "react";
import axios from "axios";

function PredictionForm() {

    const [result, setResult] = useState("");
    const [models, setModels] = useState({});
    const initialForm = {
        NAME:"",
        HAEMATOCRIT: "",
        HAEMOGLOBINS: "",
        ERYTHROCYTE: "",
        LEUCOCYTE: "",
        THROMBOCYTE: "",
        MCH: "",
        MCHC: "",
        MCV: "",
        AGE: "",
        SEX: "M"
    };
    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/predict", form
            );

            setResult(response.data.final_prediction);
            setModels(response.data.model_predictions);
            setForm(initialForm);
        
        } 
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 p-8 flex flex-col items-center">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                    Clinical Trial Eligibility
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Enter patient blood test values to predict clinical trial eligibility
                </p>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Patient Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="font-medium text-gray-700">Patient Name</label>
                         <small className="invisible text-sm">placeholder</small>
                        <input type="text" name="NAME" value={form.NAME} onChange={handleChange} className="border p-2 rounded-lg"/>
                    </div>

                    {/* Hematocrit */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-700">Hematocrit Level % </label>
                        <small className="text-gray-500 mb-1">Normal range: 36-53%</small>
                        <input type="number" step="any" name="HAEMATOCRIT" value={form.HAEMATOCRIT} onChange={handleChange} className="border p-2 rounded-lg"/>
                    </div>

                    {/* Hemoglobin */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-700">Hemoglobin (g/dL)</label>
                        <small className="text-gray-500 mb-1">Normal range: 12-17 g/dL</small>
                        <input type="number" step="any" name="HAEMOGLOBINS" value={form.HAEMOGLOBINS} onChange={handleChange} className="border p-2 rounded-lg"/>
                    </div>

                    {/* RBC */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-700">Red Blood Cell Count</label>
                        <small className="text-gray-500 mb-1">Normal range: 4.0-6.0 million/µL</small>
                        <input type="number" step="any" name="ERYTHROCYTE" value={form.ERYTHROCYTE} onChange={handleChange} className="border p-2 rounded-lg"/>
                    </div>

                    {/* WBC */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-700">White Blood Cell Count</label>
                        <small className="text-gray-500 mb-1">Normal range: 4-11 thousand/µL</small>
                        <input type="number" step="any"  name="LEUCOCYTE" value={form.LEUCOCYTE} onChange={handleChange} className="border p-2 rounded-lg"/>
                    </div>

                    {/* Platelets */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-700">Platelet Count</label>
                        <small className="text-gray-500 mb-1">Normal range: 150-450 thousand/µL</small>
                        <input type="number" step="any" name="THROMBOCYTE" value={form.THROMBOCYTE} onChange={handleChange} className="border p-2 rounded-lg"/>
                    </div>

                    {/* MCH */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-700">Mean Corpuscular Hemoglobin (MCH)</label>
                        <small className="text-gray-500 mb-1">Normal range: 27-33 pg</small>
                        <input type="number" step="any" name="MCH" value={form.MCH} onChange={handleChange} className="border p-2 rounded-lg"/>
                    </div>

                    {/* MCHC */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-700">Mean Corpuscular Hemoglobin Concentration (MCHC)</label>
                        <small className="text-gray-500 mb-1">Normal range: 32-36 g/dL</small>
                        <input type="number" step="any" name="MCHC" value={form.MCHC} onChange={handleChange} className="border p-2 rounded-lg" />
                    </div>

                    {/* MCV */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-700">Mean Corpuscular Volume (MCV)</label>
                        <small className="text-gray-500 mb-1">Normal range: 80-100 fL</small>    
                        <small className="invisible text-sm">placeholder</small>
                        <input type="number" step="any" name="MCV" value={form.MCV} onChange={handleChange} className="border p-2 rounded-lg"/>
                    </div>

                    {/* Age */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-700">Age</label>
                        <input type="number" name="AGE" value={form.AGE} onChange={handleChange} className="border p-2 rounded-lg" />
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium text-gray-700">Gender</label>
                        <select name="SEX" value={form.SEX} onChange={handleChange} className="border p-2 rounded-lg">
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>

                    <button type="submit" className="col-span-2 md:col-span-3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                        Predict
                    </button>

                </form>


                {result &&(                    
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-green-600 mb-4">
                            Final Prediction:{result}  </h3>
                        <table className="w-full border border-gray-200">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="p-2 border">Model</th>
                                    <th className="p-2 border">Prediction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(models).map(([model, prediction]) => (
                                    <tr key={model} className="text-center">
                                        <td className="p-2 border">{model}</td>
                                        <td className="p-2 border">{prediction}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PredictionForm;