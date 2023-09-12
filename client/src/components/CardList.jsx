import Card from "./Card";


const CardList = ({data,setReloader}) => {
  return(
   <div className="p-5 w-full sm:w-4/6 md:5/6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
    {data.map((post,index) =>(
      <Card key={index} setReloader={setReloader} post={post}/>
    ))}
   </div>
  )
}

export default CardList