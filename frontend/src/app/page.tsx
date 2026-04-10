
import { getProfile } from "@/src/services/profile.service";
import About from "./components/About";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Work from "./components/Work";
import { getProjects } from "../services/project.service";
import { getSkills } from "../services/skill.service";
import Services from "./components/Services";
import NavBar from "./components/NavBar";
import CanvasBackground from "./components/CanvasBackground";
import MusicPlayer from "./components/MusicPlayer";

export default async function Page() {
  const profile = await getProfile();
  const projects = await getProjects();
  const skills = await getSkills();

  return (
    <>
      <CanvasBackground />
      <NavBar />
      <Header profile={profile} />
      <About profile={profile} />
      <Work projects={projects} />
      <Services skills={skills} />
      <Contact />
      <Footer profile={profile} />
      <MusicPlayer />
    </>
  );
}