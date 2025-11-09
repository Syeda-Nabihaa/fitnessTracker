import { useEffect, useState } from "react";
import { workoutService } from "../service/WorkoutService";

export function AddWorkoutModal({ open, setOpen, refreshWorkouts }) {
  const service = new workoutService();

  const [newWorkout, setNewWorkout] = useState({
    category: "",
    date: "",
    exercises: [{ name: "", sets: "", reps: "", weight: "", notes: "" }],
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // Add a new empty exercise
  const addExercise = () => {
    setNewWorkout({
      ...newWorkout,
      exercises: [...newWorkout.exercises, { name: "", sets: "", reps: "", weight: "", notes: "" }],
    });
  };

  // Update exercise field
  const updateExercise = (index, key, value) => {
    const updatedExercises = [...newWorkout.exercises];
    updatedExercises[index][key] = value;
    setNewWorkout({ ...newWorkout, exercises: updatedExercises });
  };

  // Update category/date
  const updateField = (key, value) => {
    setNewWorkout({ ...newWorkout, [key]: value });
  };

  // Submit workout
  const saveWorkout = async () => {
    if (!newWorkout.category || !newWorkout.date) {
      alert("Category and Date are required");
      return;
    }

    setLoading(true);
    try {
      const response = await service.AddWorkout(newWorkout);
      console.log("Workout added:", response);

      // Reset form
      setNewWorkout({
        category: "",
        date: "",
        exercises: [{ name: "", sets: "", reps: "", weight: "", notes: "" }],
      });
      setOpen(false);

      if (refreshWorkouts) refreshWorkouts(); // reload workouts list

    } catch (error) {
      console.error("Error adding workout:", error);
      alert("Failed to add workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg space-y-4">
        <h2 className="text-xl font-bold">Add Workout</h2>

        <input
          placeholder="Category (e.g., Chest Day)"
          className="w-full border p-2 rounded"
          value={newWorkout.category}
          onChange={(e) => updateField("category", e.target.value)}
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={newWorkout.date}
          onChange={(e) => updateField("date", e.target.value)}
        />

        <h3 className="font-semibold mt-3">Exercises</h3>

        {newWorkout.exercises.map((e, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 border p-3 rounded-lg bg-gray-50">
            <input placeholder="Name" className="border p-1 rounded" value={e.name} onChange={(ev) => updateExercise(i, "name", ev.target.value)} />
            <input placeholder="Sets" className="border p-1 rounded" value={e.sets} onChange={(ev) => updateExercise(i, "sets", ev.target.value)} />
            <input placeholder="Reps" className="border p-1 rounded" value={e.reps} onChange={(ev) => updateExercise(i, "reps", ev.target.value)} />
            <input placeholder="Weight" className="border p-1 rounded" value={e.weight} onChange={(ev) => updateExercise(i, "weight", ev.target.value)} />
            <input placeholder="Notes (optional)" className="col-span-2 border p-1 rounded" value={e.notes} onChange={(ev) => updateExercise(i, "notes", ev.target.value)} />
          </div>
        ))}

        <button className="text-blue-600 text-sm" onClick={addExercise}>+ Add Exercise</button>

        <div className="flex justify-end gap-3 mt-3">
          <button className="px-4 py-2 border rounded" onClick={() => setOpen(false)}>Cancel</button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={saveWorkout}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}


export function EditWorkoutModal({ open, setOpen, workoutData, refreshWorkouts }) {
  const service = new workoutService();

  const [formData, setFormData] = useState({
    category: "",
    date: "",
    exercises: []
  });

  useEffect(() => {
    if (workoutData) {
      setFormData({
        category: workoutData.category,
        date: workoutData.date,
        exercises: workoutData.exercises
      });
    }
  }, [workoutData]);

  if (!open) return null;

  const updateExercise = (index, key, value) => {
    const updated = [...formData.exercises];
    updated[index][key] = value;
    setFormData({ ...formData, exercises: updated });
  };

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises,
        { name: "", sets: "", reps: "", weight: "", notes: "" }
      ],
    });
  };
const saveChanges = async () => {
  try {
    const payload = {
      category: formData.category,
      date: formData.date,
      exercises: formData.exercises.map(ex => ({
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        weight: ex.weight,
        notes: ex.notes || ""
      }))
    };

    const response = await service.editWorkout(payload, workoutData._id);
    console.log("Updated workout:", response);

    setOpen(false);
    refreshWorkouts();
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
    alert("Failed to update workout");
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Edit Workout</h2>

        <input
          className="w-full border p-2 rounded"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="Category"
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        <h3 className="font-semibold mt-3">Exercises</h3>

        {formData.exercises.map((ex, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 border p-3 rounded-lg bg-gray-50">
            <input className="border p-1 rounded" value={ex.name} onChange={(e) => updateExercise(i, "name", e.target.value)} placeholder="Name" />
            <input className="border p-1 rounded" value={ex.sets} onChange={(e) => updateExercise(i, "sets", e.target.value)} placeholder="Sets" />
            <input className="border p-1 rounded" value={ex.reps} onChange={(e) => updateExercise(i, "reps", e.target.value)} placeholder="Reps" />
            <input className="border p-1 rounded" value={ex.weight} onChange={(e) => updateExercise(i, "weight", e.target.value)} placeholder="Weight" />
            <input className="col-span-2 border p-1 rounded" value={ex.notes} onChange={(e) => updateExercise(i, "notes", e.target.value)} placeholder="Notes (optional)" />
          </div>
        ))}

        <button className="text-blue-600 text-sm" onClick={addExercise}>+ Add Exercise</button>

        <div className="flex justify-end gap-3 pt-3">
          <button className="px-4 py-2 border rounded" onClick={() => setOpen(false)}>Cancel</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700" onClick={saveChanges}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}