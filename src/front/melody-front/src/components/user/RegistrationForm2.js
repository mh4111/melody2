import React, { useState } from 'react';

function RegistrationForm2() {
    // Define state variables for form fields
    //const [soloArtistsId, setSoloArtistsId] = useState('');
    //const [singerId, setSingerId] = useState(null); // 초기값은 null로 설정
    const [singerName, setSingerName] = useState('');
    const [singerPhoto, setSingerPhoto] = useState('');
    const [singerInfo, setSingerInfo] = useState('');
    const [singerHashtags, setSingerHashtags] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a user object with the form data
        const soloArtists = {
            //soloArtistsId,
            singerName,
            singerPhoto,
            singerInfo,
            singerHashtags,
        };

        try {
            // Send a POST request to the backend API
            const response = await fetch('/api/SoloArtists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(soloArtists),
            });

            if (response.ok) {
                // Registration successful, you can redirect the user to a success page
                alert('Registration successful!');
                // Optionally, redirect to a success page or perform other actions
            } else {
                // Registration failed, display an error message
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle any network or other errors here
        }
    };

    return (
        <div className="container mx-auto p-8">
            <section className="signup" id="signup">
                <div className="section-inner">
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                        <h1 className="text-2xl font-bold mb-4">SOLO ARTISTS</h1>
                        <div className="space-y-4">
                            <div>
                                <label className="block">SINGER NAME</label>
                                <input type="text" value={singerName} onChange={(e) => setSingerName(e.target.value)} required className="w-full rounded border px-3 py-2" />
                                {/* Add error message div */}
                            </div>

                            <div>
                                <label className="block">SINGER PHOTO</label>
                                <input type="text" value={singerPhoto} onChange={(e) => setSingerPhoto(e.target.value)} required className="w-full rounded border px-3 py-2" />
                                {/* Add error message div */}
                            </div>


                            <div>
                                <label className="block">SINGER INFO</label>
                                <input type="text" value={singerInfo} onChange={(e) => setSingerInfo(e.target.value)} required className="w-full rounded border px-3 py-2" />
                                {/* Add error message div */}
                            </div>

                            <div>
                                <label className="block">SINGER HASHTAGS</label>
                                <input type="text" value={singerHashtags} onChange={(e) => setSingerHashtags(e.target.value)} required className="w-full rounded border px-3 py-2" />
                                {/* Add error message div */}
                            </div>

                            <div>
                                <input type="submit" value="CREATE" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer" />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default RegistrationForm2;