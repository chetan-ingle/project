import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import Layout from "../Partials/Layout";
import UploadFIlePopup from "../Partials/UploadFIlePopup.component";

function SetterDashboard() {
  const { moderator: setter, setModerator: setSetter } =
    useContext(userContext);
  const navigate = useNavigate();
  return (
    <Layout>
      <main className="pt-0">
        <h4 className="p-8 text-xl font-semibold">Setter Dashboard</h4>
        <section className="flex px-6 w-full items-center h-max flex-wrap space-x-5">
          {/* <Link
            className="p-8  lg:p-12 text-xl bg-sky-500 text-white rounded-md"
            to="/dashboard/setter/materials"
          >
            <p>View Material</p>
          </Link> */}
          <Link
            className="p-8 lg:p-12 text-xl bg-sky-600 text-white rounded-md"
            to="/dashboard/setter/materials"
          >
            Syllabus & exam material
          </Link>

          <Link
            className="p-8 lg:p-12 text-xl bg-yellow-500 text-white rounded-md"
            to="/dashboard/setter/notification"
          >
            Notifications
          </Link>
          <Link
            className="p-8 lg:p-12 text-xl bg-rose-500 text-white rounded-md"
            to="/dashboard/setter/upload-paper"
          >
            Upload Question paper
          </Link>

        </section>
      </main>
    </Layout>
  );
}

export default SetterDashboard;
