import type { Dispatch, SetStateAction } from 'react';

import type { TCommonResponse } from './common/common';

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
};

export interface IQuestion {
    id: number;
    title: string;
    options: string[] | null;
    keyword: string | null;
    subTitle: string | null;
    type: 'choice' | 'search' | 'time' | 'choices' | 'keyword';
}

export type TSearchRegionValues = {
    keyword: string;
};

export type TSearchRegionResponse = TCommonResponse<{
    regions: string[];
    keyword: string;
    resultCount: number;
}>;
