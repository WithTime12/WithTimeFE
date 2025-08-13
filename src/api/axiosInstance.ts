import type { AxiosError } from 'axios';
import axios from 'axios';

import { logout, refresh } from './auth/auth';

interface IRefreshResponse {
    isSuccess: boolean;
    code: string;
    message: string;
}
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

let isRedirecting = false;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.status === 401) {
            if (isRedirecting) {
                return Promise.reject(error);
            }

            isRedirecting = true;
            try {
                const currentUrl = window.location.pathname;
                if (currentUrl === '/' || currentUrl === '/signup') {
                    isRedirecting = false;
                    return;
                }

                const refreshResponse = await refresh();

                if (refreshResponse.code === '200') {
                    console.log('refreshToken이 재발급 되었습니다');
                    isRedirecting = false;
                    return axiosInstance(error.config);
                }
            } catch (errors) {
                if (axios.isAxiosError(errors)) {
                    const refreshError = error as AxiosError<IRefreshResponse>;
                    if (refreshError.response?.data.message === 'The token is null.') {
                        console.log('refreshToken이 없습니다. 로그인 페이지로 이동합니다.');
                        window.location.href = '/';
                    } else if (refreshError.response?.data.message === 'The token is invalid.') {
                        console.log('refreshToken이 만료되었습니다. 로그인 페이지로 이동합니다.');
                        window.location.href = '/';
                        logout();
                    } else {
                        if (refreshError.response?.data.message === 'Incorrect password.') {
                            alert('Your email or password is incorrect.');
                        } else {
                            console.log('알 수 없는 오류가 발생했습니다', errors);
                            window.location.href = '/';
                            logout();
                        }
                    }
                } else {
                    console.log('알 수 없는 오류가 발생했습니다', errors);
                    window.location.href = '/';
                    logout();
                }

                return Promise.reject(errors);
            }
        }

        return Promise.reject(error);
    },
);
