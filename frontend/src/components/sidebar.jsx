// // LINE 1: Import React and Navigation
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// // LINE 2: Sidebar component
// function Sidebar() {
//   const navigate = useNavigate();
//   const name = localStorage.getItem("username");

//   // LINE 3: Logout function
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     // LINE 4: Vertical Sidebar design (Fixed on the left)
//     <div className="w-64 bg-blue-800 h-screen text-white flex flex-col p-6 shadow-xl">
      
//       {/* LINE 5: Logo or App Name */}
//       <h2 className="text-2xl font-bold mb-10 text-center border-b pb-4">Stock App</h2>
      
//       {/* LINE 6: Navigation Links */}
//       <nav className="flex-1 space-y-4">
//         <button onClick={() => navigate("/dashboard")} className="w-full text-left p-2 hover:bg-blue-700 rounded transition">🏠 Home</button>
//         <button className="w-full text-left p-2 hover:bg-blue-700 rounded transition">📦 Add Product</button>
//         <button className="w-full text-left p-2 hover:bg-blue-700 rounded transition">📊 View Stock</button>
//         <button className="w-full text-left p-2 hover:bg-blue-700 rounded transition">✏️ Update Items</button>
//       </nav>

//       {/* LINE 7: User Profile and Logout at the bottom */}
//       <div className="border-t pt-4">
//         <p className="text-sm mb-4 text-blue-200 text-center font-medium">User: {name}</p>
//         <button 
//           onClick={handleLogout}
//           className="w-full bg-red-500 p-2 rounded font-bold hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

















// LINE 1: Import React and Navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';

// LINE 2: Sidebar component - WE ADDED { setView } AS A PROP HERE
function Sidebar({ setView }) {
  const navigate = useNavigate();
  const name = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    // LINE 3: 'fixed' ensures the sidebar stays on the left and full height
    <div className="w-64 bg-slate-900 h-screen text-white flex flex-col p-6 shadow-xl fixed left-0 top-0">
      
      <h2 className="text-2xl font-bold mb-10 text-center border-b border-slate-700 pb-4">StockPro</h2>
      
      {/* LINE 4: These onClick functions now tell the Dashboard what to show */}
      <nav className="flex-1 space-y-2">
        <button onClick={() => setView('home')} className="w-full text-left p-3 hover:bg-slate-800 rounded-lg transition">🏠 Home</button>
        <button onClick={() => setView('add')} className="w-full text-left p-3 hover:bg-slate-800 rounded-lg transition">📦 Add Product</button>
        <button onClick={() => setView('stock')} className="w-full text-left p-3 hover:bg-slate-800 rounded-lg transition">📊 View Stock</button>
      </nav>

      <div className="border-t border-slate-700 pt-4">
        <p className="text-xs text-slate-400 mb-4 text-center font-medium">User: {name}</p>
        <button onClick={handleLogout} className="w-full bg-red-600 p-2 rounded-lg font-bold hover:bg-red-700 transition">Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;