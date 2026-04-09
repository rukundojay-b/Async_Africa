<<<<<<< HEAD

// // LINE 1: Import React and useState (to store what user types)
// import React, { useState } from 'react'; 

// // LINE 2: Import axios to talk to our Node.js server
// import axios from 'axios'; 

// // LINE 3: Import useNavigate to move between pages
// import { useNavigate } from 'react-router-dom'; 

// // LINE 4: Main Signup component
// function Signup() {
  
//   // LINE 5: State to store the Full Name
//   const [name, setName] = useState(''); 
  
//   // LINE 6: State to store the email
//   const [email, setEmail] = useState(''); 
  
//   // LINE 7: State to store the password
//   const [password, setPassword] = useState(''); 

//   // LINE 8: State to store the error message for the screen
//   const [error, setError] = useState('');
  
//   // LINE 9: Initialize the "driver" to change the URL
//   const navigate = useNavigate(); 

//   // LINE 10: This function runs when the user clicks "Create Account"
//   const handleSignup = async (e) => {
    
//     // LINE 11: Stop the browser from refreshing the whole page
//     e.preventDefault(); 
    
//     // LINE 12: Clear any old error messages
//     setError('');
    
//     // LINE 13: Use 'try' to catch any errors from the server
//     try {
      
//       // LINE 14: Send the name, email, and password to our backend
//       const res = await axios.post("http://localhost:3000/signup", { 
//         name: name,
//         email: email, 
//         password: password 
//       });

//       // LINE 15: Check if server says "201" (Created Successfully)
//       if (res.status === 201) { 
        
//         // LINE 16: Show a success message
//         alert("Account Created! Please Login."); 
        
//         // LINE 17: Drive the user to the Login page
//         navigate("/login"); 
//       }
      
//     } catch (err) {
      
//       // LINE 18: If server says "409", the email is already taken
//       if (err.response.status === 409) setError("Email already exists!"); 
      
//       // LINE 19: If the server is offline or crashed
//       else setError("Registration failed, try again later.");
//     }
//   };

//   // LINE 20: The UI (What shows on the screen)
//   return (
//     // LINE 21: The white box card (using Tailwind CSS)
//     <div className="bg-white p-8 rounded shadow w-96 border"> 
      
//       {/* LINE 22: The title of the page */}
//       <h2 className="text-2xl font-bold text-center p-6 text-green-600">Sign Up</h2>

//       {/* LINE 23: Show the error box ONLY if there is an error message */}
//       {error && (
//         <div className="bg-red-100 text-red-700 p-2 rounded mb-4  text-center font-medium  border-red-200">
//           {error}
//         </div>
//       )}
      
//       {/* LINE 24: The form for user inputs */}
//       <form onSubmit={handleSignup} className="space-y-4">
        
//         {/* LINE 25: Full Name input field */}
//         <input 
//           className="w-full border p-2 rounded" 
//           placeholder="Full Name" 
//           onChange={e => setName(e.target.value)} 
//           required 
//         />

//         {/* LINE 26: Email input field */}
//         <input 
//           className="w-full border p-2 rounded" 
//           placeholder="Email Address" 
//           onChange={e => setEmail(e.target.value)} 
//           required 
//         />
        
//         {/* LINE 27: Password input field */}
//         <input 
//           className="w-full border p-2 rounded" 
//           type="password" 
//           placeholder="Password" 
//           onChange={e => setPassword(e.target.value)} 
//           required 
//         />
        
//         {/* LINE 28: The green submit button */}
//         <button className="w-full bg-green-500 text-white p-2 rounded font-bold hover:bg-green-600">
//           Create Account
//         </button>
        
//       </form>
      
//       {/* LINE 29: Link to move back to the Login page */}
//       <button 
//         onClick={() => navigate("/login")} 
//         className="mt-4 text-green-500 w-full text-sm font-medium"
//       >
//         Already have an account? Login
//       </button>
      
//     </div>
//   );
// }

// // LINE 30: Export the component for App.js to use
// export default Signup;













// LINE 1: Import React and useState (to store what user types)
=======
>>>>>>> c46d2f09f7d9d80766c965363450bbda596a55fe
import React, { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

function Signup() {
<<<<<<< HEAD
  
  // LINE 5: State to store inputs
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  // LINE 6: State to store the error message for the screen
  const [error, setError] = useState('');
  
  // LINE 7: Initialize the "driver" to change the URL
  const navigate = useNavigate(); 

  // LINE 8: This function runs when the user clicks "Create Account"
  const handleSignup = async (e) => {
    
    // LINE 9: Stop the browser from refreshing the whole page
=======
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
>>>>>>> c46d2f09f7d9d80766c965363450bbda596a55fe
    e.preventDefault(); 
    setError(''); // Reset error UI
    
<<<<<<< HEAD
    // LINE 10: Clear any old error messages
    setError('');
    
    // LINE 11: Use 'try' to catch any errors from the server
    try {
      
      // LINE 12: Send the name, email, and password to our backend
=======
    try {
>>>>>>> c46d2f09f7d9d80766c965363450bbda596a55fe
      const res = await axios.post("http://localhost:3000/signup", { 
        name, email, password 
      });

<<<<<<< HEAD
      // LINE 13: Check if server says "201" (Created Successfully)
      if (res.status === 201) { 
        // LINE 14: Redirect to login page
=======
      if (res.status === 201) { 
        alert("Account Created!"); 
>>>>>>> c46d2f09f7d9d80766c965363450bbda596a55fe
        navigate("/login"); 
      }
      
    } catch (err) {
<<<<<<< HEAD
      
      // LINE 15: If server says "409", the email is already taken
      if (err.response?.status === 409) setError("Email already exists!"); 
      
      // LINE 16: If the server is offline or crashed
      else setError("Registration failed, try again later.");
    }
  };

  // LINE 17: The UI (What shows on the screen)
  return (
    // LINE 18: Centering wrapper (Matches the Login page style)
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* LINE 19: The white box card */}
      <div className="bg-white p-8 rounded shadow w-96 border"> 
        
        {/* LINE 20: The title of the page */}
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Sign Up</h2>

        {/* LINE 21: Show the error box ONLY if there is an error message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center font-medium border border-red-200">
            {error}
          </div>
        )}
        
        {/* LINE 22: The form for user inputs */}
        <form onSubmit={handleSignup} className="space-y-4">
          
          <input 
            className="w-full border p-2 rounded" 
            placeholder="Full Name" 
            onChange={e => setName(e.target.value)} 
            required 
          />

          <input 
            className="w-full border p-2 rounded" 
            placeholder="Email Address" 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          
          <input 
            className="w-full border p-2 rounded" 
            type="password" 
            placeholder="Password" 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          
          <button className="w-full bg-green-500 text-white p-2 rounded font-bold hover:bg-green-600">
            Create Account
          </button>
          
        </form>
        
        {/* LINE 23: Link to move back to the Login page */}
        <button 
          onClick={() => navigate("/login")} 
          className="mt-4 text-green-500 w-full text-sm font-medium"
        >
          Already have an account? Login
        </button>
        
=======
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
>>>>>>> c46d2f09f7d9d80766c965363450bbda596a55fe
      </div>
    </div>
  );
}

<<<<<<< HEAD
// LINE 24: Export the component
export default Signup;
=======
export default Signup;



>>>>>>> c46d2f09f7d9d80766c965363450bbda596a55fe
