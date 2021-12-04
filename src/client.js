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
} from "recharts";

const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling']
})

const App = () => {
    const [data, setData] = useState([]);
    // 1. listen for a cpu event and update the state
    useEffect(() => {
        socket.on('cpu', (cpuPercent) => {
            setData(prevData => [...prevData.slice(-11), cpuPercent]);
        })
    }, []);
    // 2. render the line chart using the state
    return (
        <>
            <h1>Real Time CPU Usage</h1>
            <LineChart width={1200} height={300} data={data}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" angle={3} />
                <YAxis />
                <CartesianGrid strokeDasharray="3"/>
                <Legend align="left" verticalAlign='middle'
                        layout="vertical"
                        margin={{right: 40}}/>
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8"
                      dot={false} isAnimationActive={false} />
            </LineChart>
        </>
    )
}

export default App;
