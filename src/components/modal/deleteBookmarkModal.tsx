import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useBookmark from '@/hooks/course/useBookmark';

type TDeleteBookmarkModal = {
    onClose: () => void;
    isOpen: boolean;
    changeState: (state: boolean) => void;
    dateCourseId: number;
};

function DeleteBookmarkModal({ onClose, dateCourseId, isOpen, changeState }: TDeleteBookmarkModal) {
    const [isVisible, setIsVisible] = useState(isOpen);
    const { useDeleteBookmark } = useBookmark();
    const { mutate: deleteBookmarkMutate } = useDeleteBookmark;
    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    const handleDelete = () => {
        deleteBookmarkMutate(
            { dateCourseId },
            {
                onSuccess: () => {
                    changeState(false);
                    onClose();
                },
                onError: () => {
                    alert('북마크 삭제에 실패했습니다. 잠시후 다시 시도해주세요.');
                },
            },
        );
    };

    return createPortal(
        isVisible && (
            <div className="z-[1000] fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/30 flex items-center justify-center">
                <div className="flex flex-col rounding-32 bg-default-gray-100 pt-[40px] gap-[40px]">
                    <div className="flex flex-col items-center justify-center px-[70px] w-fit">
                        <div className="font-heading3 text-default-gray-800 select-none">저장된 데이트 코스 삭제</div>
                        <div className="font-body1 text-default-gray-700 select-none">삭제하시겠습니까?</div>
                    </div>
                    <div className="flex justify-evenly border-t-[0.5px] border-default-gray-500 w-full">
                        <button
                            onClick={onClose}
                            className="py-[8px] w-[50%] flex justify-center rounded-lb-[32px] border-r-[0.5px] border-default-gray-500 text-center font-body1 text-default-gray-700"
                        >
                            취소
                        </button>
                        <button onClick={handleDelete} className="py-[8px] w-[50%] flex justify-center rounded-rb-[32px] text-center font-body1 text-warning">
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        ),
        document.getElementById('modal-root')!,
    );
}

export default DeleteBookmarkModal;
