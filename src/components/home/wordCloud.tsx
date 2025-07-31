import React, { useEffect, useState } from 'react';

interface IKeyword {
    text: string;
    className: string;
}
interface ICoordinates {
    left: number;
    top: number;
}

interface IArea extends ICoordinates {
    width: number;
    height: number;
}
interface IPositionedKeyword {
    text: string;
    className: string;
    style: React.CSSProperties;
}

// 겹침 체크 함수: generatePositions보다 위로 이동
const isOverlapping = (newPos: ICoordinates, existingAreas: IArea[], textLength: number): boolean => {
    const margin = 5;
    const newWidth = textLength * 2;
    const newHeight = 3;

    return existingAreas.some((area: IArea) => {
        return !(
            newPos.left + newWidth + margin < area.left ||
            newPos.left - margin > area.left + area.width ||
            newPos.top + newHeight + margin < area.top ||
            newPos.top - margin > area.top + area.height
        );
    });
};
// 워드클라우드 컴포넌트

export default function WordCloudCard() {
    const keywords: IKeyword[] = [
        { text: '드라이브', className: 'text-4xl font-bold text-teal-700' },
        { text: '포토존', className: 'text-3xl font-bold text-teal-700' },
        { text: '카페', className: 'text-2xl font-bold text-teal-500' },
        { text: '감성', className: 'text-xl font-bold text-teal-600' },
        { text: '맛집', className: 'text-xl font-bold text-teal-600' },
        { text: '피크닉', className: 'text-lg text-teal-300' },
        { text: '영화관', className: 'text-lg text-teal-500' },
        { text: '산책', className: 'text-lg text-teal-300' },
        { text: '실내', className: 'text-base text-gray-400' },
        { text: '레저', className: 'text-base text-gray-400' },
        { text: '홍대', className: 'text-base text-gray-300' },
        { text: '전시', className: 'text-base text-gray-300' },
        { text: '성수', className: 'text-base text-gray-300' },
        { text: '가로수길', className: 'text-base text-gray-400' },
        { text: '행궁동', className: 'text-base text-gray-400' },
        { text: '레트로', className: 'text-base text-gray-200' },
        { text: '쇼핑', className: 'text-base text-gray-500' },
    ];

    const [positionedKeywords, setPositionedKeywords] = useState<IPositionedKeyword[]>([]);

    const generatePositions = (): IPositionedKeyword[] => {
        const positions: IPositionedKeyword[] = [];
        const usedAreas: IArea[] = [];

        keywords.forEach((keyword: IKeyword) => {
            let position: ICoordinates;
            let attempts = 0;

            do {
                position = {
                    left: Math.random() * 60 + 20,
                    top: Math.random() * 60 + 20,
                };
                attempts++;
            } while (attempts < 50 && isOverlapping(position, usedAreas, keyword.text.length));

            usedAreas.push({
                ...position,
                width:
                    keyword.text.length *
                    (keyword.className.includes('text-4xl')
                        ? 3
                        : keyword.className.includes('text-3xl')
                          ? 2.5
                          : keyword.className.includes('text-2xl')
                            ? 2
                            : keyword.className.includes('text-xl')
                              ? 1.5
                              : 1),
                height: 3,
            });

            positions.push({
                ...keyword,
                style: {
                    position: 'absolute',
                    left: `${position.left}%`,
                    top: `${position.top}%`,
                    transform: 'translate(-50%, -50%)',
                },
            });
        });

        return positions;
    };

    useEffect(() => {
        setPositionedKeywords(generatePositions());
    }, []);

    return (
        <div className="bg-white shadow-black rounded-2xl p-8 flex flex-col items-center h-full">
            <div className="text-xl font-bold text-gray-700 mb-6">이번주 인기 데이트 키워드 현황</div>
            <div className="relative w-full h-64 overflow-hidden rounded-lg flex items-center justify-center">
                {positionedKeywords.map((keyword, index) => (
                    <span key={index} className={keyword.className} style={keyword.style}>
                        {keyword.text}
                    </span>
                ))}
            </div>
        </div>
    );
}
