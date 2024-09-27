import { useEffect, useState } from 'react';
import axios from '../utils/AxiosApi';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './Loader';
import Cards from './templates/Cards';
import TopNav from './templates/TopNav';
import Dropdown from './templates/Dropdown';
import { ArrowLeft } from 'lucide-react';
const Tvshows = () => {
    document.title = `Movie App || Tv Shows}`;
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tv, setTv] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    
  const GetTvShows = async()=>{
    try {
      const {data} = await axios.get(`/tv/${category}?page=${page}`);
      if(data.results.length > 0){
        setTv((prevState)=>[...prevState,...data.results]);
        setPage(page+1);
      }else{
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const refershHandler = ()=>{
    if(tv.length === 0){
      GetTvShows();
    }else{
      setPage(1);
      setTv([]);
      GetTvShows();
    }
  }

  useEffect(() => {
  refershHandler();
  }, [category])

  return tv.length > 0 ? (
    <div className="w-full h-full bg-[#16141d]">
      <div className="flex items-center gap-4 px-[5%] ">
   
        <div className="text-white text-3xl font-bold flex items-center gap-2 w-[20%]">
        <button 
      onClick={() => navigate(-1)} 
      className="absolute top-4 left-10 z-10 flex items-center gap-2 text-3xl"
      aria-label="Go back"
    >
      <ArrowLeft className="w-10 h-10 bg-[#1F1E24] text-gray-100 p-2 rounded-full hover:bg-gray-700 transition-colors" />
      <span className="text-white text-xl font-bold">Tv Shows</span>
    </button>
       
        </div>
      <TopNav leftPadding="15%" />
     <Dropdown title="Category" options={["airing_today","on_the_air","top_rated","popular"]} value={category} func={(e)=> setCategory(e.target.value)} />
      <div className="w-[2%]"></div>
      </div>
      <InfiniteScroll
        dataLength={tv.length}
        next={GetTvShows}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Cards data={tv} title="tv" showDetails={true} /> 
      </InfiniteScroll>
    </div>
  ): <Loader />
}

export default Tvshows