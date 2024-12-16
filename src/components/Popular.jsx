import { useNavigate} from "react-router-dom"
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import { useState, useEffect } from "react";
import axios from "../utils/Axios";
import Cards from "./templates/Cards";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [popular, setpopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = `Movie App || Popular ${category.toUpperCase()}`;

    
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
   
        <h1 className="text-white text-3xl font-bold">
        <i 
          onClick={() => navigate(-1)} 
          className="text-3xl text-white hover:text-[#6556CD] hover:font-bold duration-300 ri-arrow-left-s-line cursor-pointer"
        />{""}
        Popular
        </h1>
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
        <Cards data={popular} title={category} /> 
      </InfiniteScroll>
    </div>
  ): <Loader />
}

export default Popular