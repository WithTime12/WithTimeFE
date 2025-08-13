import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ClipLoader from 'react-spinners/ClipLoader';

import { useGetAlarm } from '@/hooks/alarm/useGetAlarm';

import Alarm from '../alarmModal/alarm';
import Modal from '../common/modal';

import ErrorComponent from '@/pages/common/Error';

type TAlarmModalProps = {
    onClose: () => void;
};

function AlarmModal({ onClose }: TAlarmModalProps) {
    const { data, fetchNextPage, isFetching, hasNextPage, error } = useGetAlarm({ size: 5 });
    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            if (!isFetching && hasNextPage) {
                fetchNextPage();
            }
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if (error) {
        return <ErrorComponent />;
    }

    return (
        <Modal title="알림" onClose={onClose} position="main">
            <div className="mt-[5px] flex flex-col items-center justify-center sm:w-[600px] w-[300px] px-[28px] max-h-[300px] overflow-y-scroll">
                {(!data?.pages?.length || data.pages.every((page) => page.result.alarmList.length === 0)) && (
                    <div className="text-center flex text-default-gray-700 font-heading3 py-8 h-fit">아직 알림이 없습니다</div>
                )}
                {data?.pages.map((alarmList) => alarmList.result.alarmList.map((alarm) => <Alarm key={alarm.id} {...alarm} />))}
                <div ref={ref} className="flex w-full justify-center mt-[10px] h-[1px]">
                    {isFetching && hasNextPage && <ClipLoader />}
                </div>
            </div>
        </Modal>
    );
}

export default AlarmModal;
