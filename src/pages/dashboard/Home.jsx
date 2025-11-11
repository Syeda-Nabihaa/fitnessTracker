import { Link } from "react-router-dom";
import { Cards } from "../../components/Cards";
import { CalorieChart, WorkoutChart } from "../../components/Chart";
import { workoutService } from "../../service/WorkoutService";
import { useEffect, useState } from "react";
import { NutritionService } from "../../service/NutritionService";

export default function Home() {
  const [workouts, setworkouts] = useState([]);

  const workoutservices = new workoutService();
  const nutritionservices = new NutritionService();

const [nutrition, setNutrition] = useState([]);
  async function AllNutrition() {
    try {
      const response = await nutritionservices.AllNutrition();
      console.log("API Response:", response.nutrition); // <-- check structure
      setNutrition(response?.nutrition ?? []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    AllNutrition();
  }, []);
function getTotal(nutrient) {
  return nutrition
    .flatMap(n => n.meals || [])         // loop through all meals from all nutrition entries
    .flatMap(meal => meal.items || [])   // flatten all items inside those meals
    .reduce((sum, item) => sum + Number(item[nutrient] || 0), 0); // sum up the nutrient
}

const totalCalories = getTotal("calories");
  async function AllWorkouts() {
    try {
      const response = await workoutservices.AllWorkouts();
      console.log("API Response:", response.workouts); // <-- check structure
      setworkouts(response?.workouts ?? []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    AllWorkouts();
  }, []);
  const data = [
    {
      title: "Total Workouts",
      progress: workouts.length,
    },
    {
      title: "Calories Burned",
      progress: totalCalories,
    },
    {
      title: "Avg Workout / Week",
      progress: 4,
    },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold">Welcome Back 👋</h2>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <Cards title={item.title} progress={item.progress} key={item.title} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className=" p-3">
          <p className="text-2xl font-semibold mb-3">Workouts</p>
          <WorkoutChart />
        </div>
        <div className=" p-3">
          <p className="text-2xl font-semibold mb-3">Calory</p>
          <CalorieChart />
        </div>
      </div>

      {workouts.length > 0 ?  (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Workouts</h3>

          <ul className="space-y-2">
            {workouts.slice(0,3).map((w) => (
              <>
                <li className="flex justify-between border-b pb-2">
                  <span>{w.category}</span>
                  <span className="text-sm text-gray-500">{w.date}</span>
                </li>
              </>
            ))}
          </ul>

          <div className="text-right mt-4">
            <Link to="/workout" className="text-blue-600 hover:underline">
              View all workouts →
            </Link>
          </div>
        </div>
      ) : (
        <p>No recent Workouts</p>
      )}
    </div>
  );
}
