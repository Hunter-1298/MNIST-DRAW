"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
    { number: "1", probability: 0 },
    { number: "2", probability: 0 },
    { number: "3", probability: 1 },
    { number: "4", probability: 0 },
    { number: "5", probability: 0 },
    { number: "6", probability: 0 },
    { number: "7", probability: 0 },
    { number: "8", probability: 0 },
    { number: "9", probability: 0 },
]

const chartConfig = {
    probability: {
        label: "Probability",
        color: "#2563eb",
    },
} satisfies ChartConfig

export function OutputChart() {
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


    )
}

