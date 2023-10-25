"use client"
import { useState } from 'react';
import ReactPlayer from "react-player";

function TestApi() {
    const [response, setResponse] = useState(null);

    const fetchData = async () => {
        try {
            const dataToSend = {
                "question" : "에이 핑크 노래 추천해줘"
            };

            const res = await fetch('https://mqco97wso7.execute-api.ap-northeast-2.amazonaws.com/bard-api/api/getBardAnswer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Test API Page</h1>
            <button onClick={fetchData}>Fetch Data</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
}

export default TestApi;
