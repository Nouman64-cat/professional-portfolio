import { useEffect, useRef } from 'react';

const FloatingShapes = () => {
  const shapesContainerRef = useRef(null);

  useEffect(() => {
    const shapesContainer = shapesContainerRef.current;
    const shapes = shapesContainer.children;

    Array.from(shapes).forEach((shape) => {
      const randomX = Math.floor(Math.random() * window.innerWidth);
      const randomY = Math.floor(Math.random() * window.innerHeight);
      const randomDuration = Math.random() * 20 + 10;
      const randomDelay = Math.random() * 5;

      shape.style.left = `${randomX}px`;
      shape.style.top = `${randomY}px`;
      shape.style.animationDuration = `${randomDuration}s`;
      shape.style.animationDelay = `${randomDelay}s`;
    });
  }, []);

  const shapesArray = [...Array(20)].map((_, i) => (
    <div
      key={i}
      className="floating-shape"
      style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        border: '2px solid #38a169', // Tailwind green-400
        borderRadius: i % 2 === 0 ? '50%' : '0%',
        animation: 'float 20s infinite linear',
        opacity: 0.6,
      }}
    />
  ));

  return (
    <>
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-50px) rotate(180deg);
            }
            100% {
              transform: translateY(0) rotate(360deg);
            }
          }
          .floating-shape {
            animation-name: float;
          }
        `}
      </style>
      <div
        ref={shapesContainerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        {shapesArray}
      </div>
    </>
  );
};

export default FloatingShapes;
