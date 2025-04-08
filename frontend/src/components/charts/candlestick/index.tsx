import React, { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';

type Candle = [number, number, number, number, number]; // [timestamp, open, close, low, high]

const generateFakeCandle = (prev: Candle): Candle => {
    const time = prev[0] + 60 * 1000;
    const open = prev[2];
    const close = open + (Math.random() - 0.5) * 2;
    const high = Math.max(open, close) + Math.random();
    const low = Math.min(open, close) - Math.random();

    return [
        time,
        +open.toFixed(2),
        +close.toFixed(2),
        +low.toFixed(2),
        +high.toFixed(2),
    ];
};

const GoldChartECharts: React.FC = () => {
    const [data, setData] = useState<Candle[]>([]);
    const [latestPrice, setLatestPrice] = useState<number | null>(null);
    const timerRef = useRef<NodeJS.Timer | null>(null);

    useEffect(() => {
        const now = Math.floor(Date.now() / 1000) * 1000;
        const candles: Candle[] = [];

        let lastClose = 2000;
        for (let i = 30; i > 0; i--) {
            const time = now - i * 60 * 1000;
            const open = lastClose;
            const close = open + (Math.random() - 0.5) * 2;
            const high = Math.max(open, close) + Math.random();
            const low = Math.min(open, close) - Math.random();
            candles.push([time, +open.toFixed(2), +close.toFixed(2), +low.toFixed(2), +high.toFixed(2)]);
            lastClose = close;
        }

        setData(candles);
        setLatestPrice(candles[candles.length - 1][2]); // close

        timerRef.current = setInterval(() => {
            setData((prev) => {
                const next = generateFakeCandle(prev[prev.length - 1]);
                const newData = [...prev.slice(1), next];
                setLatestPrice(next[2]);
                return newData;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const getOption = (): echarts.EChartsOption => ({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
        },
        yAxis: {
            scale: true,
            type: 'value',
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
        },
        series: [
            {
                type: 'candlestick',
                data: data.map(([time, open, close, low, high]) => [time, open, close, low, high]),
                itemStyle: {
                    color: '#00da3c',
                    color0: '#ec0000',
                    borderColor: '#00da3c',
                    borderColor0: '#ec0000',
                },
            },
        ],
    });

    return (
        <div style={{ width: '100%', height: '520px' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
                🪙 XAU/USD Realtime Price: {latestPrice ? `$${latestPrice.toFixed(2)}` : 'Loading...'}
            </div>
            <ReactECharts option={getOption()} style={{ height: '100%' }} />
        </div>
    );
};

export default GoldChartECharts;
