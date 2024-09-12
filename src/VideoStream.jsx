import React, { useEffect, useState } from 'react';
import './alldata.css';

const VideoStream = () => {
    const [videoUrl, setVideoUrl] = useState('https://fbcf-102-89-85-13.ngrok-free.app/video_feed');
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        setVideoUrl('https://fbcf-102-89-85-13.ngrok-free.app/video_feed');
    }, []);

    const startRecording = () => {
        fetch('https://fbcf-102-89-85-13.ngrok-free.app/start_recording')
            .then(response => response.json())
            .then(data => {
                console.log(data.status);
                setIsRecording(true);
            });
    };

    const stopRecording = () => {
        fetch('https://fbcf-102-89-85-13.ngrok-free.app/stop_recording')
            .then(response => response.json())
            .then(data => {
                console.log(data.status);
                setIsRecording(false);
            });
    };

    const handleDownload = () => {
        window.location.href = 'https://fbcf-102-89-85-13.ngrok-free.app/download_video';
    };

    return (
        <div>
            <h2>Live Video Stream</h2>
            <img
                src={videoUrl}
                alt="Video Stream"
                width="80%"
            />
            <div class = 'downloadbutton'>
                <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
                <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
                <button onClick={handleDownload} disabled={isRecording}>Download Video</button>
            </div>
        </div>
    );
};

export default VideoStream;