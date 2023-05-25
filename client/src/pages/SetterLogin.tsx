import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import Layout from "../Partials/Layout";
import loginService from "../service/login.service";
import useQuery from "../service/query.service";
import extractFormData from "../utils/extractFormData";
import { toast } from "react-hot-toast";

const PaperSetterLogin = () => {
  const { moderator: setter, setModerator: setSetter } =
    useContext(userContext);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { data, error, message, loading, success, query } =
  //   useQuery(loginService);
  // console.log(data, message, loading, error, success);
  async function handleLogin(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = extractFormData(e.target);
    console.log(params);
    // await query(params);
    setLoading(true);
    const { data } = await loginService("/login/setter", params as any);

    setLoading(false);
    if (!data) {
      toast.error("Please enter valid credentials.", { position: "top-right" });
      return;
    }
    setSetter(data);
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/dashboard/setter");
  }
  useEffect(() => {
    setter?.role === "setter" && setAlreadyLoggedIn(true);
  }, [setter?._id]);
  console.log(setter);
  return (
    <Layout>
      <main className="h-screen w-full grid place-items-center">
        <div
          style={{ display: alreadyLoggedIn ? "flex" : "none" }}
          className="bg-white justify-end rounded-md w-11/12 flex-wrap p-4 flex items-center  shadow-lg text-sm"
        >
          <h1 className="text-xl mr-auto text-center mb-4">
            Already logged in as {setter?.name}
          </h1>
          <button
            onClick={() => navigate("/dashboard/setter")}
            className="block mr-4 bg-purple-800 text-white py-3 px-4 rounded-lg "
          >
            Go to dashboard
          </button>
          <button
            onClick={() => {
              setSetter(null);
              localStorage.removeItem("setter");
              setAlreadyLoggedIn(false);
            }}
            className="block bg-rose-500 text-white py-3 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
        <section className="max-w-[500px] w-11/12 p-6 md:p-12 rounded-lg bg-white shadow-lg">
          <h4 className="text-lg pb-4 md:text-xl font-bold">
            Paper setter login
          </h4>
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

export default PaperSetterLogin;
