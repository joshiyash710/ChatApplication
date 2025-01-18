import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/message.slice'

const useGetMessages =  () => {
    const {selectedUser} = useSelector(store=>store.user)
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchMessages = async () => {
        try {
            axios.defaults.withCredentials = true
            const res = await axios.get(`http://localhost:8000/api/v1/message/get/${selectedUser?._id}`)
            
            
            dispatch(setMessages(res?.data))
        } catch (error) {
            console.log(error);
        } 
    }
    fetchMessages()
  },[selectedUser?._id,setMessages])
}

export default useGetMessages