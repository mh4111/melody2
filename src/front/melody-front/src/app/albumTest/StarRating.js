import React from 'react';

function StarRating({ rating }) {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            // 별점보다 작은 값은 활성 상태로 표시
            stars.push(<span key={i}>&#9733;</span>);
        } else {
            // 별점보다 큰 값은 비활성 상태로 표시
            stars.push(<span key={i}>&#9734;</span>);
        }
    }

    return (
        <div className="star-rating">
            {stars}
        </div>
    );
}

export default StarRating;