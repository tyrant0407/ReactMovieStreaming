import notfound from '/404.gif';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Notfound = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black'>
         <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[2%] top-[2%]"
      >
      </Link>
        <img src={notfound} alt='notfound' className='w-[90vw] h-[90vh]' />
    </div>
  )
}

export default Notfound;