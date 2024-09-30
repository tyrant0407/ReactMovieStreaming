import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadPerson } from "../store/actions/personActions";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { removePerson } from '../store/reducers/personSlice';
import Loader from "./Loader";
import noimage from "/noimage.jpg";
import { ArrowLeft } from 'lucide-react';

const PersonDetails = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { info } = useSelector(state => state.person);

  useEffect(() => {
    dispatch(asyncLoadPerson(id));
    return () => dispatch(removePerson());
  }, [dispatch, id]);

  return info ? (
    <div className="px-2 sm:px-4 md:px-8 lg:px-16 py-4 sm:py-8 min-h-screen w-full bg-[#1F1F1F] text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-8 mb-8 sm:mb-12 relative pt-12 sm:pt-0">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 bg-[#1F1E24] text-gray-100 p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Profile Image */}
        <div className="w-full md:w-1/4 max-w-[300px] mx-auto md:mx-0">
          <img 
            src={info.details.profile_path 
              ? `https://image.tmdb.org/t/p/w500${info.details.profile_path}`
              : noimage
            }
            alt={info.details.name}
            className="w-full rounded-lg shadow-xl object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-3/4 bg-[#1F1F1F] mt-4 md:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
            {info.details.name}
          </h1>
          
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {info.details.birthday && (
              <div className="text-center md:text-left">
                <h3 className="text-gray-400 text-xs sm:text-sm">Birthday</h3>
                <p className="text-sm sm:text-base">{new Date(info.details.birthday).toLocaleDateString()}</p>
              </div>
            )}
            {info.details.place_of_birth && (
              <div className="text-center md:text-left">
                <h3 className="text-gray-400 text-xs sm:text-sm">Place of Birth</h3>
                <p className="text-sm sm:text-base">{info.details.place_of_birth}</p>
              </div>
            )}
            <div className="text-center md:text-left">
              <h3 className="text-gray-400 text-xs sm:text-sm">Known For</h3>
              <p className="text-sm sm:text-base">{info.details.known_for_department}</p>
            </div>
          </div>

          {/* Biography */}
          {info.details.biography && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-center md:text-left">Biography</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {info.details.biography || "No biography available."}
              </p>
            </div>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8">
            {info.externalid.imdb_id && (
              <a 
                href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F5C518] text-black px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md hover:opacity-90 transition"
              >
                IMDb
              </a>
            )}
            {info.externalid.facebook_id && (
              <a 
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F5C518] text-black px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md hover:opacity-90 transition"
              >
                Facebook
              </a>
            )}
            {info.externalid.instagram_id && (
              <a 
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F5C518] text-black px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-md hover:opacity-90 transition"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Movies Section */}
      {info.movieCredits.cast.length > 0 && (
        <div className="mb-8 sm:mb-12 bg-[#1F1F1F]">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center md:text-left">
            Movie Appearances
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 bg-[#1F1F1F]">
            {info.movieCredits.cast.map((movie) => (
              <Link 
                to={`/movie/details/${movie.id}`}
                key={movie.id}
                className="transition transform hover:scale-105"
              >
                <div className="bg-[#2A2A2A] rounded-lg overflow-hidden">
                  <img 
                    src={movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : noimage
                    }
                    alt={movie.title}
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-1">
                      as {movie.character}
                    </p>
                    {movie.release_date && (
                      <p className="text-gray-400 text-xs sm:text-sm mt-1">
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* TV Shows Section */}
      {info.tvCredits.cast.length > 0 && (
        <div className="mb-8 sm:mb-12 bg-[#1F1F1F]">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center md:text-left">
            TV Show Appearances
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {info.tvCredits.cast.map((show) => (
              <Link 
                to={`/tv/details/${show.id}`}
                key={show.id}
                className="transition transform hover:scale-105"
              >
                <div className="bg-[#2A2A2A] rounded-lg overflow-hidden">
                  <img 
                    src={show.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                      : noimage
                    }
                    alt={show.name}
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 line-clamp-1">
                      {show.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-1">
                      as {show.character}
                    </p>
                    {show.first_air_date && (
                      <p className="text-gray-400 text-xs sm:text-sm mt-1">
                        {new Date(show.first_air_date).getFullYear()}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default PersonDetails;
