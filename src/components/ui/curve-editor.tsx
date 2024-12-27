"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface CurveEditorProps {
  points: Point[];
  onChange: (points: Point[]) => void;
  color?: string;
  gridColor?: string;
  lineColor?: string;
  pointColor?: string;
  width?: number;
  height?: number;
}

export function CurveEditor({
  points,
  onChange,
  color = '#FFFFFF',
  gridColor = '#333333',
  lineColor = '#FFFFFF',
  pointColor = '#00A3FF',
  width = 256,
  height = 256
}: CurveEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [sortedPoints, setSortedPoints] = useState<Point[]>(points);

  useEffect(() => {
    setSortedPoints([...points].sort((a, b) => a.x - b.x));
  }, [points]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;

    // Draw vertical lines
    for (let i = 0; i <= 4; i++) {
      const x = (width * i) / 4;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let i = 0; i <= 4; i++) {
      const y = (height * i) / 4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawCurve = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height);

    // Draw curve through points
    for (let x = 0; x <= width; x++) {
      const xNorm = x / width;
      let yNorm = 0;

      // Find surrounding points
      for (let i = 0; i < sortedPoints.length - 1; i++) {
        const curr = sortedPoints[i];
        const next = sortedPoints[i + 1];

        if (xNorm >= curr.x && xNorm <= next.x) {
          const t = (xNorm - curr.x) / (next.x - curr.x);
          yNorm = curr.y + t * (next.y - curr.y);
          break;
        }
      }

      const y = height - yNorm * height;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  };

  const drawPoints = (ctx: CanvasRenderingContext2D) => {
    sortedPoints.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(
        point.x * width,
        height - point.y * height,
        index === selectedPoint ? 6 : 4,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = index === selectedPoint ? pointColor : color;
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw components
    drawGrid(ctx);
    drawCurve(ctx);
    drawPoints(ctx);
  };

  useEffect(() => {
    draw();
  }, [sortedPoints, selectedPoint]);

  const getMousePosition = (e: React.MouseEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / width;
    const y = 1 - (e.clientY - rect.top) / height;
    return {
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y))
    };
  };

  const findClosestPoint = (pos: Point): number => {
    let minDist = Infinity;
    let pointIndex = -1;

    sortedPoints.forEach((point, index) => {
      const dist = Math.hypot(
        (point.x - pos.x) * width,
        (point.y - pos.y) * height
      );
      if (dist < minDist) {
        minDist = dist;
        pointIndex = index;
      }
    });

    return minDist < 10 ? pointIndex : -1;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const pos = getMousePosition(e);
    const pointIndex = findClosestPoint(pos);

    if (pointIndex !== -1) {
      setSelectedPoint(pointIndex);
      setIsDragging(true);
    } else if (sortedPoints.length < 10) {
      // Add new point
      const newPoints = [...sortedPoints, pos].sort((a, b) => a.x - b.x);
      setSortedPoints(newPoints);
      onChange(newPoints);
      setSelectedPoint(newPoints.findIndex(p => p === pos));
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || selectedPoint === null) return;

    const pos = getMousePosition(e);
    const newPoints = [...sortedPoints];
    
    // Don't allow moving first or last point horizontally
    if (selectedPoint === 0) {
      pos.x = 0;
    } else if (selectedPoint === sortedPoints.length - 1) {
      pos.x = 1;
    }
    
    newPoints[selectedPoint] = pos;
    setSortedPoints(newPoints);
    onChange(newPoints);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedPoint(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="border border-[#333] rounded-lg cursor-crosshair"
      style={{ touchAction: 'none' }}
    />
  );
}
