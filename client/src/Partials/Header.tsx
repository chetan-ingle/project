import React, { useContext, useEffect } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { FaUser, FaPowerOff } from "react-icons/fa";
const Header = () => {
  const { setUser, user } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") as string));
    user?._id ? null : navigate("/login");
  }, [user?._id]);
  //
  const handle_logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <header className="bg-white fixed w-full px-6 py-4 flex items-center justify-between">
      <Link to={"/"} className="text-lg flex items-center font-semibold">
        <img src="/icon.png" alt="Logo" />
        <span className="mx-2">SRPD</span>
      </Link>
      <nav className="space-x-3 flex items-center text-sky-600">
        {user?.name ? (
          <Link to={"/dashboard"}>Dashboard</Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}

        <div
          tabIndex={-1}
          className="relative cursor-pointer underline font-bold text-slate-800 group"
        >
          {user?.name}
          <div className="absolute w-max flex flex-col group-focus:visible  invisible right-0 top-6 border bg-white shadow-xl rounded-md py-2 space-y-2">
            <p
              onClick={() => {
                navigate("/profile");
              }}
              className="px-6 flex items-center space-x-2"
            >
              <FaUser />
              <span>Profile</span>
            </p>
            <p
              onClick={handle_logout}
              className="text-red-500 pt-2 flex items-center space-x-2  px-6 border-t"
            >
              <FaPowerOff />
              <span>Log-out</span>
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
