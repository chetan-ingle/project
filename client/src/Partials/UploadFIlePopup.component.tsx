import React from "react";

const UploadFIlePopup = ({
  onClose,
}: {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed  h-screen w-screen grid place-items-center bg-slate-900/30 backdrop-filter backdrop-blur-md">
      <main className="bg-white relative shadow-lg rounded-md p-6 max-w-[500px] w-11/12">
        <button
          onClick={() => onClose(false)}
          className="text-xl absolute -top-4 -right-4 w-10 h-10 rounded-full bg-red-500 text-white"
        >
          &times;
        </button>
        <h5 className="pt-4 text-xl text-slate-900 font-bold">Upload file</h5>
        <small className="text-red-600 font-semibold">
          (.pdf, .jpg, .docx)
        </small>
        <br />
        <h2 className="pt-4 font-semibold">Syllabus file </h2>
        <input
          className="border border-slate-500 w-full rounded-lg mb-4 py-2 px-4"
          type="file"
          name="syllabus"
          id=""
        />
        <br />
        <h2 className="pt-4 font-semibold">Description</h2>
        <input
          className="border border-slate-500  w-full rounded-lg py-2 px-4"
          type="text"
          name="desc"
          id=""
        />
      </main>
    </div>
  );
};

export default UploadFIlePopup;
