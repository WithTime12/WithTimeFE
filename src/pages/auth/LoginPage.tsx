import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '@/utils/validation';

import { useAuth } from '@/hooks/auth/useAuth';

import Button from '@/components/common/Button';
import CommonAuthInput from '@/components/common/commonAuthInput';

import Logo from '@/assets/withTimeLogo/Korean_Logo.svg?react';
import Google from '@/images/socialLogin/google.png';
import Kakao from '@/images/socialLogin/kakao.png';
import Naver from '@/images/socialLogin/naver.png';

type TFormValues = {
    email: string;
    password: string;
};

export default function Login() {
    const navigate = useNavigate();
    const { useDefaultLogin } = useAuth();
    const [error, setError] = useState('');
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
        name: 'email',
    });
    const { mutate: loginMutate } = useDefaultLogin;
    const onSubmit: SubmitHandler<TFormValues> = async (submitData) => {
        if (isValid) {
            loginMutate(
                {
                    email: submitData.email,
                    password: submitData.password,
                },
                {
                    onSuccess: () => {
                        navigate('/home');
                    },
                    onError: (err) => {
                        console.log(err.response?.data.message);
                        setError('잘못된 정보를 입력하였습니다.');
                    },
                },
            );
        }
    };

    const handleSocialLogin = (platform: string) => {
        const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/${platform}`;
        // const queryParam = addAccount ? '?addSocial=true' : '';
        window.location.href = `${baseUrl}`;
    };
    return (
        <div className="min-w-[280px] w-[450px] max-w-[96vw] h-screen flex flex-col items-center justify-center gap-10">
            <form className="flex-col flex items-center justify-center w-full gap-14" onSubmit={handleSubmit(onSubmit)}>
                <Logo className="w-[240px] h-min" />

                <div className="flex flex-col gap-[32px] w-[367px] min-w-[280px]">
                    <CommonAuthInput
                        placeholder="아이디를 입력하세요"
                        title="ID"
                        error={!!errors.email?.message || watchedEmail == '' || error != ''}
                        errorMessage={errors.email?.message}
                        {...register('email')}
                    />
                    <CommonAuthInput
                        placeholder="비밀번호를 입력하세요"
                        title="Password"
                        type="password"
                        error={!!errors.password?.message || watchedPassword == '' || error != ''}
                        errorMessage={errors.password?.message || error}
                        {...register('password')}
                    />
                    <div className="flex w-full items-center justify-center">
                        <div className="text-default-gray-700 font-caption underline hover:cursor-pointer select-none" onClick={() => navigate('/find-pw')}>
                            아이디/비밀번호를 잊어버렸어요
                        </div>
                    </div>
                    <Button
                        size="big-16"
                        variant={'mint'}
                        children={'로그인하기'}
                        disabled={!isValid || watchedEmail == '' || watchedPassword == ''}
                        onClick={handleSubmit(onSubmit)}
                    />
                </div>
            </form>
            <div className="w-full flex flex-col items-center justify-center gap-[16px]">
                <div className="flex items-center justify-center w-full gap-[48px]">
                    <div onClick={() => handleSocialLogin('kakao')} className="flex items-center justify-center w-[65px] h-[65px] hover:cursor-pointer">
                        <img src={Kakao} alt="카카오 로그인" />
                    </div>
                    <div onClick={() => handleSocialLogin('naver')} className="flex items-center justify-center w-[65px] h-[65px] hover:cursor-pointer">
                        <img src={Naver} alt="네이버 로그인" />
                    </div>
                    <div
                        onClick={() => handleSocialLogin('google')}
                        className="flex items-center justify-center w-[65px] h-[65px] hover:cursor-pointer roudned-full"
                    >
                        <img src={Google} alt="구글 로그인" />
                    </div>
                </div>
                <div className="flex items-center justify-center w-full relative mt-[8px] ">
                    <div className="border-[0.5px] w-full border-default-gray-500" />
                    <div className="z-10 absolute px-[32px] bg-default-gray-100 self-center font-body2 text-default-gray-800 select-none">또는</div>
                </div>
                <div className="font-body1 underline hover:cursor-pointer select-none" onClick={() => navigate('/join')}>
                    이메일로 회원가입
                </div>
            </div>
        </div>
    );
}
