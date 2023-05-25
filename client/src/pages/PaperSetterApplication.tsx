import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import extractFormData from "../utils/extractFormData";
import { BASE_URL } from "../utils/static";
export default function PaperSetterApplication() {
  const [profile, setProfile] = useState("");
  const [college_id, setCollege_id] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const payload = extractFormData(event.currentTarget);

    const req = await fetch(`${BASE_URL}/application/create`, {
      method: "post",
      body: JSON.stringify({
        payload: {
          ...payload,
          profile,
          college_id,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    setLoading(false);
    res.success ? toast.success(res.message) : toast.error(res.message);
    event.target.reset();
  };

  async function handleFile(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) {
    if (!e.target.files?.length) {
      alert("Please select a file");
      return;
    };
    const file = e.target.files[0];
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg"
    ) {
      e.target.value = "";
      return alert("Please upload image file (.png, .jpeg, .jpg)");
    }
    if (file.size / 1000 > 250) {
      e.target.value = "";
      return alert("Please upload file under 250kb");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file as File);
    reader.onload = () => {
      setter(reader.result as string);
    };
  }

  //  change title
  useEffect(() => {
    document.title = "Paper Setter Application";
  }, []);

  return (
    <main className="bg-slate-200 py-12">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-lg mb-4 w-11/12 max-w-[700px] mx-auto"
      >
        <input type="hidden" name="role" value={"setter"} />
        <div className="mb-4 flex-1  flex-wrap flex flex-col space-y-4 py-6">
          <label
            htmlFor="profile-image"
            className="block shrink-0 cursor-pointer border-slate-700 overflow-hidden border rounded-full w-44 h-44"
          >
            <img
              src={profile || "/profile-placeholder.jpg"}
              alt="profile"
              className="w-full h-full object-cover  border"
            />
          </label>

          <input
            type="file"
            name="profile-image"
            id="profile-image"
            required
            className="file:bg-purple-600 file:py-2 file:px-3 file:text-white w-max file:border-none h-max"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFile(e, setProfile)}
          />
          <small className="text-red-600 text-sm">
            *Please upload your profile image. (jpg, jpeg, png) under 250kb
          </small>
        </div>

        <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
          <div className="mb-4 w-full md:w-auto flex-1">
            <label
              htmlFor="fname"
              className="block text-gray-700 font-bold mb-2"
            >
              First name:
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 w-full md:w-auto flex-1">
            <label
              htmlFor="lname"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name:
            </label>
            <input
              type="text"
              name="lname"
              id="lname"
              className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </section>

        <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
          <div className="mb-4 w-full md:w-auto flex-1">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 w-full md:w-auto flex-1">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone:
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </section>

        <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
          <div className="mb-4 w-full md:w-auto flex-1">
            <label
              htmlFor="subject"
              className="block text-gray-700 font-bold mb-2"
            >
              Subject:
              <small className="px-2 font-normal"></small>
            </label>
            <input
              list="sub-list"
              type="text"
              name="subject"
              id="subject"
              className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <datalist id="sub-list">
              <option value="cd"></option>
              <option value="chem"></option>
              <option value="dsa"></option>
              <option value="m3"></option>
            </datalist>
          </div>

          <div className="mb-4 w-full md:w-auto flex-1">
            <label
              htmlFor="qualification"
              className="block text-gray-700 font-bold mb-2"
            >
              Qualification:
            </label>
            <input
              type="text"
              name="qualification"
              id="qualification"
              className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </section>

        <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
          <div className="mb-4 w-full md:w-auto flex-1">
            <label
              htmlFor="institute"
              className="block text-gray-700 font-bold mb-2"
            >
              Institute:
            </label>
            <input
              type="text"
              name="institute"
              id="institute"
              className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4 w-full md:w-auto flex-1">
            <label
              htmlFor="experience"
              className="block text-gray-700 font-bold mb-2"
            >
              Experience (in months):
            </label>
            <input
              type="number"
              placeholder="eg. 23"
              name="experience"
              id="experience"
              className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </section>
        <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
          <div className="mb-4 w-full md:w-auto flex-1">
            <label
              htmlFor="instituteid"
              className="block text-gray-700 font-bold mb-2"
            >
              Institute Id:
            </label>
            <input
              onChange={(e) => handleFile(e, setCollege_id)}
              type="file"
              name="instituteid"
              id="instituteid"
              className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </section>
        <section className="flex items-center space-x-0 md:space-x-4">
          <div className="mb-4 w-full md:w-auto flex-1">
            <label className="block text-gray-700 font-bold mb-2">
              Address:
            </label>
            <textarea
              placeholder="Enter address..."
              name="address"
              className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </section>
        <div className="flex items-center justify-between">
          <button
            disabled={loading}
            type="submit"
            className="bg-slate-700 hover:bg-slate-800 text-white font-medium py-3 px-12 rounded-full focus:outline-none focus:shadow-outline"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </main>
  );
}

/*
name
email 
phone
subject
institute
qualification 
experience
profile image



*/
