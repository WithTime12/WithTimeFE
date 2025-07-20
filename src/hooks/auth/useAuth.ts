// import { useNavigate } from 'react-router-dom';

import { useCoreMutation } from '../customQuery';

import { defaultLogin, defaultSignup, logout } from '@/api/auth/auth';

export function useAuth() {
    // const navigate = useNavigate();

    const useDefaultLogin = useCoreMutation(defaultLogin);
    const useDefaultSignup = useCoreMutation(defaultSignup);
    const useLogout = useCoreMutation(logout);
    return { useLogout, useDefaultLogin, useDefaultSignup };
}
