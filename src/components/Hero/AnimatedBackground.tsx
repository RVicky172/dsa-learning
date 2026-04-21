import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <>
      {/* Ambient background gradients */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '0%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: -1,
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-5%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: -1,
          filter: 'blur(40px)',
        }}
      />
    </>
  );
};

export default AnimatedBackground;
