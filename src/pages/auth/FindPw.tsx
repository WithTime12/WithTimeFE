import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import type { TFormValues } from '@/types/auth';

import { findingSchema } from '@/utils/validation';

import { useAuth } from '@/hooks/auth/useAuth';

import CommonAuthInput from '@/components/auth/commonAuthInput';
import Button from '@/components/common/Button';
import GraySvgButton from '@/components/common/graySvgButton';

export default function FindPw() {
    const navigate = useNavigate();

    const [codeVerify, setCodeVerify] = useState(false);
    const [sendCode, setSendCode] = useState(false);
    const [codeError, setCodeError] = useState('');

    const { useSendCode, useCheckCode, useFindPassword } = useAuth();
    const { mutate: sendCodeMutation, isPending: sendCodePending } = useSendCode;
    const { mutate: checkCodeMutation, isPending: checkCodePending } = useCheckCode;
    const { mutate: findPasswordMutation } = useFindPassword;

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
        if (watchedCode != '' && watchedCode != undefined && sendCode) {
            checkCodeMutation(
                {
                    email: watchedEmail,
                    code: watchedCode,
                },
                {
                    onSuccess: (data) => {
                        if (data.isSuccess === true) {
                            setCodeVerify(true);
                        } else {
                            setCodeVerify(false);
                        }
                    },
                    onError: () => {
                        setCodeError('인증번호가 일치하지 않습니다.');
                        setCodeVerify(false);
                    },
                },
            );
        }
    };

    const postSendCode = () => {
        setCodeVerify(false);
        if (watchedEmail != '' && !errors.email?.message) {
            sendCodeMutation(
                {
                    email: watchedEmail,
                },
                {
                    onSuccess: () => {
                        setSendCode(true);
                    },
                    onError: (err) => {
                        setSendCode(false);
                        console.error(err);
                        alert('인증코드 발송 중 에러가 발생하였습니다.');
                    },
                },
            );
        }
    };

    const onSubmit: SubmitHandler<TFormValues> = async () => {
        if (isValid) {
            findPasswordMutation(
                {
                    email: watchedEmail,
                    newPassword: watchedPassword,
                },
                {
                    onSuccess: (data) => {
                        if (data.isSuccess === true) {
                            alert('비밀번호가 성공적으로 변경되었습니다.');
                            navigate('/');
                        } else {
                            alert('비밀번호 변경에 실패하였습니다. 다시 시도해주세요.');
                        }
                    },
                    onError: () => {
                        alert('비밀번호 변경 중 에러가 발생하였습니다.');
                    },
                },
            );
        }
    };

    useEffect(() => {
        setCodeVerify(false);
        setCodeError('');
    }, [watchedCode, watchedEmail]);

    useEffect(() => {
        setSendCode(false);
    }, [watchedEmail]);

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
                            validation={!errors.email?.message && !!watchedEmail && !sendCodePending}
                            button={true}
                            buttonOnclick={postSendCode}
                            buttonText="인증번호"
                            {...register('email')}
                        />
                        <CommonAuthInput
                            placeholder="인증번호를 입력하세요"
                            title="Verification code"
                            error={!!errors.code?.message || watchedCode == '' || codeError !== ''}
                            errorMessage={errors.code?.message || codeError}
                            validation={sendCode && codeVerify && !checkCodePending}
                            button={true}
                            buttonOnclick={checkCode}
                            type="code"
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
                        disabled={watchedPassword !== watchedRepassword || !isValid || watchedEmail == '' || watchedPassword == '' || !codeVerify}
                        onClick={handleSubmit(onSubmit)}
                        className="w-full"
                    />
                </form>
            </div>
        </div>
    );
}
