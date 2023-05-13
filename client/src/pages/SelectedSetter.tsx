import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Partials/Layout";
import { BASE_URL } from "../utils/static";
import { ApplicationType } from "./Application_setter";
import { FaBell, FaEnvelope } from "react-icons/fa";
export default function () {
  const [setter, setSetter] = useState<ApplicationType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getSetters() {
    const req = await fetch(`${BASE_URL}/select`);
    const setter = await req.json();
    setSetter(setter.data);
  }

  useEffect(() => {
    getSetters();
  }, []);

  return (
    <Layout>
      {" "}
      <main className="w-[98%] rounded-md bg-white mx-auto mt-8 text-slate-700">
        <main className="flex px-2 items-center w-full justify-between pr-4">
          <h4 className="text-2xl p-6 font-bold">Selected paper setters</h4>
          <Link className="underline" to="/dashboard/applications">
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
                      profile,
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
                          <img
                            className="w-16 h-16 rounded-full border border-purple-600 bg-purple-500 aspect-[3/4] object-cover"
                            src={profile}
                            alt={name}
                          />
                        </td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{typeof subject == 'object' && subject?.join(", ")}</td>

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
                            title="Send notification"
                            className=" text-slate-700 hover:bg-slate-200  px-4 py-2 rounded-md">
                              <FaBell />
                            </button>
                            <button
                            title="Send email for setting paper"
                            className=" text-red-500 px-4 hover:bg-slate-200 py-2 rounded-md">
                              <FaEnvelope />
                            </button>
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
          {!setter ? (
            <div className="text-4xl font-black text-purple-200 text-center py-8">
              Loading...
            </div>
          ) : null}
          {setter && !setter.length ? (
            <div className="text-4xl font-black text-purple-200 text-center py-8">
              No records found.
            </div>
          ) : null}
        </section>
      </main>
    </Layout>
  );
}
