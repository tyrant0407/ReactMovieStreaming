import React, { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/AxiosApi";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loader from "./Loader";

const Home = () => {
    document.title = "Movie App || Homepage"
    const [heroImage, setHeroImage] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setCategory] = useState("all")
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const GetHeaderHeroImage = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            let RandomData = data.results[Math.floor(Math.random() * data.results.length)];
            setHeroImage(RandomData);
        } catch (error) {
            console.log(error);
        }
    }

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`);
            setTrending(data.results);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetTrending();
        !heroImage && GetHeaderHeroImage();
    }, [category, heroImage])

    return heroImage && trending ? (
        <div className="flex h-screen overflow-hidden">
            <SideNav isSideNavOpen={isSideNavOpen} />
            <div className={`flex-1 bg-[#16141d] overflow-auto transition-all duration-300 ease-in-out ${isSideNavOpen ? "ml-64" : "ml-0"}`}>
                <div className="sticky top-0 z-10 bg-[#16141d] shadow-md">
                    <div className="flex items-center w-full px-4 py-4 md:px-6">
                        <button 
                            className="text-white text-2xl flex-shrink-0 focus:outline-none" 
                            onClick={() => setIsSideNavOpen(!isSideNavOpen)}
                        >
                            {isSideNavOpen ? <i className="ri-menu-fold-line" /> : <i className="ri-menu-unfold-line" />}
                        </button>
                        <div className="w-full ml-4">
                            <TopNav />
                        </div>
                    </div>
                </div>

                <Header data={heroImage}/>

                <div className="flex flex-row md:flex-row justify-between items-center p-5 space-y-4 md:space-y-0">
                    <h1 className='text-white text-3xl font-semibold'>Trending</h1>
                    <Dropdown 
                        title="Filter" 
                        options={["movie", "tv", "all"]} 
                        func={(option) => setCategory(option)}
                    />
                </div>

                <HorizontalCards data={trending} />
            </div>
        </div>
    ) : <Loader />
}

export default Home;

