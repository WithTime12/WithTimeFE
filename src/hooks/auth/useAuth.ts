// import { useNavigate } from 'react-router-dom';

import { useCoreMutation } from '../customQuery';

import { checkEmailVerifications, defaultLogin, defaultSignup, emailVerifications, logout } from '@/api/auth/auth';

export function useAuth() {
    // const navigate = useNavigate();

    const useDefaultLogin = useCoreMutation(defaultLogin);
    const useDefaultSignup = useCoreMutation(defaultSignup);
    const useLogout = useCoreMutation(logout);
    const useSendCode = useCoreMutation(emailVerifications);
    const useCheckCode = useCoreMutation(checkEmailVerifications);
    return { useLogout, useCheckCode, useDefaultLogin, useDefaultSignup, useSendCode };
}
