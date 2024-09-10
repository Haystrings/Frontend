import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './alldata.css';  // Adjust the path if necessary

const SpeedData = () => {
    const [speedData, setSpeedData] = useState({});

    useEffect(() => {
        const fetchSpeedData = async () => {
            try {
                const response = await fetch('https://89ac-102-89-84-228.ngrok-free.app/speed_data');
                const data = await response.json();
                console.log('Fetched speed data:', data); // Log the fetched data for debugging
                setSpeedData(data);
            } catch (error) {
                console.error('Error fetching speed data:', error);
            }
        };

        fetchSpeedData();
        const interval = setInterval(fetchSpeedData, 5000); // Refresh data every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const downloadExcel = () => {
        console.log("Speed Data Before Download:", speedData); // Log the data before exporting

        if (!speedData || Object.keys(speedData).length === 0) {
            console.error("No speed data available to download.");
            return;
        }

        // Convert speedData to array of objects suitable for Excel
        const data = Object.entries(speedData).map(([vehicle, speed]) => ({
            VehicleID: vehicle,
            Speed: `${speed.toFixed(2)} km/h`,
        }));

        // Create a new workbook and add a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Speed Data');

        // Write file and trigger download
        XLSX.writeFile(workbook, 'speed_data.xlsx');
    };

    return (
        <div>
            <h2>Speed Data Per Frame</h2>
            <button onClick={downloadExcel}>Download Data as Excel</button>
        </div>
    );
};

export default SpeedData;
