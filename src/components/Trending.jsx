import { useNavigate} from "react-router-dom"
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import { useState, useEffect } from "react";
import axios from "../utils/Axios";
import Cards from "./templates/Cards";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState(null)

  const GetTrending = async()=>{
    try {
      const {data} = await axios.get(`/trending/${category}/${duration}`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GetTrending();
  }, [category, duration])
  return (
    <div className="w-full h-full bg-[#16141d] pt-[0.5%] px-[1%]">
      <div className="flex items-center gap-4">
   
        <h1 className="text-white text-3xl font-bold">
        <i 
          onClick={() => navigate(-1)} 
          className="text-3xl text-white hover:text-[#6556CD] hover:font-bold duration-300 ri-arrow-left-s-line cursor-pointer"
        />{""}
        Trending
        </h1>
      <TopNav leftPadding="15%" />
     <Dropdown title="Category" options={["movie","tv","all"]} value={category} onChange={(e)=> setCategory(e.target.value)} />
      <div className="w-[2%]"></div>
      <Dropdown title="Duration" options={["week","day"]} value={duration} onChange={(e)=> setDuration(e.target.value)} />
      </div>
      <Cards trending={trending} />
    </div>
  )
} 

export default Trending