import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
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
  return (
    <div className='p-5 flex items-center justify-center min-w-96 mx-auto'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
