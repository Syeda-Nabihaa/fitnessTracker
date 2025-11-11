import { allApiEndPoints } from "./Apiurl";
import axiosInstance from "./interceptor/Interceptor";

export class NutritionService {
    async AddNutrition(body) {
        try {
            const response = await axiosInstance.post(allApiEndPoints.createNutrition, body, {
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

    async AllNutrition() {
        try {
            const response = await axiosInstance.get(allApiEndPoints.getAllNutrition)
            
            return response.data;
        } catch (error) {
            console.log("error fetchin all workouts", error);
        }

    }
    async getNutritionById(id) {
        try {
            const response = await axiosInstance.get(`${allApiEndPoints.getNutritionById}/${id}`)
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            console.log("error fetchin all workouts", error);
        }

    }
    //    async editWorkout(body, id) {
    //     try {
    //         const response = await axiosInstance.put(`${allApiEndPoints.getWorkoutByid}/${id}` , body)
    //         console.log("edit resposne", response.data);
            
    //         return response.data;
    //     } catch (error) {
    //         console.log("error fetchin all workouts", error);
    //     }

    // }
        async deleteNutrition(id) {
        try {
            const response = await axiosInstance.delete(`${allApiEndPoints.deleteNutrition}/${id}`)
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            console.log("error fetchin all workouts", error);
        }

    }
}
