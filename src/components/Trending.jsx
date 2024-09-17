import { useNavigate} from "react-router-dom"
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import { useState, useEffect } from "react";
import axios from "../utils/AxiosApi";
import Cards from "./templates/Cards";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title = `Movie App || Trending`;
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetTrending = async()=>{
    try {
      const {data} = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if(data.results.length > 0){
        setTrending((prevState)=>[...prevState,...data.results]);
        setPage(page+1);
      }else{
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const refershHandler = ()=>{
    if(trending.length === 0){
      GetTrending();
    }else{
      setPage(1);
      setTrending([]);
      GetTrending();
    }
  }

  useEffect(() => {
  refershHandler();
  }, [category, duration])

  return trending.length > 0 ? (
    <div className="w-full h-full bg-[#16141d]">
      <div className="flex items-center gap-4 px-[5%] ">
   
        <h1 className="text-white text-3xl font-bold">
        <i 
          onClick={() => navigate(-1)} 
          className="text-3xl text-white hover:text-[#6556CD] hover:font-bold duration-300 ri-arrow-left-s-line cursor-pointer"
        />{""}
        Trending
        </h1>
      <TopNav leftPadding="15%" />
     <Dropdown title="Category" options={["movie","tv","all"]} value={category} func={(e)=> setCategory(e.target.value)} />
      <div className="w-[2%]"></div>
      <Dropdown title="Duration" options={["week","day"]} value={duration} func={(e)=> setDuration(e.target.value)} />
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Cards data={trending} title={category} showDetails={true} /> 
      </InfiniteScroll>
    </div>
  ): <Loader />
} 

export default Trending