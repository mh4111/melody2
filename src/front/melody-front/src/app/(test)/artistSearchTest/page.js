"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

function ArtistSearch() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        const encodedSearchKeyword = encodeURIComponent(searchKeyword);
        axios
            .get(`/api/artists/search?name=${encodedSearchKeyword}`)
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch artists:", error);
            });
    };

    return (
        <div className="p-4">
            <h3 className="text-2xl mb-4">Search Artists</h3>
            <div className="flex space-x-2">
                <input
                    type="text"
                    name="searchKeyword"
                    placeholder="Search by name"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="border rounded-md p-2 w-full"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            <div className="mt-4">
                <h4 className="text-xl">Search results:</h4>
                {searchResults.map((artist) => (
                    <div key={artist.artistId} className="mt-2 p-2 border rounded-md">
                        {artist.singerName ? (
                            <>
                            <h2>Solo Artists</h2>
                            <h4 className="text-lg">{artist.singerName}</h4>
                            </>
                        ) : (
                            <>
                            <h2>Group Artists</h2>
                            <h4 className="text-lg">{artist.groupName}</h4>
                            </>
                        )}
                        {/* Display other artist details */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArtistSearch;
