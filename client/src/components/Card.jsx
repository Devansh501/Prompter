import { AiTwotoneEdit, AiFillDelete,AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { BiSolidCopy } from "react-icons/bi";
import { useAuth } from "../context/authContext"
import axios from "axios";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Card = ({ post,setReloader}) => {
  const { logger } = useAuth();
  const navigate = useNavigate()
  let prompt = post.prompt;
  if (prompt.length > 100) {
    prompt = post.prompt.slice(0, 100);
    prompt = prompt + "...."
  }
  const [liked,setLiked] = useState(false);

  const checkLike = async()=>{
    try{
       const {data} = await axios.post("/posts/isLiked",{
        _id:post._id,
        userId:logger._id
       });
       setLiked(data.liked)
    }
    catch(err){
      console.log(err);
    }
  }
  
  useEffect(()=>{
    checkLike()
  })

  const handleLike = async () =>{
     try{
       const {data} = await axios.post("/posts/likePost",{
        _id:post._id,
        userId:logger._id
       })
       if(data.error){
        toast.error(data.error)
       }
       else{
        toast.success(data.message)
        setLiked(true)
       }
     }
     catch(err){
        console.log(err);
     }
  }

  const handleDislike = async ()=>{
    try{
      const {data} = await axios.post("/posts/unlikePost",{
        _id:post._id,
        userId:logger._id
      })
      if(data.error){
        toast.error(data.error);
      }
      else{
        toast.success(data.message)
        setLiked(false)
      }
    }
    catch(err){
      console.log(err);
    }
  }
  

  const handleCopy = async(text)=>{
    try{
      await navigator.clipboard.writeText(text)
      toast.success("Copied to Clipboard")
    }
    catch(err){
      console.log(err)
    }
  }

  const handleDelete = async()=>{
     try{
        const {data} = await axios.post("/posts/deletePost",{
          user:logger,
          post
        })
        if(data.error){
          toast.error(data.error)
        }
        else{
          toast.success(data.message)
          setReloader(prev=>!prev)
        }
     }
     catch(err){
      console.log(err)
     }
  }
  

  const handleEdit = () =>{
    navigate(`/edit/${post._id}`)
  }

  return (
    <div className="relative p-4 rounded-md text-green-500 shadow-sm shadow-green-500 hover:bg-green-500 hover:text-[#26282A] ease-in duration-500">
      <div className="text-right italic">@{post.creator.username}</div>
      <p className="text-sm mt-2 mb-8 font-medium"> {prompt}</p>
      <p className="text-sm mt-2 font-semibold mb-8">Tags: {post.tag}</p>
      <div className="w-11/12 absolute bottom-2">
        <div className="flex justify-between mt-6 mx-2">
          <div className="flex gap-4"><BiSolidCopy onClick={()=>handleCopy(post.prompt)} size={20} />
            {liked ? <AiFillHeart onClick={handleDislike} size={20} /> : <AiOutlineHeart onClick={handleLike} size={20} />}
          </div>

          {post.creator.username === logger.username ? <div className="flex gap-4">
            <AiTwotoneEdit onClick={handleEdit} size={20} /><AiFillDelete onClick={handleDelete} size={20} />
          </div> :
            <div></div>
          }
        </div>
      </div>

    </div>
  )
}

export default Card