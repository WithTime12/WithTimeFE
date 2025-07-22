import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DateTest() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/datetest/1');
    };

    useEffect(() => {
        //Vite에서 제공하는 자동 import 방식 이라고 합니다
        const modules = import.meta.glob('../../images/animals/*.png', {
            eager: true,
            import: 'default',
        }) as Record<string, string>;

        const orderedNames = [
            'bear.png',
            'bird.png',
            'cat.png',
            'cow.png',
            'elephant.png',
            'fox.png',
            'goori.png',
            'kangaroo.png',
            'koala.png',
            'monkey.png',
            'owl.png',
            'penguin.png',
            'ramgi.png',
            'turtle.png',
            'whale.png',
            'yang.png',
        ];

        const sortedUrls = orderedNames.map((name) => {
            const entry = Object.entries(modules).find(([path]) => path.includes(name));
            return entry?.[1] ?? '';
        });

        setImageUrls([...sortedUrls, ...sortedUrls]);
    }, []);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const speed = 1;
        let animationFrameId: number;

        const step = () => {
            container.scrollLeft += speed;
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0;
            }
            animationFrameId = requestAnimationFrame(step);
        };

        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="w-full flex flex-col items-center bg-white px-4 sm:px-8 md:px-20 lg:px-40">
            <div className="flex flex-col w-full max-w-screen-md py-10">
                <img src="/images/TestImage.png" alt="test배경 이미지" className="w-full h-auto mb-6" />

                <div className="mb-8 text-left">
                    <h1 className="text-xl md:text-2xl font-bold">WithTime</h1>
                    <p className="text-xl md:text-2xl font-bold">데이트 취향 테스트</p>
                </div>

                <div className="mb-6 text-sm md:text-base text-gray-700">
                    <p>
                        나의 데이트 취향과 닮은 동물은 누구일까요?
                        <br /> 당신은 낭만적인 너구리일까요, 계획적인 부엉이일까요?
                        <br />
                        <br /> WithTime 데이트 취향 테스트는 16마리 동물 캐릭터 중, 지금의 당신을 가장 닮은 친구를 찾아드려요.
                    </p>
                </div>

                <div ref={scrollRef} className="overflow-x-auto whitespace-nowrap w-full h-[220px] sm:h-[240px] cursor-pointer mb-6 no-scrollbar">
                    <div className="flex gap-4 min-w-0">
                        {imageUrls.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`animal-${index}`}
                                className="h-[180px] sm:h-[240px] w-auto object-contain inline-block rounded-md shadow-md"
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-6 text-sm md:text-base text-gray-700">
                    <p>
                        함께 떠나면 좋은 파트너 유형, 당신에게 딱 맞는 데이트 키워드, 추천 코스까지!
                        <br /> 몇 가지 질문에 답하고, 나만의 데이트 스타일을 찾아 떠나볼까요?
                    </p>
                </div>

                <div className="flex">
                    <button
                        className="bg-primary-500 px-6 py-3 rounded-[32px] hover:bg-primary-300 transition-colors text-sm md:text-base text-white font-bold"
                        onClick={handleStart}
                    >
                        데이트 취향 테스트 하러가기
                    </button>
                </div>
            </div>
        </div>
    );
}
