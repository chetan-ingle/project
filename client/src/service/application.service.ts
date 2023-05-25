import { BASE_URL } from "../utils/static";

export async function getApplication({ subject }: { subject?: string }) {
  try {
    const req = await fetch(`${BASE_URL}/application/setter/${subject}`, {});
    const res = await req.json();
    const { error, message, data, success } = res;
    return { error, message, data, success };
  } catch (error: any) {
    return { error, message: null, data: null, success: true };
  }
}
