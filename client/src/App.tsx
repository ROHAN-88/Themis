import { Outlet } from "react-router";
import { Navbar } from "./navbar/header";
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
