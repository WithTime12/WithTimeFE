import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { findingSchema } from '@/utils/validation';

import CommonAuthInput from '@/components/common/commonAuthInput';
import GraySvgButton from '@/components/common/graySvgButton';

import Button from '../components/common/Button';

type TFormValues = {
    email: string;
    password: string;
    repassword: string;
    code: string;
};

export default function FindPw() {
    const navigate = useNavigate();
    const [codeVerify, setCodeVerify] = useState(false);
    const [sendCode, setSendCode] = useState(false);
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
        if (watchedCode != '' && watchedCode != undefined) {
            setCodeVerify(true);
        }
    };

    const postSendCode = () => {
        if (watchedEmail != '' && !errors.email?.message) {
            setSendCode(true);
            console.log('이메일 발송');
        }
    };

    useEffect(() => {
        setCodeVerify(false);
    }, [watchedCode, watchedEmail]);
    useEffect(() => {
        setSendCode(false);
    }, [watchedEmail]);

    const onSubmit: SubmitHandler<TFormValues> = async (submitData) => {
        if (isValid) {
            console.log('폼 제출');
            console.log(submitData);
        }
    };
    return (
        <div className="min-w-[280px] w-[450px] max-w-[96vw] flex flex-col items-center justify-center gap-2 overflow-hidden">
            <div className="w-full flex justify-start">
                <GraySvgButton type="backward" onClick={() => navigate('/')} />
            </div>
            <div className="min-w-[280px] w-[360px]">
                <form className="flex-col flex items-center justify-center w-full gap-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="font-heading1">비밀번호 찾기</div>

                    <div className="flex flex-col gap-[32px] w-full">
                        <CommonAuthInput
                            placeholder="메일을 입력하세요"
                            title="Email"
                            error={!!errors.email?.message || watchedEmail == ''}
                            errorMessage={errors.email?.message}
                            validation={!errors.email?.message && !!watchedEmail}
                            button={true}
                            buttonOnclick={postSendCode}
                            buttonText="인증번호"
                            {...register('email')}
                        />
                        <CommonAuthInput
                            placeholder="인증번호를 입력하세요"
                            title="Verification code"
                            error={!!errors.code?.message || watchedCode == ''}
                            errorMessage={errors.code?.message}
                            validation={sendCode && codeVerify}
                            button={true}
                            buttonOnclick={checkCode}
                            buttonText={codeVerify ? '인증완료' : '인증하기'}
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
                            validationState={watchedPassword === watchedRepassword && !!watchedRepassword ? '확인완료' : '확인필요'}
                            validation={watchedPassword === watchedRepassword && !!watchedRepassword}
                            {...register('repassword')}
                        />
                    </div>
                    <Button
                        size="big-16"
                        variant={'mint'}
                        children={'로그인하기'}
                        disabled={!isValid || watchedEmail == '' || watchedPassword == '' || !codeVerify}
                        onClick={handleSubmit(onSubmit)}
                        className="w-full"
                    />
                </form>
            </div>
        </div>
    );
}
