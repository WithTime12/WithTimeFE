import type { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export type TCommonResponse<T> = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
};

export type TResponseError = AxiosError<{
    statusCode: number;
    message: string;
    error: string;
}>;

export type TOptimisticUpdate<TCache, TVariables> = {
    key: QueryKey; // 예: ['post', postId]
    updateFn: (old: TCache | undefined, vars: TVariables) => TCache;
};

export type TUseMutationCustomOptions<
    TData = unknown,
    TVariables = void,
    TError = AxiosError<{ message?: string }>, // message 타입 명시
    TContext = { prevData?: unknown },
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn' | 'onMutate' | 'onError' | 'onSuccess'> & {
    optimisticUpdate?: TOptimisticUpdate<any, TVariables>;
    invalidateKeys?: QueryKey[];
    silentError?: boolean;

    /** 사용자 정의 콜백 — 내부 기본 동작 후 호출 */
    userOnError?: UseMutationOptions<TData, TError, TVariables, TContext>['onError'];
    userOnSuccess?: UseMutationOptions<TData, TError, TVariables, TContext>['onSuccess'];
};

export type TUseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
    UseQueryOptions<TQueryFnData, TResponseError, TData, QueryKey>,
    'queryKey'
>;
