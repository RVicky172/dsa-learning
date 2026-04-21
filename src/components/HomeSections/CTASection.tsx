import { motion } from 'framer-motion';

interface CTASectionProps {
  totalTopics: number;
  onNavigate: (section: string) => void;
}

const CTASection = ({ totalTopics, onNavigate }: CTASectionProps) => {
  return (
    <section className="container" style={{ textAlign: 'center', padding: '8rem 0' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass"
        style={{ padding: '4rem', borderRadius: '24px', borderColor: 'var(--primary-color)', borderWidth: '2px' }}
      >
        <span style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Get Started Today
        </span>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', marginTop: '0.5rem' }}>Ready to Master DSA?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
          Join thousands of developers who have mastered algorithms and landed jobs at Google, Meta, Microsoft, and more. Start your journey today with {totalTopics} comprehensive topics including Graphs, Dynamic Programming, and Recursion.
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
              transition: 'all 0.3s ease',
            }}
          >
            Start Learning Free
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
              transition: 'all 0.3s ease',
            }}
          >
            Solve Problems
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
