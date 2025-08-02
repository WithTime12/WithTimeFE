import MainCard from '@/components/home/mainCard';

import ramji from '@/images/animals/ramgi.png';

function Level() {
    return (
        <MainCard>
            <div className="flex justify-center items-center py-[48px] min-w-full w-full">
                <div className="flex md:flex-row flex-col max-w-[840px] w-[70%] justify-center items-center md:gap-[0px] gap-[30px]">
                    <img
                        src={ramji}
                        alt="캐릭터"
                        className="w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] aspect-square rounded-[12px] bg-[#F6E6FF] object-cover"
                    />
                    <div className="flex flex-col w-fit px-[20px]">
                        <div className="text-3xl font-semibold mb-[16px] font-heading2 w-full md:text-start text-center">Flirt</div>
                        <div className="flex flex-col font-heading3 text-default-gray-700 sm:w-fit">
                            <span className="text-default-gray-700 font-body1">다음 데이트 레벨 성장까지</span>
                            <div className="flex flex-row">
                                <span className="text-primary-700 font-heading3 whitespace-nowrap">20점</span>
                                <span className="whitespace-nowrap ">의 데이트 활동이 필요합니다</span>
                            </div>
                        </div>
                        {/* 진행바 */}
                        <div className="w-full h-6 bg-default-gray-400 rounded-full mt-[32px] relative">
                            <div className="absolute top-1 ml-1 h-4 bg-primary-500 rounded-full " style={{ width: '65%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </MainCard>
    );
}
export default Level;
