import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/demo/main";
import ProjectHomepage from "./pages/home/main";

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<ProjectHomepage/>} />
        <Route path="/demo" element={<Home/>} />
 
      </Routes>
    </Router>
  )
}