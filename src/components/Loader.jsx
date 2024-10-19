import loading from "/loading.gif"

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-black">
      <img className="w-[10%] h-[10%]" src={loading} alt="loading" />
    </div>
  )
}

export default Loader
