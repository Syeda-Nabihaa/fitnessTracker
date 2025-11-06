import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export function WorkoutChart() {
    
const workoutData = [
  { day: "Mon", workouts: 2 },
  { day: "Tue", workouts: 1 },
  { day: "Wed", workouts: 3 },
  { day: "Thu", workouts: 2 },
  { day: "Fri", workouts: 4 },
  { day: "Sat", workouts: 1 },
  { day: "Sun", workouts: 0 },
];
  return (
    <div className="bg-white p-6 rounded-xl shadow h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={workoutData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="workouts" stroke="#3b82f6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
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