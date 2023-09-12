import { Link } from "react-router-dom"
import { useState } from "react"
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../context/authContext";
import {toast} from 'react-hot-toast'

const Navbar = () => {
  const { isLoggedIn, logger, logout } = useAuth()
  const url = new URL(window.location.href);
  const path = url.pathname;

  const [drop, setDrop] = useState(false);
  const SignOut = () => {
    setDrop(!drop)
    logout()
    toast.success("Logged Out")
  }

  return (
    <div className="nav text-green-500 flex items-center justify-between px-2 shadow-xl">
      <div className="logo text-2xl font-bold">Prompter</div>
      <div className="links flex cursor-pointer">
        {isLoggedIn ? <>
          <div className="md:mx-5 mx-3">
            <div className="text-green-500 flex flex-row items-center" onClick={() => setDrop(!drop)}>
              <span className="mr-1">@{logger.username}</span>
              <CgProfile size={30} />
            </div>
            <div className={`bg-[#3B3B3B] z-10 rounded-md flex-col absolute top-10 right-10 p-3 drop-shadow-xl transition-opacity ease-in-out duration-1000 ${drop ? 'opacity-100' : 'opacity-0 hidden'}`}>

            {path != "/myposts" ? <Link to="/myposts" onClick={() => setDrop(!drop)}>
                <div className="mb-1 font-bold rounded-md hover:bg-green-500 hover:text-black px-2  hover:font-medium transition-font duration-500 ease-in">
                  My Posts
                </div></Link> : null}

              {path != "/new" ? <Link to="/new" onClick={() => setDrop(!drop)}>
                <div className="mb-1 font-bold rounded-md hover:bg-green-500 hover:text-black px-2  hover:font-medium transition-font duration-500 ease-in">
                  New Post
                </div></Link> : null}

              {path != "/liked" ? <Link to="/liked" onClick={() => setDrop(!drop)}>
                <div className="mb-1 font-bold rounded-md hover:bg-green-500 hover:text-black px-2  hover:font-medium transition-font duration-500 ease-in">
                  Liked Posts
                </div></Link> : null}

              {path != "/search" ? <Link to="/search" onClick={() => setDrop(!drop)}>
                <div className="mb-1 font-bold rounded-md hover:bg-green-500 hover:text-black px-2  hover:font-medium transition-font duration-500 ease-in">
                  Search Posts
                </div></Link> : null}     

              <Link to="/" onClick={SignOut}>
                <div className="mb-1 font-bold rounded-md hover:bg-green-500 hover:text-black px-2  hover:font-medium transition-font duration-500 ease-in">
                  Log Out
                </div>
              </Link>

            </div>
          </div>
        </> : <>
          <Link className="md:mx-5 mx-2 text-[18px] rounded-md hover:bg-green-500 hover:text-black px-2 duration-500 ease-in" to="/">Home</Link>
          <Link className="md:mx-5 mx-2 text-[18px] rounded-md hover:bg-green-500 hover:text-black px-2 duration-500 ease-in" to="/register">Register</Link>
        </>}
      </div>
    </div>
  )
}

export default Navbar