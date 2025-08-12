import { useEffect, useRef, useState } from 'react';
import { type DebouncedFunc } from 'lodash';
import throttle from 'lodash.throttle';
import type { ListEntry } from 'wordcloud';
import WordCloud from 'wordcloud';

import { useWeeklyKeywords } from '@/hooks/home/useKeywordStates';

function WordCloudCanvas() {
    const { data } = useWeeklyKeywords();
    const [list, setList] = useState<ListEntry[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const throttledDrawRef = useRef<DebouncedFunc<(w: number, h: number) => void> | null>(null);

    useEffect(() => {
        if (data?.result?.placeCategoryLogList) {
            setList(data.result.placeCategoryLogList.map((k) => [String(k.placeCategoryLabel), Number(k.count)]) as ListEntry[]);
        }
    }, [data]);

    const drawCloud = (width: number, height: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width - 10}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        WordCloud(canvas, {
            list,
            gridSize: Math.round(8 * (width / 400)),
            weightFactor: (size) => {
                const factor = width / 1500;
                const minFactor = 0.3;
                const maxFactor = 1.5;
                return size * Math.max(minFactor, Math.min(maxFactor, factor));
            },
            fontFamily: 'Pretendard, sans-serif',
            color: (_word, weight) => {
                if (Number(weight) > 95) return '#186a6d';
                if (Number(weight) > 85) return '#389486';
                if (Number(weight) > 75) return '#6fc9a9';
                if (Number(weight) > 65) return '#99d4b4';
                if (Number(weight) > 55) return '#b5f7d3';
                return '#c3c3c3';
            },
            rotateRatio: 0.4,
            rotationSteps: 2,
            minRotation: 0,
            maxRotation: Math.PI / 2,
            backgroundColor: '#fff',
            drawOutOfBound: false,
            origin: [width / 2, height / 2],
        });
    };

    // throttle 등록 및 초기 실행
    useEffect(() => {
        throttledDrawRef.current = throttle(drawCloud, 200, {
            leading: false,
            trailing: true,
        });

        const container = containerRef.current;
        if (container) {
            const { width, height } = container.getBoundingClientRect();
            drawCloud(width, height); // 최초 한 번 직접 호출
        }
        return () => {
            WordCloud.stop();
        };
    }, [list]);

    // ResizeObserver 적용
    useEffect(() => {
        if (!containerRef.current || !throttledDrawRef.current) return;
        WordCloud.stop();
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                throttledDrawRef.current?.(width, height);
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
            throttledDrawRef.current?.cancel?.();
        };
    }, [list]);

    return (
        <div className="py-[28px] w-full h-[400px] shadow-black rounding-16 md:h-[500px] flex flex-col items-center justify-center gap-3">
            <div className="z-1 flex w-full items-center justify-center font-heading3 text-default-gray-700">이번주 인기 데이트 키워드 현황</div>
            <div ref={containerRef} className="w-full h-[90%] min-h-[200px] relative">
                <canvas ref={canvasRef} className="absolute top-0 left-[5px] w-full h-fit rounding-16" />
            </div>
        </div>
    );
}
export default WordCloudCanvas;
