import App from "@/App";
import TaskPage from "@/modules/tasksBoard/TaskPage";

export const routers = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "task",
        element: <TaskPage />,
      },
    ],
  },
];
