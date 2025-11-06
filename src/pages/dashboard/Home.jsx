import { Link } from "react-router-dom";
import { Cards } from "../../components/Cards";
import { CalorieChart, WorkoutChart } from "../../components/Chart";

export default function Home() {
  const data = [
    {
      title: "Total Workouts",
      progress: 24,
    },
    {
      title: "Calories Burned",
      progress: "14,520 kcal",
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

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Workouts</h3>
        <ul className="space-y-2">
          <li className="flex justify-between border-b pb-2">
            <span>🏋️‍♂️ Chest Day Workout</span>
            <span className="text-sm text-gray-500">2 hrs ago</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span>🚴 Cardio Session</span>
            <span className="text-sm text-gray-500">Yesterday</span>
          </li>
          <li className="flex justify-between">
            <span>🦵 Leg Day Workout</span>
            <span className="text-sm text-gray-500">2 days ago</span>
          </li>
        </ul>

        <div className="text-right mt-4">
          <Link to="/workout" className="text-blue-600 hover:underline">
            View all workouts →
          </Link>
        </div>
      </div>
    </div>
  );
}
