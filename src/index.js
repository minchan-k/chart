import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/client';
import Chart from '../src/chart';
import RealTime from '../src/RealTimeChart';
import Apex from '../src/apexcharts';
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
