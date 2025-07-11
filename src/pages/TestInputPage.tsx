//EditableInputBox UI 확인을 위한 테스트 페이지로 추후 삭제 예정입니다.
import { useState } from 'react';

import EditableInputBox from '@/components/common/EditableInputBox';

import SearchIcon from '@/assets/icons/Search_Blank.svg?react';

export default function TestInputPage() {
    const [text, setText] = useState('');
    const [search, setSearch] = useState('');
    const [nickname, setNickname] = useState('');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-8 py-10">
            {/*  text-default 타입 테스트 */}
            <div className="flex flex-col items-start gap-2">
                <span>1. Text Input Type</span>
                <EditableInputBox mode="default" placeholder="텍스트 입력" value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            {/*  search 타입 테스트 */}
            <div className="flex flex-col items-start gap-2">
                <span>2. Search Type with Icon</span>
                <EditableInputBox
                    mode="search"
                    placeholder="검색어 입력를 입력하세요"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // 입력 상태 저장
                    onSearchClick={() => {
                        console.log('검색 실행:', search); // 검색 아이콘 클릭 시 예시
                    }}
                />
            </div>

            {/*  nickname 타입 테스트 */}
            <div className="flex flex-col items-start gap-2">
                <EditableInputBox
                    mode="nickname"
                    label="닉네임"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onCancel={() => setNickname('')}
                    onSubmit={() => console.log('닉네임 저장:', nickname)}
                />
            </div>
        </div>
    );
}
