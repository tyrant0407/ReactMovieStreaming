import { useNavigate} from "react-router-dom"
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";

const Trending = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-[#16141d] pt-[0.5%] px-[1%]">
      <div className="flex items-center gap-4">
   
        <h1 className="text-white text-3xl font-bold">
        <i 
          onClick={() => navigate(-1)} 
          className="text-3xl text-white hover:text-[#6556CD] hover:font-bold duration-300 ri-arrow-left-s-line cursor-pointer"
        />{""}
        Trending
        </h1>
      <TopNav leftPadding="15%" />
     <Dropdown title="Category" options={["movie","tv","all"]}  />
      <div className="w-[2%]"></div>
      <Dropdown title="Duration" options={["week","day"]}  />
      </div>
    </div>
  )
} 

export default Trending