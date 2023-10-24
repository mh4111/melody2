"use client"
import React, { useState, useEffect, useRef } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faBackward, faPause, faPlay, faForward, faShuffle, faVolumeHigh, faVolumeXmark, faBars, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import MyCustomPlayerVersionTwo from "./MyCustomPlayerVersionTwo";

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
const url1 = "https://store-mp3-temp-melody2.s3.amazonaws.com//test.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5QBN5WIEL4QOVNEP%2F20231023%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20231023T062340Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIhANKi%2FBVyIDmBd%2FO97JZJ1oBRj9%2FNXDezOfwInQn0dCLAAiA%2F%2Br5r%2Fff0FveX6Haoh7TDIhfqE72pSagCCs8cbZ0hgSrzAggoEAAaDDkyNzgwOTI1Mzg5NiIMuYbfP5iGBtYD2gL3KtACds%2BOiW71GNbJqh1rhjDqyi%2BjNsYSANdisWE04FEnUK%2BaaNBBLpcxQNBSM%2F0G%2FoI5vMcogTNlnZP%2FxDnyuiV1m0BAKX2saoAELlZdDaQvdlm3giQq3kb4WuyLf9jAy8EYOqofGuNcMUmlc7dP1cVJk3vPoq8RNsZFoPnmQFdmHRVf71ImmIm1QeJvH4PlkoUhgr4wDl7qLvjqn5E3OW3bF4O9LSlixpxEjCcNlvZ8DynzvuTECDaWEf6U6MSTTDPrVLnMOVwnaLSWOga7jDe%2FaD5fMSY%2FzH4gcwH9RQt3QbdWBI7%2BnQLYU3b302sa6jRSN%2BZgp4hmZ7%2BlDBw70Qt0A60tlUINXlyPVmjT2IoRmiiVoiHIzlSGozVtGZEwqFlKMdr%2BYo1dhuRHEGTmHX%2Fk7xRLF9Ov%2FN%2FqCrne3xp5r4PrKrB93dNlWUV1brOe7yEGMOCi2KkGOp4BhbVR1NJDT1HT4znHdKaxy2ES%2BOQ1Eju7YtCmGUDHX57q86MA9kc2df1uxGi6bNn26S%2BUfWVMJZNkvRGPPXAmmEZzTnTKRzJEe4UPMW3MG260mmttVzoiL2zYj45NGYGYJoHFi9pLhhMlK5lFl%2F8exT1VLoZEFyjHgOHJQkllQgyCq0VEKFnGWu%2FxrvbeOZ5%2FJ4RbJIx6z%2FhW24ySmPE%3D&X-Amz-Signature=79529a7a1ba929bc2f74bbf3f64d452f4cfb2ec41a406f8e1dad07c3436bb731"
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
                    <MyCustomPlayerVersionTwo
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