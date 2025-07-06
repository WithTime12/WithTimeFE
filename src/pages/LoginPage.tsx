import CommonInput from '@/components/common/commonInput';

import MainImg from '../images/test.jpeg';

import Logo from '@/assets/withTimeLogo/Korean_Logo.svg?react';
import Google from '@/images/socialLogin/google.png';
import Kakao from '@/images/socialLogin/kakao.png';
import Naver from '@/images/socialLogin/naver.png';

export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="hidden lg:block min-w-[200px] h-full bg-[linear-gradient(to_bottom,_white_0%,_white_40%,_#8ae7c7_50%)]">
                <img src={MainImg} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center px-[80px]">
                <div className="min-w-[360px] flex flex-col items-center justify-center gap-[80px]">
                    <div className="flex-col flex items-center justify-center w-full gap-[64px]">
                        <Logo className="w-[240px] h-min" />
                        <div className="flex flex-col gap-[32px] w-full">
                            <CommonInput
                                placeholder="아이디를 입력하세요"
                                title="ID"
                                validation={false}
                                error={true}
                                errorMessage="올바르지 않은 이메일이에요"
                            />
                            <CommonInput placeholder="비밀번호를 입력하세요" title="Password" type="password" />
                            <div className="flex w-full items-center justify-between">
                                <div className="flex gap-[8px] font-body1">
                                    <input type="checkbox" />
                                    자동 로그인
                                </div>
                                <div className="text-default-gray-700 font-caption underline hover:cursor-pointer">아이디/비밀번호를 잊어버렸어요</div>
                            </div>
                            <div className="w-full bg-primary-500 rounding-16 h-[56px] text-center flex justify-center items-center text-default-gray-100 font-heading3 hover:cursor-pointer">
                                로그인하기
                            </div>
                            {/* 공용 컴포넌트로 대체 예정 */}
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-[16px]">
                        <div className="flex items-center justify-center w-full gap-[48px]">
                            <div className="flex items-center justify-center w-[65px] h-[65px] hover:cursor-pointer">
                                <img src={Kakao} alt="" />
                            </div>
                            <div className="flex items-center justify-center w-[65px] h-[65px] hover:cursor-pointer">
                                <img src={Naver} alt="" />
                            </div>
                            <div className="flex items-center justify-center w-[65px] h-[65px] hover:cursor-pointer roudned-full">
                                <img src={Google} alt="" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full relative mt-[8px] ">
                            <div className="border-[0.5px] w-full border-default-gray-500" />
                            <div className="z-10 absolute px-[32px] bg-default-gray-100 self-center font-body2 text-default-gray-800">또는</div>
                        </div>
                        <div className="font-body1 underline hover:cursor-pointer">이메일로 회원가입</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
