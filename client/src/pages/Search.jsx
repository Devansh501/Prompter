import { useState, useEffect } from "react"
import axios from "axios"
import CardList from "../components/CardList";
import { useAuth } from "../context/authContext"
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom"


const Search = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState("")
    const [queryData, setQueryData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [reloader, setReloader] = useState(true)
    const ITEMS_PER_PAGE = 3;

    const navigate = useNavigate()
   const {isLoggedIn} = useAuth();

    useEffect(()=>{
        if(!isLoggedIn){
          setTimeout(()=>{
            toast.error("Not Authenticated")
            navigate('/')
          },100)      
        }
      },[])

    //Initial Fetch of all Prompts
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/posts/getAllPosts');
            setAllPosts(data)
            setQueryData(data)
        }
        fetchData()
    }, [reloader])

    //Runs every time search changes to change the queryData
    useEffect(() => {
        const temp = allPosts.filter(item => {
            return (
                item.tag.toLowerCase().includes(searchText.toLowerCase()) ||
                item.prompt.toLowerCase().includes(searchText.toLowerCase())
            )
        })
        setQueryData(temp)
        setCurrentPage(1);
    }, [searchText, allPosts])

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayedData = queryData.slice(startIndex, endIndex);

   
    return (
        <div className="overflow-x-hidden home flex flex-col items-center py-5 px-2 ">
            <h1 className="text-green-500 font-extrabold text-6xl mb-10">Search...</h1>
            <form onSubmit={(e) => e.preventDefault()} className="text-green-500 mb-10 w-full flex justify-center">
                <input
                    placeholder="Enter tags or relevant keywords" onChange={(e) => setSearchText(e.target.value)}
                    className="bg-[#26282A] text-sm md:text-lg w-full sm:w-4/6 md:w-3/6 h-12 outline-none rounded-md px-2 shadow-sm shadow-green-600 hover:shadow-sm hover:shadow-green-400"
                />
            </form>

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
                    disabled={endIndex >= queryData.length}>
                    {">>"}
                </button>
            </div>
        </div>
    )
}

export default Search