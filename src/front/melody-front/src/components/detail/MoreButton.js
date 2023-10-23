import React, { useState, useEffect } from "react";
import axios from "axios";

const Lyrics = ({ song }) => {
    const [isMore, setIsMore] = useState(false);
    const [songs, setSongs] = useState([]);

    useEffect(() => {

        setIsMore(false);

        axios
            .get("api/songs")
            .then((response) => {
                setSongs(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleMoreClick = () => {

        setIsMore(!isMore);
        window.scrollTo(0, 0);
    };

    return (
        <div className="section_lyrics mb-4">
            <h3>
        <span className="section_title">
          <h1><strong>가사</strong></h1>
        </span>
            </h3>
            <div className="lyrics mb-4">
                {isMore ? (
                    <p>{song.lyrics}</p>
                ) : (
                    <p>{song.lyrics.slice(0, 100)}</p>
                )}
            </div>
            <a href="#" className="btn_more" onClick={handleMoreClick}>더보기</a>
        </div>
    );
};
export default Lyrics;
