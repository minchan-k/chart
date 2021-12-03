import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/client';
import Chart from '../src/chart';
import RealTime from '../src/RealTimeChart';

ReactDOM.render(
    <React.StrictMode>
        {/*<App />*/}
        {/*<Chart />*/}
        <RealTime />
    </React.StrictMode>,
  document.getElementById('root')
);
