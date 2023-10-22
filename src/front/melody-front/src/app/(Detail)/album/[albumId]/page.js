"use client"

import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import {UserContext} from "../../../../contexts/UserContext";
import LikeButton from "../../../../components/detail/LikeButton";
import Link from "next/link";

function AlbumDetail({albumId}) {
    const {userState, userDispatch} = useContext(UserContext);
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]); // Add album state
    const [selectedSongs, setSelectedSongs] = useState({});

    const [localLikes, setLocalLikes] = useState(0);
    // const params = useParams();

    const fetchAlbumData = () => {
        axios
            .get(`/api/albums/${albumId}`) // Change to use albumId
            .then((res) => {
                setAlbums(res.data);
                // Fetch song data here
                axios
                    .get(`/api/songs/${res.data.songId}`)
                    .then((songRes) => {
                        setSongs(songRes.data);
                    })
                    .catch((songError) => {
                        console.error('Failed to fetch songs:', songError);
                    });
            })
            .catch((err) => {
                console.error('Failed to fetch album:', err);
            });
    };



    const handleSelectChange = (songId) => {
        setSelectedSongs((prevSelectedSongs) => ({
            ...prevSelectedSongs,
            [songId]: !prevSelectedSongs[songId],
        }));
    };

    const handleSelectAll = () => {
        if (Object.keys(selectedSongs).length === songs.length) {
            // If all songs are selected, deselect all
            setSelectedSongs({});
        } else {
            // Otherwise, select all songs
            const allSongIds = songs.map((song) => song.songId);
            const newSelectedSongs = allSongIds.reduce(
                (acc, songId) => ({...acc, [songId]: true}),
                {}
            );
            setSelectedSongs(newSelectedSongs);
        }
    };

    useEffect(() => {

        fetchAlbumData()

        axios.get(`/api/songs`)
            .then((res) => {
                setSongs(res.data);
                console.log("Songs:", res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch songs:", err);
            });
        axios
            .get(`/api/albums`)
            .then((res) => {
                setAlbums(res.data);

            })
            .catch((err) => {
                console.error("Failed to fetch albums:", err);
            });

    }, [albumId]);


    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">Album List</h3>
            <li key={albums.albumId} className="border-b py-2">
                <div className="container">
                    <div className="summary_section flex items-center justify-between">
                        <div className="summary_area">
                            <div className="flex items-center">
                                <div className="summary_thumb mr-4">
                                    <img
                                        src={albums.coverPhoto}
                                        alt={songs.albumTitle}
                                        width={250}
                                        height={200}
                                    />
                                </div>
                                <div className="summary">
                                    <div className="text_area">
                                        <h1 className="title_area">{albums.albumTitle}</h1>
                                    </div>
                                    <div>
                                        {albums.artist && (
                                            <h3 className="artistName">
                                                {albums.artist.singerName || albums.artist.groupName}
                                            </h3>
                                        )}
                                    </div>
                                    <div className="album_info">
                                        <div className="item">{albums.albumInfo}</div>
                                        <p>더보기</p>
                                    </div>
                                    <div className="play_with_me">
                                        <div className="play_option">
                                            <button className="play-button bg-red-500 text-white w-32 h-12 rounded-lg text-lg">
                                                ▶ 재생
                                            </button>
                                        </div>
                                        <LikeButton
                                            album={albums}
                                            localLikes={albums.likes}
                                            setLocalLikes={setLocalLikes}
                                        />
                                        {localLikes[albums.albumId] || albums.likes}
                                        <div className="more_option">더보기 버튼</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="track_section">
                        <div className="select_all">
                            <div className="check_area">
                                <input
                                    type="checkbox"
                                    id="chk_all"
                                    className="input_check"
                                    checked={Object.keys(selectedSongs).length === songs.length}
                                    onChange={handleSelectAll}
                                />
                                <label htmlFor="chk_all"></label>
                            </div>
                            <div className="text_area">
                                <div className="inner">
                                  <span>
                                    {songs.length}곡
                                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tracklsit">
                        <table border="1">
                            <caption></caption>
                            <thead>
                            <tr>
                                <th scope="col" className="select"></th>
                                <th scope="col" className="song"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {songs
                                .filter((song) => song.albumId === albums.albumId)
                                .map((song, index) => (
                                    <tr key={index}>
                                        <td className="select">
                                            <input
                                                type="checkbox"
                                                className="input_check"
                                                checked={selectedSongs[song.songId] || false}
                                                onChange={() => handleSelectChange(song.songId)}
                                            />
                                        </td>
                                        <td className="num"></td>
                                        <td className="song">
                                            <Link href={`/song/${song.songId}`}>{song.title}</Link>
                                        </td>
                                        <td className="artist">
                                          <span>
                                            {song.artist && (
                                                <p className="artistName text-2xl">
                                                    {song.artist.singerName || song.artist.groupName}
                                                </p>
                                            )}
                                          </span>
                                        </td>
                                        <td></td>
                                        <td className="lyrics">
                                            <a href="#" role="button" className="btn_lyrics">
                                                {song.lyrics}
                                            </a>
                                        </td>
                                        <td className="option"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </li>
        </div>
    );
}

export default AlbumDetail;