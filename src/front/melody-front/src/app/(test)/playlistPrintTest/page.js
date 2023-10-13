"use client"
import React, { useState, useEffect } from "react";

const PlaylistDetail = () => {
    const [playlistId, setPlaylistId] = useState(""); // State to store the playlist ID input
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePlaylistIdChange = (e) => {
        setPlaylistId(e.target.value);
    };

    const handleFetchPlaylist = () => {
        setLoading(true);

        // Define the URL for fetching the playlist by its ID
        const apiUrl = `/api/playlists/${playlistId}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setPlaylist(data); // Assuming the response contains the playlist and songs
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="max-w-lg mx-auto mt-5 p-4">
            <input
                type="text"
                placeholder="Enter Playlist ID"
                value={playlistId}
                onChange={handlePlaylistIdChange}
            />
            <button onClick={handleFetchPlaylist}>Fetch Playlist</button>

            {playlist && (
                <>
                    <h1 className="text-2xl font-semibold mb-3">{playlist.playlistName}</h1>
                    <p className="text-gray-600 mb-3">{playlist.description}</p>
                    <ul>
                        {playlist.songs.map((song) => (
                            <li
                                key={song.songId}
                                className="border p-2 mb-2 rounded-lg hover:bg-gray-100"
                            >
                                {song.title}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default PlaylistDetail;
