import PropTypes from 'prop-types';
import noimage from '/noimage.jpg';
import { Link } from 'react-router-dom';

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full flex overflow-x-auto h-[50vh] overflow-y-hidden mb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[60%] sm:min-w-[30%] md:min-w-[20%] lg:min-w-[15%] ml-[4%] sm:ml-[1.2vw] bg-[#00000071] rounded-lg overflow-hidden mb-[4%] sm:mb-[0.5vw] shadow-md"
          >
            <img
              className="w-full h-[60%] sm:h-[65%] object-cover"
              src={
                d.poster_path || d.backdrop_path || d.profile_path
                  ? `https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path || d.profile_path}`
                  : noimage
              }
              alt={d.title || d.name || d.original_title || d.original_name}
            />
            <div className="p-2 text-white h-[40%] sm:h-[35%]">
              <h1 className="text-sm sm:text-lg md:text-xl font-bold">
                {d.title || d.name || d.original_title || d.original_name}
              </h1>
              <p className="text-[#9ca3af] text-[9px] sm:text-[11px] mt-1 sm:mt-2">
                {d.overview.slice(0, 80)} ....{' '}
                <span className="text-blue-500">More</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-white text-lg sm:text-3xl font-bold text-center w-full">
          NOTHING TO SHOW
        </h1>
      )}
    </div>
  );
};

HorizontalCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default HorizontalCards;
