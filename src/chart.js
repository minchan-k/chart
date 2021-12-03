import {useState,useEffect, useRef} from 'react'
// import socketIOClient from "socket.io-client";
import {LineChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    Legend,
    Line} from 'recharts'


// const ENDPOINT = "http://127.0.0.1:4001";


function Chart() {
    const [response, setResponse] = useState([]);
    const [time,setTime] = useState('');
    const [arr,setArr] = useState([]);
    const timeoutRef = useRef(null);
    function validate() {
        setArr((prevState)=> prevState.length >= 70 ?  [...prevState,{X:(Math.random()>=0.5)? 5 : 0}].slice(1) : [...prevState,{X:(Math.random()>=0.5)? 5 : 0}])
    }
    console.log(1)

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }
        let interval = 6000;
        let speed = 300;
        for(let i=0;i<interval;i++){
            timeoutRef.current = setTimeout(()=> {
                timeoutRef.current = null;
                validate()
            },i*speed);
        }
    },[]);
    return (
        <div>
            <h1>{time}</h1>
            <LineChart width={730} height={250} data={arr}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />

                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="X" stroke="#8884d8" isAnimationActive={false} />

            </LineChart>

        </div>
    );
}

export default Chart;
