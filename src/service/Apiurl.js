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

  
  
  

  

  

};
