import React from 'react';
import ExcelExportComponents from "./components/ExcelExportComponents";
import { students } from "./ExcelData";

const App = () => {
    return <>
        <ExcelExportComponents data={students} />
    </>;
}

export default App;