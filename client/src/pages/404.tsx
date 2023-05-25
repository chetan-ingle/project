import React from "react";
import Layout from "../Partials/Layout";

const ErrorPage = () => {
  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-6xl lg:text-[18rem] animate-pulse font-bold text-slate-300">
        4<span  className="animate-spin">0</span>4
      </h1>
      <button className="bg-purple-800 text-white py-3 px-4 rounded-lg">
        <a href="/">Go to home</a>
      </button>
    </main>
  );
};

export default ErrorPage;
