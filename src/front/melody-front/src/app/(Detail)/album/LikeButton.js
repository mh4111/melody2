import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";

const LikeButton = ({ albumId }) => {
    const { userState } = useContext(UserContext);
    const [isLiked, setIsLiked] = useState(false);

    if (!userState.isAuthenticated) {
        return <p>Please log in to like this album.</p>;
    }

    const handleLike = async () => {
        setIsLiked(!isLiked);

        if (!albumId) {
            console.error("Invalid albumId.");
            return;
        }

        try {
            const response = await axios.put(`/api/albums/${albumId}/like`, {
                increment: isLiked ? -1 : 1,
            });

            if (response.status === 200) {
                // Successful update, no need to update the state locally
            } else {
                console.error("Failed to update album likes.");
            }
        } catch (error) {
            console.error("Error while updating likes:", error);
        }
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