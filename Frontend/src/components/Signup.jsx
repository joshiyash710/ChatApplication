import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const Signup = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })
  const navigate = useNavigate()
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender })
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/register`, user, {
        headers: {
          "Content-Type": 'application/json',
        },
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/login')
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
    console.log(user);
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
  }
  return (
    <div className='flex items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className='label p-2'><span className='text-base label-text'>Full Name</span></label>
            <input value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} className="w-full input input-bordered h-10" type="text" placeholder='Enter your full name' />
          </div>
          <div>
            <label className='label p-2'><span className='text-base label-text'>User Name</span></label>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="w-full input input-bordered h-10" type="text" placeholder='Enter your user name' />
          </div>
          <div>
            <label className='label p-2'><span className='text-base label-text'>Password</span></label>
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="w-full input input-bordered h-10" type="password" placeholder='Enter your password' />
          </div>
          <div>
            <label className='label p-2'><span className='text-base label-text'>Confirm password</span></label>
            <input value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} className="w-full input input-bordered h-10" type="password" placeholder='Enter confirm password' />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center'><p>Male</p> <input type="checkbox" checked={user.gender === 'Male'} defaultChecked onChange={() => handleCheckbox("Male")} className="checkbox mx-2" /></div>
            <div className='flex items-center'><p>Female</p> <input type="checkbox" checked={user.gender === 'Female'} defaultChecked onChange={() => handleCheckbox("Female")} className="checkbox mx-2" /></div>
          </div>
          <div className='my-2'>
            <button type='submit' className='btn-block btn-md mt-2 mb-2 border-slate-700'>Signup</button>
          </div>
          <div className='my-4'>
            <span>Already have an account ?</span><Link to="/login"> Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup