import Banner from '@/components/home/banner';
import DateCourseStore from '@/components/home/dateCourseStore';
import DateLocation from '@/components/home/dateLocation';
import DateRecommend from '@/components/home/dateRecommend';
import DateTimes from '@/components/home/dateTimes';
import MainInfo from '@/components/home/info';
import Level from '@/components/home/level';
import WordCloudCard from '@/components/home/wordCloud';

function Home() {
    return (
        <div className="bg-default-gray-100 min-h-screen mb-[40px]">
            <Banner />
            <section className="flex flex-col px-10 gap-[30px] mt-20">
                <div className="flex flex-col">
                    <div className="text-2xl">
                        <span className="font-bold text-[50px]">Madeleine</span>
                        <span className="font-semibold text-[25px]"> 님의 WithTime</span>
                    </div>
                    <div className="max-w-9xl mt-10 grid grid-cols-1 lg:grid-cols-2 gap-15">
                        <div className="flex flex-col gap-[30px]">
                            <Level />
                            <div className="grid grid-cols-[3fr_2fr] h-fit w-full gap-[37px]">
                                <DateCourseStore />
                                <DateTimes />
                            </div>
                        </div>
                        <DateRecommend />
                    </div>
                </div>
                <div>
                    <div className="text-xl font-bold mb-3 w-full ">WithTime 데이트 관련 현황</div>
                    <div className="text-primary-700 mb-6 w-full font-bold text-xs">WithTime에서 더 편리하게 데이트를 준비해보세요</div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-end">
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
