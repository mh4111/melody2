"use client"

import { useRouter } from 'next/navigation';
import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import {UserContext} from "../../../../contexts/UserContext";
import LikeButton from "../../../../components/detail/SongLikeButton";
import Link from "next/link";


function SongDetail() {
    const {userState, userDispatch} = useContext(UserContext);
    const [song, setSong] = useState({});
    const [album, setAlbum] = useState({}); // Add album state


    const [localLikes, setLocalLikes] = useState(0);
    const params = useParams();


    const fetchSongData = () => {
        axios
            .get(`/api/songs/${params.songId}`)
            .then((res) => {
                setSong(res.data);
                // Fetch album data here
                axios
                    .get(`/api/albums/${res.data.albumId}`)
                    .then((albumRes) => {
                        setAlbum(albumRes.data);
                    })
                    .catch((albumErr) => {
                        console.error('Failed to fetch album:', albumErr);
                    });
            })
            .catch((err) => {
                console.error('Failed to fetch song:', err);
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
            <h3 className="text-xl font-semibold mb-2">Song List</h3>
            <li key={song.songId} className="border-b py-2">
                <div className="container">
                    <div className="summary_section flex items-center justify-between">
                        <div className="summary_area">
                            <div className="flex items-center"> {/* 이미지와 텍스트를 가로로 배치하기 위해 flex 클래스 추가 */}
                                <div className="summary_thumb mr-4"> {/* 이미지 왼쪽에 간격 추가 */}
                                    <img
                                        src={album.coverPhoto}
                                        alt={song.albumTitle}
                                        width={250}
                                        height={200}
                                    />
                                </div>
                                <div className="summary">
                                    <div className="text_area">
                                        <h1 className="title_area">
                                            {song.title}
                                        </h1>
                                    </div>
                                    <div>
                                        {song.artist &&
                                            <h3 className="artistName">{song.artist.singerName || song.artist.groupName}</h3>}
                                    </div>
                                    <div className="song_info">
                                        <div className="item">{song.songInfo}</div>
                                        <p>더보기</p>
                                    </div>
                                    <div className="play_with_me">
                                        <div className="play_option">
                                            <button
                                                className="play-button bg-red-500 text-white w-32 h-12 rounded-lg text-lg">
                                                ▶ 재생
                                            </button>
                                        </div>
                                        <LikeButton song={song} localLikes={song.likes} setLocalLikes={setLocalLikes}/>
                                        {/*{localLikes[song.songId] ? localLikes[song.songId] : 0}*/}
                                        {localLikes[song.songId] || song.likes}
                                        <div className="more_option">더보기 버튼</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="end_section section_lyrics">
                        <h3>
                            <span className="section_title"><h2><strong>가사</strong></h2></span>
                        </h3>
                        <div className="lyrics">
                            <p>{song.lyrics}</p>
                        </div>
                        <a href="#" className="btn_more">더보기</a>
                    </div>
                    <div className="end_section">
                        <h3>
                            <span className="section_title">수록 앨범</span>
                        </h3>
                        <div className="album_info_area flex justify-between">
                            <div className="thumb_area w-150px">
                                <img
                                    src={album.coverPhoto}
                                    alt={song.albumTitle}
                                    width={150}
                                    height={150}
                                />
                            </div>
                            <div className="text_area flex-1">
                                <div className="ineer">
                                    <div className="inner_ablum text-3xl font-bold">
                                        {album.albumTitle}
                                    </div>
                                </div>
                                <div className="inner_artist">
                                    {song.artist && (
                                        <p className="artistName text-2xl">
                                            {song.artist.singerName || song.artist.groupName}
                                        </p>
                                    )}
                                </div>
                                <div className="inner_date text-2xl">
                                    {album.releaseDate}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="end_section">
                        <h3 className="section_title_wrap">
                            <span className="section_title">이 곡의 뮤비</span>
                        </h3>
                        <div className="list-wrap_video">
                            <div>
                                <a href="#">뮤비링크</a>
                                <div className="info">
                                    <div className="text_area">
                                        <h1 className="title_area">
                                            {song.title}
                                        </h1>
                                    </div>
                                    <div>
                                        {song.artist &&
                                            <p className="artistName">{song.artist.singerName || song.artist.groupName}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );
}

export default SongDetail;
