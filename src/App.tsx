import { About } from './components/About';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { useInitialHashScroll } from './hooks/useInitialHashScroll';

export default function App() {
  useInitialHashScroll();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
