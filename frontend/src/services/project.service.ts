import api from "../lib/axios";

// export interface Project {
//   title: string;
//   description: string;
//   techStack:string;
//   githubUrl:string;
//   liveUrl?:string;
//   image:string;
//   featured?: boolean;
// }

export async function getProjects() {
  try {
    const res = await api.get("/projects");
    return res.data.data ?? res.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}
