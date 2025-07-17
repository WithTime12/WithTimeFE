// import GraySvgButton from '@/components/common/';

import { useNavigate } from 'react-router-dom';

import GraySvgButton from '@/components/common/graySvgButton';

import Button from '../components/common/Button';

import DateCourseImg from '@/images/dateCourseTest.png';

export default function MakeCourse() {
    const navigate = useNavigate();
    return (
        <div className="flex w-full h-full justify-center items-center py-[16px]">
            <div className="flex w-[967px] max-w-[80vw] flex-col gap-[40px]">
                <GraySvgButton type="backward" onClick={() => navigate('/dateCourse')} />
                <img src={DateCourseImg} alt="" />
                <div className="flex w-full text-center font-heading3 items-center justify-center">
                    WithTime은 당신의 데이트 스타일과 상황을 분석해,
                    <br /> 시간, 장소, 기분에 딱 맞는 맞춤형 코스를 자동으로 만들어줍니다.
                </div>
                <div className="flex w-full text-center items-center justify-center font-body1">
                    몇 가지 정보만 입력하면,
                    <br /> 당신을 위한 완벽한 하루가 시작됩니다.
                    <br />
                    계획은 필요 없어요 – 지금부터 데이트에만 집중하세요.
                </div>
                {/* 추후 공용컴포넌트 추가 예정 */}
                <Button size="big-16" variant="mint" className="w-full" onClick={() => navigate('/makeCourse/1')} children={'데이트 코스 만들러가기'} />
            </div>
        </div>
    );
}
