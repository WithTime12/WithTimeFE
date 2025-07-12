import Modal from '../common/modal';

type TDateCourseSearchFilterModalProps = {
    onClose: () => void;
};
export default function DateCourseSearchFilterModal({ onClose }: TDateCourseSearchFilterModalProps) {
    return (
        <Modal onClose={onClose}>
            <div className="flex w-[1000px] max-w-[80vw]">
                <div />
            </div>
        </Modal>
    );
}
