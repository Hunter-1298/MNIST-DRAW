'use client'

import DrawingCanvas from "@/components/ui/DrawingCanvas";
import { OutputChart } from "@/components/ui/OutputChart";
import { CanvasProvider } from "@/context/CanvasContext";

export default function Home() {
  // You will need to handle predictionProbabilities state, maybe from your model inference logic
  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-800 p-8">
      {/* Full-width description div */}
      <div className="flex flex-col w-full h-[200px] bg-blue-800 items-center justify-center text-center">
        <h1 className="text-6xl font-extrabold text-white">MNIST DRAW</h1> {/* Big and bold */}
        <h2 className="m-6 text-2xl">Handwritten digit classifier powered by a CNN running on your client in real time!</h2>
      </div>

      {/* Main content layout */}
      <div className="flex w-full flex-row m-32">
        <CanvasProvider>
          {/* Drawing canvas */}
          <div className="flex flex-col items-center w-full">
            <div className="absolute top-[310px] text-center">
              <h2 className="font-semibold text-white text-3xl">Draw a number [0-9]</h2>
            </div>
            <DrawingCanvas />
          </div>

          {/* Output chart */}
          <div className="flex flex-col justify-end items-center w-full ml-[-150px]">
            <OutputChart />
          </div>
        </CanvasProvider>
      </div>

      {/* Tech Stack section */}
      <div className="flex flex-col w-full h-[200px] bg-blue-800 items-center justify-center text-center">
        <h1 className="text-6xl font-extrabold text-white">Tech Stack</h1> {/* Big and bold */}
        <h3>typerscript, tailwind-css, html, react, NextJS, python, pytorch</h3>
      </div>
    </main>
  );
}

