import React from "react";
import { useEffect } from "react";
import { ChangeEvent } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Layout from "../Partials/Layout";
import extractFormData from "../utils/extractFormData";
import { BASE_URL } from "../utils/static";

function AdminSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  async function get_subjects() {
    setLoading(true);
    const req = await fetch(`${BASE_URL}/subject`);
    const { data, error, message } = await req.json();
    setSubjects(data);
    setLoading(false);
    error ? toast.error(message) : toast.success(message);
  }

  async function post_subject(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = extractFormData(e.target);
    const req = await fetch(`${BASE_URL}/subject/add/${form.subject}`);
    const { data, error, message } = await req.json();
    setSubjects(prev => [...prev, data]);
    setLoading(false);
    error ? toast.error(message) : toast.success(message);
  }

  useEffect(() => {
    get_subjects();
  }, []);
  return (
    <Layout>
      <div className="flex mx-auto justify-evenly">
        <form
          className="w-1/3 flex py-6 px-5 mt-4 rounded-lg flex-col"
          onSubmit={post_subject}
        >
          <label>Subject</label>
          <input
            required
            type="text"
            name="subject"
            className="border mb-4 mt-2 rounded-lg px-4 py-2"
          />
          <input
            className="cursor-pointer py-2 bg-slate-800 text-white rounded-lg"
            type="Submit"
            value="Submit"
          />
        </form>
        <section className="flex flex-wrap flex-1 mx-2 py-6 px-5 mt-4 rounded-lg border">
          {subjects?.map(({ name, code }) => (
            <div className="w-full py-2 px-4 md:w-1/2">
              <div className="bg-slate-200 rounded-md px-6 py-2">
                <p className="font-semibold text-lg">{name}</p>
                <p className="text-sm text-slate-600">{code}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}

export default AdminSubjects;
