import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/client';
import Chart from '../src/chart';

ReactDOM.render(
    <React.StrictMode>
        {/*<App />*/}
        <Chart />
    </React.StrictMode>,
  document.getElementById('root')
);
