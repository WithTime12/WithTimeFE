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
        staleTime: 1000 * 60 * 5,
    });
}

export function useCoreMutation<TData, TVariables>(
    mutation: MutationFunction<TData, TVariables>,
    options?: TUseMutationCustomOptions<TData, TVariables, AxiosError<{ message?: string }>, { prevData?: unknown }>,
) {
    const {
        optimisticUpdate,
        invalidateKeys,
        userOnError,
        userOnSuccess,
        ...rest // retry, gcTime 등 표준 옵션
    } = options ?? {};

    return useMutation<TData, AxiosError<{ message?: string }>, TVariables, { prevData?: unknown }>({
        mutationFn: mutation,

        onMutate: async (vars) => {
            if (!optimisticUpdate) return {};
            await queryClient.cancelQueries({ queryKey: optimisticUpdate.key });
            const prevData = queryClient.getQueryData(optimisticUpdate.key);
            queryClient.setQueryData(optimisticUpdate.key, (old: unknown) => optimisticUpdate.updateFn(old, vars));
            return { prevData };
        },

        onError: (error, vars, ctx) => {
            // 롤백
            if (optimisticUpdate && ctx?.prevData !== undefined) {
                queryClient.setQueryData(optimisticUpdate.key, ctx.prevData);
            }

            // 사용자 콜백 위임
            userOnError?.(error, vars, ctx);
        },

        onSuccess: async (data, vars, ctx) => {
            // invalidate
            if (invalidateKeys?.length) {
                await Promise.all(invalidateKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
            }
            // 사용자 콜백 위임
            userOnSuccess?.(data, vars, ctx);
        },

        // 나머지 표준 옵션 주입
        ...rest,
    });
}
