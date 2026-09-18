import App from "@/App";
import { Pattern } from "@/kanban/TaskKanban";

export const routers = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "task",
        element: <Pattern />,
      },
    ],
  },
];
