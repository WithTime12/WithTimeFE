import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '@/utils/validation';

import CommonInput from '@/components/common/commonInput';

import Logo from '@/assets/withTimeLogo/Korean_Logo.svg?react';
import Google from '@/images/socialLogin/google.png';
import Kakao from '@/images/socialLogin/kakao.png';
import Naver from '@/images/socialLogin/naver.png';

type TFormValues = {
    email: string;
    password: string;
};

export default function Login() {
    const {
        register,
        handleSubmit,
        control,
        formState: { isValid, errors },
    } = useForm<TFormValues>({
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
    });
    const watchedPassword = useWatch({
        control,
        name: 'password',
    });
    const watchedEmail = useWatch({
        control,
        name: 'password',
    });

    const onSubmit: SubmitHandler<TFormValues> = async (submitData) => {
        console.log(submitData.email, submitData.password);
    };
    return (
        <div className="min-w-[360px] flex flex-col items-center justify-center gap-[80px]">
            <form className="flex-col flex items-center justify-center w-full gap-[64px]" onSubmit={handleSubmit(onSubmit)}>
                <Logo className="w-[240px] h-min" />

                <div className="flex flex-col gap-[32px] w-full">
                    <CommonInput
                        placeholder="아이디를 입력하세요"
                        title="ID"
                        error={!!errors.email?.message || watchedEmail == ''}
                        errorMessage={errors.email?.message}
                        {...register('email')}
                    />
                    <CommonInput
                        placeholder="비밀번호를 입력하세요"
                        title="Password"
                        type="password"
                        error={!!errors.password?.message || watchedPassword == ''}
                        errorMessage={errors.password?.message}
                        {...register('password')}
                    />
                    <div className="flex w-full items-center justify-between">
                        <div className="flex gap-[8px] font-body1">
                            <input type="checkbox" />
                            자동 로그인
                        </div>
                        <div className="text-default-gray-700 font-caption underline hover:cursor-pointer">아이디/비밀번호를 잊어버렸어요</div>
                    </div>
                    <div
                        className="w-full bg-primary-500 rounding-16 h-[56px] text-center flex justify-center items-center text-default-gray-100 font-heading3 hover:cursor-pointer"
                        onClick={handleSubmit(onSubmit)}
                    >
                        로그인하기
                    </div>
                    {/* 공용 컴포넌트로 대체 예정 */}
                </div>
            </form>
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
    );
}
