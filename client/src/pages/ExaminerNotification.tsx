import React from "react";
import { userContext } from "../../Context/UserContext";
import useNotification from "../hooks/useNotification";
import Layout from "../Partials/Layout";

const ExaminerNotification = () => {
    const { moderator: examiner, setModerator: setExaminer } =
    React.useContext(userContext);
  const { data, loading, refetch } = useNotification(examiner?.email);
  const [notification, setNotification] = React.useState<any>(null);
  return (
    <Layout>
      <div className="text-2xl font-semibold px-6 py-5">
        <h3>Examiner notification</h3>
      </div>
      <section className="flex flex-col md:flex-row w-full h-[calc(100vh-160px)]">
        <aside className="w-full md:w-4/12 bg-slate-300 overflow-y-auto ">
          {loading ? (
            <div className="text-center text-2xl font-semibold">Loading...</div>
          ) : (
            <div className="px-6 py-5">
              {data?.map((i: any, index: number) => (
                <div
                  key={index}
                  onClick={() => setNotification(i)}
                  className="bg-white rounded-md shadow-md p-4 mb-4"
                >
                  <h4 className="line-clamp-1 capitalize cursor-pointer font-semibold">
                    {i.subject}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {new Date(i.createdAt).toLocaleString("en-in", {
                      dateStyle: "full",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </aside>
        <main className="w-full md:w-8/12 bg-sky-900/10 overflow-y-auto">
          <div
            style={{
              display: notification ? "block" : "none",
            }}
            className="px-6 py-5"
          >
            <h4 className="text-xl font-semibold">{notification?.subject}</h4>
            <p
              className="text-lg w-full desc"
              dangerouslySetInnerHTML={{
                __html: notification?.description,
              }}
            ></p>
            <p>
              <span className="font-semibold">Date: </span>
              {new Date(notification?.createdAt).toLocaleString("en-in", {
                dateStyle: "full",
              })}
            </p>
          </div>
          {!notification && (
            <div className="text-center py-12 text-2xl font-semibold">
              No notification selected.
            </div>
          )}
        </main>
      </section>
    </Layout>
  );
};

export default ExaminerNotification;
