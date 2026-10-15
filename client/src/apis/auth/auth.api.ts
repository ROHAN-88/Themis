import { app_axios_interface } from "@/axios/axiosInstance";
import type { login_types, signup_type } from "@/types/auth/login";

export const login_api = async (values: login_types) => {
  try {
    const response = await app_axios_interface.post("/auth/login", values);
    console.log("rese2", response);
    if (response.status === 200) {
      localStorage.setItem("email", response.data.data.email);
      localStorage.setItem("user_id", response.data.data.id);

      cookieStore.set("access_token", response.data.data.jwt_token);
    }
    return { success: true, message: "Login in Sucessfull" };
  } catch (error) {
    return { success: false, message: error };
  }
};
// signup - API call
export const signp_api = async (values: signup_type) => {
  return values;
};
