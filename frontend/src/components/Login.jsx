import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e)=>{
    e.preventDefault()
    setError("")

    try{
      const res = await axios.post("http://localhost:3000/login",{
        email:email,
        password:password
      })
      if (res.status === 200){
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("username",res.data.user.name)
        navigate("/dashboard")
      }
    }catch(err){
      if(err.response.status === 400){
        setError("User Not found ")
      }else if(err.response.status === 401){
        setError("Invalid password")
      }else{
        setError("Internal server error")
      }
    }
  }
  return(
    <div className="bg-white border rounded-xl shadow-lg p-4 w-96 ">
      <h2 className="text-blue-500 font-bold p-6 ">LogIn</h2>
      { error &&(
        <div className="bg-red-200 text-red-500
        border rounded 
        shadow p-4 mt-2 mb-4 
        text-center  w-full">

        </div>
      )}

      <form action="" onSubmit={handleLogin} className="space-y-4">
        <input type="text" name="" id=""
        className="w-full border rounded shadow p-2"
        placeholder="Enter your Email"
        onChange={e=>setEmail(e.target.value)}
        required

         />
         <input type="password"
         className="w-full border rounded shadow p-2"
         placeholder="Enter your password"
         onChange={e=>setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-400 text-white text-center p-2 border shadow rounded  ">Login</button>
          <button onClick={()=>navigate("/signup")} className="text-blue-400 text-center ">Have no account?Sign Up</button>

      </form>



    </div>
  )
}