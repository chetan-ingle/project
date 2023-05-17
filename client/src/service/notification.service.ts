import React from "react";
import { BASE_URL } from "../utils/static";
export const notification_service = async ({ name, email, subject }) => {
  const api = `${BASE_URL}/mail/notify/setter`;
  const req = await fetch(api, {
    method: "post",
    body: JSON.stringify({ email, name, subject }),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  });
  const res = await req.json();
  return res as { message: string; success: boolean };
};
