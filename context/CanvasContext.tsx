import React, { createContext, useContext, useState } from "react";
import fetchPrediction from "../utils/fetchPrediction.ts";

interface CanvasContextType {
    canvasData: number[];
    setCanvasData: React.Dispatch<React.SetStateAction<number[]>>;
    predictionProbabilities: number[]; // Add the prediction probabilities to the context
    setPredictionProbabilities: React.Dispatch<React.SetStateAction<number[]>>; // Add setter for probabilities
    fetchPrediction: (data: number[]) => Promise<void>;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const useCanvasContext = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error("useCanvasContext must be used within a CanvasProvider");
    }
    return context;
};

export const CanvasProvider: React.FC = ({ children }) => {
    const [canvasData, setCanvasData] = useState<number[]>([]);
    const [predictionProbabilities, setPredictionProbabilities] = useState<number[]>([]); // Add state for prediction probabilities
    const handlefetchPrediction = async (data: number[]) => {
        console.log("Fetching prediction for:", data);
        const probabilities = await fetchPrediction(data);
        console.log("Setting prediction probabilities:", probabilities);
        setPredictionProbabilities([...probabilities]);  // Ensure state updates
    };


    return (
        <CanvasContext.Provider value={{
            canvasData,
            setCanvasData,
            predictionProbabilities,
            setPredictionProbabilities,
            fetchPrediction: handlefetchPrediction
        }}>
            {children}
        </CanvasContext.Provider>
    );
};

