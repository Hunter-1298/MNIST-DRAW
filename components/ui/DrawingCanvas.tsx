// components/DrawingCanvas.tsx
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Make sure Button is correctly imported
import { useCanvasContext } from "@/context/CanvasContext"; // Import the useCanvasContext hook

export default function DrawingCanvas() {
    const { canvasData, setCanvasData, fetchPrediction } = useCanvasContext();
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

        // Set initial canvas properties
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    const stopDrawing = async () => {
        setDrawing(false);
        // After drawing stops, get the canvas data and normalize it
        if (ctxRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = ctxRef.current;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const grayscaleValues = Array.from(data).filter((_, index) => index % 4 === 0); // Extract RGBA channels, use only red for grayscale
            const normalizedValues = normalizeGrayscale(grayscaleValues);
            setCanvasData(normalizedValues); // Update the context with new data
            await fetchPrediction(normalizedValues); // Trigger prediction with new data
        }
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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Normalize the grayscale values to a 0-1 scale
    const normalizeGrayscale = (values: number[]) => {
        return values.map((value) => value / 255); // Normalize to [0, 1]
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
            <Button onClick={clearCanvas} className="w-full max-w-[200px] m-4 font-bold rounded hover:bg-gray-400">
                Clear Canvas
            </Button>
        </div>
    );
}

