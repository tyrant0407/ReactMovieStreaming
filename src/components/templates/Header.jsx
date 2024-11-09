

const Header = ({data}) => {
    console.log(data)
  return (
    <div style={{
       background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5), rgba(0,0,0,0.8)),
       url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.poster_path || data.profile_path})`,
       backgroundPosition: "center",
       backgroundSize: "cover"
    }} className='w-full h-[60vh] flex flex-col justify-end p-[5%]'>
        <h1 className='text-white text-5xl font-bold w-[70%]' >{data.title || data.name || data.original_title || data.original_name}</h1>
        <p className='text-white text-xl w-[70%]' >{data.overview}</p>
        </div>
  ) 
}

export default Header;