import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import Layout from "../Partials/Layout";
import UploadFIlePopup from "../Partials/UploadFIlePopup.component";

const AdminDashboard = () => {
  const [popup, setPopup] = useState(false);
  const { moderator, setModerator } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (moderator && moderator?.role !== "admin") {
      navigate("/login/as/admin");
    }

  }, [moderator?.role]);

  return (
    <Layout>
      {popup && <UploadFIlePopup onClose={setPopup} />}
      <main className="pt-0">
        <h4 className="p-8 text-xl font-semibold">Dashboard</h4>
        <section className="flex px-6 w-full flex-wrap space-x-5">
          <Link
            className="p-8 lg:p-12 text-xl bg-sky-500 text-white rounded-md"
            to="/dashboard/admin/examiners"
          >
            Examiners
          </Link>

          <Link
            className="p-8 lg:p-12 text-xl bg-rose-500 text-white rounded-md"
            to="/dashboard/admin/moderators"
          >
            Moderator list
          </Link>
         
          <Link
            className="p-8 lg:p-12 text-xl bg-yellow-500 text-white rounded-md"
            to="/dashboard/admin/subjects"
          >
            SUbject list
          </Link>
        </section>
      </main>
    </Layout>
  );
};

export default AdminDashboard;
