import MainCard from './mainCard';

function DateTimes() {
    return (
        <MainCard>
            <div className="flex flex-row min-w-fit py-[28px] sm:px-[10px] justify-center">
                {/* 첫 번째 카드 */}
                <div className="flex flex-col items-center justify-center min-w-fit px-[30px] sm:px-[56px]">
                    <div className="text-sm text-default-gray-700 mb-1 flex">최근 1개월</div>
                    <div className="text-xs text-default-gray-500 mb-2 text-center flex flex-nowrap">
                        WithTime 이용자
                        <br />
                        평균 데이트 횟수
                    </div>
                    <div className="text-3xl font-bold text-default-gray-800">4.6회</div>
                </div>
                <div className="w-[1px] h-[149px] border-[0.5px] border-default-gray-400" />
                {/* 두 번째 카드 */}
                <div className="flex flex-col items-center justify-center min-w-fit px-[30px] sm:px-[56px]">
                    <div className="text-sm text-default-gray-700 mb-1">최근 1개월</div>
                    <div className="text-xs text-default-gray-500 mb-2 text-center">
                        WithTime 이용자
                        <br />
                        평균 데이트 횟수
                    </div>
                    <div className="text-3xl font-bold text-primary-700">2회</div>
                </div>
            </div>
        </MainCard>
    );
}
export default DateTimes;
