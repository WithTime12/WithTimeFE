import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white px-4 lg:px-8 py-8 text-sm text-default-gray-700">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* 상단 */}
                <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-caption text-default-gray-800">
                    <li>
                        <Link to="/">개인정보 처리방침</Link>
                    </li>
                    <span>|</span>
                    <li>
                        <Link to="/notice">공지사항</Link>
                    </li>

                    <span>|</span>
                    <li>
                        <Link to="/question">자주 묻는 질문</Link>
                    </li>
                    <span>|</span>
                    <li>
                        <Link to="/">고객문의</Link>
                    </li>
                </ul>

                {/* 정보 */}
                <div className="space-y-2 font-body1">
                    <p className="text-default-gray-800">(주) WithTime</p>
                    <div className="h-2" />
                    <p className="text-default-gray-700">대표이사: 위티 / 사업자등록번호: 110-81-14794</p>
                    <p className="text-default-gray-700">서울특별시 강서구 하늘길 260 / 고객센터: 02-6916-1500 / Fax: 02-6916-1430</p>
                    <p className="text-default-gray-700">COPYRIGHT (C) WITHTIME. ALL RIGHTS RESERVED</p>
                </div>
            </div>
        </footer>
    );
}
