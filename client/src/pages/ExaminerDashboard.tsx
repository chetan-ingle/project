import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Partials/Layout";

const ExaminerDashboard = () => {
  return (
    <Layout>
      <main className="pt-0">
        <h4 className="p-8 text-xl font-semibold">Examiner Dashboard</h4>
        <section className="flex px-6 w-full items-center h-max flex-wrap space-x-5">
          
          <Link
            className="p-8 lg:p-12 text-xl bg-yellow-500 text-white rounded-md"
            to="/dashboard/examiner/notification"
          >
            Notifications
          </Link>
          <Link
            className="p-8 lg:p-12 text-xl bg-rose-500 text-white rounded-md"
            to="/dashboard/examiner/download-paper"
          >
           Download Question paper
          </Link>

        </section>
      </main>
    </Layout>
  );
};

export default ExaminerDashboard;
