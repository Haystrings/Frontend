import React from 'react';
import VideoStream from './VideoStream';
import SpeedData from './SpeedData';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>VEHICULAR SPEED DETECTION SYSTEM</h1>
                <h3>Group 5B Project</h3>
            </header>
            <main>
                <div>
                    <VideoStream />
                </div>
                <div>
                    <SpeedData />
                </div>
            </main>
        </div>
    );
}

export default App;