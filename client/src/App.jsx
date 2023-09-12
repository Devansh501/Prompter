import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import Newpost from './pages/Newpost'
import Search from './pages/Search'
import EditPost from './pages/EditPost'
import Myposts from './pages/Myposts'
import LikedPosts from './pages/LikedPosts'
import { FaLinkedinIn } from "react-icons/fa";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true;

function App() {
  const url = new URL("https://www.linkedin.com/in/devansh501/");

  return (
    <>
      <a href={url} target='_blank' rel="noreferrer">
        <div className="text-green-500 z-20 absolute right-10 bottom-10 rounded-full bg-black p-3">
          <FaLinkedinIn size={20} />
        </div>
      </a>
      <Navbar />
      <Toaster position='top-center' toastOptions={{
        duration: 2000, style: {
          background: '#363636',
          color: '#22c55e',
        }
      }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new" element={<Newpost />} />
        <Route path="/search" element={<Search />} />
        <Route path="/myposts" element={<Myposts />} />
        <Route path='/liked' element={<LikedPosts />} />
        <Route path="/edit/:_id" element={<EditPost />} />
      </Routes>
    </>
  )
}

export default App
