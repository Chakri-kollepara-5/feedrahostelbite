const BackgroundVideoFrame = ({ image, video }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      
      {/* Background Video */}
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />

      {/* Foreground Image */}
      <img
        src={image}
        alt="Foreground Frame"
        className="relative z-10 w-full pointer-events-none rounded-xl"
      />
    </div>
  );
};

export default BackgroundVideoFrame;
