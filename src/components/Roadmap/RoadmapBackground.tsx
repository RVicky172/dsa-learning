import { motion } from 'framer-motion';

const RoadmapBackground = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 0.4
    }}>
      {/* Array Structure */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotateX: [0, 10, 0],
          rotateZ: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          perspective: '1000px'
        }}
      >
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          transformStyle: 'preserve-3d'
        }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              style={{
                width: '40px',
                height: '40px',
                background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
                borderRadius: '8px',
                boxShadow: `0 ${10 + i * 5}px 30px rgba(var(--primary-rgb), 0.3)`,
                transform: `translateZ(${i * 10}px)`
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Tree Structure */}
      <motion.svg
        viewBox="0 0 200 200"
        width={200}
        height={200}
        animate={{
          y: [0, 20, 0],
          rotateY: [0, 15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          opacity: 0.6,
          perspective: '1000px'
        }}
      >
        <circle cx="100" cy="20" r="12" fill="var(--secondary-color)" />
        <line x1="100" y1="32" x2="60" y2="60" stroke="var(--accent-color)" strokeWidth="2" />
        <line x1="100" y1="32" x2="140" y2="60" stroke="var(--accent-color)" strokeWidth="2" />
        <circle cx="60" cy="60" r="10" fill="var(--secondary-color)" />
        <circle cx="140" cy="60" r="10" fill="var(--secondary-color)" />
        <line x1="60" y1="70" x2="40" y2="100" stroke="var(--accent-color)" strokeWidth="2" />
        <line x1="60" y1="70" x2="80" y2="100" stroke="var(--accent-color)" strokeWidth="2" />
        <line x1="140" y1="70" x2="120" y2="100" stroke="var(--accent-color)" strokeWidth="2" />
        <line x1="140" y1="70" x2="160" y2="100" stroke="var(--accent-color)" strokeWidth="2" />
        <circle cx="40" cy="100" r="8" fill="var(--primary-color)" />
        <circle cx="80" cy="100" r="8" fill="var(--primary-color)" />
        <circle cx="120" cy="100" r="8" fill="var(--primary-color)" />
        <circle cx="160" cy="100" r="8" fill="var(--primary-color)" />
      </motion.svg>

      {/* Stack Structure */}
      <motion.div
        animate={{
          y: [-30, 0, -30],
          rotateX: [0, -10, 0]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          perspective: '1000px'
        }}
      >
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            style={{
              width: '60px',
              height: '30px',
              background: `linear-gradient(135deg, var(--accent-color), var(--primary-color))`,
              borderRadius: '6px',
              marginBottom: '-5px',
              boxShadow: `0 ${5 + i * 3}px 20px rgba(var(--accent-color), 0.25)`,
              zIndex: 3 - i
            }}
          />
        ))}
      </motion.div>

      {/* Linked List Structure */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          rotateZ: [0, 8, 0]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '70%',
          left: '8%',
          display: 'flex',
          alignItems: 'center',
          gap: '0rem'
        }}
      >
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0rem' }}>
            <div
              style={{
                width: '35px',
                height: '35px',
                background: `linear-gradient(135deg, var(--secondary-color), var(--accent-color))`,
                borderRadius: '50%',
                boxShadow: `0 8px 25px rgba(var(--secondary-color), 0.3)`,
                border: '2px solid var(--primary-color)'
              }}
            />
            {i < 2 && (
              <svg width="30" height="20" style={{ marginRight: '-5px' }}>
                <path d="M 5 10 L 25 10" stroke="var(--primary-color)" strokeWidth="2" fill="none" />
                <polygon points="25,10 20,6 20,14" fill="var(--primary-color)" />
              </svg>
            )}
          </div>
        ))}
      </motion.div>

      {/* Queue Structure */}
      <motion.div
        animate={{
          y: [0, 25, 0],
          rotateZ: [0, -5, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          display: 'flex',
          gap: '0.3rem'
        }}
      >
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            style={{
              width: '30px',
              height: '50px',
              background: `linear-gradient(135deg, var(--primary-color), var(--accent-color))`,
              borderRadius: '4px',
              boxShadow: `0 ${8 + i * 4}px 25px rgba(var(--primary-color), 0.25)`,
              transform: `translateY(${i * 8}px)`
            }}
          />
        ))}
      </motion.div>

      {/* Hash Table */}
      <motion.div
        animate={{
          rotateY: [0, 15, 0],
          y: [0, -15, 0]
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '12%',
          perspective: '1000px'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 35px)',
          gap: '8px'
        }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div
              key={i}
              style={{
                width: '35px',
                height: '35px',
                background: `linear-gradient(135deg, var(--accent-color), var(--secondary-color))`,
                borderRadius: '6px',
                boxShadow: `0 6px 15px rgba(var(--accent-color), 0.2)`,
                border: '1px solid var(--primary-color)'
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RoadmapBackground;
