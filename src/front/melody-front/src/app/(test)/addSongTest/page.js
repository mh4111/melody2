"use client"
import React, { useEffect, useState } from 'react';

function AddSongToPlaylist() {
    // Define state variables for form fields
    const [playlistId, setPlaylistId] = useState(0); // 입력 필드: 플레이리스트 ID
    const [songId, setSongId] = useState(0); // 입력 필드: 노래 ID

    const handlePlaylistIdChange = (e) => {
        setPlaylistId(parseInt(e.target.value));
    }

    const handleSongIdChange = (e) => {
        setSongId(parseInt(e.target.value));
    }

    const handleAddSongToPlaylist = async (e) => {
        e.preventDefault();
        const songPlaylist = {
            playlistId,
            songId,
        };
        console.log(songPlaylist);
        try {
            const response = await fetch('/api/playlists/addSong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(songPlaylist),
            });
            if (response.ok) {
                alert('노래를 플레이리스트에 추가했습니다.');
            } else {
                console.error('노래 추가 실패');
            }
        } catch (error) {
            console.error('에러:', error);
        }
    }


    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">플레이리스트에 노래 추가</h2>
            <form onSubmit={handleAddSongToPlaylist} className="space-y-4">
                <div className="flex items-center space-x-4">
                    <label className="w-24">플레이리스트 ID:</label>
                    <input
                        type="number"
                        value={playlistId}
                        onChange={handlePlaylistIdChange}
                        className="w-48 border rounded px-2 py-1"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <label className="w-24">노래 ID:</label>
                    <input
                        type="number"
                        value={songId}
                        onChange={handleSongIdChange}
                        className="w-48 border rounded px-2 py-1"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">추가</button>
            </form>
        </div>
    );
}
export default AddSongToPlaylist;