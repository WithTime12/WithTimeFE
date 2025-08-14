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
    const total = Math.max(1, end);

    const isFirstGroup = groupStart <= 1;
    const isLastGroup = total === 1 ? true : groupEnd >= total;
    const pages = Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i);
    if (pages.length === 0) {
        pages.push(1);
    }
    return (
        <div className="flex gap-2 justify-center items-center mt-4">
            <button onClick={() => onClick(groupStart - 1)} className="px-2 disabled:!cursor-not-allowed" disabled={isFirstGroup}>
                <ArrowBack stroke={`${isFirstGroup ? '#c3c3c3' : '#212121'}`} />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onClick(page)}
                    className={`px-3 py-1 select-none rounded ${current === page ? 'text-default-gray-800' : 'text-default-gray-500'}`}
                >
                    {page}
                </button>
            ))}

            <button onClick={() => onClick(groupEnd + 1)} className="px-2 disabled:!cursor-not-allowed" disabled={isLastGroup}>
                <ArrowForward stroke={isLastGroup ? '#c3c3c3' : '#212121'} />
            </button>
        </div>
    );
}
