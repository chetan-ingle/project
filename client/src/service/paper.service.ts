import { BASE_URL } from "../utils/static";

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
