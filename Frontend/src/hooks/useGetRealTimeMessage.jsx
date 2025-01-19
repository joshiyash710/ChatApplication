import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/message.slice.js"

const useGetRealTimeMessage = () => {
    const dispatch = useDispatch()
    const {socket} = useSelector(store=>store.socket)
    const {messages} = useSelector(store=>store.message)
    useEffect(()=>{
        socket.on("newMessage",(newMessage)=>{
            dispatch(setMessages([...messages,newMessage]))
        })
        return () => socket?.off("newMessage")
    },[setMessages,messages])
}
export default useGetRealTimeMessage