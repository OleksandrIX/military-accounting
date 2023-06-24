import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import LineGraph from "./Chart";
import Main from "./Main";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/statistic" element={<LineGraph/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;