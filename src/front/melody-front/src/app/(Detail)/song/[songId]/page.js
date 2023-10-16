"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

function SongDetail() {

    const [song, setSong] = useState({});
    const params = useParams();

    const fetchSongData = () => {
        axios
            .get(`/api/songs/${params.songId}`)
            .then((res) => {
                console.log('res Songs:', res.data);
                setSong(res.data);
            })
            .catch((err) => {
                console.error('Failed to fetch songs:', err);
            });
    };

    useEffect(() => {
        // Call fetchSongData when params.songId changes or when the component mounts
        fetchSongData();
    }, [params.songId]);

    // Static code moved here
    if (!song) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h3 className="text-xl font-semibold mb-2">Song List</h3>
                <ul>
                    <li key={song.songId} className="border-b py-2">
                        <p>{song.title}</p>
                        <p className="text-gray-600">{song.songInfo}</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SongDetail;
