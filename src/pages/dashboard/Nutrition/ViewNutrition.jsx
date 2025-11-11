import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NutritionService } from "../../../service/NutritionService";

export default function ViewNutrition() {
  const { id } = useParams();
  const [nutrition, setnutrition] = useState([]);
  const services = new NutritionService();


  async function getNutritionById() {
    try {
        const response = await services.getNutritionById(id);
         console.log("API Response:", response.nutrition);
         setnutrition(response?.nutrition ?? []);
         
       
    } catch (error) {
        console.log("errrorr fetchind data" , error);
    }
  }

  useEffect(()=>{
    getNutritionById()
  
  },[])


function getTotal(nutrient) {
  const meals = nutrition?.meals || []; // safe fallback
  return meals
    .flatMap(meal => meal.items || []) // also safe fallback for items
    .reduce((sum, item) => sum + Number(item[nutrient] || 0), 0);
}
const totalCalories = getTotal("calories");
  const totalProtein = getTotal("protein");
  const totalCarbs = getTotal("carbs");
  const totalFats = getTotal("fats");

  return (
  <div className="p-6 space-y-8">

    {/* Header */}
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Nutrition Summary – {nutrition.date}</h2>
     
    </div>

    {/* Daily Totals Card */}
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4">Daily Totals</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Calories</p>
          <p className="text-xl font-bold">{totalCalories}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Protein</p>
          <p className="text-xl font-bold">{totalProtein}g</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Carbs</p>
          <p className="text-xl font-bold">{totalCarbs}g</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Fats</p>
          <p className="text-xl font-bold">{totalFats}g</p>
        </div>
      </div>
    </div>

    {/* Meals Section */}
    <div className="space-y-6">
      {nutrition.meals?.map((meal) => (
        <div key={meal._id} className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 capitalize">{meal.mealType}</h3>

          <div className="space-y-4">
            {meal.items?.map((item) => (
              <div 
                key={item._id} 
                className=" rounded-lg p-4 bg-gray-50 transition"
              >
                <p className="font-medium">{item.name}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-2 text-sm text-gray-600">
                  <p><span className="font-semibold">Qty:</span> {item.quantity}</p>
                  <p><span className="font-semibold">Calories:</span> {item.calories}</p>
                  <p><span className="font-semibold">Protein:</span> {item.protein}g</p>
                  <p><span className="font-semibold">Carbs:</span> {item.carbs}g</p>
                  <p><span className="font-semibold">Fats:</span> {item.fats}g</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

  </div>
);

}
