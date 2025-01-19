import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/user.slice.js'

const OtherUser = ({user}) => {
    const dispatch = useDispatch()
    const {selectedUser,onlineUsers} = useSelector(store=>store.user)
    const isOnline = onlineUsers?.includes(user._id)
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user))
    }
    return (
        <>
            <div onClick={()=>selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'flex gap-2 items-center bg-zinc-600' : ''} flex gap-2 items-center rounded p-2 cursor-pointer`}>

                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePicture} alt="user profile pic" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 text-white'>
                        <p>{user?.fullname}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='divider my-0 py-0 h-1'></div>
            </div>
        </>
    )
}

export default OtherUser