import { useRef, useState, useEffect } from "react";
import { useCanvasContext } from "@/context/CanvasContext"; // Import the context
import { Button } from "@/components/ui/button"

export default function DrawingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [drawing, setDrawing] = useState(false);
    const { setCanvasData, fetchPrediction } = useCanvasContext(); // Access context

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = 500;
        canvas.height = 500;
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
        extractCanvasData(); // Extract and update canvas data when drawing stops
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

    const extractCanvasData = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Apply the blur effect before extracting data
        const ctx = ctxRef.current;
        if (!ctx) return;

        // Set the blur effect (adjust the value to your desired level)
        ctx.filter = 'blur(2px)';  // You can change the 2px to a higher value for more blur
        ctx.drawImage(canvas, 0, 0); // Redraw the canvas content with the blur applied

        // Create a temporary 28x28 canvas for extracting data
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;

        // Set the size to 28x28
        tempCanvas.width = 28;
        tempCanvas.height = 28;

        // Scale down the original canvas to 28x28
        tempCtx.drawImage(canvas, 0, 0, 28, 28);

        // Get image data from the 28x28 canvas
        const imageData = tempCtx.getImageData(0, 0, 28, 28);
        const data = imageData.data;

        // Create a 28x28 array to hold the grayscale values
        const grayscaleValues: number[] = [];
        for (let i = 0; i < data.length; i += 4) {
            // Extract the red channel (grayscale values are the same in RGB)
            const grayscale = data[i]; // Data[0], which is the red channel
            grayscaleValues.push(grayscale); // Normalize to 0-1 range
        }

        // Reset the filter to none for future drawings
        ctx.filter = 'none';

        // Update the context with the grayscale values and call prediction
        setCanvasData(grayscaleValues);  // Store the data in context (optional)
        fetchPrediction(grayscaleValues); // Directly fetch prediction
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

