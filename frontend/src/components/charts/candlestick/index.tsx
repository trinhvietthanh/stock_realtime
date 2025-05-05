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
    const [connected, setConnected] = useState(false);
    const timerRef = useRef<number | null>(null);

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


        timerRef.current = window.setInterval(() => {
            setData((prev) => {
                const next = generateFakeCandle(prev[prev.length - 1]);
                const newData = [...prev.slice(1), next];
                return newData;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    useEffect(() => {
        const socket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET}?symbol=${encodeURIComponent("xau/usd")}`);

        socket.onopen = () => {
            setConnected(true);
            socket.send(JSON.stringify({ type: 'subscribePrice' }));
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'currentPrice' || data.type === 'priceUpdate') {
                    console.log(data.price)
                    setLatestPrice(data.price);
                }
            } catch (err) {
                console.error('Error parsing message:', err);
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            setConnected(false);
            console.log('WebSocket disconnected');
        };

        return () => {
            socket.close();
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
            boundaryGap: ['0%', '0%'],
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
                🪙 XAU/USD Realtime Price: {latestPrice ? `$${latestPrice}` : 'Loading...'}       <p>Status: {connected ? '🟢 Connected' : '🔴 Disconnected'}</p>
            </div>
            <ReactECharts option={getOption()} style={{ height: '100%' }} />
        </div>
    );
};

export default GoldChartECharts;
