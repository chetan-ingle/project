import React from "react";
import { BASE_URL } from "../utils/static";

function useNotification(email: string) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any[] | null>(null);
  function refetch() {
    setLoading(true);
    fetch(`${BASE_URL}/notification/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
    setLoading(false);
    setData(data);
  }
  React.useEffect(() => {
    email && refetch();
  }, [email]);

  return {
    data,
    loading,
    refetch,
  };
}

export default useNotification;
