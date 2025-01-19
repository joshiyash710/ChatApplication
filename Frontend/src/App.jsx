import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"
import { setSocket } from './redux/socket.slice.js';
import { setOnlineUsers } from './redux/user.slice.js';
const router = createBrowserRouter([
  {
    path : "/",
    element : <HomePage/>
  },
  {
    path : "/register",
    element : <Signup/>
  },
  {
    path : "/login",
    element : <Login/>
  }
])
function App() {
  const dispatch = useDispatch()
  const {authUser} = useSelector(store=>store.user)
  const {socket} = useSelector(store=>store.socket)
  useEffect(()=>{
    if(authUser){
      const socketio = io('http://localhost:8000',{
        query : {
          userId : authUser?.user?._id
        }
      })
      dispatch(setSocket(socketio))
      socketio?.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      })
      socketio?.on('disconnect',()=>{
        dispatch(setOnlineUsers(null))
      })
      return () => {
        socketio.close()
      }
    }else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
  },[authUser])
  return (
    <div className='p-5 flex items-center justify-center min-w-96 mx-auto'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
