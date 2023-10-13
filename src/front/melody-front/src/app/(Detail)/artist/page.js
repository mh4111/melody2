"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";

const ArtistDetail = ({ albumId }) => {
    const [albums, setAlbums] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            // soloArtist API
            const soloArtistResponse = await axios.get(
                `api/albums/search?soloArtist=${searchKeyword}`
            );

            // groupArtist API
            const groupArtistResponse = await axios.get(
                `api/albums/search?groupArtist=${searchKeyword}`
            );

            // API 응답 데이터를 합쳐서 setSearchResults로 업데이트
            setSearchResults([
                ...soloArtistResponse.data.map((item) => ({ ...item, type: "solo" })),
                ...groupArtistResponse.data.map((item) => ({ ...item, type: "group" })),
            ]);
        } catch (error) {
            console.error("Failed to fetch artists:", error);
        }
    };

    useEffect(() => {
        axios.get(`/api/albums/`)
            .then((res) => {
                setAlbums(res.data); // Assuming res.data is an array of albums
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    console.log(err);
                } else {
                    console.log(err);
                }
            });
    }, [albumId]);

    // // Check if albums array is empty before rendering
    // if (albums.length === 0) {
    //     return <div>Loading...</div>; // Display a loading message while waiting for the data
    // }

    return (
        <div className="max-w-md mx-auto p-4">

            {/* search */}
            <div className="mb-4">
                <h3 className="text-x1 font-semibold mb-2">Search Artists</h3>
                <input
                    type="text"
                    name="searchKeyword"
                    placeholder="Search by ArtistName"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="border rounded-md p-2 w-full mb-2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            {/* search results */}
            <div>
                {searchResults.map((album) => (
                    <div key={album.albumId}>
                        <h3>
                            {album.artistType === "group"
                                ? album.groupArtist.groupName
                                : album.soloArtist.singerName}
                        </h3>
                        {/* 여기에 결과를 표시하는 로직을 추가하세요 */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArtistDetail;
