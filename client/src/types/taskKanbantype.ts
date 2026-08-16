export interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  description?: string;
  assignee?: string;
  assigneeAvatar?: string;
  dueDate?: string;
}
