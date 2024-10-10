import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className='w-[20%] h-full bg-[#16141d] border-r-2 border-zinc-200 p-5' >
        <h1 className='font-bold text-2xl text-white'>
            <i className='text-[#6556CD] ri-tv-fill mr-2 ml-[-0.5vh]'></i>
           <span className='text-2xl' >Movie App</span>
        </h1>
        <nav className='flex flex-col gap-3' >
        <h1 className='text-white text-lg font-bold mt-5 mb-5 ml-8' >New Feeds</h1>
         <Link to='/' className='text-white text-s font-semibold hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 pl-8' >
         <i className='ri-fire-fill text-[red] mr-2'></i>
         Trending
         </Link>
         <Link to='/' className='text-white text-s font-semibold hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 pl-8' >
         <i className='ri-bard-fill text-[yellow] mr-2'></i>
         Popular
         </Link>
         <Link to='/' className='text-white text-s font-semibold hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 pl-8' >
         <i className='ri-movie-2-fill text-[silver] mr-2'></i>
         Movies
         </Link>
         <Link to='/' className='text-white text-s font-semibold hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 pl-8' >
         <i className='ri-tv-2-fill text-[#70b8c1] mr-2'></i>
         TV Shows
         </Link>
         <Link to='/' className='text-white text-s font-semibold hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 pl-8' >
         <i className='ri-team-fill text-[#d62fba] mr-2'></i>
         People
         </Link>
        </nav>

        <hr className='border-none h-[1px] bg-zinc-400 mt-2' />

        <nav className='flex flex-col gap-2' >
        <h1 className='text-white text-lg font-bold mt-5 mb-5 ml-8' >Website Information</h1>
         <Link to='/' className='text-white text-s font-semibold hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 pl-8' >
         <i className='ri-information-fill text-[white] mr-2'></i>
         About MovieApp
         </Link>
         <Link to='/' className='text-white text-s font-semibold hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 pl-8' >
         <i className='ri-phone-fill text-[white] mr-2'></i>
         Contact Us
         </Link>
    
        </nav>
    </div>
  )
}

export default SideNav