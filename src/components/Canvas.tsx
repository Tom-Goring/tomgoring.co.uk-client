import React, { useState, useEffect, useLayoutEffect } from "react";

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

function getDisOf(b1: Ball, b2: Ball) {
  let delta_x = Math.abs(b1.x - b2.x),
    delta_y = Math.abs(b1.y - b2.y);

  return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
}

export default () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const targetRef = React.useRef<HTMLDivElement>(null);

  const ballRef = React.useRef<Ball[] | null>(null);
  const dimensionRef = React.useRef<any>({ width: 0, height: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const mouseBall = React.useRef<Ball>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 0,
    type: "mouse",
    alpha: 1,
    phase: 0,
  });

  const renderBalls = () => {
    if (canvasRef.current && ballRef.current) {
      let canvas = canvasRef.current;
      let ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, dimensionRef.current.width, dimensionRef.current.height);
        Array.prototype.forEach.call(ballRef.current, (b: Ball) => {
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

  const renderLines = () => {
    if (canvasRef.current && ballRef.current) {
      let canvas = canvasRef.current;
      let ctx = canvas.getContext("2d");
      if (ctx) {
        let fraction, alpha;
        for (let i = 0; i < ballRef.current.length; i++) {
          for (let j = i; j < ballRef.current.length; j++) {
            fraction = getDisOf(ballRef.current[i], ballRef.current[j]) / dis_limit;

            if (fraction < 1) {
              alpha = 1 - fraction;

              ctx.strokeStyle = `rgba(150, 150, 150, ${alpha})`;
              ctx.lineWidth = link_line_width;

              ctx.beginPath();
              ctx.moveTo(ballRef.current[i].x, ballRef.current[i].y);
              ctx.lineTo(ballRef.current[j].x, ballRef.current[j].y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    }
  };

  const updateBalls = () => {
    let new_balls: Ball[] = [];
    if (ballRef.current) {
      Array.prototype.forEach.call(ballRef.current, (b: Ball) => {
        b.x += b.vx;
        b.y += b.vy;

        if (
          b.x > -50 &&
          b.x < dimensionRef.current.width + 50 &&
          b.y > -50 &&
          b.y < dimensionRef.current.height + 50
        ) {
          new_balls.push(b);
        }

        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
      });
      ballRef.current = new_balls;
    }
  };

  const topUpBalls = (min: number) => {
    if (ballRef.current) {
      if (ballRef.current.length < min) {
        ballRef.current.push(
          genRandomBall(dimensionRef.current.width, dimensionRef.current.height)
        );
      }
    }
  };

  const updateSize = () => {
    if (targetRef.current) {
      dimensionRef.current = {
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      };
    }
    setDimensions({ ...dimensionRef.current });
  };

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Handle creating new balls when the dimensions change and no balls currently exist.
  useEffect(() => {
    const initBalls = (num: number) => {
      let new_balls = [];
      for (let i = 0; i < num; i++) {
        new_balls.push(genRandomBall(dimensionRef.current.width, dimensionRef.current.height));
      }
      return new_balls.slice(0);
    };

    if (dimensionRef.current.height !== 0 && dimensionRef.current.width !== 0) {
      if (ballRef.current === null) {
        ballRef.current = initBalls(30);
      }
    }
  }, [dimensions]);

  useEffect(() => {
    const render = () => {
      if (canvasRef.current) {
        let canvas = canvasRef.current;
        let ctx = canvas.getContext("2d");
        if (ctx) {
          renderBalls();
          renderLines();
          updateBalls();
          topUpBalls(30);
          requestAnimationFrame(render);
        }
      }
    };
    let animationID = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationID);
  }, []);

  return (
    <div
      ref={targetRef}
      style={{ width: "100%", height: "100%", backgroundColor: "#252934", overflow: "hidden" }}>
      <canvas
        width={dimensions.width}
        height={dimensions.height}
        ref={canvasRef}
        onClick={(e) => {
          let width = canvasRef.current?.parentElement?.offsetWidth;
          let height = canvasRef.current?.parentElement?.offsetHeight;
          if (height && width) {
            let y = height;
            let x = width;
            dimensionRef.current = { width: x, height: y };
            setDimensions({ width: x, height: y });
          }
        }}
        onMouseEnter={(e) => {
          ballRef.current?.push(mouseBall.current);
        }}
        onMouseLeave={(e) => {
          let new_balls: Ball[] = [];
          Array.prototype.forEach.call(ballRef.current, (b: Ball) => {
            if (!b.type) {
              new_balls.push(b);
            }
            ballRef.current = new_balls;
          });
        }}
        onMouseMove={(e) => {
          let canvas = canvasRef.current;
          if (canvas) {
            let rect = canvas.getBoundingClientRect();
            let scaleX = canvas.width / rect.width;
            let scaleY = canvas.height / rect.height;

            let x = (e.clientX - rect.left) * scaleX;
            let y = (e.clientY - rect.top) * scaleY;

            mouseBall.current.x = x;
            mouseBall.current.y = y;
          }
        }}
      />
    </div>
  );
};
