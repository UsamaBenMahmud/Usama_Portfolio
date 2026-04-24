import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import { Skills, Education } from './components/SkillsEducation';
import Experience from './components/Experience';
import Projects from './components/Projects';
import YSSEJourney from './components/YSSEJourney';
import { Achievements, Certificates } from './components/AchievementsCertificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-dark-bg text-white' : 'bg-light-bg text-gray-900'
      }`}
    >
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <YSSEJourney />
      <Achievements />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
