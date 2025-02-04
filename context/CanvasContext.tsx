// context/CanvasContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define a type for the canvas data (grayscale values)
interface CanvasContextType {
    canvasData: number[];
    setCanvasData: (data: number[]) => void;
    fetchPrediction: (data: number[]) => Promise<number>;
}

// Create a context with an initial empty value
const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

// Define the props for the CanvasProvider component to include children
interface CanvasProviderProps {
    children: ReactNode;
}

// Custom hook to access the context
export const useCanvasContext = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error("useCanvasContext must be used within a CanvasProvider");
    }
    return context;
};

// Create a provider component to wrap the app and provide the context
export const CanvasProvider: React.FC<CanvasProviderProps> = ({ children }) => {
    const [canvasData, setCanvasData] = useState<number[]>([]);

    // Placeholder for model prediction function
    const fetchPrediction = async (data: number[]) => {
        console.log("Predicting with data", data);
        return 0; // Returning a dummy prediction
    };

    return (
        <CanvasContext.Provider value={{ canvasData, setCanvasData, fetchPrediction }}>
            {children}
        </CanvasContext.Provider>
    );
};

