"use client"
import React, { Component } from 'react';
import axios from 'axios';
import StarRating from '../albumTest/StarRating.js';// StarRating 컴포넌트의 경로를 적절히 수정해야 합니다.


class AlbumManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album: [],
            newAlbum: {
                title: '',
                albumInfo: '',
                // Add other album fields here
            },
            searchKeyword: '',
            searchResults: [] // Initialize searchResults state
        };
    }

    componentDidMount() {
        this.loadAlbums();
    }

    loadAlbums = () => {
        axios.get('/api/albums') // Replace with your API endpoint
            .then((response) => {
                this.setState({ albums: response.data });
            })
            .catch((error) => {
                console.error('Error loading albums:', error);
            });
    };

    handleInputChange = (e) => {
        this.setState({ searchKeyword: e.target.value });
    };

    handleAddSong = () => {
        axios.post('/api/albums', this.state.newAlbum) // Replace with your API endpoint
            .then(() => {
                this.loadAlbums();
                this.setState({
                    newAlbum: {
                        title: '',
                        albumInfo: '',
                        // Reset other song fields here
                    },
                });
            })
            .catch((error) => {
                console.error('Error adding album:', error);
            });
    };

    handleSearch = () => {
        const { searchKeyword } = this.state;
        axios.get(`/api/albums/search?title=${searchKeyword}`) // Replace with your API endpoint
            .then((response) => {
                console.log("search called");
                console.log(response.data);
                this.setState({ searchResults: response.data }); // Update searchResults instead of songs
            })
            .catch((error) => {
                console.error('Error searching albums:', error);
            });
    };

    render() {
        const { albums, newSong, searchKeyword } = this.state;
        console.log(albums);

        return (
            <div className="max-w-md mx-auto p-4">
                <h2 className="text-3xl font-semibold mb-4">Album Manager</h2>

                {/* Search */}
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Search Albums</h3>
                    <input
                        type="text"
                        name="searchKeyword"
                        placeholder="Search by title"
                        value={searchKeyword}
                        onChange={this.handleInputChange}
                        className="border rounded-md p-2 w-full mb-2"
                    />
                    <button onClick={this.handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Search
                    </button>
                </div>

                {/* Search Results */}
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Search Results</h3>
                    <ul>
                        {this.state.searchResults.map((album) => ( // Update this line
                            <li key={album.albumId} className="border-b py-2">
                                <p>{album.albumTitle}</p>
                                <p className="text-gray-600">{album.albumInfo}</p>
                                <img src={album.coverPhoto} alt={album.title} /> {/* 추가: 앨범 사진 표시 */}
                                <a href={album.musicVideoLink} target="_blank" rel="noopener noreferrer">Music Video</a> {/* 뮤직 비디오 링크 추가 */}
                                <p>
                                    <StarRating rating={album.rating} /> {/* StarRating 컴포넌트로 평점 표시 */}
                                </p>
                                <p>댓글수 {album.replyCount}개, ❤ {album.likes}</p>
                                <p>{album.albumHashtags}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );

    }
}

export default AlbumManager;