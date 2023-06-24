import {BrowserRouter, Route, Routes} from "react-router-dom";
import LineGraph from "./Chart";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/statistic" element={<LineGraph/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
