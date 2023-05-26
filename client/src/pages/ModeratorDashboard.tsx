import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import Layout from "../Partials/Layout";
import UploadFIlePopup from "../Partials/UploadFIlePopup.component";

const ModeratorDashboard = () => {
  const [popup, setPopup] = useState(false);
  const { moderator, setModerator } = useContext(userContext);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (moderator && moderator?.role !== "moderator") {
      navigate("/login/moderator");
    }
    console.log(moderator)
  }, [moderator?.role]);

  return (
    <Layout>
      {popup && <UploadFIlePopup onClose={setPopup} />}
      <main className="pt-0">
        <h4 className="p-8 text-xl font-semibold">Dashboard</h4>
        <section className="flex px-6 w-full flex-wrap space-x-5">
          <Link
            className="p-8 lg:p-12 text-xl bg-sky-500 text-white rounded-md"
            to="/dashboard/moderator/applications"
          >
            Setter applications
          </Link>

          <Link
            className="p-8 lg:p-12 text-xl bg-rose-500 text-white rounded-md"
            to="/dashboard/moderator/setters"
          >
            Setters list
          </Link>

          <Link
            className="p-8 lg:p-12 text-xl bg-yellow-500 text-white rounded-md"
            to="/dashboard/moderator/question-papers"
          >
            Questions/Papers
          </Link>
          <Link
            className="p-8 lg:p-12 text-xl bg-green-500 text-white rounded-md"
            to="/dashboard/moderator/upload-syllabus"
          >
            Upload syllabus
          </Link>
        </section>
      </main>
    </Layout>
  );
};

export default ModeratorDashboard;
