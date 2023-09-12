import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { toast } from 'react-hot-toast'
import axios from "axios"


const Newpost = () => {
  const navigate = useNavigate()
  const {logger,isLoggedIn} = useAuth();
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  })

  useEffect(()=>{
    if(!isLoggedIn){
      setTimeout(()=>{
        toast.error("Not Authenticated")
        navigate('/')
      },100)      
    }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
       const {data} = await axios.post('/posts/create',{
         user:logger,
         post
       })
       toast.success(data.message)
       navigate('/search')
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="home p-5">
      <h1 className="text-green-500 text-3xl md:text-6xl font-medium">Create New Prompt</h1>
      <form onSubmit={handleSubmit} className="rounded-md  py-3 text-green-500">
        <div className="my-3">
          <input required className="bg-[#26282A] text-sm md:text-lg w-full sm:w-4/6 md:w-4/6 lg:w-3/6 h-12 mb-4 outline-none rounded-md px-2 hover:shadow-sm hover:shadow-green-500"
            type="text" name="tag" value={post.tag} onChange={(e) => handleChange(e)} placeholder="Enter Prompt Tags (comma-separated)" />
        </div>
        <div className="my-3">
          <textarea required className="bg-[#26282A] text-sm md:text-lg w-full sm:w-4/6 md:w-4/6 lg:w-3/6 outline-none rounded-md p-2 hover:shadow-sm hover:shadow-green-500"
            rows="12" name="prompt" value={post.prompt} onChange={(e) => handleChange(e)} placeholder="Enter the prompt" />
        </div>
        <button className="rounded-md text-sm md:text-lg w-full sm:w-4/6 md:w-4/6 lg:w-3/6 h-10 mt-3 shadow-sm shadow-green-500 hover:bg-green-500 hover:text-[#26282A] ease-in duration-500"
          type="submit">Create...</button>
      </form>
    </div>
  )
}

export default Newpost