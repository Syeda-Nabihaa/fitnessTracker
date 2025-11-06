import axios from "axios";
import { allApiEndPoints } from "./Apiurl";

export class AuthService {
     async UserSignIn(body) {
        try {
          const response = await axios.post(allApiEndPoints.userSignup, body, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          return response.data; 
        } catch (error) {
          // Log the complete error for debugging
          console.error("Signup error:", error);    
    
          
          throw error;
        }
      }
      async Userlogin(body) {
        try {
          const response = await axios.post(allApiEndPoints.userLogin, body, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          return response.data; 
        } catch (error) {
          // Log the complete error for debugging
          console.error("loggin error:", error);    
    
          
          throw error;
        }
      }
}

export default AuthService;