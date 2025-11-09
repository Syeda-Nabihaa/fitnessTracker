import React, { useEffect, useState } from "react";
import { workoutService } from "../../../service/WorkoutService";
import { useParams } from "react-router-dom";


export default function ViewWorkout() {
    const {id} = useParams();
  const [workout, setworkouts] = useState([]);
  const services = new workoutService();
  async function getworkoutbyid() {
    try {
      const response = await services.getWorkoutById(id);
      console.log("API Response:", response.workout); // <-- check structure
      setworkouts(response?.workout ?? []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getworkoutbyid();
  }, []);

  return (
    <div className="space-y-6">
  {/* Header */}
    <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{workout.category}</h2>
        <h2 className="text-2xl font-bold">{workout.date}</h2>
        
      </div>


  {/* Exercises Card */}
  <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">Exercises</h3>

    <div className="space-y-4">
      {workout.exercises?.map((ex) => (
        <div
          key={ex._id}
          className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-blue-400 transition"
        >
          <p className="text-lg font-medium text-gray-800">{ex.name}</p>

          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mt-2">
            <p><span className="font-semibold">Sets:</span> {ex.sets}</p>
            <p><span className="font-semibold">Reps:</span> {ex.reps}</p>
            <p><span className="font-semibold">Weight:</span> {ex.weight}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
