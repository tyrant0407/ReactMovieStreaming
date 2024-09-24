import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadMovie } from "../store/actions/movieActions";
import { useParams, useNavigate, Link, useLocation , Outlet} from "react-router-dom";
import { removeMovie } from '../store/reducers/movieSlice';
import Loader from "./Loader";
import { Star, Clock, Calendar,ArrowLeft, ExternalLink, Globe, DollarSign, Play} from 'lucide-react';
import noimage from "/noimage.jpg";
import HorizontalCards from "./templates/HorizontalCards";

const MovieDetails = () => {
  const {pathname} = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { info } = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => dispatch(removeMovie());
  }, [dispatch, id]);

  return info ? (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
    <button 
      onClick={() => navigate(-1)} 
      className="absolute top-4 left-4 z-10 bg-[#1F1E24] text-gray-100 p-2 rounded-full hover:bg-gray-700 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
    {/* Hero Section */}
    <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] bg">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      <div className="absolute inset-0" style={{
       background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5), rgba(0,0,0,0.8)),
       url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path || info.details.poster_path ? info.details.backdrop_path || info.details.poster_path : noimage})`,
       backgroundPosition: "center",
       backgroundSize: "cover",
       backgroundRepeat: "no-repeat"
    }}  />
      <div className="absolute bottom-0 left-0 p-6 md:p-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{info.details.title || info.details.name || info.details.original_title || info.details.original_name}</h1>
        <div className="flex items-center space-x-4 text-sm md:text-base mb-4">
          <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400" /> {info.details.vote_average || "0"}</span>
          <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {info.details.runtime || "0"} min</span>
          <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {info.details.release_date || "0"}</span>
        </div>
        <div className="flex space-x-4">
          <a href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} className="bg-yellow-500 text-black px-3 py-1 rounded-full flex items-center text-sm font-semibold hover:bg-yellow-400 transition-colors">
            <ExternalLink className="w-4 h-4 mr-1" /> IMDb
          </a>
          <a href={`https://www.wikipedia.org/wiki/${info.details.id}`} className="bg-gray-200 text-black px-3 py-1 rounded-full flex items-center text-sm font-semibold hover:bg-gray-300 transition-colors">
            <ExternalLink className="w-4 h-4 mr-1" /> Wikipedia
          </a>
          <a href={`https://www.${info.details.id}.com`} className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center text-sm font-semibold hover:bg-blue-400 transition-colors">
            <Globe className="w-4 h-4 mr-1" /> Website
          </a>
        </div>
      </div>
    </div>

    {/* Movie Information */}
    <div className="container mx-auto px-4 py-8 bg-[#1F1E24]">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-400 mb-6">
            {info.details.overview}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {info.details.genres.map((genre,index)=>(
                  <span key={index} className="bg-gray-800 px-3 py-1 rounded-full text-sm">{genre.name}</span>
                ))}
              </div>
            </div>
            <div>

            </div>
          </div>
        <Link to={`${pathname}/trailer`} className="text-[#6556CD] bg-white px-4 py-3 rounded-md w-fit mt-3 hover:bg-[#6556CD] hover:text-white duration-200 font-bold uppercase">Watch Trailer</Link>

        </div>
        <div className="md:w-1/3 bg-[#1F1E24] p-2 rounded-lg">
          <div className="bg-[#070707] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Movie Details</h3>
            <ul className="space-y-2">
              <li><strong>Status:</strong> <span className="text-gray-400">Released</span></li>
              <li><strong>Release Date:</strong> <span className="text-gray-400">Oct 22, 2024</span></li>
              <li><strong>Runtime:</strong> <span className="text-gray-400">120 minutes</span></li>
              <li><strong>Budget:</strong> <span className="text-gray-400">$120,000,000</span></li>
              <li><strong>Revenue:</strong> <span className="text-gray-400">$468,513,700</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
     {/* Watch Providers */}
     <div className="bg-[#1F1E24] py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Where to Watch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stream */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Play className="w-5 h-5 mr-2" /> Stream
              </h3>
              <div className="flex flex-wrap gap-4">
                {info.watch_providers?.US?.flatrate?.map((provider, index) => (
                  <div key={index} className="flex items-center bg-[#070707] rounded-full px-4 py-2">
                    <img 
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} 
                      alt={provider.provider_name} 
                      className="w-8 h-8 rounded-full mr-2" 
                    />
                  <Link to={`https://www.${provider.provider_name}.com`} target="_blank">{provider.provider_name}</Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Rent */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" /> Rent
              </h3>
              <div className="flex flex-wrap gap-4">
                {info.watch_providers?.US?.rent?.map((provider, index) => (
                  <div key={index} className="flex items-center bg-[#070707] rounded-full px-4 py-2">
                    <img 
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} 
                      alt={provider.provider_name} 
                      className="w-8 h-8 rounded-full mr-2" 
                    />
                    <Link to={`https://www.${provider.provider_name}.com`} target="_blank">{provider.provider_name}</Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Buy */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" /> Buy
              </h3>
              <div className="flex flex-wrap gap-4">
                {info.watch_providers?.US?.buy?.map((provider, index) => (
                  <div key={index} className="flex items-center bg-[#070707] rounded-full px-4 py-2">
                    <img 
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} 
                      alt={provider.provider_name} 
                      className="w-8 h-8 rounded-full mr-2" 
                    />
                    <Link to={`https://www.${provider.provider_name}.com`} target="_blank">{provider.provider_name}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Recommendations */}
    <div className="container mx-auto px-4 py-8 bg-[#1F1E24]">
      <h2 className="text-2xl font-semibold mb-6">Recommendations</h2>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
    </div>
    <Outlet />
  </div>
  ) : <Loader />
}

export default MovieDetails