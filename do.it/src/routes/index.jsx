import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { useEffect, useState } from "react";

function RoutesApp() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@Doit:token"));

    if (token) {
      return setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <Routes>
      <Route path="/" element={<Home authenticated={authenticated} />}></Route>
      <Route
        path="/signup"
        element={<Signup authenticated={authenticated} />}
      ></Route>
      <Route
        path="/login"
        element={
          <Login
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        }
      ></Route>
      <Route
        path="/dashboard"
        element={<Dashboard authenticated={authenticated} />}
      ></Route>
    </Routes>
  );
}

export default RoutesApp;
