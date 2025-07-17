import ArrowBack from '@/assets/icons/default_arrows/arrow_back.svg?react';
import ArrowForward from '@/assets/icons/default_arrows/arrow_forward.svg?react';

type TNavigatorProps = {
    current: number; // 현재 페이지 번호 (1부터 시작)
    end: number; // 전체 페이지 수
    onClick: (page: number) => void;
};

export default function Navigator({ current, end, onClick }: TNavigatorProps) {
    const groupSize = 5; // 한 번에 보여줄 페이지 수
    const groupStart = Math.floor((current - 1) / groupSize) * groupSize + 1;
    const groupEnd = Math.min(groupStart + groupSize - 1, end);

    const pages = [];
    for (let i = groupStart; i <= groupEnd; i++) {
        pages.push(i);
    }

    return (
        <div className="flex gap-2 justify-center items-center mt-4">
            {groupStart > 1 && (
                <button onClick={() => onClick(groupStart - 1)} className="px-2">
                    <ArrowBack stroke="#212121" />
                </button>
            )}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onClick(page)}
                    className={`px-3 py-1 rounded ${current === page ? 'text-default-gray-800' : 'text-default-gray-500'}`}
                >
                    {page}
                </button>
            ))}
            {groupEnd < end && (
                <button onClick={() => onClick(groupEnd + 1)} className="px-2">
                    <ArrowForward stroke="#212121" />
                </button>
            )}
        </div>
    );
}
