import type { TDateTestQuestion, TRelationTypeResponse } from '@/types/datetest/datetest';

import { axiosInstance } from '../axiosInstance';

export const getDateQuestions = async () => {
    const res = await axiosInstance.get<TDateTestQuestion>('/api/v1/dates/preferences/questions');
    if (!res.data.isSuccess) {
        throw new Error(res.data.message || '질문을 불러오는데 실패했습니다');
    }
    return res.data.result.questions;
};

export const submitDateTestAnswers = async (payload: { answers: number[] }) => {
    const { data } = await axiosInstance.post('/api/v1/dates/preferences/tests', payload);
    return data;
};

export const postDateTestResult = async (answers: number[]): Promise<TDateTestQuestion> => {
    const res = await axiosInstance.post('/api/v1/dates/preferences/tests', { answers });
    return res.data.result;
};

export const getRelationTypes = async (type: string): Promise<TRelationTypeResponse> => {
    const res = await axiosInstance.get(`/api/v1/dates/preferences/relations`, {
        params: { type },
    });
    if (!res.data.isSuccess) {
        throw new Error(res.data.message || '관계 유형을 불러오는데 실패했습니다');
    }
    return res.data;
};
