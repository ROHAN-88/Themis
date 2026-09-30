import { app_axios_interface } from "@/axios/axiosInstance";
import type { login_types } from "@/types/auth/login";

export const login_api = async (values: login_types) => {
  try {
    await app_axios_interface.post("/auth/login", values);
    return { success: true, message: "Login in Sucessfull" };
  } catch (error) {
    return { success: false, message: error };
  }
};
