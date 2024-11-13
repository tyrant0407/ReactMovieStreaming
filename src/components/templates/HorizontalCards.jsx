import PropTypes from 'prop-types'


const HorizontalCards = ({data}) => {

  return (
    <div className='w-full h-[40vh] bg-zinc-900 '>
        <div className="mb-3 ml-2" >
        <h1 className='text-white text-3xl font-semibold' >Trending</h1>
        </div>
      
     <div className='w-full flex overflow-x-auto h-[50vh] overflow-y-hidden' >
        {data && data.map((d,i)=>(
            <div key={i} className="min-w-[15%] h-full mt-10 ml-2" >
                <img className='w-full rounded-lg h-[65%]' src={`https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path || d.profile_path}`} alt={d.title || d.name || d.original_title || d.original_name} />
             <h1 className='text-white text-xl font-bold' >{d.title || d.name || d.original_title || d.original_name}</h1>
        <p className='text-[#9ca3af] text-[11px]  mt-2' >{d.overview.slice(0,100)} .... <span className='text-blue-500'>More</span> </p>
       
           </div>
        ))}
     </div>
    </div>
  )
}

HorizontalCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

export default HorizontalCards
