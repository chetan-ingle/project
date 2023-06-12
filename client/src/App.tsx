import UserContext, { userContext } from "../Context/UserContext";
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
import { useContext } from "react";
import { ProtectedPage } from "./Partials/ProtectedPage";
import { role } from "./Partials/role";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminExaminers from "./pages/AdminExaminers";
import AdminModerators from "./pages/AdminModerators";
import AdminSubjects from "./pages/AdminSubjects";
import AllMaterial from "./pages/AllMaterial";


function App() {
  const { moderator: user } = useContext(userContext)
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
      element: <ProtectedPage acceptedRoles={[role.ADMIN, role.MODERATOR]} role={user?.role} children={<ModeratorDashboard />} />,
    },
    {
      path: "/dashboard/moderator/applications",
      element: <ProtectedPage acceptedRoles={[role.ADMIN,role.MODERATOR]}role={user?.role}children={<SetterApplications />}/>,
    },
    {
      path: "/dashboard/moderator/setters",
      element: <ProtectedPage acceptedRoles={[role.ADMIN, role.MODERATOR]} role={user?.role} children={<SelectedSetter />}/>,
    },
    {
      path: "/dashboard/moderator/upload-syllabus",
      element: <ProtectedPage acceptedRoles={[role.ADMIN, role.MODERATOR]} role={user?.role} children={ <UploadSyllabus />}/>,
    },
    {
      path: "/dashboard/moderator/question-papers",
      element: <ProtectedPage acceptedRoles={[role.ADMIN, role.MODERATOR]} role={user?.role} children={<QuestionPapers />}/>,
    },
    // setter routes
    {
      path: "/setter/apply",
      element:<ProtectedPage acceptedRoles={[role.ADMIN, role.SETTER]} role={user?.role} children={<PaperSetterApplication />}/>,
    },
    {
      path: "/dashboard/setter/materials",
      element: <ProtectedPage acceptedRoles={[role.ADMIN, role.SETTER]} role={user?.role} children={<SetterMaterial />}/>,
    },
    {
      path: "/dashboard/setter/notification",
      element:<ProtectedPage acceptedRoles={[role.ADMIN, role.SETTER]} role={user?.role} children={ <SetterNotification />}/>,
    },
    {
      path: "/dashboard/setter/upload-paper",
      element: <ProtectedPage acceptedRoles={[role.ADMIN, role.SETTER]} role={user?.role} children={<UploadPaper />}/>,
    },
    {
      path: "/dashboard/setter",
      element: <ProtectedPage acceptedRoles={[role.ADMIN, role.SETTER]} role={user?.role} children={<SetterDashboard />} />,
    },
    // examiner routes
    {
      path: "/dashboard/examiner",
      element:<ProtectedPage acceptedRoles={[role.ADMIN, role.EXAMINER]} role={user?.role} children= {<ExaminerDashboard />}/>,
    },
    {
      path: "/dashboard/examiner/notification",
      element: <ProtectedPage acceptedRoles={[role.ADMIN, role.EXAMINER]} role={user?.role} children= {<ExaminerNotification />}/>,
    },
    {
      path: "/dashboard/examiner/download-paper",
      element:<ProtectedPage acceptedRoles={[role.ADMIN, role.EXAMINER]} role={user?.role} children=  {<DownloadPaper />}/>,
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
      path: "/login/as/admin",
      element: <AdminLogin />,
    },
    // admin paths
    {
      path: '/dashboard/admin',
      element: <ProtectedPage children={<AdminDashboard />} acceptedRoles={[role.ADMIN]} role={user?.role} />
    },
    {
      path: '/dashboard/admin/examiners',
      element: <ProtectedPage children={<AdminExaminers />} acceptedRoles={[role.ADMIN]} role={user?.role} />
    },
    {
      path: "/dashboard/admin/moderators",
      element: <ProtectedPage children={<AdminModerators />} acceptedRoles={[role.ADMIN]} role={user?.role} />
    },
    {
      path: "/dashboard/admin/subjects",
      element: <ProtectedPage children={<AdminSubjects />} acceptedRoles={[role.ADMIN]} role={user?.role} />
    },
    {
      path: "/material/all",
      element: <AllMaterial />
    },
    {
      path: "*",
      element: <ErrorPage />,
    },

  ]);

  return (
    <>
      {/* <Header/> */}

      <RouterProvider fallbackElement={<h4>Error</h4>} router={router} />

    </>
  );
}

export default App;

