import './App.css';
import Homepage from "./pages/Homepage";
import GameController from "./pages/GameController";
import {Routes, Route} from "react-router-dom";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>,
            <Route path="/controller/:gameId" element={<GameController/>}/>
        </Routes>
    );
}

export default App;
