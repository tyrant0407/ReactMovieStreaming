import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri'; // Import the close icon

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info);

  // Error handling: Check if ytvideo and ytvideo.key are defined
  if (!ytvideo || !ytvideo.key) {
    return (
      <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
        <p>No trailer available.</p> {/* Display a message if no trailer is found */}
      </div>
    );
  }

  return (
    <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        to={pathname.substring(0, pathname.lastIndexOf('/'))}  {/* Navigate to the previous page */}
        className="absolute hover:text-[#6556CD] text-3xl text-white right-[5%] top-[5%]"
      >
        <RiCloseLine /> {/* Use the close icon */}
      </Link>
      <ReactPlayer
        height={800}
        width={1500}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />
    </div>
  );
};

export default Trailer;
