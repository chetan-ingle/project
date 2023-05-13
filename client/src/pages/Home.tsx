import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import Header from "../Partials/Header";
import Layout from "../Partials/Layout";

const Home = () => {
  const { setUser, user } = useContext(userContext);
  return (
    <div className="min-h-screen bg-slate-100 w-full">
      {/* <header className="bg-white fixed w-full px-6 py-4 flex items-center justify-between">
        <div className="text-lg flex items-center font-semibold">
          <img src="/icon.png" alt="Logo" />
          <span className="mx-2">Chetu</span>
        </div>
        <nav className="space-x-3 text-sky-600">
          <Link to={"/login"}>Login</Link>

          <Link to={"/dashboard/setter"}>Dashboard</Link>
          <Link
            title={"Profile | " + user?.name}
            className="underline font-bold text-slate-800"
            to={"/profile"}
          >
            {user?.name}
          </Link>
        </nav>
      </header> */}
      <Header />
      <main className="pt-20">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt quas
        quis dicta sapiente odio officiis obcaecati corporis architecto, harum
        commodi, voluptatem sint?
      </main>
    </div>
  );
};

export default Home;
