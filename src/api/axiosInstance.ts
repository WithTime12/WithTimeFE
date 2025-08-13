import type { AxiosError } from 'axios';
import axios from 'axios';

import { logout, refresh } from './auth/auth';

interface IRefreshResponse {
    isSuccess: boolean;
    code: string;
    message: string;
}
export const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

let isRedirecting = false;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.data.error === 'Unauthorized') {
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
                    } else if (refreshError.response?.data.message === 'The token is invalid.') {
                        console.log('refreshToken이 만료되었습니다. 로그인 페이지로 이동합니다.');
                        logout();
                    } else {
                        if (refreshError.response?.data.message === 'Incorrect password.') {
                            alert('Your email or password is incorrect.');
                        } else {
                            console.log('알 수 없는 오류가 발생했습니다', errors);
                            logout();
                        }
                    }
                } else {
                    console.log('알 수 없는 오류가 발생했습니다', errors);
                    logout();
                }

                return Promise.reject(errors);
            }
        }

        return Promise.reject(error);
    },
);
