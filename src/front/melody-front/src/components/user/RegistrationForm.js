import React, { useState } from 'react';

function RegistrationForm() {
    // Define state variables for form fields
    const [name, setName] = useState('');
    const [accountId, setAccountId] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [hashtag, setHashtag] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a user object with the form data
        const user = {
            name,
            accountId,
            birthDate,
            email,
            gender,
            password,
            hashtag
        };

        try {
            // Send a POST request to the backend API
            const response = await fetch('/api/user-accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
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
                        <h1 className="text-2xl font-bold mb-4">SIGN UP</h1>
                        <div className="space-y-4">
                            <div>
                                <label className="block">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded border px-3 py-2" />
                                {/* Add error message div */}
                            </div>

                            <div>
                                <label className="block">AccountId</label>
                                <input type="text" value={accountId} onChange={(e) => setAccountId(e.target.value)} required className="w-full rounded border px-3 py-2" />
                                {/* Add error message div */}
                            </div>

                            <div>
                                <label className="block">Birth Date</label>
                                <input type="date" id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required className="w-full rounded border px-3 py-2" />
                                {/* Add error message div */}
                            </div>

                            <div>
                                <label className="block">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded border px-3 py-2" />
                                {/* Add error message div */}
                            </div>

                            <div>
                                <label className="block">Gender</label>
                                <div className="space-x-4">
                                    <label htmlFor="Male">
                                        <input type="radio" name="gender" value="Male" id="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} />
                                        <span className="ml-1">Male</span>
                                    </label>
                                    <label htmlFor="Female">
                                        <input type="radio" name="gender" value="Female" id="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} />
                                        <span className="ml-1">Female</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded border px-3 py-2" />
                                {/* Add error message div */}
                            </div>

                            <div>
                                <label className="block">Confirm Password</label>
                                <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required className="w-full rounded border px-3 py-2" />
                                {/* Add error message div */}
                            </div>

                            <div>
                                <label className="block">Input HashTag</label>
                                <input type="text" value={hashtag} onChange={(e) => setHashtag(e.target.value)} required className="w-full rounded border px-3 py-2" />
                                {/* Add error message div */}
                            </div>

                            <div>
                                <input type="submit" value="SIGN UP" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer" />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default RegistrationForm;
