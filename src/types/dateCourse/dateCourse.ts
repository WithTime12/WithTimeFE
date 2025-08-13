import type { Dispatch, SetStateAction } from 'react';

import type { TCommonResponse } from '@/types/common/common';

export type TTimeline = {
    end?: boolean;
    title?: string;
    time: string;
    address?: string;
    price?: string;
    tags?: string[];
    menu?: string;
};
export type TInfo = {
    cashTag: string;
    locationTag: string;
    timeTag: string;
    MealTag: string;
    keywordTags: string[];
};
export type TTag = {
    id: number;
    label: string;
    code: string;
};

export type TTags = TTag[];

export type TDateKeyword<T> = {
    state?: T;
    setState?: Dispatch<SetStateAction<T>>;
    category: string;
    tags: TTags;
};

export type TKeywordButtonProps = {
    tag: string;
    selected?: boolean;
    onClick?: () => void;
    isButton?: boolean;
};

export type TDateCourseOptionButtonProps = {
    option: string;
    isSelected: boolean;
    onClick: () => void;
};

export type TDateCourseSearchFilterOption = {
    options?: string[] | null;
    value: string | string[] | null;
    onChange: (value: string | string[]) => void;
    title: string;
    subTitle?: string | null;
    type: 'choice' | 'search' | 'time' | 'choices' | 'keyword';
    errorMessage: string | null;
    apiRequestValue: string | string[] | null;
    autoInit?: boolean;
};

export interface IQuestion {
    id: number;
    title: string;
    options: string[] | null;
    keyword: string | null;
    subTitle: string | null;
    apiRequestValue: string[] | null;
    type: 'choice' | 'search' | 'time' | 'choices' | 'keyword';
}

export type TSearchRegionValues = {
    keyword: string;
};

export type TSearchRegionResponse = TCommonResponse<{
    regions: TRegion[];
    keyword: string;
    resultCount: number;
}>;

export type TRegion = {
    regionId: number;
    name: string;
    latitude: number;
    longitude: number;
    gridX: number;
    gridY: number;
    regionCode: {
        landRegCode: string;
        tempRegCode: string;
        regionCodeId: number;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
};

export type TPostDateCourseRequest = {
    budget: string;
    datePlaces: string[];
    dateDurationTime: string;
    mealPlan: string[];
    transportation: string;
    userPreferredKeywords: string[];
    startTime: string;
};

export type TPostDateCourseResponse = TCommonResponse<TDateCourse>;

export type TDatePlaces = {
    name: string;
    image: string;
    tel: string;
    averagePrive: number;
    information: string;
    latitude: number;
    longitude: number;
    roadNameAddress: string;
    lotNumberAddress: string;
    placeType: string;
};
export type TDateCourse = {
    dateCourseId: number;
    name: string;
    datePlaces: TDatePlaces[];
};
export type TPostBookmarkRequest = {
    dateCourseId: number;
};

export type TPostBookmarkResponse = TCommonResponse<{
    dateCourseId: number;
}>;

export type TDeleteBookmarkRequest = {
    dateCourseId: number;
};

export type TDeleteBookmarkResponse = TCommonResponse<{
    dateCourseId: number;
}>;

export type TGetDateCourseRequest = TCourseFilter & {
    page: number;
    size: number;
};

export type TGetDateCourseResponse = TCommonResponse<{
    dateCourseList: TDateCourse[];
    totalPages: number;
    currentPage: number;
    currentSize: number;
    hasNextPage: boolean;
}>;

export type TGetBookmarkedDateCourseRequest = TCourseFilter & {
    page: number;
    size: number;
};

export type TGetBookmarkedDateCourseResponse = TCommonResponse<{
    dateCourseList: TDateCourse[];
    totalPages: number;
    currentPage: number;
    currentSize: number;
    hasNextPage: boolean;
}>;

export type TCourseFilter = {
    budget: string | null;
    datePlaces: string[];
    dateDurationTime: string | null;
    mealTypes: string[];
    transportation: string | null;
    userPreferredKeywords: string[];
    startTime: string | null;
};
