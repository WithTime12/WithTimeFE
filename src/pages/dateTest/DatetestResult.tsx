import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import type IDateTestResult from '@/types/datetest/datetest';
import type { TRelationTypeResponse } from '@/types/datetest/datetest';

import { getRelationTypes } from '@/api/datetest/datetest';

const resultImages = import.meta.glob('../../images/testResults/*.png', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

const componentImages = import.meta.glob('../../images/testResults/*_Component.png', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

// 유형별 색상 정의 했습니다
const resultColors: Record<string, string> = {
    FCPO: '#B2E8FF',
    SAPE: '#326D85',
    FAME: '#FFE5B8',
    FAPE: '#B996F7',
    FAMO: '#EA7CBE',
    SAPO: '#9FE190',
    SCPO: '#6B9CEC',
    FAPO: '#EC6B6B',
    FCME: '#FFDDFC',
    SCPE: '#FFC18C',
    FCMO: '#ECBD6B',
    SCME: '#FFD5C5',
    SCMO: '#DCF99B',
    FCPE: '#94EFD8',
    SAMO: '#4D8240',
    SAME: '#BF4068',
    default: '#E0E0E0',
};
export default function DateTestResultPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const resultData = location.state as IDateTestResult | undefined;

    if (!resultData) {
        return (
            <div className="p-6 max-w-3xl mx-auto text-center">
                <p className="mb-4 text-lg">결과 데이터가 존재하지 않습니다.</p>
                <button onClick={() => navigate('/datetest')} className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                    테스트 화면으로 이동
                </button>
            </div>
        );
    }

    // URL에서 preferenceType 추출하는 부분입니다
    const typeParam = resultData?.preferenceType || resultData?.typeDescription?.preferenceType || '';

    const {
        data: relationData,
        isLoading,
        isError,
    } = useQuery<TRelationTypeResponse>({
        queryKey: ['relationTypes', typeParam],
        queryFn: () => getRelationTypes(typeParam),
        enabled: !!typeParam,
        retry: false,
    });

    const bgColor = resultColors[typeParam] ?? resultColors.default;
    const imageSrc = resultImages[`../../images/testResults/${typeParam}.png`] ?? resultImages['../../images/testResults/default.png'];

    const scores = resultData.partTypeDescriptions.types.slice(0, 4).map((type, idx) => {
        const percentMap = [resultData.aPercentage, resultData.bPercentage, resultData.cPercentage, resultData.dPercentage];
        const rawPercent = percentMap[idx] ?? 0;

        // 0~100 사이로 제한
        const percent = Math.max(0, Math.min(100, rawPercent));

        // 반대 퍼센트 계산 & 제한
        const oppositePercent = percent > 0 ? Math.max(0, Math.min(100, 100 - percent)) : 0;

        // 소수점 1자리로 고정
        const fixedPercent = parseFloat(percent.toFixed(1));
        const fixedOpposite = parseFloat(oppositePercent.toFixed(1));

        const oppositeTypeMap: Record<string, string> = {
            F: 'S',
            S: 'F',
            C: 'A',
            A: 'C',
            P: 'M',
            M: 'P',
            O: 'E',
            E: 'O',
        };

        const oppositeTypeTitle: Record<string, string> = {
            즉흥적인: '계획적인',
            현실적인: '공감적인',
            주도적인: '정적인',
            표현적인: '안정적인',
            계획적인: '즉흥적인',
            정적인: '주도적인',
            안정적인: '표현적인',
            공감적인: '현실적인',
        };

        return {
            title: type.type,
            tcode: type.typeInitial,
            percent: fixedPercent,
            opposite: oppositeTypeTitle[type.type] || 'Unknown',
            ocode: oppositeTypeMap[type.typeInitial] || 'Unknown',
            oppositePercent: fixedOpposite,
        };
    });

    return (
        <div className="flex flex-col p-6 max-w-3xl mx-auto">
            <div className="rounded-[32px] px-[16px] py-[8px] font-bold text-sm text-center mt-[88px] mb-[16px] w-[143px]" style={{ backgroundColor: bgColor }}>
                당신의 데이트 취향
            </div>

            <div className="text-left text-sm mb-[40px]">
                <p>
                    데이트 취향 테스트는 사용자의 데이트 취향 유형을 도출하여
                    <br />
                    맞춤형 추천 알고리즘에 반영하기 위해 설계되었습니다
                </p>
            </div>

            <h1 className="text-3xl font-bold mb-[40px]">
                {resultData.typeDescription.preferenceType} 님의
                <br />
                데이트 취향 유형 결과
            </h1>

            <img src={imageSrc} alt={`${resultData.typeDescription.symbolicAnimal} 이미지`} className="rounded-xl shadow-md" />

            <button onClick={() => alert('공유 기능은 추후 지원됩니다.')} className="mt-6 px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition">
                결과 공유하기
            </button>

            <div className="rounded-[32px] px-[16px] py-[8px] font-bold text-sm text-center mb-[40px] mt-[50px] w-[70px]" style={{ backgroundColor: bgColor }}>
                {typeParam}
            </div>

            {/* 점수 시각화 */}
            <div className="w-full mt-10">
                {scores.map((item) => (
                    <div key={item.tcode} className="mb-6">
                        <div className="flex justify-between text-sm text-[#212121] font-bold mb-1">
                            <span>{item.title}</span>
                            <span>{item.opposite}</span>
                        </div>
                        <div className="relative w-full h-[54px] bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full flex items-center justify-start px-4 font-semibold text-m"
                                style={{
                                    width: `${item.percent}%`,
                                    backgroundColor: bgColor,
                                    borderTopRightRadius: '9999px',
                                    borderBottomRightRadius: '9999px',
                                }}
                            >
                                {item.tcode} {item.percent.toFixed(1)}
                            </div>
                            <div
                                className="absolute top-0 right-0 h-full flex items-center justify-end pr-3 text-[#212121] font-semibold text-m"
                                style={{ width: `${Math.max(item.percent, 5)}%` }}
                            >
                                {item.oppositePercent > 0 && `${item.ocode} ${item.oppositePercent.toFixed(1)}`}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full mt-10 space-y-6">
                {resultData.partTypeDescriptions.types.map((type) => (
                    <div key={type.typeInitial}>
                        <div className="flex items-center gap-3 mb-[10px]">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: bgColor }}>
                                {type.typeInitial}
                            </div>
                            <h4 className="text-primary-600 font-semibold text-base">{type.type}</h4>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{type.description}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row mt-[80px] items-center justify-center gap-8">
                {isLoading ? (
                    <p>유형 정보를 불러오는 중...</p>
                ) : isError || !relationData?.isSuccess ? (
                    <p>유형 정보를 불러오지 못했습니다.</p>
                ) : (
                    <>
                        <div className="flex flex-col items-center w-full max-w-[300px]">
                            <div
                                className="px-[16px] py-[8px] rounded-[32px] w-[138px] text-center font-bold text-sm mb-4"
                                style={{ backgroundColor: bgColor }}
                            >
                                잘 맞는 유형
                            </div>
                            <div
                                className="w-full aspect-[6/5] rounded-[16px] py-[12px] flex items-center justify-center shadow-md"
                                style={{
                                    backgroundColor: resultColors[relationData.result?.bestType ?? 'default'],
                                    maxHeight: '280px',
                                }}
                            >
                                {relationData.result?.bestType ? (
                                    <img
                                        src={componentImages[`../../images/testResults/${relationData.result.bestType}_Component.png`] ?? ''}
                                        alt={`${relationData.result.bestReason}`}
                                        className="max-h-[200px] w-auto object-contain"
                                    />
                                ) : (
                                    <p>이미지를 찾을 수 없습니다.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-center w-full max-w-[300px]">
                            <div
                                className="px-[16px] py-[8px] rounded-[32px] w-[138px] text-center font-bold text-sm mb-4"
                                style={{ backgroundColor: bgColor }}
                            >
                                안 맞는 유형
                            </div>
                            <div
                                className="w-full aspect-[6/5] rounded-[16px] py-[12px] flex items-center justify-center shadow-md"
                                style={{
                                    backgroundColor: resultColors[relationData.result?.worstType ?? 'default'],
                                    maxHeight: '280px',
                                }}
                            >
                                {relationData.result?.worstType ? (
                                    <img
                                        src={componentImages[`../../images/testResults/${relationData.result.worstType}_Component.png`] ?? ''}
                                        alt={`${relationData.result.worstReason}`}
                                        className="max-h-[200px] w-auto object-contain"
                                    />
                                ) : (
                                    <p>이미지를 찾을 수 없습니다.</p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-[80px] flex text-center items-center justify-center rounded-[16px] bg-[#E5E5E5] px-[16px] py-[24px] text-sm font-light">
                <p>
                    본 검사 결과는 검사 참여자의 응답을 토대로 분석하였으며,
                    <br />
                    참여자의 연애성향을 확인할 수 있습니다.
                </p>
            </div>

            <button onClick={() => navigate('/datetest')} className="mt-10 px-[48px] py-[16px] bg-[#212121] text-white rounded-[16px] transition">
                메인 화면으로
            </button>
        </div>
    );
}
