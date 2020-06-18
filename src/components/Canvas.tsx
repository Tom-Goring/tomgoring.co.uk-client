import React, { useState, useLayoutEffect } from "react";

export default () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const targetRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateSize = () => {
      if (targetRef.current) {
        setDimensions({
          width: targetRef.current.offsetWidth,
          height: targetRef.current.offsetHeight,
        });
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div ref={targetRef} style={{ width: "100%", height: "100%" }}>
      <canvas width={dimensions.width} height={dimensions.height} ref={canvasRef}></canvas>
    </div>
  );
};
