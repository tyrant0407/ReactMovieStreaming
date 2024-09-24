import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import Loader from '../Loader'; 
import { useEffect ,useState} from 'react';
import { useDispatch } from 'react-redux';
import { asyncLoadMovie } from '../../store/actions/movieActions';
import { removeMovie } from '../../store/reducers/movieSlice';
import { useParams } from 'react-router-dom';

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const { id } = useParams();
  const dispatch = useDispatch();
  const ytvideo = useSelector((state) => state[category]?.info?.videos);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(asyncLoadMovie(id)); // await the promise
        } catch (error) {
          console.error('Error fetching movie data:', error);
        }
      };
      fetchData();
  
      return () => dispatch(removeMovie());
    }, [dispatch, id]);

  return ytvideo ? (
    <div className="bg-[rgba(0,0,0,.9)] h-screen w-screen p-3 pl-[10%]">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[2%] top-[2%]"
      >
      </Link>
      <ReactPlayer 
        className="rounded-lg " 
        height="100%"
        width="90%"
        url={`https://www.youtube.com/watch?v=${ytvideo?.key}`}
      />
    </div>
  ): <Loader/>
};

export default Trailer;
