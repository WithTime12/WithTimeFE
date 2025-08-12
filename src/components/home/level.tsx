import { useUserGrade } from '@/hooks/home/useUserGrade';

import MainCard from '@/components/home/mainCard';

import ramji from '@/images/animals/ramgi.png';

function Level() {
    const { data: gradeData, isLoading, error } = useUserGrade();

    // 로그인 상태 확인 (API 에러나 401 에러 시 비회원으로 간주)
    const isLoggedIn = !error && gradeData?.isSuccess;

    // 기본 데이터 (비회원 또는 API 에러 시 사용)
    const defaultGrade = {
        username: '비회원',
        grade: 'Flirt',
        level: '1',
        description: '데이트 초보자',
        nextRequiredPoint: 20,
    };

    // API 데이터 또는 기본 데이터 사용
    const gradeInfo = gradeData?.result ?? defaultGrade;

    // 진행률 계산 (임시로 65% 고정, 실제로는 다른 API나 계산 로직 필요)
    const progressPercentage = 65;

    // 다음 레벨까지 필요한 포인트
    const remainingPoints = gradeInfo.nextRequiredPoint;

    // 등급별 캐릭터 이미지 (필요시)
    const getCharacterImage = () => {
        // 등급에 따른 캐릭터 이미지 변경 로직
        return ramji; // 기본 이미지
    };

    return (
        <MainCard>
            <div className="flex justify-center items-center py-[48px] min-w-full w-full">
                <div className="flex md:flex-row flex-col max-w-[840px] w-[70%] justify-center items-center md:gap-[0px] gap-[30px]">
                    <img
                        src={getCharacterImage()}
                        alt="캐릭터"
                        className="w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] aspect-square rounded-[12px] bg-[#F6E6FF] object-cover"
                    />
                    <div className="flex flex-col w-fit px-[20px]">
                        <div className="text-3xl font-semibold mb-[16px] font-heading2 w-full md:text-start text-center">
                            {isLoading ? '로딩 중...' : gradeInfo.grade}
                        </div>

                        <div className="flex flex-col font-heading3 text-default-gray-700 sm:w-fit">
                            <span className="text-default-gray-700 font-body1">다음 데이트 레벨 성장까지</span>
                            <div className="flex flex-row">
                                <span className="text-primary-700 font-heading3 whitespace-nowrap">{isLoggedIn ? `${remainingPoints}점` : '20점'}</span>
                                <span className="whitespace-nowrap">의 데이트 활동이 필요합니다</span>
                            </div>
                        </div>

                        {/* 진행바 */}
                        <div className="w-full h-6 bg-default-gray-400 rounded-full mt-[32px] relative">
                            <div
                                className="absolute top-1 ml-1 h-4 bg-primary-500 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainCard>
    );
}

export default Level;
