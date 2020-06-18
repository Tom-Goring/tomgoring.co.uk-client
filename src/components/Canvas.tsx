import React, { useState, useLayoutEffect } from "react";

const ball_color = {
    r: 102,
    g: 178,
    b: 255,
  },
  R = 2,
  alpha_f = 0.03,
  link_line_width = 0.8,
  dis_limit = 260,
  directions = ["top", "right", "bottom", "left"];

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  phase: number;
  type: string;
}

function randomArrayItem(arr: number[]): number {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumFrom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const targetRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [balls, setBalls] = useState<Ball[]>([]);

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
    <div ref={targetRef} style={{ width: "100%", height: "100%", backgroundColor: "#252934" }}>
      <canvas width={dimensions.width} height={dimensions.height} ref={canvasRef}></canvas>
    </div>
  );
};
