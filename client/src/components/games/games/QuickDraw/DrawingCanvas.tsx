import React, { useRef, useState } from "react";

interface DrawingCanvasProps {
  onChange: (dataUrl: string) => void;
  disabled?: boolean;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  onChange,
  disabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);

  const startDraw = (e: React.MouseEvent) => {
    if (disabled) return;
    setDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.beginPath();
    ctx.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
  };

  const draw = (e: React.MouseEvent) => {
    if (disabled || !drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    ctx.strokeStyle = "#000";
    ctx.stroke();
    onChange(canvas.toDataURL());
  };

  const endDraw = () => {
    setDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    onChange(canvas.toDataURL());
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange("");
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        style={{
          border: "1px solid #000",
          touchAction: "none",
          display: "block",
          background: "#fff"
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
      />
      <button onClick={clearCanvas} disabled={disabled}
        style={{ marginTop: "0.5rem", background: "#000", color: "#fff", border: "none", padding: "0.3em 1.2em" }}>
        Clear
      </button>
    </div>
  );
};

export default DrawingCanvas;
