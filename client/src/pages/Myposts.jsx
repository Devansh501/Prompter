import { useAuth } from "../context/authContext"
import { useEffect, useState } from "react";
import axios from "axios";
import CardList from "../components/CardList";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'

const Myposts = () => {
    const { logger,isLoggedIn } = useAuth();
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [reloader, setReloader] = useState(true)
    const ITEMS_PER_PAGE = 3;
    const navigate = useNavigate();


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
            try {
                const { data } = await axios.post('/posts/getUserPosts', {
                    _id: logger._id
                })
                setData(data.data)
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [reloader])


    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleNav = ()=>{
      navigate("/new")
    }


    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayedData = data.slice(startIndex, endIndex);



    return (
        <div className="overflow-x-hidden home flex flex-col items-center py-5 px-2">
            <h1 className="text-green-500 font-extrabold text-6xl mb-10">My Prompts</h1>
            {data.length > 0 ? 
            <>
             <CardList data={displayedData} setReloader={setReloader}/>
            <div>
                <button
                    className="mr-4 p-4 rounded-md text-xl text-green-500 hover:text-black shadow-sm shadow-green-500 hover:bg-green-500 hover:text-[#26282A] ease-in duration-500"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
                    {"<<"}
                </button>
                <button
                    className="p-4 rounded-md text-xl text-green-500 hover:text-black shadow-sm shadow-green-500 hover:bg-green-500 hover:text-[#26282A] ease-in duration-500"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= data.length}>
                    {">>"}
                </button>
            </div>
            </> 
            :
                <div className="text-lg text-green-500 text-center">
                    No Posts here!
                    <button onClick={handleNav} className="rounded-md text-lg w-3/4 h-10 mt-3 shadow-sm shadow-green-500 hover:bg-green-500 hover:text-[#26282A] ease-in duration-500">Create Prompts</button>
                </div>}
        </div>
    )
}

export default Myposts