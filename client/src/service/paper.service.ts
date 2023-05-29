import { BASE_URL } from "../utils/static";
import { useEffect, useState } from "react";
// get paper
export async function get_paper(subject: string) {
  try {
    const req = await fetch(`${BASE_URL}/paper/${subject}`, {
      credentials: "include",
    });
    const res = await req.json();
    const { error, message, data, success } = res;
    return { error, message, data, success };
  } catch (error: any) {
    return { error, message: null, data: null, success: true };
  }
}

//  put paper

export async function put_paper(paper: any) {
  try {
    const req = await fetch(`${BASE_URL}/paper`, {
      credentials: "include",
      method: "POST",
      body: paper
    });
    const res = await req.json();
    const { error, message, data, success } = res;
    console.log(res);
    return { error, message, data, success };
  } catch (error: any) {
    return { error, message: null, data: null, success: true };
  }
}

//  get paper by id
export async function get_paper_status(id: string) {
  try {
    const req = await fetch(`${BASE_URL}/paper/id/${id}`, {
      credentials: "include",
    });
    const res = await req.json();
    const { error, message, data, success } = res;
    return { error, message, data, success };
  } catch (error: any) {
    return { error, message: null, data: null, success: true };
  }
}

//  accept paper for schedule
export async function accept_paper(payload: any) {
  try {
    const req = await fetch(`${BASE_URL}/paper/moderator/accept`, {
      credentials: "include",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),

    });
    const res = await req.json();
    const { error, message, data, success } = res;
    return { error, message, data, success };
  } catch (error: any) {
    return { error, message: null, data: null, success: true };
  }
}


export function useCheckPaper(id: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<{ status: boolean; date: Date } | null>(null);
  const [message, setMessage] = useState<any>(null);

  const check = async () => {
    const res = await get_paper_status(id);
    const { error, message, data } = res;
    setError(error);
    setLoading(false);
    setData(data);
    setMessage(message);
  };
  useEffect(() => {

    check();
  }, [id]);

  return { loading, error, data, message, check };
}


export async function getApprovedPaper(email:String){
  try {
    const req = await fetch(`${BASE_URL}/paper/get/examiner-paper`, {
      credentials: "include",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email}),

    });
    const res = await req.json();
    const { message, data, success } = res;
    return {  message, data, success };
  } catch (error: any) {
    return { error, message: null, data: null, success: true };
  }
}