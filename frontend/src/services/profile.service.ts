import api from "../lib/axios";

export async function getProfile() {
  try {
    const res = await api.get("/profile");
    return res.data.data; // directly return data
  } catch (error) {
    throw new Error("Failed to fetch profile");
  }
}
