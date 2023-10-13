"use client"
import React, {useContext, useState} from 'react';
import {UserContext} from "../../../contexts/UserContext";

function CreatePlaylistForm() {
    //get user data from context
    const { userState, userDispatch } = useContext(UserContext);

    // Define state variables for form fields
    const [playlistName, setPlaylistName] = useState('');
    const [description, setDescription] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [playlistHashtags, setPlaylistHashtags] = useState('');


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();



        const userAccountId = userState.user.userAccountId


        // Create a playlist object with the form data
        const playlist = {
            playlistName,
            userAccountId,
            description,
            createdDate,
            playlistHashtags
        };
        console.log(playlist);

        try {
            // Send a POST request to the backend API to insert data into the "Playlist" table
            const response = await fetch('/api/playlists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playlist),
            });

            if (response.ok) {
                // Data insertion successful, you can redirect the user to a success page
                alert('Playlist created successfully!');
                // Optionally, redirect to a success page or perform other actions
            } else {
                // Data insertion failed, display an error message
                alert('Failed to create the playlist. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle any network or other errors here
        }
    };

    return (
        <div className="container mx-auto p-8">
            <section className="create-playlist" id="create-playlist">
                <div className="section-inner">
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                        <h1 className="text-2xl font-bold mb-4">CREATE PLAYLIST</h1>
                        <div className="space-y-4">
                            <div>
                                <label className="block">Playlist Name</label>
                                <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} required className="w-full rounded border px-3 py-2" />
                            </div>

                            <div>
                                <label className="block">Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full rounded border px-3 py-2" />
                            </div>

                            <div>
                                <label className="block">Created Date</label>
                                <input type="date" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)} required className="w-full rounded border px-3 py-2" />
                            </div>

                            <div>
                                <label className="block">Playlist Hashtags</label>
                                <input type="text" value={playlistHashtags} onChange={(e) => setPlaylistHashtags(e.target.value)} required className="w-full rounded border px-3 py-2" />
                            </div>

                            <div>
                                <input type="submit" value="CREATE PLAYLIST" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer" />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default CreatePlaylistForm;
