import { useQueries, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexCharts from "react-apexcharts";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    height: number;
    low: number;
    close: number;
    volumne: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
    isDark: boolean;
}

function Chart({ coinId, isDark }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => {
        return fetchCoinHistory(coinId);
    });
    // const params = useParams();
    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ApexCharts
                    type="line"
                    series={[
                        {
                            name: "bit-coin price",
                            data: data?.map((price) => price.close) as number[],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: {
                            show: false,
                        },
                        xaxis: {
                            labels: { show: false },
                            axisTicks: { show: false },
                            axisBorder: { show: false },
                            type: "datetime",
                            categories: data?.map((time) => time.time_close),
                        },
                        yaxis: {
                            show: false,
                        },
                        stroke: {
                            curve: "smooth",
                            width: 1,
                        },
                        fill: {
                            type: "gradient",
                            gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$ ${value.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}
export default Chart;
