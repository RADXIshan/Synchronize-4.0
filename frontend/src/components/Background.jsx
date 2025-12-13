import React from "react";

const Background = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none bg-black"
      style={{ zIndex: 0 }}
    />
  );
};

export default Background;
