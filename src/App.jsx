import "./App.css";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import { SidebarComponent } from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import FirstPage from "./pages/FirstPage";
import ViewWorkout from "./pages/dashboard/Workout/ViewWorkout";
import Workout from "./pages/dashboard/Workout/Workout";
import Nutrition from "./pages/dashboard/Nutrition/Nutrition";
import ViewNutrition from "./pages/dashboard/Nutrition/ViewNutrition";

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
          <Route path="/workout/:id" element={<ViewWorkout />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutrition/:id" element={<ViewNutrition />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
