import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/client';
import Chart from '../src/chart';
import RealTime from '../src/RealTimeChart';
import Apex from '../src/apexcharts';

ReactDOM.render(
    <React.StrictMode>
        {/*<App />*/}
        {/*<Chart />*/}
        <RealTime />
        {/*<Apex />*/}
    </React.StrictMode>,
  document.getElementById('root')
);
