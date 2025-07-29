import { useNavigate } from 'react-router-dom';

import Button from '../common/Button';

import ChevronBack from '@/assets/icons/default_arrows/chevron_back.svg?react';
import ChevronForward from '@/assets/icons/default_arrows/chevron_forward.svg?react';
import scroll from '@/images/scroll.png';

function Banner() {
    const navigate = useNavigate();
    return (
        <div className="relative w-full">
            <img src={scroll} alt="배너" className="w-full h-[450px]" />

            {/* 내용 */}
            <div className="absolute inset-0 flex flex-col justify-start px-12 py-10 text-white z-10">
                <div className="text-[20px] mb-5">오늘의 데이트 추천</div>
                <div className="text-[30px] font-bold mb-5">서울 성수동 : 옛것과 새로운 것이 교차하는 하루</div>
                <div className="mb-5">1960년대부터 조성된 오래된 공장 건물과 최근 벽돌 건물들의 분위기</div>
                <div className="flex gap-5 mb-">
                    <Button
                        size="small"
                        variant="white"
                        className="bg-white border border-primary-500 text-black shadow-[0_0_8px_2px_rgba(127,228,193,0.5)] rounded-2xl"
                    >
                        #활발한 활동
                    </Button>
                    <Button
                        size="small"
                        variant="white"
                        className="bg-white border border-primary-500 text-black shadow-[0_0_8px_2px_rgba(127,228,193,0.5)] rounded-2xl"
                    >
                        #활발한 활동
                    </Button>
                    <Button
                        size="small"
                        variant="white"
                        className="bg-white border border-primary-500 text-black shadow-[0_0_8px_2px_rgba(127,228,193,0.5)] rounded-2xl"
                    >
                        #활발한 활동
                    </Button>
                </div>
            </div>
            {/* 인디케이터/슬라이드 */}
            <div className="absolute top-6 right-8 flex items-center gap-2 z-20">
                <div className="w-3 h-3 rounded-full bg-default-gray-500" />
                <div className="w-3 h-3 rounded-full bg-default-gray-100" />
                <div className="w-3 h-3 rounded-full bg-default-gray-500" />
                <div className="w-3 h-3 rounded-full bg-default-gray-500" />
                <button className="ml-5 flex items-center justify-center w-8 h-8 text-white">
                    <ChevronBack className="w-6 h-6" />
                </button>
                <button className="flex items-center justify-center w-8 h-8 text-white">
                    <ChevronForward className="w-6 h-6" />
                </button>
            </div>
            {/*하단안내버튼*/}
            <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 z-20">
                <Button
                    onClick={() => navigate('/makeCourse')}
                    size="big-16"
                    variant="white"
                    className="w-[600px] h-[60px] !text-[16px] tracking-[0.5px] bg-white shadow-[0_0_8px_2px_rgba(127,228,193,0.5)] rounded-2xl"
                >
                    WithTime을 통해 원하시는 데이트 코스를 만들어보세요
                    <span className="ml-2">→</span>
                </Button>
            </div>
        </div>
    );
}
export default Banner;
