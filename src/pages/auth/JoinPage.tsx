import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema } from '@/utils/validation';

import { useAuth } from '@/hooks/auth/useAuth';

import Button from '@/components/common/Button';
import CommonAuthInput from '@/components/common/commonAuthInput';
import GraySvgButton from '@/components/common/graySvgButton';

import useAuthStore from '@/store/useAuthStore';

type TFormValues = {
    email: string;
    password: string;
    repassword: string;
    code: string;
};

export default function Join() {
    const { setEmail, setPassword } = useAuthStore();
    const [codeVerify, setCodeVerify] = useState(false);
    const [sendCode, setSendCode] = useState(false);
    const navigate = useNavigate();
    const { useSendCode, useCheckCode } = useAuth();
    const { mutate: sendCodeMutation } = useSendCode;
    const { mutate: checkCodeMutation } = useCheckCode;

    const socialId = localStorage.getItem('socialId') || '';

    const {
        register,
        handleSubmit,
        control,
        formState: { isValid, errors },
    } = useForm<TFormValues>({
        mode: 'onChange',
        resolver: zodResolver(signupSchema),
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
                        if (data.isSuccess === false) {
                            setCodeVerify(true);
                        } else {
                            setCodeVerify(false);
                        }
                    },
                    onError: () => {
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

    const onSubmit: SubmitHandler<TFormValues> = async (submitData) => {
        setEmail(submitData.email);
        setPassword(submitData.password);
        navigate('/usersetting');
    };

    useEffect(() => {
        setCodeVerify(false);
    }, [watchedCode, watchedEmail]);
    useEffect(() => {
        setSendCode(false);
    }, [watchedEmail]);

    return (
        <div className="w-[450px] max-w-[96vw] h-screen flex flex-col items-center justify-center gap-10">
            <div className="w-full flex justify-start">
                <GraySvgButton type="backward" onClick={() => navigate('/')} />
            </div>
            <div className="w-[367px] min-w-[280px] flex gap-3">
                <form className="flex-col flex items-center justify-center w-full gap-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="font-heading1">회원가입</div>

                    <div className="flex flex-col gap-[32px] w-full">
                        <CommonAuthInput
                            placeholder="메일을 입력하세요"
                            title="Email"
                            error={!!errors.email?.message || watchedEmail == ''}
                            errorMessage={errors.email?.message}
                            validation={!errors.email?.message && !!watchedEmail}
                            button={socialId !== '' && !socialId ? true : false}
                            buttonOnclick={postSendCode}
                            buttonText="인증번호"
                            {...register('email')}
                        />

                        {socialId !== '' && !socialId && (
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
                        )}
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
                        children={'다음으로'}
                        disabled={socialId ? watchedEmail === '' || watchedPassword === '' : !isValid || watchedEmail === '' || watchedPassword === ''}
                        onClick={() => {
                            setEmail(watchedEmail);
                            setPassword(watchedPassword);
                            navigate('/usersetting');
                        }}
                        className="w-full"
                    />
                </form>
            </div>
        </div>
    );
}
