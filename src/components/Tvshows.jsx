import { useEffect, useState } from 'react';
import axios from '../utils/Axios';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './Loader';
import Cards from './templates/Cards';
import TopNav from './templates/TopNav';
import Dropdown from './templates/Dropdown';

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
        <i 
          onClick={() => navigate(-1)} 
          className="text-3xl text-white hover:text-[#6556CD] hover:font-bold duration-300 ri-arrow-left-s-line cursor-pointer"
        />
        <h1>Tv Shows</h1>
       
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