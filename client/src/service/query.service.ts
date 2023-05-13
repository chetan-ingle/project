import { useState } from "react";

export default function useQuery(
  service: (param: any) => Promise<{
    error: boolean;
    message: string | null;
    data: any | null;
    success: boolean;
  }>
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<null | string>(null)
  const [success, setSuccess] = useState(false)

  async function query(params: any) {
    setData(null);
    setLoading(true);
    const { error: err, message, data: res, success } = await service(params);
    setData(res);
    setError(err);
    setMessage(message)
    setSuccess(success)
    setLoading(false);
  }
  return { error, message, data, success, loading, query };
}
