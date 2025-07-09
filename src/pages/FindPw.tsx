import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { findingSchema } from '@/utils/validation';

import CommonAuthInput from '@/components/common/commonAuthInput';

type TFormValues = {
    email: string;
    password: string;
    repassword: string;
    code: string;
};

export default function FindPw() {
    const [codeVerify, setCodeVerify] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { isValid, errors },
    } = useForm<TFormValues>({
        mode: 'onChange',
        resolver: zodResolver(findingSchema),
    });
    const watchedPassword = useWatch({
        control,
        name: 'password',
    });
    const watchedEmail = useWatch({
        control,
        name: 'email',
    });
    const watchedCode = useWatch({
        control,
        name: 'code',
    });
    const watchedRepassword = useWatch({
        control,
        name: 'repassword',
    });

    const checkCode = () => {
        setCodeVerify(true);
    };

    const onSubmit: SubmitHandler<TFormValues> = async (submitData) => {
        console.log(submitData.email, submitData.password);
    };
    return (
        <div className="min-w-[360px] max-w-[360px] h-screen flex flex-col items-center justify-center gap-[80px]">
            <form className="flex-col flex items-center justify-center w-full gap-[64px]" onSubmit={handleSubmit(onSubmit)}>
                <div className="font-heading1">비밀번호 찾기</div>

                <div className="flex flex-col gap-[32px] w-full">
                    <CommonAuthInput
                        placeholder="메일을 입력하세요"
                        title="Email"
                        error={!!errors.email?.message || watchedEmail == ''}
                        errorMessage={errors.email?.message}
                        validation={!errors.email?.message && !!watchedEmail}
                        button={true}
                        buttonText="인증번호"
                        {...register('email')}
                    />
                    <CommonAuthInput
                        placeholder="인증번호를 입력하세요"
                        title="Verification code"
                        error={!!errors.code?.message || watchedCode == ''}
                        errorMessage={errors.code?.message}
                        validation={codeVerify}
                        button={true}
                        buttonOnclick={checkCode}
                        buttonText="인증완료"
                        {...register('code')}
                    />
                    <div className="border-[0.5px] w-full border-default-gray-500" />
                    <CommonAuthInput
                        placeholder="새로운 비밀번호"
                        title="New Password"
                        type="password"
                        error={!!errors.password?.message || watchedPassword == ''}
                        errorMessage={errors.password?.message}
                        short={true}
                        validation={!errors.password?.message && !!watchedPassword}
                        {...register('password')}
                    />
                    <CommonAuthInput
                        placeholder="새로운 비밀번호 확인"
                        title="New Password"
                        type="password"
                        error={!!errors.repassword?.message || watchedRepassword == ''}
                        errorMessage={errors.repassword?.message}
                        button={true}
                        buttonText="확인완료"
                        validation={watchedPassword === watchedRepassword && !!watchedRepassword}
                        {...register('repassword')}
                    />
                </div>
                <button
                    className="w-full bg-primary-500 rounding-16 h-[56px] text-center flex justify-center items-center text-default-gray-100 font-heading3 hover:cursor-pointer"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!isValid || watchedEmail == '' || watchedPassword == ''}
                >
                    로그인하기
                </button>
            </form>
        </div>
    );
}
