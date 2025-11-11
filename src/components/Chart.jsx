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
import { NutritionService } from "../service/NutritionService";

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
  const services = new  NutritionService()
  const [nutrition , setNutrition] = useState([])
 async function AllNutrition() {
    try {
      const response = await services.AllNutrition();
      console.log("API Response:", response.nutrition); // <-- check structure
      setNutrition(response?.nutrition ?? []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    AllNutrition();
  }, []);

const mealData = nutrition
  .flatMap(n => n.meals || [])
  .map(meal => ({
    name: meal.mealType,
    value: meal.items?.length || 0, // number of food items per meal
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow h-64">
      <ResponsiveContainer width="100%" height="100%">
  <BarChart data={mealData}>
  <CartesianGrid strokeDasharray="1 1" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="value" fill="#f97316" />
</BarChart>
</ResponsiveContainer>

    </div>
  );
}
