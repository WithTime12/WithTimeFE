import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigator from '@/components/common/navigator';
import Header from '@/components/layout/Header';
import PaymentRow from '@/components/payment/PaymentRow';

import ArrowLeftCircle from '@/assets/icons/Arrow_left_circle.svg?react';

const dummyData = [
    { orderNumber: '202219486', date: '2024.01.15', amount: '₩2,900', method: '카카오페이', status: '환불처리' },
    { orderNumber: '202219487', date: '2023.05.15', amount: '₩2,900', method: '신한카드', status: '결제 완료' },
    { orderNumber: '202219487', date: '2023.05.15', amount: '₩2,900', method: '신한카드', status: '결제 완료' },
];

export default function PaymentHistory() {
    const navigate = useNavigate();

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 전체 페이지 수
    const totalPages = Math.max(1, Math.ceil(dummyData.length / itemsPerPage));

    // 현재 페이지 데이터
    const pageData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return dummyData.slice(start, end);
    }, [currentPage, itemsPerPage]);

    return (
        <div>
            {/* 헤더 */}
            <Header mode="minimal" />

            <div className="max-w-[960px] mx-auto font-body1 text-default-gray-800">
                {/* 뒤로가기*/}
                <button onClick={() => navigate('/home')}>
                    <ArrowLeftCircle className="fill-current text-default-gray-500 mb-5" />
                </button>

                {/* 제목 */}
                <h1 className="mb-10 font-heading2">결제 내역 확인</h1>

                {/* 테이블 */}
                <div className="overflow-x-auto">
                    <table className="w-full text-center font-body1 border-default-gray-400 font-normal">
                        <thead className="text-default-gray-800">
                            <tr className="border-b border-default-gray-400">
                                <th className="py-7 font-normal w-[150px]">주문번호</th>
                                <th className="font-normal w-[150px]">결제일</th>
                                <th className="font-normal w-[150px]">금액</th>
                                <th className="font-normal w-[150px]">결제 수단</th>
                                <th className="font-normal w-[150px]">결제 상태 (성공/실패 등)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-default-gray-500">
                                        결제 내역이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                pageData.map((item, index) => <PaymentRow key={`${item.orderNumber}-${index}`} data={item} />)
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 페이지네이션*/}
                <Navigator current={currentPage} end={totalPages} onClick={setCurrentPage} />
            </div>
        </div>
    );
}
