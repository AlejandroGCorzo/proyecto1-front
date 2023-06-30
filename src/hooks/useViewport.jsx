import React, { useEffect, useState } from "react";

const useViewport = () => {
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { viewportSize, setViewportSize };
};

export default useViewport;
