import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form"
import axios from "axios"
import getBaseUrl from "../utils/baseURL";
import { useAuth } from "../context/AuthContext"; // Ensure correct import
import {jwtDecode} from "jwt-decode"; // Correct default import

const Admin = () => {

    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const { setCurrentUser, setUserRole } = useAuth() 

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = async (data) => {
        try {
            const response =  await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const auth = response.data
            console.log(auth)
            if (auth.token) {
                localStorage.setItem('token', auth.token)
                // Decode token to get user info
                const decodedToken = jwtDecode(auth.token); // Use jwtDecode as default
                // Update AuthContext
                setCurrentUser({ uid: decodedToken.id, email: decodedToken.username });
                setUserRole(decodedToken.role);
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Token has expired! Please login again')
                    navigate("/admin")
                },3600 * 1000);
            }
            alert("Admin login successful")
            navigate("/dashboard")
        } catch (error) {
            setMessage('Please enter valid email and password')
            console.log(error)
        }
    }

  return (

    <div className='h-screen flex justify-center items-center'>
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                    <input 
                    {...register("username", { required: true })}
                    type="text" name="username" id="username" placeholder="Username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input 
                    {...register("password", { required: true })}
                    type="password" name="password" id="password" placeholder="Password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                {
                    message && <p className="text-red-500 text-xs italic mb-3">Please enter valid username and password</p>
                }
                <div className="">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold 
                    py-2 px-8 rounded focus:outline-none">Login</button>
                </div>
            </form>
            <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Admin