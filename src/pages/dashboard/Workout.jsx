import { useState } from "react";
import { AddWorkoutModal } from "../../components/Modal";


export default function Workout() {
  const [open, setOpen] = useState(false);

  const workouts = [
    {
      category: "Chest Day",
      date: "2025-11-05",
      exercises: [
        { name: "Bench Press", sets: 4, reps: 10, weight: "40kg" },
        { name: "Incline Dumbbell Press", sets: 3, reps: 12, weight: "20kg" }
      ]
    },
    {
      category: "Cardio Session",
      date: "2025-11-04",
      exercises: [
        { name: "Treadmill", sets: "-", reps: "-", weight: "-", notes: "30 min jog" }
      ]
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Workouts</h2>
        <button 
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Workout
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Total Exercises</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {workouts.map((w, i) => (
              <tr key={i} className="hover:bg-gray-50 border-b">
                <td className="p-3">{w.category}</td>
                <td className="p-3">{w.date}</td>
                <td className="p-3">{w.exercises.length}</td>
                <td className="p-3 flex justify-end gap-2">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <AddWorkoutModal open={open} setOpen={setOpen} />

    </div>
  );
}
