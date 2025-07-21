import { useNavigate } from 'react-router-dom';

import DateCourse from '@/components/dateCourse/dateCourse';
import DateCourseLoading from '@/components/dateCourse/dateCourseLoading';

import Button from '../components/common/Button';

import Reload from '@/assets/icons/arrow_spin.svg?react';
import Logo from '@/assets/withTimeLogo//logo_Blank.svg?react';

export default function MakeCourseResult() {
    const navigate = useNavigate();
    const isLoading = false;
    if (isLoading) {
        return <DateCourseLoading />;
    }
    return (
        <div className="flex w-full justify-center items-center min-h-[66vh] p-[40px]">
            <div className="flex-col flex h-fit max-w-[95vw] w-[1000px] shadow-default rounding-16 px-[10px] sm:px-[40px] py-[24px] shadow-default">
                <div className="flex w-full justify-between items-center py-[24px] gap-[12px] lg:flex-row ">
                    <div className="font-heading3 flex-nowrap sm:w-fit w-full text-center justify-center">Madeleine 님만의 데이트 코스</div>
                    <Logo className="w-[41px] h-[36px] sm:flex hidden" />
                </div>
                <div className="flex flex-col gap-[24px] ">
                    <DateCourse defaultOpen={true} />
                </div>
                <Button size="big-16" variant="mint" className="flex mt-[40px] self-center px-[32px] items-center gap-[8px]">
                    <Reload />
                    <div className="flex flex-col items-center justify-center">
                        <div className="font-heading3 select-none" onClick={() => navigate('/makeCourse')}>
                            다시 만들기
                        </div>
                        <div className="font-body1 select-none">3회 가능</div>
                    </div>
                </Button>
            </div>
        </div>
    );
}
