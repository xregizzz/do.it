import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default RoutesApp;
