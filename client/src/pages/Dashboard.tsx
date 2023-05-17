import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Partials/Layout";
import UploadFIlePopup from "../Partials/UploadFIlePopup.component";

const Dashboard = () => {
  const [popup, setPopup] = useState(false);
  return (
    <Layout>
      {popup && <UploadFIlePopup onClose={setPopup} />}
      <main className="pt-0">
        <h4
          className="p-4 text-left font-medium"
        >
          Dashboard
        </h4>
        <section className="flex px-6 w-full flex-wrap space-x-5">
          <Link
            className="p-8 lg:p-12 text-xl bg-sky-500 text-white rounded-md"
            to="/dashboard/applications"
          >
            Setter applications
          </Link>

          <Link
            className="p-8 lg:p-12 text-xl bg-rose-500 text-white rounded-md"
            to="/dashboard/setter"
          >
            Setters list
          </Link>

          <Link
            className="p-8 lg:p-12 text-xl bg-yellow-500 text-white rounded-md"
            to="/dashboard/setter"
          >
            Questions/Papers
          </Link>
          <Link
            className="p-8 lg:p-12 text-xl bg-yellow-500 text-white rounded-md"
            to="/dashboard/upload-syllabus"
          >
            Upload syllabus
          </Link>

        </section>
      </main>
    </Layout>
  );
};

export default Dashboard;
