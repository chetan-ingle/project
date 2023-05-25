import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import Layout from "../Partials/Layout";
import { getApplication } from "../service/application.service";
import useQuery from "../service/query.service";
import selectService from "../service/select.service";
export interface ApplicationType {
  _id: string;
  name: string;
  college_id: string;
  experience: number;
  qualification: string;
  institute: string;
  subject: string;
  email: string;
  phone: string;
  address: string;
  profile: string;
  password: string;
  previousWork: string[];
  __v: number;
}
export default function SetterApplications() {
  const { moderator, setModerator } = useContext(userContext);
  const [loading, setLoading] = useState<boolean>(false);
  // const [apps, setApps] = useState<ApplicationType[] | null>(null);
  const { data: apps, error, message, query } = useQuery(getApplication);
  const getApplications = async (subject: string) => {
    await query({ subject });
    localStorage.setItem(
      "applications-last-fetched-on",
      JSON.stringify(new Date().getTime())
    );
  };
  const [subject, setSubject] = useState<string>(moderator?.subject[0]);
  useEffect(() => {
    getApplications(subject);
  }, [subject]);

  useEffect(() => {
    setSubject(moderator?.subject[0]);
  }, [moderator?.subject[0]]);

  async function handleSelected(evt: ChangeEvent<HTMLFormElement>) {
    evt.preventDefault();
    setLoading(true);
    const selected = Array.from(
      evt.target.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]:checked'
      )
    ).map((el) => el.value);
    console.log(selected);
    const res = await selectService(selected, subject);
    if (res.message) {
      toast.success(res.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    toast.error(res.error);
  }
  return (
    <Layout>
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
          <h4 className="text-2xl p-6 font-bold">Paper setter application</h4>
          <Link className="underline" to="/dashboard/moderator/setters">
            View selected
          </Link>
        </main>
        {/* {use} */}
        <hr />
        <div className="notification fixed shadow-xl border notification-success notification-danger">
          <h4 className="notification-content">Hello, Notification.</h4>
          <span className="notification-slider"></span>
        </div>
        {/* application table */}
        <form onSubmit={handleSelected} className="w-full overflow-x-auto">
          <table className="application-table mt-6 w-max min-w-full">
            <thead className="bg-purple-700 font-semibold  text-white">
              <tr>
                <td>Select</td>
                <td className="py-4">Sr no.</td>
                {/* <td>Photo</td> */}
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Subject(s)</td>
                <td>Institute</td>
                <td>College ID</td>
                <td>Previous works</td>
              </tr>
            </thead>
            <tbody>
              {apps &&
                apps?.map(
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
                      experience,
                    }: ApplicationType,
                    index: number
                  ) => {
                    return (
                      <tr className="border-b even:bg-purple-100" key={_id}>
                        <td>
                          <input
                            className="accent-purple-600 w-4 h-4"
                            type="checkbox"
                            name="selected"
                            value={email}
                          />
                        </td>
                        <td className="text-center">
                          {`${index + 1}`.padStart(3, "0")}
                        </td>
                        {/* <td>
                         
                        </td> */}
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
                        <td>{previousWork?.join(", ")}</td>
                      </tr>
                    );
                  }
                )}
            </tbody>
            <tfoot></tfoot>
          </table>
          {/* loading */}
          {!apps ? (
            <div className="text-4xl font-black text-purple-200 text-center py-8">
              Loading...
            </div>
          ) : null}
          {apps && !apps.length ? (
            <div className="text-4xl font-black text-purple-200 text-center py-8">
              No records found.
            </div>
          ) : null}
          <div className="py-4 flex ">
            <button
              style={{
                cursor: loading || !apps ? "not-allowed" : "pointer",
              }}
              disabled={loading || !apps}
              className="px-8 py-2 ml-auto text-lg text-white bg-purple-600 rounded-md"
            >
              {loading ? "Loading..." : "Select"}
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
}
