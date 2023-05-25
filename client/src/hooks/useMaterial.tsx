import React, { useEffect, useState } from "react";
import { get_material } from "../service/material.service";

const useMaterial = ({ id, subject }: { id?: string; subject?: string }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[] | null>(null);
  async function refetch() {
    const {
      data = [],
      message,
      error,
      success,
    } = await get_material({ id, subject });
    setData(data);
  }
  useEffect(() => {
    (id || subject) && refetch();
  }, [id, subject]);

  return {
    data,
    loading,
    refetch,
    setData,
  };
};

export default useMaterial;
