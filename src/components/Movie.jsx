import { useNavigate} from "react-router-dom"
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import { useState, useEffect } from "react";
import axios from "../utils/Axios";
import Cards from "./templates/Cards";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
    document.title = `Movie App || Movies`;
    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    
  const GetMovie = async()=>{
    try {
      const {data} = await axios.get(`/movie/${category}?page=${page}`);
      if(data.results.length > 0){
        setMovie((prevState)=>[...prevState,...data.results]);
        setPage(page+1);
      }else{
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const refershHandler = ()=>{
    if(movie.length === 0){
      GetMovie();
    }else{
      setPage(1);
      setMovie([]);
      GetMovie();
    }
  }

  useEffect(() => {
  refershHandler();
  }, [category])

  return movie.length > 0 ? (
    <div className="w-full h-full bg-[#16141d]">
      <div className="flex items-center gap-4 px-[5%] ">
   
        <h1 className="text-white text-3xl font-bold">
        <i 
          onClick={() => navigate(-1)} 
          className="text-3xl text-white hover:text-[#6556CD] hover:font-bold duration-250 ri-arrow-left-s-line cursor-pointer"
        />{""}
        Movies 
        </h1>
      <TopNav leftPadding="15%" />
     <Dropdown title="Category" options={["now_playing","upcoming","top_rated","popular"]} value={category} func={(e)=> setCategory(e.target.value)} />
      <div className="w-[2%]"></div>
      </div>
      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Cards data={movie} title="movie" showDetails={true} /> 
      </InfiniteScroll>
    </div>
  ): <Loader />
}

export default Movie
