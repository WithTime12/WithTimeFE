import { z } from 'zod';

import { Gender } from '@/pages/UserSetting';

const nicknamePattern = /^[a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const birthPattern = /^(19|20)\d{2}\.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])$/;
const phonePattern = /^010-(\d{4})-(\d{4})$/;
// Zod 스키마 정의

const emailSchema = z.string().nonempty('Required.').regex(emailRegex, '올바르지 않은 형식이에요');

const passwordSchema = z
    .string()
    .min(4, '비밀번호는 최소 4자부터 가능합니다.')
    .max(32, '비밀번호는 최대 32글자까지 입력 가능합니다.')
    .nonempty('비밀번호는 필수로 입력해야합니다.');

export const signupSchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
        repassword: passwordSchema,
        code: z.string().nonempty('Required'),
    })
    .refine((data) => data.password === data.repassword, {
        path: ['repassword'],
        message: '비밀번호가 일치하지 않습니다.',
    });

export const findingSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    repassword: passwordSchema,
    code: z.string().nonempty('Required'),
});

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const userSettingSchema = z.object({
    nickname: z
        .string()
        .max(20, '닉네임은 20글자 이내여야합니다.')
        .regex(nicknamePattern, '닉네임은 영문만 가능합니다.')
        .nonempty('닉네임은 필수로 입력해야합니다'),
    birth: z.string().nonempty('생년월일은 필수로 입력해야합니다').regex(birthPattern, '올바른 생년월일을 입력해주세요'),
    phoneNum: z.string().nonempty('전화번호는 필수로 입력해야합니다').regex(phonePattern, '올바른 전화번호를 입력해주세요'),
    gender: z.nativeEnum(Gender),
});
