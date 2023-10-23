"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import LikeButton from "../../../components/detail/SongLikeButton";
import Lyrics from "../../../components/detail/MoreButton";

function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const SongDetail = ({ songId }) => {
    const [songs, setSongs] = useState([]);
    const [genres, setGenres] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [localLikes, setLocalLikes] = useState(0);


    const handleSearch = () => {
        axios
            .get(`/api/songs/search?title=${searchKeyword}`)
            .then((res) => {
                setSearchResults(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch songs:", err);
            });
    };



    useEffect(() => {
        axios
            .get(`/api/songs`)
            .then((res) => {
                setSongs(res.data);
                console.log("Songs:", res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch songs:", err);
            });
        axios
            .get("/api/genres")
            .then((res) => {
                setGenres(res.data);
                console.log("Genres:", res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch Genres:", err);
            });
        axios
            .get("/api/albums")
            .then((res) => {
                setAlbums(res.data);
                console.log("Albums:", res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch Albums:", err);
            });

    }, [songId]);

    if (songs.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main_containerr max-w-md mx-auto p-4 mt-2 m-2">

            {/* search */}
            <div className="search">
                <h3 className="text-xl font-semibold mb-2">Search Songs</h3>
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
            {searchResults.map((song, idx) => (
                <div className="container mx-4 p-4" key={idx}>
                    <div className="summary_section">
                        <div className="summary_area flex">
                            <div className="summary_thumb">
                                <img
                                    src={albums.find(album => album.albumId === song.albumId)?.coverPhoto}
                                    alt={song.albumTitle}
                                    width={200}
                                    height={200}
                                    className="w-48 h-48"
                                />
                            </div>
                            <div className="summary ml-4 flex-1">
                                <div className="text_area">
                                    <h1 className="text-2xl font-bold">
                                        {song.title}
                                    </h1>
                                </div>
                                <div className="artistName text-xl font-semibold">
                                    {song.artist && (song.artist.singerName || song.artist.groupName)}
                                </div>
                                <div className="song_info text-gray-500">
                                    {song.songInfo}
                                    장르 : {genres.find((genre) => genre.genreId === song.genreId)?.genreName}
                                </div>
                                <div className="play_with_me mt-4 flex justify-between">
                                    <div className="play_option">
                                        <button className="play-button bg-red-500 text-white w-20 h-10 rounded-lg">
                                            ▶ 재생
                                        </button>
                                    </div>
                                    <div className="like_button flex items-center">
                                        <LikeButton song={song} localLikes={song.likes} setLocalLikes={setLocalLikes} />
                                        {localLikes[song.songId] || song.likes}
                                    </div>
                                    <div className="more_option">
                                        더보기 버튼 구현
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section_lyrics mb-4">
                            {/*<h3>*/}
                            {/*    <span className="section_title">*/}
                            {/*        <h1><strong>가사</strong></h1>*/}
                            {/*    </span>*/}
                            {/*</h3>*/}
                            {/*<div className="lyrics mb-4">*/}
                            {/*    <p>{song.lyrics}</p>*/}
                            {/*</div>*/}
                            {/*<a href="#" className="btn_more">더보기</a>*/}
                            <Lyrics song={song} />
                        </div>
                        <div className="section_album">
                            <h3 className="mb-4">
                                <span className="section_title">
                                    <h1><strong>수록앨범</strong></h1>
                                </span>
                            </h3>
                            <div className="end_section mb-4">
                                <div className="album_info_area flex items-center">
                                    <div className="thumb_area">
                                        <Link href={`/album/${albums.albumId}`}>
                                        <img
                                            src={albums.find(album => album.albumId === song.albumId)?.coverPhoto}
                                            width={100}
                                            height={100}
                                            />
                                        </Link>
                                    </div>
                                    <div className="text_area ml-4">
                                        <div className="title">
                                            <Link href="/album">
                                                {albums.find(album => album.albumId === song.albumId)?.albumTitle}
                                            </Link>
                                        </div>
                                        <div className="artist">
                                            <Link href='#' className="artist">
                                                {song.artist && (song.artist.singerName || song.artist.groupName)}
                                            </Link>
                                            <p>
                                                {new Date(albums.find(album => album.albumId === song.albumId)?.releaseDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="end_section mb-4">
                                <h3 className="section_title_wrap">
                                    <span className="section_title"><strong>이 곡의 뮤비</strong></span>
                                </h3>
                                <div className="list_wrap_video">
                                    <p>
                                        <strong>뮤직 비디오: </strong><a href={song.url}>링크</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default SongDetail;

{/*<p>*/}
{/*    <strong>플레댓글 수: </strong>{song.playlistCount}*/}
{/*</p>*/}