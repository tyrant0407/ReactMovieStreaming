'use client'

import { useNavigate } from "react-router-dom"
import TopNav from "./templates/TopNav"
import Dropdown from "./templates/Dropdown"
import { useState, useEffect } from "react"
import axios from "../utils/AxiosApi"
import Cards from "./templates/Cards"
import Loader from "./Loader"
import InfiniteScroll from "react-infinite-scroll-component"
import { ArrowLeft } from 'lucide-react'

const Popular = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("movie")
    const [popular, setPopular] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        document.title = `Movie App || Popular`
    }, [])

    const getPopular = async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${page}`)
            if (data.results.length > 0) {
                setPopular((prevState) => [...prevState, ...data.results])
                setPage(page + 1)
            } else {
                setHasMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const refreshHandler = () => {
        setPage(1)
        setPopular([])
        getPopular()
    }

    useEffect(() => {
        refreshHandler()
    }, [category])

    return (
        <div className="w-full min-h-screen bg-[#16141d]">
            <div className="sticky top-0 z-10 bg-[#16141d] pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-[5%] pt-4 sm:pt-6">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 text-xl sm:text-3xl mb-4 sm:mb-0"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1F1E24] text-gray-100 p-2 rounded-full hover:bg-gray-700 transition-colors" />
                        <span className="text-white font-bold mr-5">Popular</span>
                    </button>
                        <TopNav leftPadding="2%" className="flex-grow sm:flex-grow-0" />
                    <div className="flex items-center gap-4 w-full sm:w-auto pl-3">
                        <Dropdown 
                            title="Category" 
                            options={["tv","movie"]} 
                            value={category} 
                            func={(e) => setCategory(e.target.value)}
                            className="w-full sm:w-auto"
                        />

                    </div>
                </div>
            </div>
            {popular.length > 0 ? (
                <InfiniteScroll
                    dataLength={popular.length}
                    next={getPopular}
                    hasMore={hasMore}
                    loader={<Loader />}
                    
                >
                    <Cards data={popular} title={category} showDetails={true} /> 
                </InfiniteScroll>
            ) : (
                <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                    <Loader />
                </div>
            )}
        </div>
    )
}

export default Popular

