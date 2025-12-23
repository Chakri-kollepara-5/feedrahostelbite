import { useEffect } from "react";

const IntroSplash = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2600); // intro duration

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
      <div className="netflix-logo-green">
        <span>F</span>
        <span>E</span>
        <span>E</span>
        <span>D</span>
        <span>R</span>
        <span>A</span>
        <span>B</span>
        <span>I</span>
        <span>T</span>
        <span>E</span>
      </div>
    </div>
  );
};

export default IntroSplash;
