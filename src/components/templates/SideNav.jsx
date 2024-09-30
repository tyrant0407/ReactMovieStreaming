import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = ({ isSideNavOpen }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-[#16141d] border-r-2 border-zinc-700 p-5 overflow-y-auto transition-transform duration-300 ease-in-out ${isSideNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <h1 className='font-bold text-2xl text-white mb-8'>
            <i className='text-[#6556CD] ri-tv-fill mr-2'></i>
            <span>Movie App</span>
        </h1>
        <nav className='flex flex-col gap-2'>
            <h2 className='text-white text-lg font-bold mt-5 mb-3 ml-2'>New Feeds</h2>
            {[
                { to: '/trending', icon: 'ri-fire-fill', color: 'text-red-500', label: 'Trending' },
                { to: '/popular', icon: 'ri-bard-fill', color: 'text-yellow-500', label: 'Popular' },
                { to: '/movie', icon: 'ri-movie-2-fill', color: 'text-gray-400', label: 'Movies' },
                { to: '/tv', icon: 'ri-tv-2-fill', color: 'text-blue-400', label: 'TV Shows' },
                { to: '/person', icon: 'ri-team-fill', color: 'text-pink-500', label: 'People' },
            ].map((item, index) => (
                <Link key={index} to={item.to} className='text-white text-sm font-semibold hover:bg-[#6556CD] hover:text-white transition-colors duration-200 rounded-lg p-3 pl-4'>
                    <i className={`${item.icon} ${item.color} mr-2`}></i>
                    {item.label}
                </Link>
            ))}
        </nav>

        <hr className='border-none h-[1px] bg-zinc-700 my-6' />

        <nav className='flex flex-col gap-2'>
            <h2 className='text-white text-lg font-bold mb-3 ml-2'>Website Information</h2>
            {[
                { to: '/', icon: 'ri-information-fill', label: 'About MovieApp' },
                { to: '/', icon: 'ri-phone-fill', label: 'Contact Us' },
            ].map((item, index) => (
                <Link key={index} to={item.to} className='text-white text-sm font-semibold hover:bg-[#6556CD] hover:text-white transition-colors duration-200 rounded-lg p-3 pl-4'>
                    <i className={`${item.icon} text-white mr-2`}></i>
                    {item.label}
                </Link>
            ))}
        </nav>
    </div>
  )
}

export default SideNav;

