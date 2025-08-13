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

export type TOptimisticUpdate<TVariables, TCache> = {
    key: QueryKey;
    updateFn: (old: TCache | undefined, vars: TVariables) => TCache;
};

export type TUseMutationCustomOptions<TData, TVariables, TError, TContext extends { prevData?: unknown }, TCache> = Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn' | 'onMutate' | 'onError' | 'onSuccess'
> & {
    optimisticUpdate?: TOptimisticUpdate<TVariables, TCache>;
    invalidateKeys?: QueryKey[];
    // 사용자 콜백 분리(선택): 원한다면 UseMutationOptions의 onError/onSuccess를 감싸 별도 이름으로 사용
    userOnError?: (error: TError, variables: TVariables, context: TContext | undefined) => void;
    userOnSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => void;
};

export type TUseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
    UseQueryOptions<TQueryFnData, TResponseError, TData, QueryKey>,
    'queryKey'
>;
