// skill.service.ts
import api from "../lib/axios";

export interface Skill {
  _id: string;
  name: string;
  category: string;
}

export const getSkills = async (): Promise<Skill[]> => {
  const res = await api.get("/skills");
  return res.data.data; // return only the array of skills
};
