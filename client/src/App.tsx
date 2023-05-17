import UserContext from "../Context/UserContext";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PaperSetterApplication from "./pages/PaperSetterApplication";
import Login from "./pages/Login";
import SetterList from "./pages/Application_setter";
import Dashboard from "./pages/Dashboard";
import SetterApplications from "./pages/Application_setter";
import SelectedSetter from "./pages/SelectedSetter";
import UploadSyllabus from "./pages/UploadSyllabus";
import QuestionPapers from "./pages/QuestionPapers";
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
    path: "/dashboard/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/applications",
    element: <SetterApplications />,
  },
  {
    path: "/dashboard/setter",
    element: <SelectedSetter />,
  },
  {
    path: "/dashboard/upload-syllabus",
    element: <UploadSyllabus />,
  },
  {
    path: "/dashboard/question-papers",
    element: <QuestionPapers />,
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
