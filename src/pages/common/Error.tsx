import Button from '@/components/common/Button';

import AlertCircle from '@/assets/icons/alert-circle_Fill.svg?react';

export default function Error() {
    return (
        <>
            <div className="flex flex-col items-center justify-center bg-white py-[100px] min-h-screen max-h-screen px-4">
                <AlertCircle className="w-[130px] h-[130px] mb-[80px] text-default-gray-500" />
                <h1 className="text-3xl mb-[32px] text-default-gray-700 font-bold">서비스 이용에 불편을 드려 죄송합니다</h1>
                <p className="text-l text-default-gray-500 text-center mb-[160px]">
                    요청하신 페이지를 찾을 수 없습니다 <br /> 경로가 잘못되었거나, 인터넷 연결이 불안정할 수 있습니다
                </p>

                <Button onClick={() => window.history.back()} size={'big-16'} variant={'mint'}>
                    이전 페이지로 돌아가기
                </Button>
            </div>
        </>
    );
}
