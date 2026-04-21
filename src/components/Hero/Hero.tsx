import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import SearchBar from './SearchBar';
import CTAButtons from './CTAButtons';
import styles from './Hero.module.css';

interface HeroProps {
  onNavigate: (section: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Hero = ({ onNavigate, searchQuery, setSearchQuery }: HeroProps) => {
  const scrollToSection = (sectionId: string) => {
    onNavigate(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={`container ${styles.section}`}>
      <AnimatedBackground />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.heading}>
          Master Data Structures & <br />
          <span className="gradient-text" style={{ fontSize: '1.1em' }}>
            Algorithms Mastery
          </span>
        </h2>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Your journey to algorithmic excellence starts here. A curated path through every major
          DSA topic, visual guides, and technical deep-dives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <CTAButtons
            onRoadmapClick={() => scrollToSection('roadmap')}
            onBigOClick={() => scrollToSection('big-o')}
            onProblemsClick={() => scrollToSection('problems')}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
