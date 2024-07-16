import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [borderRadiusIndex, setBorderRadiusIndex] = useState(0);

  const borderRadiusClasses = [
    'rounded-full',
    'rounded-sm',
    'rounded',
    'rounded-md',
    'rounded-lg'
  ];

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBorderRadiusIndex((prevIndex) =>
        (prevIndex + 1) % borderRadiusClasses.length
      );
    }, 2000); // Change roundness every second

    return () => clearInterval(interval);
  }, []);

  return ( 
    <div
      ref={cursorRef}
      className={`fixed top-5 left-10 w-5 h-5 border-2 border-green-400 pointer-events-none transform duration-200 ease-out transition-all ${borderRadiusClasses[borderRadiusIndex]}`}
      style={{ transition: "border-radius 1s ease, transform 0.2s ease-out " }}
    ></div>
  );
};

export default CustomCursor;
