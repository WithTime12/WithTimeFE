import qs from 'qs';

import type {
    TDeleteBookmarkRequest,
    TDeleteBookmarkResponse,
    TGetBookmarkedDateCourseRequest,
    TGetBookmarkedDateCourseResponse,
    TGetDateCourseRequest,
    TGetDateCourseResponse,
    TPostBookmarkRequest,
    TPostBookmarkResponse,
    TPostDateCourseRequest,
    TPostDateCourseResponse,
    TPostMakeBookmarkRequest,
    TPostMakeBookmarkResponse,
    TSearchRegionResponse,
    TSearchRegionValues,
} from '@/types/dateCourse/dateCourse';

import { axiosInstance } from '@/api/axiosInstance';

export const searchRegion = async ({ keyword }: TSearchRegionValues): Promise<TSearchRegionResponse> => {
    const { data } = await axiosInstance.get('/api/v1/regions/search', {
        params: {
            keyword,
        },
    });
    return data;
};

export const postDateCourse = async ({
    budget,
    datePlaces,
    mealPlan,
    dateDurationTime,
    transportation,
    userPreferredKeywords,
    startTime,
    excludedCourseSignatures,
}: TPostDateCourseRequest): Promise<TPostDateCourseResponse> => {
    const { data } = await axiosInstance.post('/api/v1/date-courses/', {
        budget,
        datePlaces,
        dateDurationTime,
        mealPlan,
        transportation,
        userPreferredKeywords,
        startTime,
        excludedCourseSignatures,
    });
    return data;
};

export const postBookmark = async ({ dateCourseId }: TPostBookmarkRequest): Promise<TPostBookmarkResponse> => {
    const { data } = await axiosInstance.post(`/api/v1/date-courses/${dateCourseId}/bookmarks`);
    return data;
};
export const postMakeBookmark = async ({ datePlaceIds, name }: TPostMakeBookmarkRequest): Promise<TPostMakeBookmarkResponse> => {
    const { data } = await axiosInstance.post(`/api/v1/date-courses/bookmarks`, { datePlaceIds, name });
    return data;
};
export const deleteBookmark = async ({ dateCourseId }: TDeleteBookmarkRequest): Promise<TDeleteBookmarkResponse> => {
    const { data } = await axiosInstance.delete(`/api/v1/date-courses/${dateCourseId}/bookmarks`);
    return data;
};

export const getDateCourse = async ({
    budget,
    datePlaces,
    mealTypes,
    transportation,
    userPreferredKeywords,
    page,
    size,
}: TGetDateCourseRequest): Promise<TGetDateCourseResponse> => {
    const { data } = await axiosInstance.get('/api/v1/date-courses', {
        params: {
            page,
            size,
            budget,
            datePlaces,
            mealTypes,
            transportation,
            userPreferredKeywords,
        },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    });
    return data;
};

export const getBookmarkedDateCourse = async ({
    budget,
    datePlaces,
    mealTypes,
    transportation,
    userPreferredKeywords,
    page,
    size,
}: TGetBookmarkedDateCourseRequest): Promise<TGetBookmarkedDateCourseResponse> => {
    const { data } = await axiosInstance.get('/api/v1/date-courses/search', {
        params: {
            page,
            size,
            budget,
            datePlaces,
            mealTypes,
            transportation,
            userPreferredKeywords,
        },
    });
    return data;
};
