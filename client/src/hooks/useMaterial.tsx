import React, { useEffect, useState } from "react";
import { get_material } from "../service/material.service";
import { BASE_URL } from "../utils/static";

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

const useSubject = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[] | null>(null);
  async function refetch() {
    setLoading(true)
    const req = await fetch(`${BASE_URL}/subject`)
    const data = await req.json()
    setData(data.data)
    setLoading(false)
  }

  useEffect(() => {
    refetch()
  }, []);

  return {
    data,
    loading,
    refetch,
  };
};

export { useSubject }
export default useMaterial;
