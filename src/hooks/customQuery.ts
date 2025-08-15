import { type MutationFunction, type QueryFunction, type QueryKey, useMutation, useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { TUseMutationCustomOptions, TUseQueryCustomOptions } from '@/types/common/common';

import { queryClient } from '@/api/queryClient';

export function useCoreQuery<TQueryFnData, TData = TQueryFnData>(
    keyName: QueryKey,
    query: QueryFunction<TQueryFnData, QueryKey>,
    options?: TUseQueryCustomOptions<TQueryFnData, TData>,
): UseQueryResult<TData, AxiosError> {
    return useQuery({
        queryKey: keyName,
        queryFn: query,
        ...options,
    });
}

export function useCoreMutation<
    TData,
    TVariables,
    TError = AxiosError<{ message?: string }>, // 필요 시 TResponseError 등으로 대체
    TContext extends { prevData?: unknown } = { prevData?: unknown },
    TCache = unknown,
>(mutation: MutationFunction<TData, TVariables>, options?: TUseMutationCustomOptions<TData, TVariables, TError, TContext, TCache>) {
    const {
        optimisticUpdate, // { key: QueryKey; updateFn: (old: TCache | undefined, vars: TVariables) => TCache }
        invalidateKeys,
        userOnError,
        userOnSuccess,
        ...rest // retry, gcTime 등 표준 옵션(UseMutationOptions 호환)
    } = options ?? {};

    return useMutation<TData, TError, TVariables, TContext>({
        mutationFn: mutation,

        // 중요: onMutate는 반드시 TContext | undefined를 반환해야 함
        onMutate: async (vars): Promise<TContext | undefined> => {
            if (!optimisticUpdate) return undefined;

            await queryClient.cancelQueries({ queryKey: optimisticUpdate.key });

            const prevData = queryClient.getQueryData<TCache>(optimisticUpdate.key);

            // 캐시 타입 안전하게 업데이트
            queryClient.setQueryData<TCache>(optimisticUpdate.key, (old) => optimisticUpdate.updateFn(old as TCache | undefined, vars));

            // prevData를 컨텍스트로 보관
            return { prevData } as TContext;
        },

        onError: (error, vars, ctx) => {
            // 롤백
            if (optimisticUpdate && ctx?.prevData !== undefined) {
                queryClient.setQueryData<TCache>(optimisticUpdate.key, ctx.prevData as TCache);
            }
            userOnError?.(error, vars, ctx);
        },

        onSuccess: async (data, vars, ctx) => {
            // 꼭 invalidate가 필요한 키만
            if (invalidateKeys?.length) {
                await Promise.all(invalidateKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
            }
            userOnSuccess?.(data, vars, ctx);
        },

        // 나머지 표준 옵션 주입
        ...rest,
    });
}
