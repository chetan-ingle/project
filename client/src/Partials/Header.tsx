import React, { useContext, useEffect } from "react";
import { json, Link, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { FaUser, FaPowerOff } from "react-icons/fa";
const Header = () => {
  const { moderator: user, setModerator: setUser } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") as string));
    // user?._id ? null : navigate("/login");
  }, [user?._id]);
  //
  const handle_logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");

  };
  return (
    <header className="bg-white fixed w-full px-6 py-4 flex items-center justify-between">
      <Link
        to={user?.role ? "/dashboard/" + user?.role : '/'}
        className="text-lg flex items-center font-semibold"
      >
        <img src="/icon.png" alt="Logo" />
        <span className="mx-2">SRPD</span>
      </Link>
      <nav className="space-x-3 flex items-center text-sky-600">
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
