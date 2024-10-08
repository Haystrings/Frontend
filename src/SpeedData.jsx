import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './alldata.css';

const SpeedData = () => {
    const [speedData, setSpeedData] = useState({});

    useEffect(() => {
        const fetchSpeedData = async () => {
            try {
                const response = await fetch('https://fbcf-102-89-85-13.ngrok-free.app/speed_data');
                const data = await response.json();
                console.log('Fetched speed data:', data); // Debug log
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
        const data = Object.entries(speedData).map(([vehicle, speed]) => ({
            VehicleID: vehicle,
            Speed: speed.toFixed(2), // Removed 'km/h' for simpler Excel data
        }));

        console.log('Data for Excel:', data); // Debug log

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Speed Data');

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
