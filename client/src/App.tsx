import UserContext from "../Context/UserContext";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PaperSetterApplication from "./pages/PaperSetterApplication";
import ModeratorLogin from "./pages/ModeratorLogin";
import SetterList from "./pages/Application_setter";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import SetterApplications from "./pages/Application_setter";
import SelectedSetter from "./pages/SelectedSetter";
import UploadSyllabus from "./pages/UploadSyllabus";
import QuestionPapers from "./pages/QuestionPapers";
import ExaminerLogin from "./pages/ExaminerLogin";
import SetterLogin from "./pages/SetterLogin";
import ExaminerDashboard from "./pages/ExaminerDashboard";
import ErrorPage from "./pages/404";
import SetterDashboard from "./pages/SetterDashboard";
import SetterMaterial from "./pages/SetterMaterial";
import SetterNotification from "./pages/SetterNotification";
import UploadPaper from "./pages/UploadPaper";
import Profile from "./pages/Profile";
import ExaminerNotification from "./pages/ExaminerNotification";
import DownloadPaper from "./pages/DownloadPaper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  // moderator routes
  {
    path: "/dashboard/moderator",
    element: <ModeratorDashboard />,
  },
  {
    path: "/dashboard/moderator/applications",
    element: <SetterApplications />,
  },
  {
    path: "/dashboard/moderator/setters",
    element: <SelectedSetter />,
  },
  {
    path: "/dashboard/moderator/upload-syllabus",
    element: <UploadSyllabus />,
  },
  {
    path: "/dashboard/moderator/question-papers",
    element: <QuestionPapers />,
  },
  // setter routes
  {
    path: "/setter/apply",
    element: <PaperSetterApplication />,
  },
  {
    path: "/dashboard/setter/materials",
    element: <SetterMaterial />,
  },
  {
    path: "/dashboard/setter/notification",
    element: <SetterNotification />,
  },
  {
    path: "/dashboard/setter/upload-paper",
    element: <UploadPaper />,
  },
  {
    path: "/dashboard/setter",
    element: <SetterDashboard />,
  },
  // examiner routes
  {
    path: "/dashboard/examiner",
    element: <ExaminerDashboard />,
  },
  {
    path: "/dashboard/examiner/notification",
    element: <ExaminerNotification />,
  },
  {
    path: "/dashboard/examiner/download-paper",
    element: <DownloadPaper />,
  },
  // login routes
  {
    path: "/login/examiner",
    element: <ExaminerLogin />,
  },
  { path: "/login/setter", element: <SetterLogin /> },
  {
    path: "/login/moderator",
    element: <ModeratorLogin />,
  },
  {
    path: "*",
    element: <ErrorPage />,
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

