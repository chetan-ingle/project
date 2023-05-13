import { BASE_URL } from "../utils/static";

export default async function loginService(params: {
  username: string;
  password: string;
}): Promise<{
  error: boolean;
  message: string | null;
  data: any | null;
  success: boolean;
}> {
  try {
    const req = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(params),
      headers: {
        'Content-type': "application/json"
      }
    });
    const res = await req.json();
    const { error, message, data, success } = res;
    return { error, message, data, success };
  } catch (error: any) {
    return { error, message: null, data: null, success: true };
  }
}
