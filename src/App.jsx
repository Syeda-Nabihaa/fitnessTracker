import "./App.css";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import { SidebarComponent } from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import Workout from "./pages/dashboard/Workout";
import FirstPage from "./pages/FirstPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<SidebarComponent />}>
          <Route path="/home" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
