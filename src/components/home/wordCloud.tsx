import { useEffect, useRef } from 'react';
import type { DebouncedFunc } from 'lodash';
import throttle from 'lodash.throttle';
import type { ListEntry } from 'wordcloud';
import WordCloud from 'wordcloud';

const keywords = [
    { text: '드라이브', value: 19 },
    { text: '포토존', value: 18 },
    { text: '카페', value: 20 },
    { text: '감성', value: 17 },
    { text: '맛집', value: 19.5 },
    { text: '피크닉', value: 16 },
    { text: '영화관', value: 17.5 },
    { text: '산책', value: 15 },
    { text: '실내', value: 15.5 },
    { text: '레저', value: 14 },
    { text: '홍대', value: 19.2 },
    { text: '전시', value: 14.8 },
    { text: '성수', value: 18.8 },
    { text: '가로수길', value: 15.2 },
    { text: '행궁동', value: 15.3 },
    { text: '레트로', value: 15.6 },
    { text: '쇼핑', value: 15.5 },
];

export default function WordCloudCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const throttledDrawRef = useRef<DebouncedFunc<(w: number, h: number) => void> | null>(null);

    const drawCloud = (width: number, height: number) => {
        console.log('워드클라우드 렌더링!', width, height);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const list: ListEntry[] = keywords.map((k) => [k.text, k.value]);

        WordCloud(canvas, {
            list,
            gridSize: Math.round(8 * (width / 400)),
            weightFactor: (size) => size * (width / 350),
            fontFamily: 'Pretendard, sans-serif',
            color: (_word, weight) => {
                if (Number(weight) > 18) return '#186a6d';
                if (Number(weight) > 17) return '#3fa495';
                if (Number(weight) > 16) return '#7fe4c1';
                if (Number(weight) > 15) return '#b5f7d3';
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
    }, []);

    // ResizeObserver 적용
    useEffect(() => {
        if (!containerRef.current || !throttledDrawRef.current) return;

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
    }, []);

    return (
        <div className="py-[28px] w-full h-[400px] shadow-black rounding-16 md:h-[500px] flex flex-col items-center justify-center gap-3">
            <div className="z-1 flex w-full items-center justify-center font-heading3 text-default-gray-700">이번주 인기 데이트 키워드 현황</div>
            <div ref={containerRef} className="w-full h-[85%] min-h-[200px] relative">
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full rounding-16" />
            </div>
        </div>
    );
}
