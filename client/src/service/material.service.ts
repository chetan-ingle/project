import { BASE_URL } from "../utils/static";

export async function get_material({ id, subject }: { id?: string; subject?: string }) {
  try {
    const path = id ? `${BASE_URL}/syllabus/${id}` : `${BASE_URL}/syllabus/subject/${subject}`;
    const req = await fetch(path, {
      credentials: "include",
    });
    const res = await req.json();
    const { error, message, data, success } = res;
    return { error, message, data, success };
  } catch (error: any) {
    return { error, message: null, data: null, success: true };
  }
}

export async function put_material(payload: any) {
  try {
    const req = await fetch(`${BASE_URL}/syllabus/create`, {
      credentials: "include",
      method: "post",
      mode: "cors",
      body: payload,
    });
    const res = await req.json();
    const { error, message, data, success } = res;
    return { error, message, data, success };
  } catch (error: any) {
    return { error, message: null, data: null, success: true };
  }
}

export async function delete_material(id: string) {
  try {
    const req = await fetch(`${BASE_URL}/syllabus/delete/${id}`, {
      credentials: "include",
      method: "post",
    });
    const res = await req.json();
    const { error, message, data, success } = res;
    return { error, message, data, success };
  } catch (error: any) {
    return { error, message: null, data: null, success: true };
  }
}
