import MainCard from '@/components/home/mainCard';

import ramji from '@/images/animals/ramgi.png';

function Level() {
    return (
        <MainCard>
            <div className="flex items-center py-[48px] px-[24px] min-w-full w-full">
                <img src={ramji} alt="캐릭터" className="w-[240px] h-[240px] aspect-square rounded-[12px] bg-[#F6E6FF] object-cover" />
                <div className="flex flex-col w-fit px-[56px]">
                    <div className="text-3xl font-semibold mb-[16px] font-heading2">Flirt</div>
                    <div className="flex flex-col font-heading3 text-default-gray-700 w-fit">
                        <span className="text-default-gray-700 font-body1">다음 데이트 레벨 성장까지</span>
                        <div className="flex flex-row">
                            <span className="text-primary-700 font-heading3 whitespace-nowrap">20점</span>
                            <span className="whitespace-nowrap">의 데이트 활동이 필요합니다</span>
                        </div>
                    </div>
                    {/* 진행바 */}
                    <div className="w-full h-6 bg-[#e6e6e6] rounded-full mt-[32px] relative">
                        <div className="absolute top-1 ml-1 h-4 bg-primary-500 rounded-full " style={{ width: '65%' }} />
                    </div>
                </div>
            </div>
        </MainCard>
    );
}
export default Level;
