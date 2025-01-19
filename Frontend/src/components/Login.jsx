import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setAuthUser } from '../redux/user.slice'

const Login = () => {
    const [user, setUser] = useState({

        username: "",
        password: "",


    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/login`, user, {
                header : {
                    'Content-Type' : 'application/json'
                },
                withCredentials : true
            })
            if(res?.data?.success){
                toast.success( res?.data?.message)
                navigate('/')
                dispatch(setAuthUser( res?.data))
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error);
            
        }
        console.log(user);
        setUser({

            username: "",
            password: "",

        })
    }
    return (
        <div className='flex items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center'>Login</h1>
                <form onSubmit={onSubmitHandler}>

                    <div>
                        <label className='label p-2'><span className='text-base label-text'>User Name</span></label>
                        <input value = {user.username} onChange={(e)=>setUser({...user,username:e.target.value})} className="w-full input input-bordered h-10" type="text" placeholder='Enter your user name' />
                    </div>
                    <div>
                        <label className='label p-2'><span className='text-base label-text'>Password</span></label>
                        <input value = {user.password} onChange={(e)=>setUser({...user,password:e.target.value})} className="w-full input input-bordered h-10" type="password" placeholder='Enter your password' />
                    </div>


                    <div className='my-2'>
                        <button type='submit' className='btn-block btn-md mt-2 mb-2 border-slate-700 bg-slate-700 text-white rounded-lg'>Login</button>
                    </div>
                    <div className='my-4'>
                        <span>Don't have an account ?</span><Link to="/register" className='text-blue-700'> Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login