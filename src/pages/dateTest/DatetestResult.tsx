import { useNavigate } from 'react-router-dom';

// 결과 이미지 한번에 넣으려면 이렇게 해야한다고 합니다!! -> 랜딩 페이지에서 사용한 방식과 같은 방식입니다
const resultImages = import.meta.glob('../../images/testResults/*.png', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

const componentImages = import.meta.glob('../../images/testResults/*_Component.png', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

// 결과 이미지 별 배경 색상과 같은 div 색깔로 나와야하는 거 같아서 컬러 코드 개별 정의해주었습니다
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

const resultData = {
    userName: '개발잘한다유진',
    animal: '여유로운 고래',
    code: 'FCPO',
    match: 'SAPO',
    mismatch: 'FAME',
    scores: [
        { title: '즉흥적인', tcode: 'F', percent: 72.3, opposite: '계획적인', ocode: 'S', oppositePercent: 27.7 },
        { title: '공감적인', tcode: 'C', percent: 72.3, opposite: '현실적인', ocode: 'A', oppositePercent: 27.7 },
        { title: '정적인', tcode: 'P', percent: 72.3, opposite: '주도적인', ocode: 'M', oppositePercent: 27.7 },
        { title: '안정적인', tcode: 'O', percent: 72.3, opposite: '표현적인', ocode: 'E', oppositePercent: 27.7 },
    ],
    traits: {
        F: {
            keyword: '즉흥적인 Free',
            text: '데이트에서도 즉흥적인 재미에 빠져 전환 가능한 즐거움을 선호합니다.\n감정에 충실하며 유동적으로 이루어지는 구성이며, 계획보다는 그 순간의 기분이나 아이디어를 중시합니다.',
        },
        C: {
            keyword: '공감적인 Compassionate',
            text: '연인의 감정에 깊이 공감하며, 문제 해결보다 감정적 이해와 위로를 우선시합니다.\n대화 중에도 상대의 말투나 표정에 민감하게 반응하고, 감정의 흐름을 따라 데이트 방향을 조율합니다.',
        },
        P: {
            keyword: '정적인 Placid',
            text: '잔잔한 분위기 속에서 깊은 대화나 정서적 교감을 중시합니다.\n복잡하거나 격정적인 것보단 카페 등 조용한 곳에 머물기 좋아하며, 외부 자극보다는 내면의 안정감을 중심으로 데이트를 즐깁니다.',
        },
        O: {
            keyword: '안정적인 Observant',
            text: '소란스럽기보다는 조용한 공간에서 소수와 깊은 시간을 보내는 데서 에너지를 얻는 편입니다. \n눈에 띄는 데이트보다는 둘만의 분위기, 주변을 관찰하며 느끼는 감각에 집중합니다. 안정적인 일상 속 특별함을 추구합니다.',
        },
    },
};

export default function DateTestResultPage() {
    const navigate = useNavigate();

    const imageSrc = resultImages[`../../images/testResults/${resultData.code}.png`] ?? resultImages['../../images/testResults/default.png'];
    const bgColor = resultColors[resultData.code] ?? resultColors.default;

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
                {resultData.userName} 님의
                <br />
                데이트 취향 유형 결과
            </h1>

            <img src={imageSrc} alt={`${resultData.animal} 이미지`} className="rounded-xl shadow-md" />

            <button onClick={() => alert('공유 기능은 추후 지원됩니다.')} className="mt-6 px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition">
                결과 공유하기
            </button>

            <div className="rounded-[32px] px-[16px] py-[8px] font-bold text-sm text-center mb-[40px] mt-[50px] w-[70px]" style={{ backgroundColor: bgColor }}>
                {resultData.code}
            </div>

            <div className="w-full mt-10">
                {resultData.scores.map((item) => (
                    <div key={item.tcode} className="mb-6">
                        <div className="flex justify-between text-sm text-[#212121] font-bold mb-1">
                            <span>{item.title}</span>
                            <span>{item.opposite}</span>
                        </div>

                        {/* 게이지 바 전체 */}
                        <div className="relative w-full h-[54px] bg-gray-200 rounded-full overflow-hidden">
                            {/* 왼쪽 퍼센트 영역 */}
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

                            {/* 오른쪽 퍼센트 영역 (반대편) */}
                            <div
                                className="absolute top-0 right-0 h-full flex items-center justify-end px-4 text-[#212121] font-semibold text-m"
                                style={{
                                    width: `${item.oppositePercent}%`,
                                }}
                            >
                                {item.ocode} {item.oppositePercent.toFixed(1)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full mt-10 space-y-6">
                {Object.entries(resultData.traits).map(([code, { keyword, text }]) => (
                    <div key={code}>
                        <div className="flex items-center gap-3 mb-[10px]">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: bgColor }}>
                                {code}
                            </div>
                            <h4 className="text-primary-600 font-semibold text-base">{keyword}</h4>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {text.split('\n').map((line, idx) => (
                                <span key={idx}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col lg:flex-row mt-[80px] items-center justify-center gap-8">
                {/* 잘 맞는 유형 */}
                <div className="flex flex-col items-center w-full max-w-[300px]">
                    <div className="px-[16px] py-[8px] rounded-[32px] w-[138px] text-center font-bold text-sm mb-4" style={{ backgroundColor: bgColor }}>
                        잘 맞는 유형
                    </div>
                    <div
                        className="w-full aspect-[6/5] rounded-[16px] py-[12px] flex items-center justify-center shadow-md"
                        style={{
                            backgroundColor: resultColors[resultData.match] ?? resultColors.default,
                            maxHeight: '280px',
                        }}
                    >
                        <img
                            src={componentImages[`../../images/testResults/${resultData.match}_Component.png`] ?? ''}
                            alt={`${resultData.match} 유형 이미지`}
                            className="max-h-[200px] w-auto object-contain"
                        />
                    </div>
                </div>

                {/* 안 맞는 유형 */}
                <div className="flex flex-col items-center w-full max-w-[300px]">
                    <div className="px-[16px] py-[8px] rounded-[32px] w-[138px] text-center font-bold text-sm mb-4" style={{ backgroundColor: bgColor }}>
                        안 맞는 유형
                    </div>
                    <div
                        className="w-full aspect-[6/5] rounded-[16px] py-[12px] flex items-center justify-center shadow-md"
                        style={{
                            backgroundColor: resultColors[resultData.mismatch] ?? resultColors.default,
                            maxHeight: '280px',
                        }}
                    >
                        <img
                            src={componentImages[`../../images/testResults/${resultData.mismatch}_Component.png`] ?? ''}
                            alt={`${resultData.mismatch} 유형 이미지`}
                            className="max-h-[200px] w-auto object-contain"
                        />
                    </div>
                </div>
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
