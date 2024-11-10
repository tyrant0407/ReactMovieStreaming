import { Link } from "react-router-dom";

const Header = ({data}) => {
    console.log(data)
  return (
    <div style={{
       background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5), rgba(0,0,0,0.8)),
       url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.poster_path || data.profile_path})`,
       backgroundPosition: "center",
       backgroundSize: "cover"
    }} className='w-full h-[60vh] flex flex-col justify-end p-[5%]'>
        <h1 className='text-white text-5xl font-bold w-[70%]' >{data.title || data.name || data.original_title || data.original_name}</h1>
        <p className='text-[#9ca3af] text-xl w-[70%] mt-3' >{data.overview.slice(0,200)} .... <Link className='text-blue-500'>More</Link> </p>
        <p className='text-white text-xl mt-3 flex items-center gap-2 capitalize' > 
            <i className="text-yellow-500 ri-megaphone-fill"></i> <h1 className='text-xl font-semibold text-[#f6f9ff]' >{data.release_date || data.first_air_date} </h1>
            <i className="text-yellow-500 ri-star-fill"></i> <h1 className='text-xl font-semibold text-[#f6f9ff]' >{data.vote_average} </h1>   
            <i className="text-yellow-500 ri-album-fill "></i> <h1 className='text-xl font-semibold text-[#f6f9ff]' >{data.media_type} </h1>
        </p>
        </div>
  ) 
}

export default Header;