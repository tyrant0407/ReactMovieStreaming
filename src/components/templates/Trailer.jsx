import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

const Trailer = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info);
  console.log(ytvideo.videos);
  return (
  <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex
  items-center justify-center">
  <Link
  onClick={() => navigate(-1)}
  className="absolute hover: text-[#6556CD] ri-c text-3x1 Itext-white right-[5%] top-[5%]"
  ></Link>
  <ReactPlayer
  height={800}
  width={1500}
  url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
  />
  </div>
  )
}

export default Trailer
