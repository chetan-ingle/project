import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import Header from "../Partials/Header";
import Layout from "../Partials/Layout";

const Home = () => {
  const { moderator, setModerator } = useContext(userContext);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    moderator?._id && setAlreadyLoggedIn(true);
  }, [moderator?._id]);

  return (
    <Layout>
      <div className="center w-screen flex justify-center items-center flex-col  ">
        <div
          style={{ display: alreadyLoggedIn ? "flex" : "none" }}
          className="bg-white justify-end rounded-md w-11/12 flex-wrap p-4 flex items-center  shadow-lg text-sm"
        >
          <main className=" mr-auto">
            <h1 className="text-xl text-center mb-4">
              Already logged in as {moderator?.name}
            </h1>
            <p  
            className="px-4 py-2 bg-sky-600 text-white w-max font-medium uppercase tracking-wider rounded-md"
            >{moderator?.role}</p>
          </main>
          <button
            onClick={() => navigate("/dashboard/moderator")}
            className="block mr-4 bg-purple-800 text-white py-3 px-4 rounded-lg "
          >
            Go to dashboard
          </button>
          <button
            onClick={() => {
              setModerator(null);
              localStorage.removeItem("user");
              setAlreadyLoggedIn(false);
            }}
            className="block bg-rose-500 text-white py-3 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
        <div className="flex mt-64 w-2/3 justify-evenly">
          <Link
            to="/login/moderator"
            className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md h-max"
          >
            Moderator
          </Link>
          <Link
            to="/login/examiner"
            className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md h-max"
          >
            Examiner
          </Link>
          <Link
            to="/login/setter"
            className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md h-max"
          >
            Setter
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
