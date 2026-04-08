import React, { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

function Signup() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault(); 
    setError(''); // Reset error UI
    
    try {
      const res = await axios.post("http://localhost:3000/signup", { 
        name, email, password 
      });

      if (res.status === 201) { 
        alert("Account Created!"); 
        navigate("/login"); 
      }
      
    } catch (err) {
      // Logic to extract the exact error message from backend
      if (err.response && err.response.data) {
        setError(err.response.data.error || "An error occurred");
      } else {
        setError("Cannot connect to server. Is the backend running?");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border"> 
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Create Account</h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            className="w-full border p-2 rounded focus:outline-green-500" 
            placeholder="Full Name" 
            onChange={e => setName(e.target.value)} 
            required 
          />
          <input 
            className="w-full border p-2 rounded focus:outline-green-500" 
            type="email"
            placeholder="Email Address" 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <input 
            className="w-full border p-2 rounded focus:outline-green-500" 
            type="password" 
            placeholder="Password" 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <button className="w-full bg-green-500 text-white p-2 rounded font-bold hover:bg-green-600 transition">
            Sign Up
          </button>
        </form>
        
        <button 
          onClick={() => navigate("/login")} 
          className="mt-4 text-gray-500 w-full text-xs hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default Signup;



