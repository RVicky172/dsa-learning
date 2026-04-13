import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, BookOpen, Zap } from 'lucide-react';
import Hero from '../components/Hero';
import TopicCard from '../components/TopicCard';
import { topicsData } from '../data/topicsData';
import { useProgress } from '../hooks/useProgress';

interface HomeProps {
  onNavigate: (section: string) => void;
  onTopicSelect: (topicId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onTopicSelect, searchQuery, setSearchQuery }) => {
  const { stats } = useProgress();

  // Filter topics based on search query
  const filteredTopics = topicsData.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <Hero onNavigate={onNavigate} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Features Section */}
      <section className="container" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}
        >
          <motion.div variants={itemVariants} className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
            <div style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '1.5rem' }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Lightning Fast</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Optimized learning paths that get you results in record time. No fluff, just pure algorithmic mastery.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
            <div style={{ color: 'var(--secondary-color)', marginBottom: '1rem', fontSize: '1.5rem' }}>
              <BookOpen size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Comprehensive</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {topicsData.length} major DSA topics with in-depth explanations, real-world applications, and dozens of practice problems.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
            <div style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '1.5rem' }}>
              <BarChart3 size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Interactive</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Visualize algorithms in action with detailed complexity analysis and step-by-step code walkthroughs.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container" style={{ padding: '4rem 0' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}
        >
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>{topicsData.length}</h3>
            <p style={{ color: 'var(--text-muted)' }}>Core Topics</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>{stats.totalCompletedTopics}</h3>
            <p style={{ color: 'var(--text-muted)' }}>Completed Topics</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>50+</h3>
            <p style={{ color: 'var(--text-muted)' }}>Practice Problems</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>{stats.totalCompletedProblems}</h3>
            <p style={{ color: 'var(--text-muted)' }}>Problems Solved</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>100%</h3>
            <p style={{ color: 'var(--text-muted)' }}>Free &amp; Open</p>
          </div>
        </motion.div>
      </section>

      {/* Topics Preview */}
      <section id="topics" className="container" style={{ padding: '4rem 0' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem'
          }}
        >
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span className="gradient-text" style={{ fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Comprehensive Curriculum</span>
            <h2 style={{ fontSize: '3.5rem', marginTop: '1rem', letterSpacing: '-0.03em' }}>Master Every Concept</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
              A structured path from fundamental building blocks to advanced algorithmic mastery. Including Graphs and beyond.
            </p>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredTopics.map((topic) => (
            <motion.div
              variants={itemVariants}
              key={topic.id}
              onClick={() => onTopicSelect(topic.id)}
              style={{ cursor: 'pointer' }}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <TopicCard {...topic} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container" style={{ textAlign: 'center', padding: '8rem 0' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass" 
          style={{ padding: '4rem', borderRadius: '24px', borderColor: 'var(--primary-color)', borderWidth: '2px' }}
        >
          <span style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Get Started Today</span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', marginTop: '0.5rem' }}>Ready to Master DSA?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
            Join thousands of developers who have mastered algorithms and landed jobs at Google, Meta, Microsoft, and more. Start your journey today with {topicsData.length} comprehensive topics including Graphs, Dynamic Programming, and Recursion.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ y: -3, boxShadow: '0 20px 50px rgba(139, 92, 246, 0.4)' }}
              onClick={() => onNavigate('topics')}
              style={{
                background: 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))',
                color: 'var(--bg-color)',
                padding: '1.2rem 3rem',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.1rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 15px 40px rgba(139, 92, 246, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              🚀 Start Learning Free
            </motion.button>
            <motion.button
              whileHover={{ y: -3, backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
              onClick={() => onNavigate('problems')}
              style={{
                backgroundColor: 'transparent',
                color: 'var(--text-main)',
                padding: '1.2rem 3rem',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.1rem',
                border: '2px solid var(--secondary-color)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              💪 Solve Problems
            </motion.button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
