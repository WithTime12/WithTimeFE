import { MODAL_TYPES } from '@/components/common/modalProvider';

import useModalStore from '@/store/useModalStore';

// 임시로 만든 Home 페이지 입니다.
// 모달 사용법은 아래와 같이 useModalStore에서 openModal 함수를 꺼내오고, modalType을 인자로 전달하면 됩니다.
function Home() {
    const { openModal } = useModalStore();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button onClick={() => openModal({ modalType: MODAL_TYPES.ErrorModal })}>누르면 에러 모달이 나옵니다</button>
        </div>
    );
}

export default Home;
