import Modal from '../common/modal';

type TErrorModalProps = {
    onClose: () => void;
};

// 모달을 만들 때 ModalProps에 onClose를 추가하여 모달을 닫는 함수를 전달해줍니다.
function ErrorModal({ onClose }: TErrorModalProps) {
    return (
        <Modal onClose={onClose}>
            {/* 모달의 내용은 children으로 전달해줍니다. 항상 Modal 컴포넌트 하위에 만들고 싶은 모달은 만들면됩니다. */}
            <div className="flex flex-col items-center justify-center w-[300px] h-[150px] rounded p-4">
                <div>에러</div>
            </div>
        </Modal>
    );
}

export default ErrorModal;
