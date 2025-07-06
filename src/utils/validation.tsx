import { z } from 'zod';

const nicknamePattern = /^[a-zA-Z0-9가-힣]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
    nickname: z.string().min(1, 'Nickname is required.').max(20, 'Invalid format.').regex(nicknamePattern, 'Invalid format.'),
});
