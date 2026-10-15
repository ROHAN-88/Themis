export type tasksType = {
  title: string;
  color: string;
};

export interface tasksAPI_type {
  id: string;
  task_name: string;
  description: string;
  priority: string;
  // created_by: string;
  assignee_to?: string;
  task_type?: string;
  status: string;
}
