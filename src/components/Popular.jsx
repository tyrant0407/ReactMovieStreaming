import { useNavigate} from "react-router-dom"
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import { useState, useEffect } from "react";
import axios from "../utils/AxiosApi";
import Cards from "./templates/Cards";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft } from 'lucide-react';

const Popular = () => {
    document.title = `Movie App || Popular}`;
    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [popular, setpopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    
  const GetPopular = async()=>{
    try {
      const {data} = await axios.get(`${category}/popular?page=${page}`);
      if(data.results.length > 0){
        setpopular((prevState)=>[...prevState,...data.results]);
        setPage(page+1);
      }else{
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const refershHandler = ()=>{
    if(popular.length === 0){
      GetPopular();
    }else{
      setPage(1);
      setpopular([]);
      GetPopular();
    }
  }

  useEffect(() => {
  refershHandler();
  }, [category])

  return popular.length > 0 ? (
    <div className="w-full h-full bg-[#16141d]">
      <div className="flex items-center gap-4 px-[5%] ">
   
      <button 
      onClick={() => navigate(-1)} 
      className="absolute top-4 left-10 z-10 flex items-center gap-2 text-3xl"
      aria-label="Go back"
    >
      <ArrowLeft className="w-10 h-10 bg-[#1F1E24] text-gray-100 p-2 rounded-full hover:bg-gray-700 transition-colors" />
      <span className="text-white text-xl font-bold">Popular</span>
    </button>
      <TopNav leftPadding="15%" />
     <Dropdown title="Category" options={["tv","movie"]} value={category} func={(e)=> setCategory(e.target.value)} />
      <div className="w-[2%]"></div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Cards data={popular} title={category} showDetails={true} /> 
      </InfiniteScroll>
    </div>
  ): <Loader />
}

export default Popular