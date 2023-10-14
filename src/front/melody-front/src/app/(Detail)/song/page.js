"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {router} from "next/client";

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
        <div className="max-w-md mx-auto p-4">

            {/* search */}
            <div className="mb-4">
                <h3 className="text-x1 font-semibold mb-2">Search Songs</h3>
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
                <div className="container" key={idx}>
                    <div className="summary_section">
                        <div className="summary_area">
                            <div className="summary_thumb">
                                <img src={albums.find(album => album.albumId === song.albumId)?.coverPhoto}
                                     alt={song.albumTitle}
                                     width={200}
                                     height={200}/>
                            </div>
                            <div className="summary">
                                <div className="text_area">
                                    <h1 className="text_area">
                                        {song.title}
                                    </h1>
                                </div>
                            </div>
                            <div>
                                {song.album.soloArtist ? (
                                    <h2 className="artistName">{song.album.soloArtist.singerName}</h2>
                                ) : (
                                    <h2 className="artistName">{song.album.groupArtist.groupName}</h2>
                                )}
                            </div>
                            <div className="song_info">
                                {song.songInfo}
                                장르{genres.find((genre) => genre.genreId === song.genreId)?.genreName}
                            </div>
                            <div className="play_with_me">
                                <div className="play_option">재생버튼</div>
                                <div className="more_option">더보기 버튼
                                    <p>
                                        <strong>좋아요 수: </strong>{song.likes}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="section_lyrics">
                            <h3>
                                <span className="section_title"><h2><strong>가사</strong></h2></span>
                            </h3>
                            <div className="lyrics">
                                <p>{song.lyrics}</p>
                            </div>
                            <a href="#" className="btn_more">더보기</a>
                        </div>
                        <div className="section_album">
                            <h3>
                                <span className="section_title">수록앨범</span>
                            </h3>
                            <div className="end_section">
                                <div className="album_info_area">
                                    <div className="thumb_area">
                                        <Link href="/album">
                                            <img src={albums.find(album => album.albumId === song.albumId)?.coverPhoto}
                                                 alt={song.albumTitle}
                                                 width={100}
                                                 height={100}/>
                                        </Link>
                                    </div>
                                    <div className="text_area">
                                        <div className="title">
                                            <Link href="/album">
                                                {albums.find(album => album.albumId === song.albumId)?.albumTitle}
                                            </Link>
                                        </div>
                                        <div className="artist">
                                            <Link href='#' className="artist">
                                                {/*아티스트 불러오기*/} 가수
                                            </Link>
                                            <p>
                                                {new Date(albums.find(album => album.albumId === song.albumId)?.releaseDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="end_section">
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

        {/* Search List */}

        </div>
    );
};

export default SongDetail;

{/*<p>*/}
{/*    <strong>플레댓글 수: </strong>{song.playlistCount}*/}
{/*</p>*/}
{/*<p>*/}
{/*    <strong>해시태그: </strong>{song.albumHashtags}*/}
{/*</p>*/}