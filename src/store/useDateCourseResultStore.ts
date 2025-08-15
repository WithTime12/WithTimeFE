import { create } from 'zustand';

import type { TDateCourseSearchCondInfo, TDatePlaces } from '@/types/dateCourse/dateCourse';

type TDataState = {
    name: string;
    datePlaces: TDatePlaces[];
    dateCourseSearchCondInfo: TDateCourseSearchCondInfo;
    isBookmarked: boolean | null;
    signature: string;
};

interface IDateCourseResultStoreState extends TDataState {
    resetDateCourseResultStore: () => void;
    setAll: (payload: TDataState) => void;
}

const INITIAL_DATA: TDataState = {
    name: '',
    datePlaces: [],
    dateCourseSearchCondInfo: {} as TDateCourseSearchCondInfo,
    isBookmarked: null,
    signature: '',
};

const useDateCourseResultStore = create<IDateCourseResultStoreState>((set) => ({
    ...INITIAL_DATA,

    resetDateCourseResultStore: () => set(INITIAL_DATA),
    setAll: (payload) => set((prev) => ({ ...prev, ...payload })),
}));

export default useDateCourseResultStore;
