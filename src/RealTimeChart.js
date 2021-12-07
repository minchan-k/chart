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
import styled from 'styled-components';

const Container = styled.div`
    height: 50vh;
    width: 100vw;
    font-weight: bold;
`;

const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling']
});

// 배열에 초기상태 집어넣기
const arr = [];
for (let i = 0; i < 120; i++) {
    arr.push({name: 'loading', value: 0});
}

const RealTimeChart = () => {
    const [data, setData] = useState(arr);

    useEffect(() => {
        // 초기 값을 넣지 않으면 server에서 데이터를 받기 전까지 오류가 생김
        let cpuPercent = {
            name: 'loading', value: 0
        };
        socket.on('cpu', (data) => {
            cpuPercent = data;
        });
        const interval = setInterval(() => {
            setData(prevData => [...prevData.slice(-119), cpuPercent]);
            // 시간을 길게 할수록 리랜더링 횟수가 줄어듬
        }, 100);
        return () => clearInterval(interval);
    },[]);

    return (
        <Container>
            <ResponsiveContainer width={"100%"} height={"100%"} >
                <LineChart data={data}
                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" angle={5} minTickGap={10} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3"/>
                    <Legend align="left" verticalAlign='middle'
                            layout="vertical"
                    />
                    <Line type="monotone" dataKey="value" stroke="#8884d8"
                          dot={false} isAnimationActive={false} />
                </LineChart>
            </ResponsiveContainer>
        </Container>
    )
}

export default RealTimeChart;
