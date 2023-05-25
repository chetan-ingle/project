import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Partials/Layout";
import { BASE_URL } from "../utils/static";
import { ApplicationType } from "./Application_setter";
import { FaBell, FaEnvelope, FaInfo } from "react-icons/fa";
import { notification_service } from "../service/notification.service";
import { toast } from "react-hot-toast";
import { userContext } from "../../Context/UserContext";
export default function () {
  const [setter, setSetter] = useState<ApplicationType[] | null>(null);

  const { moderator, setModerator } = useContext(userContext);
  const [subject, setSubject] = useState<string>(moderator?.subject[0] || "");

  const [loading, setLoading] = useState<boolean>(false);
  const [mail_loading, setMailLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getSetters() {
    
    setLoading(true);

    setSetter([]);
    const req = await fetch(`${BASE_URL}/setter/subject/${subject}`);
    const setter = await req.json();
    setLoading(false);
    setSetter(setter.data);
  }

  async function send_notification({
    email,
    name,
    subject,
  }: {
    email: string;
    name: string;
    subject: string;
  }) {
    const id = toast.loading("Please wait...", { position: "top-right" });
    setMailLoading(true);
    const response = await notification_service({ email, name, subject });
    response.success
      ? toast.success(response.message, { position: "top-right" })
      : toast.error(response.message, { position: "top-right" });
    toast.dismiss(id);
    setMailLoading(false);
  }
  useEffect(() => {
    getSetters();
  }, [subject]);

  return (
    <Layout>
      {" "}
      <main className="w-[98%] rounded-md bg-white mx-auto mt-8 text-slate-700">
        <main className="pt-6 bg-slate-200 pb-6 px-8 flex items-center justify-between">
          <p className="text-lg">
            Showing applications for
            <span className="text-purple-600 font-bold ml-2">{subject}</span>
          </p>
          <div className="">
            {moderator?.subject.map((sub: string, index: number) => {
              return (
                <span
                  key={index}
                  onClick={() => setSubject(sub)}
                  className={`cursor-pointer  border border-current bg-white-600 px-4 py-2 rounded-md ml-2 ${
                    subject === sub
                      ? "bg-purple-700 text-white"
                      : "text-purple-600"
                  }`}
                >
                  {sub}
                </span>
              );
            })}
          </div>
        </main>
        <main className="flex px-2 items-center w-full justify-between pr-4">
          <h4 className="text-2xl p-6 font-bold">Selected paper setters</h4>
          <Link className="underline" to="/dashboard/moderator/applications">
            View applications
          </Link>
        </main>{" "}
        {/* {use} */}
        <hr />
        <div className="notification fixed shadow-xl border notification-success notification-danger">
          <h4 className="notification-content">Hello, Notification.</h4>
          <span className="notification-slider"></span>
        </div>
        {/* application table */}
        <section className="w-full overflow-x-auto">
          <table className="application-table mt-6 w-max min-w-full">
            <thead className="bg-purple-700 font-semibold  text-white">
              <tr>
                <td className="py-4">Sr no.</td>
                <td>Photo</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Subject(s)</td>
                <td>Institute</td>
                <td>College ID</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {setter &&
                setter?.map(
                  (
                    {
                      _id,
                      email,
                      college_id,
                      institute,
                      name,
                      phone,
                      qualification,
                      subject,
                      previousWork,
                    }: ApplicationType,
                    index: number
                  ) => {
                    return (
                      <tr className="border-b even:bg-purple-100" key={_id}>
                        <td className="text-center">
                          {`${index + 1}`.padStart(3, "0")}
                        </td>
                        <td>
                          <a
                            className="underline text-sky-600"
                            onClick={() => {}}
                          >
                            View
                          </a>
                        </td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{subject}</td>

                        <td>{institute}</td>
                        <td>
                          <a
                            href={college_id}
                            target={"_blank"}
                            className="underline text-sky-800"
                          >
                            View
                          </a>
                        </td>
                        <td>
                          <div className="flex space-x-2">
                            <button
                              disabled={mail_loading}
                              onClick={() =>
                                send_notification({ email, name, subject })
                              }
                              title="Send notification"
                              className=" text-slate-700 hover:bg-slate-200  px-4 py-2 rounded-md"
                            >
                              <FaBell />
                            </button>
                            {/* <button
                            title="Send email for setting paper"
                            className=" text-red-500 px-4 hover:bg-slate-200 py-2 rounded-md">
                              <FaEnvelope />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
            <tfoot></tfoot>
          </table>
          {/* loading */}
          {loading || !setter ? (
            <div className="text-4xl font-black text-purple-200 text-center py-8">
              Loading...
            </div>
          ) : null}
          {!loading && setter && !setter.length ? (
            <div className="text-4xl font-black text-purple-200 text-center py-8">
              No records found.
            </div>
          ) : null}
        </section>
      </main>
    </Layout>
  );
}
