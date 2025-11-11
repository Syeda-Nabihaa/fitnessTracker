import { useEffect, useState } from "react";
import { NutritionService } from "../../../service/NutritionService";
import { useNavigate } from "react-router-dom";

export default function Nutrition() {
  const services = new NutritionService();
  const navigate = useNavigate()
  const [nutrition, setNutrition] = useState([]);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Nutrition Tracking</h2>
        <button
        //   onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add entry
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-3">Date</th>
              <th className="p-3">Meal Type</th>
              <th className="p-3">Food Items</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {nutrition.map((entry) =>
              entry.meals.map((meal, index) => (
                <tr
                  key={meal._id + index}
                  className="hover:bg-gray-50 border-b"
                >
                  <td className="p-3">{entry.date}</td>
                  <td className="p-3 capitalize">{meal.mealType}</td>
                  <td className="p-3">
                    {meal.items.map((i) => (
                      <span
                        key={i._id}
                        className="inline-block bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded mr-2 mb-1"
                      >
                        {i.name} ({i.calories} cal)
                      </span>
                    ))}
                  </td>
                  <td className="p-3 flex justify-end gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => navigate(`/nutrition/${entry._id}`)}
                    >
                      View
                    </button>{" "}
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {/* <AddNutritionModal open={open} setOpen={setOpen} refresh={getNutritions} /> */}
    </div>
  );
}
