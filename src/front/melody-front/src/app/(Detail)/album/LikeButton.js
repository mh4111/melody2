import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ album }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);

    };

    return (
        <button onClick={handleLike}>
            {isLiked ? (
                <FontAwesomeIcon icon={faHeart} color="red" />
            ) : (
                <FontAwesomeIcon icon={faHeart} color="black" />
            )}
        </button>
    );
};

export default LikeButton;