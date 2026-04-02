import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Problems } from "../components/Problems";
import { Services } from "../components/Services";
import { Packages } from "../components/Packages";
import { Expertise } from "../components/Expertise";
import { Formations } from "../components/Formations";
import { Interventions } from "../components/Interventions";
import { Team } from "../components/Team";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Chatbot } from "../components/Chatbot";

export function HomePage() {
  return (
    <div style={{ scrollBehavior: "smooth" }}>
      <Navbar />
      <Hero />
      <Problems />
      <Services />
      <Packages />
      <Expertise />
      <Formations />
      <Interventions />
      <Team />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}
