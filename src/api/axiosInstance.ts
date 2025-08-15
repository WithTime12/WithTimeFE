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
                    isRedirecting = false;
                    return axiosInstance(error.config);
                }
            } catch (errors) {
                if (axios.isAxiosError(errors)) {
                    const refreshError = errors as AxiosError<IRefreshResponse>;
                    if (refreshError.status === 401) {
                        console.error('refreshToken이 없습니다. 로그인 페이지로 이동합니다.');
                        void logout();
                        localStorage.clear();
                    } else if (refreshError.status === 404) {
                        console.error('사용자 정보를 찾지 못했습니다. 로그인 페이지로 이동합니다.');
                        void logout();
                        localStorage.clear();
                    } else {
                        console.error('알 수 없는 오류가 발생했습니다', errors);
                        void logout();
                        localStorage.clear();
                    }
                } else {
                    console.error('알 수 없는 오류가 발생했습니다', errors);
                    void logout();
                    localStorage.clear();
                }

                return Promise.reject(errors);
            }
        }

        return Promise.reject(error);
    },
);
