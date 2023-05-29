import React, { useState, useEffect } from "react";
import Layout from "../Partials/Layout";
import { getApprovedPaper } from "../service/paper.service";

const DownloadPaper = () => {
  const [loading, setLoading] = useState(false);
  const [papers, setPapers] = useState([]);

  async function fetch_papers(email: string) {
    setLoading(true);
    const data = await getApprovedPaper(email);
    console.log(data)
    setLoading(false);
    setPapers(data.data);
  }

  useEffect(() => {
    const user: any = JSON.parse(localStorage.getItem("user") || "{}");
    fetch_papers(user.email);
  }, []);
  return (
    <Layout>
      <div>
        {JSON.stringify(papers)}
      </div>
    </Layout>
  );
};

export default DownloadPaper;
