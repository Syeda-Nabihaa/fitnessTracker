import { useState } from "react";

export function AddWorkoutModal({ open, setOpen }) {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "", weight: "", notes: "" }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", weight: "", notes: "" }]);
  };

  const updateExercise = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg space-y-4">
        <h2 className="text-xl font-bold">Add Workout</h2>

        <input 
          placeholder="Category (e.g., Chest Day)" 
          className="w-full border p-2 rounded"
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        />

        <input 
          type="date"
          className="w-full border p-2 rounded"
          value={date} 
          onChange={(e) => setDate(e.target.value)}
        />

        <h3 className="font-semibold mt-3">Exercises</h3>

        {exercises.map((e, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 border p-3 rounded-lg bg-gray-50">
            <input placeholder="Name" className="border p-1 rounded" value={e.name} onChange={(ev) => updateExercise(i, "name", ev.target.value)} />
            <input placeholder="Sets" className="border p-1 rounded" value={e.sets} onChange={(ev) => updateExercise(i, "sets", ev.target.value)} />
            <input placeholder="Reps" className="border p-1 rounded" value={e.reps} onChange={(ev) => updateExercise(i, "reps", ev.target.value)} />
            <input placeholder="Weight" className="border p-1 rounded" value={e.weight} onChange={(ev) => updateExercise(i, "weight", ev.target.value)} />
            <input placeholder="Notes (optional)" className="col-span-2 border p-1 rounded" value={e.notes} onChange={(ev) => updateExercise(i, "notes", ev.target.value)} />
          </div>
        ))}

        <button className="text-blue-600 text-sm" onClick={addExercise}>+ Add Exercise</button>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 border rounded" onClick={() => setOpen(false)}>Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
        </div>

      </div>
    </div>
  );
}
