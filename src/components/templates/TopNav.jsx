import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../utils/AxiosApi";
import noimage from '/noimage.jpg';
import PropTypes from 'prop-types';

const TopNav = ({ leftPadding }) => {
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const GetSearchResult = async () => {
        try {
            if (query.length > 0) {
                const { data } = await axios.get(`/search/movie?query=${query}`);
                setSearchResult(data.results);
            } else {
                setSearchResult([]);
            }
        } catch (error) {
            console.log(error);
            setSearchResult([]);
        }
    };

    useEffect(() => {
        GetSearchResult();
    }, [query]);

    return (
        <div 
            className={`w-full h-[10vh] relative flex items-center px-4 sm:px-10 z-[100]`}
            style={{ paddingLeft: leftPadding }}
        >
            <div className="relative w-full max-w-2xl">
                <div className="flex items-center bg-zinc-800 rounded-full overflow-hidden">
                    <i className="ri-search-line text-zinc-400 text-xl ml-4 mr-2"></i>
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        type="text"
                        placeholder="Search Any Movie..."
                        className="flex-1 h-12 bg-transparent border-none outline-none text-white text-sm sm:text-base px-2 py-2"
                    />
                    {query.length > 0 && (
                        <button
                            onClick={() => setQuery('')}
                            className="text-zinc-400 hover:text-white p-2 focus:outline-none"
                        >
                            <i className="ri-close-line text-xl" />
                        </button>
                    )}
                </div>

                {query.length > 0 && searchResult.length > 0 && (
                    <div 
                        className="absolute w-full mt-2 bg-zinc-800 rounded-md shadow-lg overflow-hidden z-10"
                    >
                        <div className="max-h-[50vh] overflow-y-auto">
                            {searchResult.map((s, i) => (
                                <Link
                                    to={`/movie/details/${s.id}`}
                                    key={i}
                                    className="flex items-center p-3 hover:bg-zinc-700 transition duration-150 ease-in-out"
                                >
                                    <img
                                        className="w-12 h-16 rounded object-cover shadow-lg mr-4"
                                        src={s.backdrop_path || s.poster_path || s.profile_path
                                            ? `https://image.tmdb.org/t/p/w500${s.backdrop_path || s.poster_path || s.profile_path}`
                                            : noimage
                                        }
                                        alt={s.title || s.name || s.original_title || s.original_name || "No Image"}
                                    />
                                    <span className="text-sm text-white font-medium truncate">
                                        {s.title || s.name || s.original_title || s.original_name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

TopNav.propTypes = {
    leftPadding: PropTypes.string.isRequired,
};

export default TopNav;