import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import ErrorModal from '../modal/errorModal';

import useModalStore from '@/store/useModalStore';

// 모달 타입 정의 -> 만약 다른 모달을 추가하고 싶다면 여기에 타입을 추가하고, MODAL_COMPONENTS에 컴포넌트를 추가하면 됩니다.
// 에러 모달은 있을 지는 모르겠지만 사용법을 알려드리기 위해 임시로 넣어둔 것이고, 추후 삭제 혹은 수정될 예정입니다.
export const MODAL_TYPES = {
    ErrorModal: 'ErrorModal',
};

export const MODAL_COMPONENTS = {
    [MODAL_TYPES.ErrorModal]: ErrorModal,
};

export default function ModalProvider() {
    const { modalType, closeModal, modalProps } = useModalStore();
    const location = useLocation();
    useEffect(() => {
        closeModal();
    }, [location]);

    const ModalComponent = MODAL_COMPONENTS[modalType];
    return ModalComponent ? <ModalComponent onClose={closeModal} {...modalProps} /> : null;
}
