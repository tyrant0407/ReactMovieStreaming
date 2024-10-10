import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";


const Home = () => {
    document.title ="Movie App || Homepage"
  return (
    <>
     <SideNav/>
     <div className='w-[80%] h-full bg-[#16141d]' >
      <TopNav/>
     </div>
    </>
  )
}

export default Home;
