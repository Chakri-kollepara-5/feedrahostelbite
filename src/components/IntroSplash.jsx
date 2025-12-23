import { useEffect } from "react";

const IntroSplash = ({ onFinish }) => {
  useEffect(() => {
    const t = setTimeout(onFinish, 2000);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <h1 className="text-5xl md:text-6xl font-extrabold text-green-500 tracking-widest animate-fade">
        FEEDRABITE
      </h1>
    </div>
  );
};

export default IntroSplash;