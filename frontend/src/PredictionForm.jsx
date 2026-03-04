import { useState } from "react";
import axios from "axios";

function PredictionForm() {

    const [result, setResult] = useState("");
    const [models, setModels] = useState({});

    const [form, setForm] = useState({
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
    });

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
                <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <input name="HAEMATOCRIT" placeholder="Hematocrit" onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"/>
                    <input name="HAEMOGLOBINS" placeholder="Hemoglobin" onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"/>
                    <input name="ERYTHROCYTE" placeholder="Erythrocyte" onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"/>
                    <input name="LEUCOCYTE" placeholder="Leucocyte" onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"/>
                    <input name="THROMBOCYTE" placeholder="Thrombocyte" onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"/>

                    <input name="MCH" placeholder="MCH" onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"/>
                    <input name="MCHC" placeholder="MCHC" onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"/>
                    <input name="MCV" placeholder="MCV" onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"/>
                    <input name="AGE" placeholder="Age" onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"/>
                    <select name="SEX" onChange={handleChange} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300">
                           <option value="M">Male</option>
                           <option value="F">Female</option>
                    </select>

                    <button ype="submit" className="col-span-2 md:col-span-3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
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