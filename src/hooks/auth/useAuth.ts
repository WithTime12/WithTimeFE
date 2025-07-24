// import { useNavigate } from 'react-router-dom';

import { useCoreMutation } from '../customQuery';

import { checkEmailVerifications, defaultLogin, defaultSignup, emailVerifications, logout, socialLogin } from '@/api/auth/auth';

export function useAuth() {
    // const navigate = useNavigate();

    const useDefaultLogin = useCoreMutation(defaultLogin);
    const useDefaultSignup = useCoreMutation(defaultSignup);
    const useLogout = useCoreMutation(logout);
    const useSendCode = useCoreMutation(emailVerifications);
    const useCheckCode = useCoreMutation(checkEmailVerifications);
    const useSocialLogin = useCoreMutation(socialLogin);
    return { useLogout, useSocialLogin, useCheckCode, useDefaultLogin, useDefaultSignup, useSendCode };
}
