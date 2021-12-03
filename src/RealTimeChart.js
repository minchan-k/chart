import io from 'socket.io-client';
import React from 'react';
import { useEffect, useState } from 'react';
import {
    Line,
    LineChart,
    Tooltip,
    CartesianGrid,
    Legend,
    XAxis,
    YAxis,
    ResponsiveContainer
} from "recharts";

const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling']
})

const RealTimeChart = () => {
    const arr = [];
    for (let i = 0; i < 119; i++) {
        arr.push({name: 'no signal', value: 0});
    }
    const [data, setData] = useState(arr);
    // 1. listen for a cpu event and update the state
    useEffect(() => {
        socket.on('cpu', (cpuPercent) => {
            setData(prevData => [...prevData.slice(-119), cpuPercent]);
        })
    }, []);
    // 2. render the line chart using the state
    return (
        <>
            <h1>Real Time CPU Usage</h1>
            <ResponsiveContainer width={1000} height={500} >
                <LineChart data={data}
                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" angle={5} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3"/>
                    <Legend align="left" verticalAlign='middle'
                            layout="vertical"
                            margin={{right: 40}}/>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default RealTimeChart;
