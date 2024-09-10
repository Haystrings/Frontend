import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './alldata.css';

const SpeedData = () => {
    const [speedData, setSpeedData] = useState({});

    useEffect(() => {
        const fetchSpeedData = async () => {
            try {
                const response = await fetch('https://89ac-102-89-84-228.ngrok-free.app/speed_data');
                const data = await response.json();
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
            Speed: speed.toFixed(2) + ' km/h',
        }));

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
