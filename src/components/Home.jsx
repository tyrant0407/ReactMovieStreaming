import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";




const Home = () => {
    document.title ="Movie App || Homepage"
    const [heroImage, setheroImage] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setcategory] = useState("all")

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
      const {data} = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
     GetTrending();
    !heroImage && GetHeaderHeroImage();
  }, [category])

  return heroImage && trending ? (
    <>
     <SideNav/>
     <div className='w-[80%] h-full bg-[#16141d] overflow-auto overflow-x-hidden' >
      <TopNav/>
      <Header data={heroImage}/>

      <div className="flex justify-between items-center p-5" >
        <h1 className='text-white text-3xl font-semibold' >Trending</h1>
        <Dropdown title="Filter" options={["movie","tv","all"]} func={(e)=>setcategory(e.target.value)} />
        </div>

      <HorizontalCards data={trending}  />
     </div>
    </>
  ):<h1>Loading...</h1> 
}

export default Home;
