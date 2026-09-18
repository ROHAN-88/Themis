import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { routers } from "./router/user.route";
import { Guest_routers } from "./router/Guest.router";

const routers_combine = [...routers, ...Guest_routers];
const router = createBrowserRouter(routers_combine);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
