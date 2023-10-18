import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const LikeButton = ({ album, localLikes, setLocalLikes }) => {
    const {userState} = useContext(UserContext);
    const [isLiked, setIsLiked] = useState(false); // isLiked 상태를 useState로 정의



    // useEffect(() => {
    //     // 앨범의 현재 좋아요 수를 가져오는 요청을 서버로 보냅니다.
    //     axios.get(`/api/albums/${albumId}/likes`)
    //         .then((response) => {
    //             setLikes(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("Failed to fetch album likes:", error);
    //         });
    // }, [albumId]);


    if (!userState.isAuthenticated) {
        return <p>Please log in to like this album.</p>;
    }

    const handleLike = async () => {
        setIsLiked(!isLiked);
        const updatedLikes = isLiked ? localLikes - 1 : localLikes + 1;
        console.log('bp1')
        if (typeof album.albumId === 'number') { // albumId가 숫자인 경우에만 요청 보내도록
            setIsLiked(!isLiked);


            // 서버에 앨범 좋아요 정보를 저장하기 위한 HTTP 요청을 보냅니다.
            const response = await fetch(`/api/albums/likes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    likes: isLiked ? localLikes : localLikes + 1, // 좋아요 토글
                    albumId : album.albumId,
                }),
            });

            if (response.ok) {
                // 좋아요 수를 로컬로 업데이트합니다.
                const data = await response.json(); // Parse the response as JSON
                setIsLiked(!isLiked);
                setLocalLikes((prevLocalLikes) => ({
                    ...prevLocalLikes,
                    [album.albumId]: data.likes, // Update the likes for the specific album
                }));
            } else {
                console.error("앨범 좋아요 업데이트에 실패했습니다.");
            }
        }
    };

    return (
        <button
            disabled={!userState.isAuthenticated}
            onClick={handleLike}
        >
            {isLiked ? (
                <FontAwesomeIcon icon={faHeart} color="red"/>
            ) : (
                <FontAwesomeIcon icon={faHeart} color="black"/>
            )}
        </button>
    );
}
export default LikeButton;