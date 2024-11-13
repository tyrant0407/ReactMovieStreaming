import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";




const Home = () => {
    document.title ="Movie App || Homepage"
    const [heroImage, setheroImage] = useState(null);
    const [trending, setTrending] = useState(null);

    const GetHeaderHeroImage =  async()=>{
    try {
      const {data} = await axios.get(`/trending/all/day`);
      let RadomData = data.results[(Math.random()*data.results.length).toFixed()];
      setheroImage(RadomData);
    } catch (error) {
      console.log(error);
    }
  }
  const GetTrending = async()=>{
    try {
      const {data} = await axios.get(`/trending/all/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    !heroImage && GetHeaderHeroImage();
    !trending && GetTrending();
  }, [])

  return heroImage && trending ? (
    <>
     <SideNav/>
     <div className='w-[80%] h-full bg-[#16141d] overflow-auto overflow-x-hidden' >
      <TopNav/>
      <Header data={heroImage}/>
      <HorizontalCards data={trending}/>
     </div>
    </>
  ):<h1>Loading...</h1> 
}

export default Home;
