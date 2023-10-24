"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import {GoKebabHorizontal} from 'react-icons/go';

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

    return (
        <div>
            <h1>Song List</h1>
            <ul>
                {songs.map((song) => (
                    <li key={song.songId}>
                        <div className="container">
                            <div className="content">
                                <div className="artist_summary_section">
                                    <div className="summary_wrap">
                                        <div className="">
                                            <img src={song.artist ? song.artist.singerPhoto || song.artist.groupPhoto : "N/A"}
                                                 alt="Artist Photo"
                                                 style={{
                                                     borderRadius: "50%",
                                                     width: "200px",
                                                     height: "200px",
                                                     objectFit: "cover",
                                                 }} />
                                        </div>
                                        <div className="summary_text">
                                            <h2 className="artist_name">
                                                {song.artist ? song.artist.singerName || song.artist.groupName : "N/A"}
                                            </h2>
                                        </div>
                                        <div>
                                            ArtistInfo: {song.artist ? song.artist.singerInfo || song.artist.groupInfo : "N/A"}
                                        </div>
                                    </div>
                                    <div className="end_section">
                                        <h3>
                                            <div className="end_section_more">
                                                <div className="section_title">노래</div>
                                                <div>
                                                    <a href="#"><GoKebabHorizontal /></a>
                                                </div>
                                            </div>
                                        </h3>
                                        <div className="track_section">
                                            <div className="track_list">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="thumb"></th>
                                                            <th scope="col" className="song"></th>
                                                            <th scope="col" className="artist"></th>
                                                            <th scope="col" className="album"></th>
                                                            <th scope="col" className="option"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className>
                                                            <td className="thumb">
                                                                <div className="ineer">
                                                                    <img src={song.artist ? song.artist.singerPhoto || song.artist.groupPhoto : "N/A"}
                                                                    style={{
                                                                        width:"50px",
                                                                        height:"50px",
                                                                    }}/>
                                                                </div>
                                                            </td>
                                                            <td className="song">
                                                                <div className="title_badfe_wrap">
                                                                    <a href="#">{song.title}</a>
                                                                </div>
                                                            </td>
                                                            <td className="artist">
                                                                <div className="artist_sub">
                                                                    <span className="artist_sub_inner">
                                                                        <span>
                                                                            <a href="#">
                                                                                {song.artist ? song.artist.singerName || song.artist.groupName : "N/A"}
                                                                            </a>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="album">
                                                                <a href="#">
                                                                    {albums.find((album) => album.albumId === song.albumId)?.albumTitle}
                                                                </a>
                                                            </td>
                                                            <td className="option">
                                                                <div className="inner">
                                                                    <div className="downdrop_wrap">
                                                                        <a href="#" role="button" className="btn_option">
                                                                            <GoKebabHorizontal />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="end_section">
                                        <h3 className="section_title_wrap">
                                            <div className="section_title_more">
                                                <div className="section_title">앨범</div>
                                                <a href="#" className="link_more"></a>
                                            </div>
                                        </h3>
                                        <div className="list_wrap_album">
                                            <ul className="scroll_list">
                                                <li className="list_item">
                                                    <div className="thumb_area">
                                                        <a href="#" className="link">
                                                           <img src={albums.find((album) => album.albumId === song.albumId)?.coverPhoto}
                                                                style={{
                                                                    width:"50px",
                                                                    height:"50px",
                                                                }} />
                                                        </a>
                                                    </div>
                                                    <div className="info">
                                                        <a href="#" className="title">
                                                            {albums.find((album) => album.albumId === song.albumId)?.albumTitle}
                                                        </a>
                                                        <div className="artist">
                                                            <span className="artist_sub_inner">
                                                                <span>
                                                                    <a href="#" className="link_artist">
                                                                        <span className="text">
                                                                            {song.artist ? song.artist.singerName || song.artist.groupName : "N/A"}
                                                                        </span>
                                                                    </a>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
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
