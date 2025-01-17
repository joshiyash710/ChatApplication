import React from 'react'
import { IoSend } from "react-icons/io5";
const SendInput = () => {
  return (
   <form action="" className='px-4 my-3'>
    <div className='w-full relative'>
        <input 
        type="text"
        placeholder='Message'
        className='border text-sm rounded-lg block w-full bg-gray-600 text-white p-3 border-zinc-500'
        />
        <button className='absolute flex inset-y-0 end-0 items-center pr-4 bg-gray-600 border-zinc-500'><IoSend /></button>
    </div>
   </form>
  )
}

export default SendInput