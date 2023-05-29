import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import Layout from "../Partials/Layout";
import loginService from "../service/login.service";
import extractFormData from "../utils/extractFormData";

const ExaminerLogin = () => {
  const { moderator, setModerator } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = extractFormData(e.target);
    setLoading(true);
    const { data } = await loginService(
      "/login/examiner",
      params as { email: string; password: string }
    );

    setLoading(false);
    if (!data) {
      toast.error("Please enter valid credentials.", { position: "top-right" });
      return;
    }
    setModerator(data);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/dashboard/examiner");
  }

  useEffect(() => {
    moderator?.role === "examiner" && setAlreadyLoggedIn(true);
  }, [moderator?._id]);
  return (
    <Layout>
      <main className="h-screen w-full grid place-items-center">

      <div
          style={{ display: alreadyLoggedIn ? "flex" : "none" }}
          className="bg-white justify-end rounded-md w-11/12 flex-wrap p-4 flex items-center  shadow-lg text-sm"
        >
          <h1 className="text-xl mr-auto text-center mb-4">
            Already logged in as {moderator?.name}
          </h1>
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

        <section className="max-w-[500px] w-11/12 p-6 md:p-12 rounded-lg bg-white shadow-lg">
          <h4 className="text-lg pb-4 md:text-xl font-bold">Examiner login</h4>
          {/* {error && (
              <h4 className="bg-red-500 text-white px-5 py-2  mb-4">
                {error || "Error occured."}
              </h4>
            )} */}
          <form onSubmit={handleLogin} className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              name="email"
              className="border mb-4 mt-2 rounded-lg px-4 py-2"
            />

            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              name="password"
              className="border mb-4 mt-2 rounded-lg px-4 py-2"
            />
            <button
              disabled={loading}
              className="block bg-purple-800 text-white py-3 px-4 rounded-lg font-bold"
            >
              {loading ? "Loading" : "Submit"}
            </button>
          </form>
        </section>
      </main>
    </Layout>
  );
};

export default ExaminerLogin;
