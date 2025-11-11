import { environment } from "../environment/environment";

export const allApiEndPoints = {
  userSignup: `${environment.baseURL}signup`,
  userLogin: `${environment.baseURL}login`,

  //----------------------Workout endpoints---------------------------
  createWorkout: `${environment.baseURL}createworkout`,
  getAllWorkout: `${environment.baseURL}workouts`,
  getWorkoutByid: `${environment.baseURL}workout`,
  updateWorkout: `${environment.baseURL}workout`,
  deleteWorkout: `${environment.baseURL}workout`,


  // -----------------NUTRITION ENDPOINTS -----------------------------

    createNutrition: `${environment.baseURL}createnutrition`,
    getAllNutrition: `${environment.baseURL}nutrition`,
    getNutritionById: `${environment.baseURL}nutrition`,
    deleteNutrition: `${environment.baseURL}nutrition`,









};
