import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import formatDateInput from '@/utils/formatDateInput';
import formatInputNumber from '@/utils/formatPhoneNumber';
import { userSettingSchema } from '@/utils/validation';

import CommonInput from '@/components/common/commonInput';

export enum Gender {
    male = 'male',
    female = 'female',
}

type TFormValues = {
    gender: Gender;
    birth: string;
    nickname: string;
    phoneNum: string;
};

export default function User() {
    const [gender, setGender] = useState(Gender.male);
    const [agree1, setAgree1] = useState(false);
    const [agree2, setAgree2] = useState(false);

    // const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { isValid, errors },
    } = useForm<TFormValues>({
        mode: 'onChange',
        resolver: zodResolver(userSettingSchema),
        defaultValues: {
            gender: Gender.male,
        },
    });

    const onSubmit: SubmitHandler<TFormValues> = async (submitData) => {
        console.log(submitData.birth, submitData.phoneNum);
        console.log('click');
        // navigate('/usersetting');
    };

    return (
        <div className="min-w-[367px] max-w-[367px] h-screen flex flex-col items-center justify-center gap-[80px]">
            <form className="flex-col flex items-center justify-center w-full gap-[64px]" onSubmit={handleSubmit(onSubmit)}>
                <div className="font-heading1">회원가입</div>
                <div className="flex flex-col gap-[32px] w-full">
                    <div className="flex w-full gap-[16px] justify-center items-center">
                        <div
                            onClick={() => {
                                setValue('gender', Gender.male);
                                setGender(Gender.male);
                            }}
                            className={`px-[32px] py-[16px] rounding-32
                            ${gender == Gender.male ? 'bg-primary-500 text-default-gray-100' : 'bg-default-gray-400 text-default-gray-800'}
                            `}
                        >
                            남자
                        </div>
                        <div
                            onClick={() => {
                                setValue('gender', Gender.female);
                                setGender(Gender.female);
                            }}
                            className={`px-[32px] py-[16px] rounding-32
                            ${gender == Gender.female ? 'bg-primary-500 text-default-gray-100' : 'bg-default-gray-400 text-default-gray-800'}
                            `}
                        >
                            여자
                        </div>
                    </div>
                    <Controller
                        control={control}
                        name="birth"
                        render={({ field: { value, onChange, ref } }) => (
                            <CommonInput
                                value={value ?? ''}
                                onChange={(e) => {
                                    const formatted = formatDateInput(e.target.value);
                                    onChange({ ...e, target: { ...e.target, value: formatted } });
                                }}
                                ref={ref}
                                placeholder="생년월일 (xxxx.xx.xx)"
                                title="Birth"
                                error={!!errors.birth?.message}
                                errorMessage={errors.birth?.message}
                            />
                        )}
                    />
                    <CommonInput
                        placeholder="닉네임 (영문 20글자 이내)"
                        title="Nickname"
                        error={!!errors.nickname?.message}
                        errorMessage={errors.nickname?.message}
                        {...register('nickname')}
                    />
                    <div className="flex flex-col gap-[8px]">
                        <Controller
                            control={control}
                            name="phoneNum"
                            render={({ field: { value, onChange, ref } }) => (
                                <CommonInput
                                    type="phoneNum"
                                    value={value ?? ''}
                                    onChange={(e) => {
                                        const formatted = formatInputNumber(e.target.value);
                                        onChange({ ...e, target: { ...e.target, value: formatted } });
                                    }}
                                    ref={ref}
                                    placeholder="전화번호 (010-xxxx-xxxx)"
                                    title="Phone Number"
                                    error={!!errors.phoneNum?.message}
                                    errorMessage={errors.phoneNum?.message}
                                />
                            )}
                        />
                        <div
                            className={`font-caption text-default-gray-500
                            ${errors.phoneNum?.message && 'pt-[16px]'}
                            `}
                        >
                            전화번호는 이메일을 잊었을 때 찾기 위한 용도입니다. 정확하게 기재해주세요.
                        </div>
                    </div>
                </div>
                <div className="border-[0.5px] w-full border-default-gray-500" />
                <div className="flex flex-col w-fit gap-[16px] justify-center items-start">
                    <div className="flex gap-[8px] font-body1 underline">
                        <input type="checkbox" checked={agree1} onChange={(e) => setAgree1(e.target.checked)} className="accent-[#000000]" />
                        개인정보 처리방침 동의
                    </div>
                    <div className="flex gap-[8px] font-body1 underline">
                        <input type="checkbox" checked={agree2} onChange={(e) => setAgree2(e.target.checked)} className="accent-[#000000]" />
                        이용약관 동의
                    </div>
                </div>
                <button
                    className="w-full bg-primary-500 rounding-16 h-[56px] text-center flex justify-center items-center text-default-gray-100 font-heading3 hover:cursor-pointer disabled:bg-default-gray-500"
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    disabled={!isValid || !agree1 || !agree2}
                >
                    회원가입 완료
                </button>
            </form>
        </div>
    );
}
