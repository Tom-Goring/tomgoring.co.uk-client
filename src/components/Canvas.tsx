import React, { useState, useLayoutEffect, useEffect } from "react";

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
  type?: string;
}

function randomArrayItem(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumFrom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function randomSidePos(length: number): number {
  return Math.ceil(Math.random() * length);
}
function randomSpeedFromSide(side: string) {
  let min = -1,
    max = 1;
  switch (side) {
    case "top":
      return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
    case "right":
      return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
    case "bottom":
      return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
    case "left":
      return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
    default:
      console.log(`ERROR: Side ${side} is not defined!`);
      return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
  }
}
function genRandomBall(width: number, height: number): Ball {
  let side = randomArrayItem(directions);
  switch (side) {
    case "top":
      return {
        x: randomSidePos(width),
        y: -R,
        vx: randomSpeedFromSide("top")[0],
        vy: randomSpeedFromSide("top")[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      };
    case "right":
      return {
        x: width + R,
        y: randomSidePos(height),
        vx: randomSpeedFromSide("right")[0],
        vy: randomSpeedFromSide("right")[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      };
    case "bottom":
      return {
        x: randomSidePos(width),
        y: height + R,
        vx: randomSpeedFromSide("bottom")[0],
        vy: randomSpeedFromSide("bottom")[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      };
    case "left":
      return {
        x: -R,
        y: randomSidePos(height),
        vx: randomSpeedFromSide("left")[0],
        vy: randomSpeedFromSide("left")[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      };
    default:
      console.log(`ERROR: Side ${side} is not defined!`);
      return {
        x: randomSidePos(width),
        y: -R,
        vx: randomSpeedFromSide("top")[0],
        vy: randomSpeedFromSide("top")[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      };
  }
}

export default () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const targetRef = React.useRef<HTMLDivElement>(null);
  const animRef = React.useRef<any>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [balls, setBalls] = useState<Ball[]>([]);

  const updateBalls = () => {
    let new_balls: Ball[] = [];
    Array.prototype.forEach.call(balls, (b: Ball) => {
      b.x += b.vx;
      b.y += b.vy;

      if (b.x > -50 && b.x < dimensions.width + 50 && b.y > -50 && b.y < dimensions.height + 50) {
        new_balls.push(b);
      }

      b.phase += alpha_f;
      b.alpha = Math.abs(Math.cos(b.phase));
    });
    return new_balls;
  };

  const renderBalls = () => {
    if (canvasRef.current) {
      let canvas = canvasRef.current;
      let ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        Array.prototype.forEach.call(balls, (b: Ball) => {
          if (!b.type) {
            let color = `rgba(${ball_color.r},${ball_color.g},${ball_color.b},${b.alpha})`;
            ctx!.fillStyle = color;
            ctx?.beginPath();
            ctx?.arc(b.x, b.y, R, 0, Math.PI * 2, true);
            ctx?.closePath();
            ctx?.fill();
          }
        });
      }
    }
  };

  const topUpBalls = (min: number) => {
    if (balls.length < min) {
      let new_balls = balls;
      new_balls.push(genRandomBall(dimensions.width, dimensions.height));
      setBalls(new_balls);
    }
  };

  const render = () => {
    if (canvasRef.current) {
      let canvas = canvasRef.current;
      let ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        renderBalls();
        updateBalls();
        topUpBalls(30);
        requestAnimationFrame(render);
      }
    }
  };

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

  useEffect(() => {
    const initBalls = (num: number) => {
      let new_balls = [];
      for (let i = 0; i < num; i++) {
        new_balls.push(genRandomBall(dimensions.width, dimensions.height));
      }
      return new_balls.slice(0);
    };

    if (dimensions.height !== 0 && dimensions.width !== 0 && balls.length === 0) {
      console.log("Setting balls");
      setBalls(initBalls(30));
    }
  }, [dimensions]);

  useEffect(() => {
    requestAnimationFrame(render);
  });

  return (
    <div ref={targetRef} style={{ width: "100%", height: "100%", backgroundColor: "#252934" }}>
      <canvas
        width={dimensions.width}
        height={dimensions.height}
        ref={canvasRef}
        onClick={(e) => {
          console.clear();
        }}></canvas>
    </div>
  );
};
