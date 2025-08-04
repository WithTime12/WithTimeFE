import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TSocialLoginPlatform } from '@/types/auth/auth';

import { useAuth } from '@/hooks/auth/useAuth';

import useAuthStore from '@/store/useAuthStore';

function LoginRedirect() {
    const navigate = useNavigate();
    const location = useLocation();

    const urlParams = new URLSearchParams(location.search);

    const code = urlParams.get('code') || '';
    const platform = location.pathname.split('/').pop() || '';

    const { useSocialLogin } = useAuth();
    const { mutate: socialLoginMutate } = useSocialLogin;
    const { setEmail, setSocialId } = useAuthStore();
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
                            setEmail(data.result.email);
                            setSocialId(data.result.socialId);
                            navigate('/userSetting');
                        } else {
                            navigate('/home');
                        }
                    },
                    onError: (err) => {
                        console.error('소셜 로그인 실패:', err);
                        if (err.response?.data.message === '사용자 정보를 가져오는 데 실패했습니다.')
                            // 로그인 실패 시 에러 페이지로 리다이렉트
                            navigate('/Join');
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

    return <div>로그인 처리 중...</div>;
}

export default LoginRedirect;
