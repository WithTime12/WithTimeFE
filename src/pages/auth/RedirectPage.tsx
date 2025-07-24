import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TSocialLoginPlatform } from '@/types/auth';

import { useAuth } from '@/hooks/auth/useAuth';

import LoadingLogo from '@/assets/withTimeLogo/loadingLogo.svg?react';
import Logo from '@/assets/withTimeLogo/logo_Blank.svg?react';
import useAuthStore from '@/store/useAuthStore';

function LoginRedirect() {
    const navigate = useNavigate();
    const location = useLocation();

    const urlParams = new URLSearchParams(location.search);

    const code = urlParams.get('code') || '';
    const platform = location.pathname.split('/').pop() || '';

    const { useSocialLogin } = useAuth();
    const { mutate: socialLoginMutate } = useSocialLogin;
    const { setEmail } = useAuthStore();
    useEffect(() => {
        if (code) {
            socialLoginMutate(
                {
                    platform: platform as TSocialLoginPlatform,
                    code,
                },
                {
                    onSuccess: (data) => {
                        if (data.result.isFirst) {
                            localStorage.setItem('socialId', data.result.socialId.toString());
                            setEmail(data.result.email);
                            navigate('/userSetting');
                        } else {
                            navigate('/home');
                        }
                    },
                    onError: (err) => {
                        console.error('소셜 로그인 실패:', err);
                        if (err.response?.data.message === '사용자 정보를 가져오는 데 실패했습니다.') navigate('/Join');
                        else navigate('/error');
                    },
                },
            );
            // 로그인 성공 후 홈으로 리다이렉트
        } else {
            // 로그인 실패 시 에러 페이지로 리다이렉트
            navigate('/error');
        }
    }, []);

    return (
        <div className="relative flex justify-center w-full h-[300px]">
            <Logo className="self-center absolute animate-blink" width={263} height={231} />
            <LoadingLogo className="self-center" width={263} height={231} />
        </div>
    );
}

export default LoginRedirect;
