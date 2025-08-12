export const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { color: '#616161', font: { size: 12, weight: 500 } },
            drawBorder: false,
            drawOnChartArea: false,
            border: { display: false },
        },
        y: {
            min: 0,
            max: 100,
            ticks: { stepSize: 10 },
            display: false,
            grid: { display: false },
        },
    },
} as const;
