import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Home = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth()
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const guestMail = "guest@mail.com"
  const guestPassword = "123456"

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(
      {
        ...data,
        [name]: value
      }
    )
  }

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/login', {
        email, password
      })
      if (data.error) {
        toast.error(data.error)
      }
      else {
        toast.success(data.message)
        localStorage.setItem("token", data.token);
        login(data.user)
        navigate('/search')
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleGuest = async () => {
    try {
      const { data } = await axios.post('/login', {
        email:guestMail,password:guestPassword
      })
      if (data.error) {
        console.error(data.error)
      }
      else {
        toast.success(data.message)
        localStorage.setItem("token", data.token);
        login(data.user)
        navigate('/search')
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isLoggedIn && localStorage.token) {
      navigate('/search')
    }
  }, [])


  return (
    <div className="flex flex-col items-center py-5 px-2 home">
      <h1 className="text-green-500 font-extrabold text-6xl">Prompter</h1>
      <p className="text-white text-lg font-medium mt-8 text-justify sm:w-2/3 md:w-3/5 lg:w-1/3">
        Search, Create and Discover among a vast directory of
        A.I. prompts to boost your productivity. Start now by registering to create your first prompt.
      </p>

      <div className="flex-col items-center text-center w-5/6 sm:w-3/6 md:w-2/6">
        <h1 className="text-green-500 text-3xl mb-2 pt-8"> Login </h1>
        <div className="">
          <form onSubmit={loginUser} className="py-3 text-green-500">
            <div className="my-3">
              <input className="bg-[#26282A] text-xl w-5/6 h-12 outline-none rounded-md px-2 hover:shadow-sm hover:shadow-green-500"
                type="email" name="email" placeholder="Email"
                value={data.email} onChange={(e) => handleChange(e)} />
            </div>
            <div className="my-3">
              <input className="bg-[#26282A] text-xl w-5/6 h-12 outline-none rounded-md px-2 hover:shadow-sm hover:shadow-green-500"
                type="password" name="password" placeholder="Password" value={data.password} onChange={(e) => handleChange(e)} />
            </div>
            <button className="rounded-md text-lg w-3/4 h-10 mt-3 shadow-sm shadow-green-500 hover:bg-green-500 hover:text-[#26282A] ease-in duration-500"
              type="submit">Login</button>
            <button type="button" onClick={handleGuest} className="rounded-md text-lg w-3/4 h-10 mt-3 shadow-sm shadow-green-500 hover:bg-green-500 hover:text-[#26282A] ease-in duration-500">
             Guest Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home