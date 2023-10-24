"use client"

import React from 'react';
import {
    SeasonSongImage,
    SeasonSongImageContainer,
    SeasonSongImageElement,
    SeasonSongText
} from "../season/SeasonSlider";

const SeasonSong = ({ songData }) => {
    return (
        <>
            <SeasonSongImageContainer>
                <SeasonSongImageElement src={songData.image} alt={songData.title} />
            </SeasonSongImageContainer>
            <SeasonSongText>
                <p className="season-song-text-p">
                    <span className="season-song-text-span">{songData.title}</span>
                    {songData.artist}
                </p>
            </SeasonSongText>
        </>
    );
};

export default SeasonSong;