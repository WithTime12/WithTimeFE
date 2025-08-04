import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TSocialLoginPlatform } from '@/types/auth/auth';

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
                            setSocialId(data.result.socialId);
                            setEmail(data.result.email);
                            navigate('/userSetting');
                        } else {
                            navigate('/home');
                        }
                    },
                    onError: (err) => {
                        if (err.response?.data.message === '사용자 정보를 가져오는 데 실패했습니다.') navigate('/Join');
                        else {
                            navigate('/error');
                            console.error('소셜 로그인 실패:', err);
                        }
                    },
                },
            );
        } else {
            navigate('/error');
        }
    }, []);

    return (
        <div className="relative flex justify-center h-[300px] min-w-[280px] w-[450px] max-w-[96vw]">
            <Logo className="self-center absolute animate-blink" width={263} height={231} />
            <LoadingLogo className="self-center" width={263} height={231} />
            <div className="absolute top-80 text-[20px] text-gray-500">로그인 중...</div>
        </div>
    );
}

export default LoginRedirect;
