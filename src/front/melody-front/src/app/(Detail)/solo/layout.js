"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SingerDetailPage() {
    const { singerId = '' } = useParams();
    const [singerData, setSingerData] = useState({});
    const [album, setAlbum] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 데이터 로딩 시작
        setLoading(true);
        setError(null); // 에러 초기화

        if (!singerId) {
            // singerId가 없으면 오류 처리 또는 리디렉션을 수행
            setError('Singer ID is missing.');
            setLoading(false);
            return;
        }

        // 가수 정보를 가져오는 함수 (예: /api/soloartists/:singerId)
        fetch(`/api/soloartists/${singerId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status})`);
                }
                return response.json();
            })
            .then((data) => {
                if (!data) {
                    throw new Error('Empty response data'); // 빈 응답 데이터 처리
                }
                setSingerData(data);
                // 가수 정보 로딩 완료
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching singer data: ', error);
                setError(error.message); // 에러 메시지만 저장
                setLoading(false);
            });

        // 가수의 앨범 정보를 가져오는 함수 (예: /api/soloartists/:singerId/albums)
        fetch(`/api/soloartists/${singerId}/albums`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.status})`);
                }
                return response.json();
            })
            .then((data) => {
                if (!data) {
                    throw new Error('Empty response data'); // 빈 응답 데이터 처리
                }
                setAlbum(data); // 변경: "albums"를 "album"로 변경
                // 앨범 정보 로딩 완료
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching album: ', error); // 변경: "albums"를 "album"로 변경
                setError(error.message); // 에러 메시지만 저장
                setLoading(false);
            });
    }, [singerId]);

    // ... 이후 코드 ...

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>{singerData.singerName}</h1>
            <img src={singerData.singerPhoto} alt={singerData.singerName} />
            <p>{singerData.singerInfo}</p>
            <p>Hashtags: {singerData.singerHashtags}</p>

            <h2>Album</h2>
            <ul>
                {album.map((album) => (
                    <li key={album.albumId}>
                        <h3>{album.albumTitle}</h3>
                        <img src={album.coverPhoto} alt={album.albumTitle} />
                        <p>Release Date: {album.releaseDate}</p>
                        <p>Album Info: {album.albumInfo}</p>
                        <p>Rating: {album.rating}</p>
                        <p>Likes: {album.likes}</p>
                        <p>Music Video Link: <a href={album.musicVideoLink}>{album.musicVideoLink}</a></p>
                        <p>Hashtags: {album.albumHashtags}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SingerDetailPage;
