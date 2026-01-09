import api from "../lib/axios";

export async function sendContact(payload: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const res = await api.post("/contact", payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send message");
  }
}
