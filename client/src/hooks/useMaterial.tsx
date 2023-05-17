import React, { useEffect, useState } from 'react'
import { get_material } from '../service/material.service';


const useMaterial = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[] | null>(null)
  async function refetch() {
    const { data = [], message, error, success } = await get_material(id);
    setData(data);
  }
  useEffect(() => {
    refetch();
  }, []);

  return {
    data, loading, refetch, setData
  }
}

export default useMaterial