import PropTypes from 'prop-types';
import noimage from '/noimage.jpg';

const HorizontalCards = ({data}) => {

  return (        
     <div className='w-full flex overflow-x-auto h-[50vh] overflow-y-hidden mb-4' >
        {data && data.map((d,i)=>(
            <div key={i} className="min-w-[15%] ml-[1.2vw] bg-[#00000031] rounded-lg overflow-hidden mb-[0.5vw] " >
                <img className='w-full h-[65%]' src={d.poster_path || d.backdrop_path || d.profile_path ? `https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path || d.profile_path}` : noimage} alt={d.title || d.name || d.original_title || d.original_name} />
          <div className='p-2 text-white h-[35%]' >
          <h1 className='text-xl font-bold' >{d.title || d.name || d.original_title || d.original_name}</h1>
          <p className='text-[#9ca3af] text-[11px]  mt-2' >{d.overview.slice(0,80)} .... <span className='text-blue-500'>More</span> </p>
          </div>
           </div> 
        ))}
     </div>
  )
}

HorizontalCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

export default HorizontalCards
