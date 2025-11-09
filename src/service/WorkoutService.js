import { allApiEndPoints } from "./Apiurl";
import axiosInstance from "./interceptor/Interceptor";

export class workoutService {
    async AddWorkout(body) {
        try {
            const response = await axiosInstance.post(allApiEndPoints.createWorkout, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;

        } catch (error) {
            console.error("Workout cannot add add:", error);
            throw error;
        }
    }

    async AllWorkouts() {
        try {
            const response = await axiosInstance.get(allApiEndPoints.getAllWorkout)
            
            return response.data;
        } catch (error) {
            console.log("error fetchin all workouts", error);
        }

    }
    async getWorkoutById(id) {
        try {
            const response = await axiosInstance.get(`${allApiEndPoints.getWorkoutByid}/${id}`)
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            console.log("error fetchin all workouts", error);
        }

    }
       async editWorkout(body, id) {
        try {
            const response = await axiosInstance.put(`${allApiEndPoints.getWorkoutByid}/${id}` , body)
            console.log("edit resposne", response.data);
            
            return response.data;
        } catch (error) {
            console.log("error fetchin all workouts", error);
        }

    }
        async deleteWorkout(id) {
        try {
            const response = await axiosInstance.delete(`${allApiEndPoints.getWorkoutByid}/${id}`)
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            console.log("error fetchin all workouts", error);
        }

    }
}
