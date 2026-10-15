import { app_axios_interface } from "@/axios/axiosInstance";
import type { tasksAPI_type } from "@/types/tasks/tasks.type";

const task_base_url = "task_board";

export const get_tasks = async () => {
  try {
    const tasks_list_response = await app_axios_interface.get(
      `${task_base_url}`,
    );

    return { sucess: true, data: tasks_list_response.data };
  } catch (error) {
    return { status: false, data: error };
  }
};

export const add_task = async (values: tasksAPI_type) => {
  try {
    await app_axios_interface.post(`${task_base_url}/create`, values);

    return { sucess: true, data: {} };
  } catch (error) {
    return { sucess: false, error };
  }
};
