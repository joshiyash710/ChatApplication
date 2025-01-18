import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/message.slice';
const SendInput = () => {
    const [message,setMessage] = useState("")
    const {selectedUser} = useSelector(store=>store.user)
    const dispatch = useDispatch()
    const {messages} = useSelector(store=>store.message)
    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/message/send/${selectedUser?._id}`,{message},{
                headers : {
                    'Content-Type' : 'application/json'
                },
                withCredentials : true
            })
           dispatch(setMessages([...messages,res.data.newMessage]));
            
        } catch (error) {
            console.log(error);
        }
        setMessage("")
    }
  return (
   <form onSubmit = {onSubmitHandler} action="" className='px-4 my-3'>
    <div className='w-full relative'>
        <input 
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        type="text"
        placeholder='Message'
        className='border text-sm rounded-lg block w-full bg-gray-600 text-white p-3 border-zinc-500'
        />
        <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-4 bg-gray-600 border-zinc-500'><IoSend /></button>
    </div>
   </form>
  )
}

export default SendInput