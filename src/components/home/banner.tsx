import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../common/Button';

import ChevronBack from '@/assets/icons/default_arrows/chevron_back.svg?react';
import ChevronForward from '@/assets/icons/default_arrows/chevron_forward.svg?react';
import scroll from '@/images/scroll.png';

const slides = [
    {
        title: '서울 성수동 : 옛것과 새로운 것이 교차하는 하루',
        description: '1960년대부터 조성된 오래된 공장 건물과 최근 벽돌 건물들의 분위기',
        tags: ['#활발한 활동', '#레트로 감성', '#서울 핫플'],
    },
    {
        title: '한강 자전거 데이트 : 바람 따라 달리는 낭만',
        description: '도심 속 자연을 만끽하며 힐링 타임',
        tags: ['#운동 데이트', '#자연과 함께', '#저녁노을'],
    },
    {
        title: '이태원 세계 음식 투어 : 입 안 가득 여행',
        description: '세계 각국의 맛을 한 자리에서 즐기기',
        tags: ['#미식가 커플', '#이국적인 분위기', '#도심 속 여행'],
    },
    {
        title: '북촌 한옥마을 산책 : 전통의 미를 따라 걷기',
        description: '골목골목 숨어있는 사진 명소',
        tags: ['#한옥', '#조용한 산책', '#전통과 현대'],
    },
];

function Banner() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    // ⏱️ 자동 슬라이드 타이머
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // 2초

        return () => clearInterval(interval); // 언마운트 시 정리
    }, []);

    // ⬅️➡️ 버튼 클릭 핸들러
    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const { title, description, tags } = slides[currentIndex];

    return (
        <div className="relative w-full">
            <img src={scroll} alt="배너" className="w-full h-[450px] object-cover" />

            {/* 내용 */}
            <div className="absolute inset-0 flex flex-col justify-start px-4 sm:px-12 py-10 text-white z-10">
                <div className="font-body1 mb-5 sm:mt-0 mt-[30px]">오늘의 데이트 추천</div>
                <div className="font-heading2 font-bold mb-5">{title}</div>
                <div className="mb-5 break-keep font-body1">{description}</div>
                <div className="flex gap-5">
                    {tags.map((tag, i) => (
                        <Button
                            key={i}
                            size="small"
                            variant="white"
                            className="hidden sm:flex bg-white border border-primary-500 text-black shadow-[0_0_8px_2px_rgba(127,228,193,0.5)] rounded-2xl"
                        >
                            {tag}
                        </Button>
                    ))}
                </div>
            </div>

            {/* 인디케이터 및 버튼 */}
            <div className="absolute top-6 right-8 flex items-center gap-2 z-20">
                {slides.map((_, index) => (
                    <div key={index} className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-default-gray-100' : 'bg-default-gray-500'}`} />
                ))}
                <button className="ml-5 flex items-center justify-center w-8 h-8 text-white" onClick={goToPrev}>
                    <ChevronBack className="w-6 h-6" />
                </button>
                <button className="flex items-center justify-center w-8 h-8 text-white" onClick={goToNext}>
                    <ChevronForward className="w-6 h-6" />
                </button>
            </div>

            {/* 하단 버튼 */}
            <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 z-20">
                <Button
                    onClick={() => navigate('/makeCourse')}
                    size="big-32"
                    variant="white"
                    className="sm:w-[600px] py-[20px] w-[250px] !text-wrap break-keep h-[60px] tracking-[0.5px] !text-[18px] bg-white shadow-[0_0_8px_2px_rgba(127,228,193,0.5)] rounded-2xl"
                >
                    WithTime을 통해 원하시는 데이트 코스를 만들어보세요
                    <span className="ml-2">→</span>
                </Button>
            </div>
        </div>
    );
}

export default Banner;
