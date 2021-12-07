import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/client';
import RealTime from '../src/RealTimeChart';
import ChartJS from '../src/chartjs';

ReactDOM.render(
    <React.StrictMode>
        {/*<App />*/}
        {/*<Chart />*/}
        {/*<RealTime />*/}
        {/*<Apex />*/}
        <ChartJS />
    </React.StrictMode>,
  document.getElementById('root')
);
