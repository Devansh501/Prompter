import { useParams } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  })
  const { logger,isLoggedIn } = useAuth();
  const { _id } = useParams()

  useEffect(()=>{
    if(!isLoggedIn){
      setTimeout(()=>{
        toast.error("Not Authenticated")
        navigate('/')
      },100)      
    }
  },[])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post("/posts/getPostByID", {
        _id,
        userId:logger._id
      })
      if (data.error) {
        setTimeout(() => {
          toast.error(data.error)
          navigate('/')
        }, 100)
      }
      setPost({
        prompt: data.post.prompt,
        tag: data.post.tag
      })
    }
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/posts/updatePost", {
        _id,
        post, logger
      })
      if (data.error) {
        toast.error(data.error)
        navigate('/myposts')
      }
      else {
        toast.success(data.message)
        navigate('/myposts')
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value
    })
  }

  return (
    <div className="home p-5">
      <h1 className="text-green-500 text-3xl md:text-6xl font-medium">Edit Prompt</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="rounded-md  py-3 text-green-500">
        <div className="my-3">
          <input required className="bg-[#26282A] text-sm md:text-lg w-full sm:w-4/6 md:w-4/6 lg:w-3/6 h-12 mb-4 outline-none rounded-md px-2 hover:shadow-sm hover:shadow-green-500"
            type="text" name="tag" value={post.tag} onChange={(e) => handleChange(e)} placeholder="Enter Prompt Tags (comma-separated)" />
        </div>
        <div className="my-3">
          <textarea required className="bg-[#26282A] text-sm md:text-lg w-full sm:w-4/6 md:w-4/6 lg:w-3/6 outline-none rounded-md p-2 hover:shadow-sm hover:shadow-green-500"
            rows="12" name="prompt" value={post.prompt} onChange={(e) => handleChange(e)} placeholder="Enter the prompt" />
        </div>
        <button className="rounded-md text-sm md:text-lg w-full sm:w-4/6 md:w-4/6 lg:w-3/6 h-10 mt-3 shadow-sm shadow-green-500 hover:bg-green-500 hover:text-[#26282A] ease-in duration-500"
          type="submit">Update...</button>
      </form>
    </div>
  )
}

export default EditPost