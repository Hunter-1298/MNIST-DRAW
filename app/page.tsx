'use client'

import DrawingCanvas from "@/components/ui/DrawingCanvas";
import { OutputChart } from "@/components/ui/OutputChart";
import { CanvasProvider } from "@/context/CanvasContext";
import Image from "next/image";
import MNIST from '../public/mnist-background.jpg'
export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-800 p-8">
      {/* Full-width description div */}
      <div className="flex flex-col w-full h-[200px] bg-blue-800 items-center justify-center text-center">
        <h1 className="text-6xl font-extrabold text-white">MNIST DRAW</h1> {/* Big and bold */}
        <h2 className="m-6 text-2xl">Hand writtin digit classifier powered by a CNN running in javascript on your client in real time!</h2>
      </div>
      {/* Main content layout */}
      <div className="flex w-full flex-row m-32">

        <CanvasProvider>
          {/* First DrawingCanvas */}
          <div className="flex flex-col items-center w-full">
            <div className="absolute top-[310px] text-center ">
              <h2 className="font-semibold text-white text-3xl">Draw a number [0-9]</h2>
            </div>
            <DrawingCanvas />
          </div>

          <div className="flex flex-col justify-end items-center w-full">
            {/* Place graph component here!*/}
            <OutputChart />
          </div>

        </CanvasProvider>
      </div>
    </main>
  );
}

