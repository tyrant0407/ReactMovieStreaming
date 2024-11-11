import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import Header from "./templates/Header";




const Home = () => {
    document.title ="Movie App || Homepage"
    const [heroImage, setheroImage] = useState(null);

    const GetHeaderHeroImage =  async()=>{
      const {data} = await axios.get(`/trending/all/day`);
      let RadomData = data.results[(Math.random()*data.results.length).toFixed()];
      setheroImage(RadomData);
  }
  useEffect(() => {
    !heroImage && GetHeaderHeroImage();
  }, [])

  return heroImage ? (
    <>
     <SideNav/>
     <div className='w-[80%] h-full bg-[#16141d] overflow-hidden' >
      <TopNav/>
      <Header data={heroImage}/>
     </div>
    </>
  ):<h1>Loading...</h1> 
}

export default Home;
