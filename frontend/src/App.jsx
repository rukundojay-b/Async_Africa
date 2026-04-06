
// LINE 1: Import Route tools
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// LINE 2: Import our pages
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Test from './components/test';
function App() {
  return (
  
    <BrowserRouter>
      
   
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
   
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/Test' element= {<Test/>}/>
          
          <Route path="/" element={<Signup />} /> 
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;