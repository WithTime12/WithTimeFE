import LoadingLogo from '@/assets/withTimeLogo/loadingLogo.svg?react';
import Logo from '@/assets/withTimeLogo/logo_Blank.svg?react';

export default function DateCourseLoading() {
    return (
        <div className="flex flex-col z-1000 top-0 bg-default-gray-100 items-center justify-center w-[100vw] h-[100vh] absolute">
            <div className="font-heading1 text-center">
                Madeleine님만의
                <br />
                데이트 코스 만드는 중...
            </div>
            <div className="relative flex justify-center w-full h-[300px]">
                <Logo className="self-center absolute animate-blink" width={263} height={231} />
                <LoadingLogo className="self-center" width={263} height={231} />
            </div>
        </div>
    );
}
