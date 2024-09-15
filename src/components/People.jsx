import { useEffect, useState } from 'react';
import axios from '../utils/Axios';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './Loader';
import Cards from './templates/Cards';
import TopNav from './templates/TopNav';
import Dropdown from './templates/Dropdown';

const People = () => {
    document.title = `Movie App || People}`;
    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    
  const GetPeople = async()=>{
    try {
      const {data} = await axios.get(`/person/${category}?page=${page}`);
      if(data.results.length > 0){
        setPeople((prevState)=>[...prevState,...data.results]);
        setPage(page+1);
      }else{
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const refershHandler = ()=>{
    if(people.length === 0){
      GetPeople();
    }else{
      setPage(1);
      setPeople([]);
      GetPeople();
    }
  }

  useEffect(() => {
  refershHandler();
  }, [category])

  return people.length > 0 ? (
    <div className="w-full h-full bg-[#16141d]">
      <div className="flex items-center gap-4 px-[5%] ">
   
        <div className="text-white text-3xl font-bold flex items-center gap-2 w-[20%]">
        <i 
          onClick={() => navigate(-1)} 
          className="text-3xl text-white hover:text-[#6556CD] hover:font-bold duration-300 ri-arrow-left-s-line cursor-pointer"
        />
        <h1>People</h1>
       
        </div>
      <TopNav leftPadding="15%" />
     <Dropdown title="Category" options={["popular"]} value={category} func={(e)=> setCategory(e.target.value)} />
      <div className="w-[2%]"></div>
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={GetPeople}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Cards data={people} title="person" showDetails={false} /> 
      </InfiniteScroll>
    </div>
  ): <Loader />
}

export default People
