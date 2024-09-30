import { useNavigate } from "react-router-dom"
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import { useState, useEffect } from "react";
import axios from "../utils/AxiosApi";
import Cards from "./templates/Cards";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowLeft } from 'lucide-react';

const Trending = () => {
  document.title = `Movie App || Trending`;
  const navigate = useNavigate();
  const [category, setCategory] = useState("all")
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const refreshHandler = () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setPage(1);
      setTrending([]);
      GetTrending();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category, duration])

  return trending.length > 0 ? (
    <div className="w-full min-h-screen bg-[#16141d]">
      <div className="sticky top-0 z-10 bg-[#16141d] pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-[5%] pt-4 sm:pt-6">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 text-xl sm:text-3xl mb-4 sm:mb-0"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1F1E24] text-gray-100 p-2 rounded-full hover:bg-gray-700 transition-colors" />
                        <span className="text-white font-bold mr-5">Trending</span>
                    </button>
                        <TopNav leftPadding="2%" className="flex-grow sm:flex-grow-0" />
                    <div className="flex items-center gap-4 w-full sm:w-auto pl-3">
                    <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <Dropdown 
              title="Category" 
              options={["movie","tv","all"]} 
              value={category} 
              func={(e) => setCategory(e.target.value)} 
            />
          </div>
          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <Dropdown 
              title="Duration" 
              options={["week","day"]} 
              value={duration} 
              func={(e) => setDuration(e.target.value)} 
            />
          </div>

                    </div>
                </div>
            </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<Loader />}
        className="mt-4 sm:mt-8"
      >
        <Cards data={trending} title={category} showDetails={true} /> 
      </InfiniteScroll>
    </div>
  ) : <Loader />
} 

export default Trending;

