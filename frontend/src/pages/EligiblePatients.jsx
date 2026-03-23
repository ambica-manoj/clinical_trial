import { useEffect, useState } from "react";
import axios from "axios";

function EligiblePatients() {

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/eligible-patients")
            .then(res => setPatients(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-green-50 p-8 flex flex-col items-center">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl">

                <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
                    Eligible Patients
                </h2>

                <table className="w-full border border-gray-200">
                    <thead className="bg-green-100">
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Age</th>
                            <th className="p-2 border">Sex</th>                           
                        </tr>
                    </thead>

                    <tbody>
                        {patients.map((p) => (
                            <tr key={p.id} className="text-center">
                                <td className="p-2 border">{p.name}</td>
                                <td className="p-2 border">{p.age}</td>
                                <td className="p-2 border">{p.sex}</td>                                
                            </tr>
                        ))}
                    </tbody>
                </table>

                {patients.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        No eligible patients found
                    </p>
                )}
                

            </div>
        </div>
    );
}

export default EligiblePatients;