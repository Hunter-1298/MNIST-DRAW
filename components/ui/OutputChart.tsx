"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { useCanvasContext } from "@/context/CanvasContext"; // Import the context

const chartConfig = {
    probability: {
        label: "Probability",
        color: "#2563eb",
    },
} satisfies ChartConfig

export function OutputChart() {
    const { predictionProbabilities } = useCanvasContext(); // Access the context

    const chartData = predictionProbabilities.length
        ? predictionProbabilities.map((probability, index) => ({
            number: index.toString(), // Keep the index as-is for 0-9
            probability,
        }))
        : [{ number: "0", probability: 0 }]; // Default fallback should be "0"

    return (
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid />
                <XAxis
                    dataKey="number"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} wrapperStyle={{ fontSize: '24px' }} />
                <Bar dataKey="probability" fill="var(--color-probability)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}

