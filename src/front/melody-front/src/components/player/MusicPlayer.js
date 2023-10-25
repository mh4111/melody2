"use client"
import React, { useState, useEffect, useRef } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faBackward, faPause, faPlay, faForward, faShuffle, faVolumeHigh, faVolumeXmark, faBars, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import MyCustomPlayer from "./MyCustomPlayer";

library.add(
    faHeart,
    farHeart,
    faBackward,
    faPause,
    faPlay,
    faForward,
    faShuffle,
    faVolumeHigh,
    faVolumeXmark,
    faBars,
    faRepeat
);

// const url = "";
const url1 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEJAGLCH3P%2F20231025%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231025T000859Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECgaDmFwLW5vcnRoZWFzdC0yIkgwRgIhAKFF1RtH7kY6vuqcdUR7%2BrbcJHuhv%2FQx%2F%2FF4n8CuLy8LAiEAw289l%2BIL78%2BgMtBWFqcO%2FggjLbDatu22GK24YCy9Q7Mq8wIIURAAGgw5Mjc4MDkyNTM4OTYiDHf6Fo9sEeGzgDh2ZCrQAtfHh7Z9rtXTvbccloCYE6b58vgVQGT7aYK9aLgLg%2B1XvX3LCpFHuTFP5Nd25R6TmDDBSl76g6noPRT%2B%2FFn0O8ymBeMmWQ7YNm15Nf2oR%2BgEeTL3WajnBLx7pKcWkoP3UNUW8NAXDageG5kTo%2Bidf%2B7k00x6xaI50oRm1Y71Ht6VFLo5wAvUY6YJq2dkUeMZxvhcXcAZ0r%2FrmYy8JXnJXhaKTB%2B4cU000C8rbXM8ccO0v6PlJSAw7ahPAebDO3pHams1nhDgLMt0tPYGZmamlcMXnpzbGBmDzuzu%2FQEgZ3L8q8hQGhBtwioZDfQB4jT5a0K0r0iz5J0WnMc5aTVKICYnZOq%2FXBRIU%2Bg0FDRH3Fh4vW3MjWzy01KatrNlYpEcsfeyAOC4gSVxy%2FK%2BSn%2FC0S3R9jdZUTUW5kSYKNZLOaQv0aO1XydQiSSvIf5J%2BGbC8DCPueGpBjqdAf%2FECnB1KOyUP0NoOj%2FZ1oq6GEOsNmceArEz1%2F95EhF1BIw56y2nQg63AdhHoEUFrhSG0QM7gDSbXSy%2BsEJO%2B1HWcZ7O%2BRErQ9GExAcSgxCs7Ai3KWNH94z4q%2BW7Fv2mCePRPNh8Lq6LGF9YsOIje03DKq7%2BK8OujiE6OPzFDNBczEjQtpaLS0YCBlofdATgFNOxYBp31C%2FFYvTKOl8%3D&X-Amz-Signature=9b306820c2fd27b8a49311ef7c5a98492526ddebb72f37275571de561b5996a1";
const url2 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEIKDS6DEW%2F20231017%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231017T052717Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aDmFwLW5vcnRoZWFzdC0yIkcwRQIhAItOi%2B39av7QkgnLlSMqSP80MIut%2FYymxyoQ3bXAe4EDAiACqAUHj59gURrSix3w4N%2B%2BLQlngQSwgmuQ8J2d6YvkHSr8AgiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDkyNzgwOTI1Mzg5NiIMeVM9gnc0V9ZrZ4uuKtACg4793BXp8P0eFbVVmj8teUbwpfguwdyG31LaflRwRbePXMi7yMOFQSsgqQFVxAfjTNp5XYfMVqCccV4qi8XxONWO8PQwuDWcAFvtjwNHlphqK83899jB3oY7R846ihGuDks77SpBsetAbTyIcjbO8NqmXMwNbDnSgFSw%2FZ4TVDPTzRwyg7a5Oqz6v%2Bczkd7rYJhpjWiwobg7JO%2B3K0KJLmlxLjRPFiqRY%2BAA9%2FZMFZ%2FxzzDnd1531ozlFoUemmvbzF0rM%2FjZzNUJWceueq%2FafKW2F9%2FGS0OvN4cqgQEaUqso2xL4YUEsqp%2FHDHMHI0Jrtx3uSDKkp8o3JHwr1QvSE4X6QIK%2B%2FrFE69ZCu2IQdWqPGdYHYXYoBZ44N8T%2BvnKFAmo6BthPLi%2BZKj3IUxVI50UtfrU0ZqlpAqZZj85tkSJbYRCifuH7ne2L55YgE8bEMIq2uKkGOp4Bl%2ByuAjbhhtSuXLIfSMKipaTFhTZEGXTvKbR0IegcBDxnPji%2BHkk2S94vKxxRCeR8iyBCkUbOsaSWSoCBp5akwpBW3FFaB4bo7is2M0rt5XKl91CnjXur2NEhdjgKOeHT3c8vUW0yZIclgW2%2FL89ME0xMEdM5JnRPsVBfSzV5sZB3rExPa2%2FVt9piDdnMzzeFy7kJhDmVb6lE9V4aylQ%3D&X-Amz-Signature=8fdde399fedbe40799faeb8f9ca90d29af72706b4e3f7854325c691227c5cf70";
const playlist = [
    {
        title: "Attention",
        artist : "New Jeans",
        url: url1,
    },
    {
        title: "Hype boy",
        artist : "New Jeans",
        url: url2,
    },
];

function MusicPlayer({ song = { title: 'Song Title' }, album = { singerName: 'Artist Name' } }) {
    const [currentSongIndex, setCurrentSongIndex] = useState(0); // currentSongIndex를 정의하고 초기값 설정
    const [songs, setSongs] = useState(null);

    const loadSongs = async () => {
        try {
            const response = await axios.get('/api/songs');
            setSongs(response.data);
        } catch (error) {
            console.error('Error loading songs:', error);
        }
    };

    useEffect(() => {
        loadSongs();
    }, []);





    return (
        <>
            {songs ? (
                <div className="mt-16 musicPlayerContainer">
                    <MyCustomPlayer
                        song={songs[currentSongIndex]}
                        playlistEl={playlist[currentSongIndex]}
                        playlist={playlist}
                        currentSongIndex={currentSongIndex}
                        setCurrentSongIndex={setCurrentSongIndex}
                    />

                </div>
            ) : (
                <p>No songs available.</p>
            )}
        </>
    );
}

export default MusicPlayer;