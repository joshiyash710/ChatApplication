import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/user.slice'

const MessageContainer = () => {
    const {selectedUser,authUser,onlineUsers} = useSelector(store=>store.user)
    const dispatch = useDispatch()
    const isOnline = onlineUsers?.includes(selectedUser?._id)
    return (
       <>
       {
        selectedUser !== null ? (
            <div className='md:min-w-[550px] flex flex-col'>
            <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>

                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={selectedUser?.profilePicture} alt="user profile pic" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p>{selectedUser?.fullname}</p>
                    </div>
                </div>
            </div>
            <Messages/>
            <SendInput/>
        </div>
        ) : (
            <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.user?.fullname}</h1>
                <h1 className='text-2xl text-white'>Start Conversation.....</h1>
            </div>
        )
       }
       </>
    )
}

export default MessageContainer