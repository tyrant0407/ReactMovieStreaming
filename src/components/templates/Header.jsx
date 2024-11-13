import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Header = ({data}) => {

  return (
    <div style={{
       background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5), rgba(0,0,0,0.8)),
       url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.poster_path || data.profile_path})`,
       backgroundPosition: "center",
       backgroundSize: "cover",
       backgroundRepeat: "no-repeat"
    }} className='w-full h-[60vh] flex flex-col justify-end p-[5%]'>
        <h1 className='text-white text-5xl font-bold w-[70%]' >{data.title || data.name || data.original_title || data.original_name}</h1>
        <p className='text-[#9ca3af] text-xl w-[70%] mt-3' >{data.overview.slice(0,200)} .... <Link className='text-blue-500'>More</Link> </p>
        <div className='text-white text-xl mt-3 flex items-center gap-2 capitalize'> 
            <i className="text-yellow-500 ri-megaphone-fill"></i> 
            <span className='text-xl font-semibold'>{data.release_date || data.first_air_date || "No Information"}</span>
            <i className="ml-5 text-yellow-500 ri-star-fill"></i> 
            <span className='text-xl font-semibold'>{data.vote_average || "0"}</span>   
            <i className="ml-5 text-yellow-500 ri-album-fill"></i> 
            <span className='text-xl font-semibold uppercase'>{data.media_type || "Nothing"}</span>
        </div>
            <Link className="text-[#6556CD] bg-white px-4 py-3 rounded-md w-fit mt-3 hover:bg-[#6556CD] hover:text-white duration-200 font-bold uppercase">Watch Trailer</Link>
        </div>
  ) 
}

Header.propTypes = {
    data: PropTypes.shape({
        backdrop_path: PropTypes.string,
        poster_path: PropTypes.string,
        profile_path: PropTypes.string,
        title: PropTypes.string,
        name: PropTypes.string,
        original_title: PropTypes.string,
        original_name: PropTypes.string,
        overview: PropTypes.string,
        release_date: PropTypes.string,
        first_air_date: PropTypes.string,
        vote_average: PropTypes.number,
        media_type: PropTypes.string
    }).isRequired
};

export default Header;