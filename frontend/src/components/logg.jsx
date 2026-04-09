
// LINE 1: Import React and useState (to store what user types)
import React, { useState } from 'react'; 

// LINE 2: Import axios to talk to our Node.js server
import axios from 'axios'; 

// LINE 3: Import useNavigate to move between pages
import { useNavigate } from 'react-router-dom'; 

// LINE 4: Main Login component
function Login() {
  
  // LINE 5: State to store the email typed by the student
  const [email, setEmail] = useState(''); 
  
  // LINE 6: State to store the password typed by the student
  const [password, setPassword] = useState(''); 

  // LINE 7: State to store the error message for the screen
  const [error, setError] = useState('');
  
  // LINE 8: Initialize the "driver" to change the URL
  const navigate = useNavigate(); 

  // LINE 9: This function runs when the user clicks the "Login" button
  const handleLogin = async (e) => {
    
    // LINE 10: Stop the browser from refreshing the whole page
    e.preventDefault(); 
    
    // LINE 11: Clear any old error messages
    setError('');
    
    // LINE 12: Use 'try' to catch any errors from the server
    try {
      
      // LINE 13: Send the email and password to our backend
      const res = await axios.post("http://localhost:3000/login", { 
        email: email, 
        password: password 
      });

      // LINE 14: Check if server says "200" (Everything is OK)
      if (res.status === 200) { 
        
        // LINE 15: Save the security token in the browser memory
        localStorage.setItem("token", res.data.token); 

        // LINE 16: Save the username so we can say "Welcome" in Dashboard
        localStorage.setItem("username", res.data.user.name); 
        
        // LINE 17: Drive the user to the Dashboard page
        navigate("/dashboard"); 
      }
      
    } catch (err) {
      
      // LINE 18: If server says "404", the email is not in the database
      if (err.response.status === 404) setError("User does not exist!"); 
      
      // LINE 19: If server says "401", the password does not match
      else if (err.response.status === 401) setError("Wrong password!"); 
      
      // LINE 20: If the server is offline or crashed
      else setError("Server error, try again later.");
    }
  };

  // LINE 21: The UI (What shows on the screen)
  return (
    // LINE 22: The white box card (using Tailwind CSS)
    <div className="bg-white p-8 rounded shadow w-96 border"> 
      
      {/* LINE 23: The title of the page */}
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Login</h2>

      {/* LINE 24: Show the error box ONLY if there is an error message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center font-medium border border-red-200">
          {error}
        </div>
      )}
      
      {/* LINE 25: The form for user inputs */}
      <form onSubmit={handleLogin} className="space-y-4">
        
        {/* LINE 26: Email input field */}
        <input 
          className="w-full border p-2 rounded" 
          placeholder="Email Address" 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        
        {/* LINE 27: Password input field */}
        <input 
          className="w-full border p-2 rounded" 
          type="password" 
          placeholder="Password" 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        
        {/* LINE 28: The blue submit button */}
        <button className="w-full bg-blue-500 text-white p-2 rounded font-bold hover:bg-blue-600">
          Login
        </button>
        
      </form>
      
      {/* LINE 29: Link to move to the Signup page */}
      <button 
        onClick={() => navigate("/signup")} 
        className="mt-4 text-blue-400 w-full text-sm font-medium"
      >
        Don't have an account? Sign Up
      </button>
      
    </div>
  );
}

// LINE 30: Export the component for App.js to use
export default Login;












