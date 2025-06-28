import { create } from 'zustand';

interface IModalState {
    modalType: string;
    isOpen: boolean;
    modalProps?: Record<string, any>;
    openModal: (payload: string | { modalType: string; modalProps?: Record<string, any> }) => void;
    closeModal: () => void;
}

const useModalStore = create<IModalState>((set) => ({
    modalType: '',
    isOpen: false,
    modalProps: {},
    openModal: (payload) =>
        set(() => {
            if (typeof payload === 'string') {
                return {
                    modalType: payload,
                    modalProps: {},
                    isOpen: true,
                };
            } else {
                return {
                    modalType: payload.modalType,
                    modalProps: payload.modalProps || {},
                    isOpen: true,
                };
            }
        }),
    closeModal: () =>
        set(() => ({
            modalType: '',
            modalProps: {},
            isOpen: false,
        })),
}));

export default useModalStore;
