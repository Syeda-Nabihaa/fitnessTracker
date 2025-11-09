import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { workoutService } from "../service/WorkoutService";

export function WorkoutChart() {
  const services = new workoutService();

  const [workouts, setworkouts] = useState([]);

  async function AllWorkouts() {
    try {
      const response = await services.AllWorkouts();
      const workoutsArray = response?.workouts ?? [];

      // Transform for chart
      const chartData = workoutsArray.map((w) => ({
        day: w.date,
        totalExercises: w.exercises.length,
      }));
      console.log(chartData);

      setworkouts(chartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    AllWorkouts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow h-64">
      {workouts.length > 0 ?  <ResponsiveContainer width="100%" height="100%">
        <LineChart data={workouts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="totalExercises"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer> : <p>No workout</p>}
     
    </div>
  );
}

export function CalorieChart() {
  const calorieData = [
    { day: "Mon", calories: 1800 },
    { day: "Tue", calories: 2100 },
    { day: "Wed", calories: 2000 },
    { day: "Thu", calories: 1900 },
    { day: "Fri", calories: 2300 },
    { day: "Sat", calories: 2500 },
    { day: "Sun", calories: 1700 },
  ];
  return (
    <div className="bg-white p-6 rounded-xl shadow h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={calorieData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="calories" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
