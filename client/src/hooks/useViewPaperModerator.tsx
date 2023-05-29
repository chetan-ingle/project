import React, { useState } from "react";
import { BASE_URL } from "../utils/static";
import FileViewer from "react-file-viewer";

function useViewPaperModerator(mid: string, pid: string) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function refetch() {
    alert("message");
    setLoading(true);
    const { error, message } = await fetch(
      `${BASE_URL}/paper/view/moderator/${mid}/${pid}`
    ).then((res) => res.json());
    setMessage(message);
    setLoading(false);
  }

  const Viewer = () => (
    <div>
      {!message && (
        <FileViewer
          fileType={"pdf"}
          filePath={`${BASE_URL}/paper/moderator/view?mid=${mid}&&pid=${pid}`}
          onError={refetch}
        />
      )}
      {message && (
        <main className="bg-red-100 border border-red-500 w-11/12 mx-auto my-4 p-4">
          {message && <h1>{message}</h1>}
        </main>
      )}
    </div>
  );

  return {
    Viewer,
  };
}

export default useViewPaperModerator;
