import React, { useState } from 'react'
import { LuUserSearch } from "react-icons/lu";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers , setSelectedUser } from '../redux/user.slice.js';

const SideBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {otherUsers} = useSelector(store=>store.user)
    const [search,setSearch] = useState("")
    const logoutHandler =  async ()=>{
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/logout`)
            navigate('/login')
            toast.success(res.data.message)
            dispatch(setAuthUser(null));
        } catch (error) {
            console.log(error);   
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault()
        const conversationUser = otherUsers?.find((user)=>user?.fullname.toLowerCase().includes(search.toLowerCase()))
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]))
        }else{
            toast.error("User not found !!!")
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler} className='flex items-center gap-2'>
                <input 
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered rounded-md bg-slate-700'
                    type="text"
                    placeholder='Search....'
                />
                <button type='submit' className='btn  bg-slate-700 text-white'>
                    <LuUserSearch className='w-6 h-6 outline-none' />
                </button>
            </form>

            <div className="divider px-3"></div>
           
            <OtherUsers />
           
            <div className='mt-2'>
                <button onClick={logoutHandler} className='btn btn-sm text-white bg-slate-700'>Logout</button>
            </div>

        </div>
    )
}

export default SideBar