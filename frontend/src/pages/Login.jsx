import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            await axios.post("http://localhost:5000/login",{
                username,
                password
            });
            navigate("/predict");
        }
        catch{
            alert("Invalid login");
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white shadow-lg rounded-xl p-10 w-96">
                <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
                    Login
                </h2>
                <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                <input type="password" placeholder="Password" nChange={(e)=>setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                <button onClick={handleLogin} className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg transition">
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;