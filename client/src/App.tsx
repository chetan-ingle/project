import UserContext from '../Context/UserContext'
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PaperSetterApplication from "./pages/PaperSetterApplication";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/setter/apply",
    element: <PaperSetterApplication />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
function App() {
  return (
    <>
      {/* <Header/> */}
      <UserContext>
        <RouterProvider fallbackElement={<h4>Error</h4>} router={router} />
      </UserContext>
    </>
  );
}

export default App;
