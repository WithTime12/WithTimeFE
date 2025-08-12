import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import MainCard from './mainCard';

import AddCircleBlank from '@/assets/icons/add-circle_Blank.svg?react';

function MainInfo() {
    const navigate = useNavigate();
    return (
        <MainCard>
            <div className="flex flex-col w-full sm:px-[48px] px-[20px] sm:py-[40px] py-[20px] shadow-default rounded-2xl">
                <div className="flex w-full justify-between items-center">
                    <div className="text-xl font-bold mb-3">공지사항</div>
                    <button
                        className="text-default-gray-800 font-semibold flex justify-center items-center gap-1 whitespace-nowrap hover:cursor-pointer"
                        onClick={() => navigate('/notice')}
                    >
                        전체보기 <AddCircleBlank className="w-4 h-4 stroke-[#000000]" />
                    </button>
                </div>

                <ul className="text-default-gray-700 space-y-1 w-full flex flex-col">
                    <li className="whitespace-nowrap text-ellipsis overflow-hidden">여름 맞이 피서 데이트 코스 추가 업데이트</li>
                    <li className="whitespace-nowrap text-ellipsis overflow-hidden">슬기로운 데이트를 하고싶은 커플을 위한 이벤트</li>
                    <li className="whitespace-nowrap text-ellipsis overflow-hidden">위티 사칭 웹사이트 및 보이스피싱 주의 안내</li>
                </ul>
            </div>
        </MainCard>
    );
}

export default memo(MainInfo);
