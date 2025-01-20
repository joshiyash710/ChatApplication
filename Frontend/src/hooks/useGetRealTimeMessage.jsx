import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/message.slice.js"

const useGetRealTimeMessage = () => {
    const dispatch = useDispatch()
    const { socket } = useSelector(store => store.socket)
    const { messages } = useSelector(store => store.message)

    useEffect(() => {
        if (!socket) return; // Check if socket is defined

        const handleNewMessage = (newMessage) => {
            dispatch(setMessages([...messages, newMessage]))
        };

        socket.on("newMessage", handleNewMessage)

        return () => {
            socket.off("newMessage", handleNewMessage)
        }
    }, [socket, setMessages, messages]) // Add socket to dependencies
}

export default useGetRealTimeMessage
