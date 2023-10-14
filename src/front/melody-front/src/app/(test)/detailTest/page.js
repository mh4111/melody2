"use client"

import React, {useState, useEffect, useContext} from "react";
import axios from "axios";

import {UserContext} from "../../../contexts/UserContext";
import LikeButton from "../../../components/detail/LikeButton";

function AlbumDetail(albumId) {
    const { userState, userDispatch } = useContext(UserContext);
    const [songs, setSongs] = useState([]);
    const [genres, setGenres] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState({});

    const [localLikes, setLocalLikes] = useState(0);

    const handleSearch = () => {
        axios
            .get(`/api/albums/search?title=${searchKeyword}`)
            .then((response) => {
                setSearchResults(response.data);

                const initialLocalLikes = {};
                response.data.forEach((album) => {
                    initialLocalLikes[album.albumId] = album.likes;
                });
                setLocalLikes(initialLocalLikes);
            })
            .catch((error) => {
                console.error("Failed to fetch albums:", error);
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
                (acc, songId) => ({ ...acc, [songId]: true }),
                {}
            );
            setSelectedSongs(newSelectedSongs);
        }
    };


    useEffect(() => {
        axios.get(`/api/albums`)
            .then((res) => {
                setAlbums(res.data);

            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    console.log(err);
                } else {
                    console.log(err);
                }
            });
        axios.get(`/api/songs`)
            .then((res) => {
                setSongs(res.data);
                console.log("Songs:", res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch songs:", err);
            });
        axios.get("/api/genres")
            .then((res) => {
                setGenres(res.data);
                console.log("Genres:", res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch Genres:", err);
            });

        if (albumId === undefined || albumId === null) {
            return;
        }


    }, [albumId]);



    // Check if albums array is empty before rendering
    if (albums.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div children="max-w-md mx-auto p-4">

            {/* search */}
            <div className="mb-4">
                <h3 className="text-x1 font-semibold mb-2">Search Album</h3>
                <input
                    type="text"
                    name="searchKeyword"
                    placeholder="Search by title"
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
            {searchResults.map((album) => (
                <div className="container" key={album.albumId}>
                    <div className="summary_section">
                        <div className="summary_area">
                            <div className="summary_thumb">
                                <img
                                    src={albums.find(item => item.albumId === album.albumId)?.coverPhoto}
                                    alt={album.albumTitle}
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="summary">
                                <div className="text_area">
                                    <h2 className="title_area">
                                        <span className="title"> {album.albumTitle} </span>
                                        <span className="title_artist">
                                        {/*{album.artistType === "Solo" ? album.soloArtist.singerName : album.groupArtist.groupName}*/}
                                            {album.artistType === "Solo" ? album.soloArtist.singerName : (album.groupArtist ? album.groupArtist.groupName : 'Unknown')}

                                    </span>
                                    </h2>
                                    <div className="sub">
                                        <span className="item">{album.releaseDate}</span>
                                    </div>
                                    <div className="album_info">
                                        <div className="info">
                                            <span className="text_info">
                                                {album.albumInfo}
                                            </span>
                                            <a href="#" role="button" className="more">더보기</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="play_with_me">
                                    <div className="play_option">재생버튼</div>

                                    <LikeButton album={album} localLikes={album.likes} setLocalLikes={setLocalLikes} />
                                    <div className="more_option">더보기 버튼</div>
                                </div>
                            </div>
                            <div className="track_section">
                                <div className="select_all">
                                    <div className="check_area">
                                        <input
                                            type="checkbox"
                                            id="chk_all"
                                            className="input_check"
                                            checked={
                                                Object.keys(selectedSongs).length === songs.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                        <label htmlFor="chk_all"></label>
                                    </div>
                                    <div className="text_area">
                                        <div className="inner">
                                            <span>{songs.filter((song) => song.albumId === album.albumId).length}곡</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="tracklsit">
                                    <table border="1">
                                        <caption></caption>
                                        <thead>
                                        <tr>
                                            <th scope="col" className="select"></th>
                                            <th scope="col" className="song">
                                                {/*<span>*/}
                                                {/*    {songs*/}
                                                {/*        .filter((song) => song.albumId === album.albumId)*/}
                                                {/*        .map((song) => (*/}
                                                {/*            <li key={song.songId}>{song.title}</li>*/}
                                                {/*        ))}*/}
                                                {/*  </span>*/}
                                            </th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {songs
                                            .filter((song) => song.albumId === album.albumId)
                                            .map((song) => (
                                                <tr key={song.songId}>
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
                                                        <a href={`/songs/title/${song.title}`}>{song.title}</a>
                                                    </td>
                                                    <td className="artist">
                                                    <span>
                                                      {album.artistType === "Solo" ? (
                                                          <a href={`/artists/${album.soloArtist.artistId}`}>{album.soloArtist.singerName}</a>
                                                      ) : (
                                                          <a href={`/artists/${album.groupArtist.artistId}`}>{album.groupArtist.groupName}</a>
                                                      )}
                                                    </span>
                                                    </td>
                                                    <td></td>
                                                    <td className="lyrics">
                                                        <a href="#" role="button" className="btn_lyrics">
                                                            {song.lyrics}
                                                        </a>
                                                    </td>
                                                    <td className="option">

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p>
                                <strong>평점: </strong>{album.rating}
                            </p>
                            <p>
                                <strong>댓글 수: </strong>{album.replyCount}
                            </p>
                            <p>
                                <strong>좋아요 수: </strong>{localLikes[album.albumId] ? localLikes[album.albumId] : 0}
                            </p>
                            <p>
                                <strong>뮤직 비디오: </strong><a href={album.musicVideoLink}>링크</a>
                            </p>
                            <p>
                                <strong>해시태그: </strong>{album.albumHashtags}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>);
};

export default AlbumDetail;