import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import { useDeviceToken } from '@/hooks/alarm/useDeviceToken';
import { useUserGrade } from '@/hooks/home/useUserGrade';

import Banner from '@/components/home/banner';
import DateCourseStore from '@/components/home/dateCourseStore';
import DateLocation from '@/components/home/dateLocation';
import DateRecommend from '@/components/home/dateRecommend';
import DateTimes from '@/components/home/dateTimes';
import MainInfo from '@/components/home/info';
import Level from '@/components/home/level';
import WordCloudCard from '@/components/home/wordCloud';

import { useDeviceTokenContext } from '@/providers/deviceTokenProvider';

function Home() {
    const { requestAndRegister } = useDeviceTokenContext();

    useEffect(() => {
        const fire = () => {
            requestAndRegister().catch((err) => {
                console.error('Device token 등록 실패:', err);
            });
        };

        window.addEventListener('pointerdown', fire, { once: true });
        return () => {
            window.removeEventListener('pointerdown', fire);
        };
    }, [requestAndRegister]);

    const { data: gradeData, isLoading, error } = useUserGrade();
    if (error) return <Navigate to="/error" replace />;
    if (isLoading) {
        return (
            <div className="bg-default-gray-100 min-h-screen mb-[40px] w-full flex items-center justify-center">
                <ClipLoader />
            </div>
        );
    }
    return (
        <div className="bg-default-gray-100 min-h-screen mb-[40px]">
            <Banner />
            <section className="flex flex-col sm:px-10 px-5 gap-[120px] mt-20">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="font-heading2">{gradeData?.result.username}</span>
                        <span className="font-heading3">님의 WithTime</span>
                    </div>
                    <div className="max-w-9xl mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-[30px] w-full">
                            {gradeData?.result && <Level {...gradeData.result} />}
                            <div className="grid sm:grid-cols-[3fr_2fr] grid-cols-1 h-fit w-full gap-[24px]">
                                <DateTimes />
                                <DateCourseStore />
                            </div>
                        </div>
                        <DateRecommend />
                    </div>
                </div>
                <div>
                    <div className="text-xl font-bold mb-3 w-full ">WithTime 데이트 관련 현황</div>
                    <div className="text-primary-700 mb-6 w-full font-bold text-xs">WithTime에서 더 편리하게 데이트를 준비해보세요</div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
                        <DateLocation />
                        <WordCloudCard />
                    </div>
                </div>
                <MainInfo />
            </section>
        </div>
    );
}

export default Home;
