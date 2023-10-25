"use client"

import styles from "./artist.css";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {GoKebabHorizontal} from 'react-icons/go';
import Link from "next/link";

function SongList() {
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {

        axios.get('/api/songs')
            .then((response) => {
                setSongs(response.data);
            })
            .catch((error) => {
                console.error(`Failed to fetch Songs: ${error}`);
            });
        axios.get('/api/albums')
            .then((response) => {
                setAlbums(response.data);
            })
            .catch((error) => {
                console.error(`Failed to fetch Albums: ${error}`);
            });
    }, []);

    return (<div>
        <h1>Song List</h1>
        <ul className="main_container">
            {songs.map((song) => (<li key={song.songId}>
                <div className="container">
                    <div className="content">
                        <div className="artist_summary_section">
                            <div className="summary_wrap">
                                <div className="summary_thumb">
                                    <img
                                        src={song.artist ? song.artist.singerPhoto || song.artist.groupPhoto : "N/A"}
                                        alt="Artist Photo"
                                        className="artist_photo"/>
                                </div>
                                <div className="summary_text">
                                    <h2 className="artist_name">
                                        {song.artist ? song.artist.singerName || song.artist.groupName : "N/A"}
                                    </h2>
                                    <div className="artist_info">
                                        ArtistInfo: {song.artist ? song.artist.singerInfo || song.artist.groupInfo : "N/A"}
                                    </div>
                                </div>

                            </div>
                            <div className="end_section">
                                <h3>
                                    <div className="section_title_more">
                                        <div className="section_title">노래</div>
                                        <div>
                                            <a href="#" className="link_more">더보기</a>
                                        </div>
                                    </div>
                                </h3>
                                <div className="track_section">
                                    <div className="track_list">
                                        <table>
                                            <tbody>
                                            {songs
                                                .filter((filteredSong) => filteredSong.artistId === song.artistId) // Filter by artistId
                                                .map((filteredSong, index) => (<tr key={index}>
                                                    <td className="thumb">
                                                        <div className="inner">
                                                            <img
                                                                src={albums.find((album) => album.albumId === filteredSong.albumId)?.coverPhoto}
                                                                style={{
                                                                    width: "50px", height: "50px",
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="song">
                                                        <div className="title_badfe_wrap">
                                                            <Link
                                                                href={`/song/${filteredSong.songId}`}>{filteredSong.title}</Link>
                                                        </div>
                                                    </td>
                                                    <td className="artist">
                                                        <div className="artist_sub">
                                                                        <span className="artist_sub_inner">
                                                                            <span>
                                                                                {filteredSong.artist && (filteredSong.artist.singerName || filteredSong.artist.groupName)}
                                                                            </span>
                                                                        </span>
                                                        </div>
                                                    </td>
                                                    <td className="album">
                                                        <a href="#">
                                                            {albums.find((album) => album.albumId === filteredSong.albumId)?.albumTitle}
                                                        </a>
                                                    </td>
                                                    <td className="option">
                                                        <div className="inner">
                                                            <div className="downdrop_wrap">
                                                                <a href="#" role="button"
                                                                   className="btn_option">
                                                                    <GoKebabHorizontal/>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="end_section">
                                <h3 className="section_title_wrap">
                                    <div className="section_title_more">
                                        <div className="section_title">앨범</div>
                                        <a href="#" className="link_more">더보기</a>
                                    </div>
                                </h3>
                                <div className="list_wrap_album">
                                    <div>
                                        {Array.from(new Set(songs.map((song) => song.albumId))).map((albumId, index) => {
                                            const album = albums.find((a) => a.albumId === albumId);
                                            const artist = song.artist || { singerName: "N/A" };

                                            return (
                                                <ul className="scroll_list" key={index}>
                                                    <li className="list_item">
                                                        <div className="thumb_area">
                                                            <a href="#" className="link">
                                                                <img
                                                                    src={album.coverPhoto}
                                                                    style={{
                                                                        width: "100px",
                                                                        height: "100px",
                                                                    }}
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="info">
            <span className="text_wrap">
              <a href="#" className="title">
                {album.albumTitle}
              </a>
            </span>
                                                            <div className="artist">
              <span className="artist_sub_inner">
                <span>
                  <a href="#" className="link_artist">
                    <span className="text">
                      {artist.singerName || artist.groupName}
                    </span>
                  </a>
                </span>
              </span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            );
                                        })}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>))}
        </ul>
    </div>);
}

export default SongList;

// <strong>Title: {song.title}</strong>
// <p>Info: {song.songInfo}</p>
// <p>Duration: {song.duration}</p>
// <p>Likes: {song.likes}</p>
// <p>Artist Type: {song.artistType}</p>
// <p>Artist Name: {song.artist ? song.artist.singerName || song.artist.groupName : "N/A"}</p>
// <p>Genre: {song.genre ? song.genre.genreName : "N/A"}</p>
// <div><img
//     src={song.artist ? song.artist.singerPhoto || song.artist.groupPhoto : "N/A"}
//     width={200}
//     height={200}/>
// </div>
// <div>ArtistInfo: {song.artist ? song.artist.singerInfo || song.artist.groupInfo : "N/A"}</div>
