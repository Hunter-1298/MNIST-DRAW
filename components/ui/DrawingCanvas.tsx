"use client";
import { Button } from "@/components/ui/button"

import { useRef, useEffect, useState } from "react";

export default function DrawingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set background to black
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set drawing properties
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "white";

        ctxRef.current = ctx;
    }, []);

    const startDrawing = (e: React.MouseEvent) => {
        setDrawing(true);
        if (!ctxRef.current) return;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    };

    const stopDrawing = () => {
        setDrawing(false);
    };

    const draw = (e: React.MouseEvent) => {
        if (!drawing || !ctxRef.current) return;
        ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctxRef.current.stroke();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx) return;

        // Clear the canvas and reapply the black background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <canvas
                ref={canvasRef}
                className="border border-gray-500 cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
            />
            <Button
                onClick={clearCanvas}
                className="w-full max-w-[200px] m-4 font-bold rounded hover:bg-gray-400"
            >
                Clear Canvas
            </Button>
        </div>
    );
}

