import React, { createContext, ReactNode, useState, useEffect } from "react";
import { BASE_URL } from "../src/utils/static";
export const userContext = createContext<{
  moderator?: any;
  setModerator?: any;
}>({});
const UserContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [moderator, setModerator] = useState<any>(null);

  useEffect(() => {
    const api = `${BASE_URL}/${moderator?.role}/${moderator?.email}`;
    moderator?._id &&
      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data.data));
          setModerator(data.data);
        });
  }, []);

  return (
    <userContext.Provider value={{ moderator, setModerator }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContext;
