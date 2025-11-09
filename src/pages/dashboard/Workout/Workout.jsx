import { useEffect, useState } from "react";
import { AddWorkoutModal, EditWorkoutModal } from "../../../components/Modal";
import { workoutService } from "../../../service/WorkoutService";
import { useNavigate } from "react-router-dom";

export default function Workout() {
  const services = new workoutService();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [workouts, setworkouts] = useState([]);
  const navigate = useNavigate();
  async function AllWorkouts() {
    try {
      const response = await services.AllWorkouts();
      console.log("API Response:", response.workouts); // <-- check structure
      setworkouts(response?.workouts ?? []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await services.deleteWorkout(id);
      if (response.Workout) {
        setworkouts(AllWorkouts.filter((w) => w.id !== id));
        console.log("workout deleted succefuuly");
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  }

  useEffect(() => {
    AllWorkouts();
  }, []);

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

      {workouts.length > 0 ? (
        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total Exercises</th>
                <th className="p-3 text-center ">Action</th>
              </tr>
            </thead>

            <tbody>
              {workouts.map((w, i) => (
                <tr key={i} className="hover:bg-gray-50 border-b">
                  <td className="p-3">{w.category}</td>
                  <td className="p-3">{w.date}</td>
                  <td className="p-3">{w.exercises.length}</td>
                  <td className="p-3 flex justify-center  gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => navigate(`/workout/${w._id}`)}
                    >
                      View
                    </button>
                    <button
                      className="text-purple-500 hover:underline"
                      onClick={() => {
                        setSelectedWorkout(w);
                        setEditOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(w._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-3xl text-red-700 "> No workout found</p>
      )}
      {/* Table */}
      {/* <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Total Exercises</th>
              <th className="p-3 text-center ">Action</th>
            </tr>
          </thead>

          <tbody>
            {workouts.map((w, i) => (
              <tr key={i} className="hover:bg-gray-50 border-b">
                <td className="p-3">{w.category}</td>
                <td className="p-3">{w.date}</td>
                <td className="p-3">{w.exercises.length}</td>
                <td className="p-3 flex justify-center  gap-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/workout/${w._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="text-purple-500 hover:underline"
                    onClick={() => {
                      setSelectedWorkout(w);
                      setEditOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(w._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <AddWorkoutModal open={open} setOpen={setOpen} />
      <EditWorkoutModal
        open={editOpen}
        setOpen={setEditOpen}
        workoutData={selectedWorkout}
        refreshWorkouts={AllWorkouts}
      />
    </div>
  );
}
