import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import Notfound from '../Notfound'; 
import Loader from '../Loader';
import { useEffect ,useState} from 'react';

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category]?.info?.videos);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Disable scrolling on body
    document.body.style.overflow = 'hidden';

    // Cleanup: Enable scrolling when component is unmounted
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (ytvideo) {
      setLoading(false);
    }
  }, [ytvideo]);

  return loading ? (
    <Loader />
  ) : ytvideo ? (
    <div className="bg-[rgb(0,0,0)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center overflow-hidden">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[2%] top-[2%]"
      >
      </Link>
      <ReactPlayer 
        borderRadius="10px"
        height="100%"
        width="90%"
        url={`https://www.youtube.com/watch?v=${ytvideo?.key}`}
      />
    </div>
  ) : <Notfound />
};

export default Trailer;
