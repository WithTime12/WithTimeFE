// 결제 내역 확인
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import PaymentRow from '@/components/payment/PaymentRow';

import ArrowLeftCircle from '@/assets/icons/Arrow_left_circle.svg?react';
import Forward from '@/assets/icons/default_arrows/arrow_forward.svg?react';

const dummyData = [
    {
        orderNumber: '202219486',
        date: '2024.01.15',
        amount: '₩2,900',
        method: '카카오페이',
        status: '환불처리',
    },
    {
        orderNumber: '202219487',
        date: '2023.05.15',
        amount: '₩2,900',
        method: '신한카드',
        status: '결제 완료',
    },
    {
        orderNumber: '202219487',
        date: '2023.05.15',
        amount: '₩2,900',
        method: '신한카드',
        status: '결제 완료',
    },
];

export default function PaymentHistory() {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    return (
        <div>
            {/* 헤더 - 로고만 */}
            <Header mode="minimal" />

            <div className="max-w-[960px] mx-auto font-body1 text-default-gray-800">
                {/* 뒤로가기 버튼 */}
                <button onClick={() => navigate('/setting', { state: { openSettingTab: '멤버십' } })}>
                    <ArrowLeftCircle className=" fill-current text-default-gray-500 mb-5" />
                </button>

                {/* 제목 */}
                <h1 className="mb-10 font-heading2">결제 내역 확인</h1>

                {/* 테이블 */}
                <div className="overflow-x-auto">
                    <table className="w-full text-center font-body1 border-default-gray-400 font-normal">
                        {/* 테이블 헤더 */}
                        <thead className="text-default-gray-800">
                            <tr className="border-b border-default-gray-400">
                                {/* 기본적으로 <th>는 bold이기 때문에 font-normal 명시 */}
                                <th className="py-7 font-normal w-[150px]">주문번호</th>
                                <th className="font-normal w-[150px]">결제일</th>
                                <th className="font-normal w-[150px]">금액</th>
                                <th className="font-normal w-[150px]">결제 수단</th>
                                <th className="font-normal w-[150px]">결제 상태 (성공/실패 등)</th>
                            </tr>
                        </thead>

                        {/* 테이블 바디 (반복되는 결제 내역 행) */}
                        <tbody>
                            {dummyData.map((item, index) => (
                                <PaymentRow key={index} data={item} />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 페이지네이션 */}
                <div className="mt-6 flex justify-center space-x-2 text-sm text-default-gray-500">
                    {[1, 2, 3, 4, 5].map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-2 py-1 rounded font-normal ${currentPage === page ? 'text-default-gray-800' : 'hover:text-default-gray-800'}`}
                        >
                            {page}
                        </button>
                    ))}

                    {/* 다음 페이지 아이콘*/}
                    <Forward className=" fill-current text-default-gray-500" />
                </div>
            </div>
        </div>
    );
}
