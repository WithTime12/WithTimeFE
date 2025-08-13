import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TFilters = {
    budget: string | null;
    datePlaces: string[];
    mealTypes: string[];
    transportation: string | null;
    userPreferredKeywords: string[];
    dateDurationTime: string | null;
    startTime: string | null;
};
type TActions = {
    setField: <K extends keyof TFilters>(key: K, value: TFilters[K]) => void;
    reset: () => void;
};
const empty: TFilters = {
    budget: null,
    datePlaces: [],
    mealTypes: [],
    transportation: null,
    userPreferredKeywords: [],
    dateDurationTime: null,
    startTime: null,
};

const useFilterStore = create<TFilters & TActions>()(
    persist(
        (set) => ({
            ...empty,
            setField: (key, value) => set({ [key]: value } as any),
            reset: () => set({ ...empty }),
        }),
        { name: 'date-course-filters' },
    ),
);
export default useFilterStore;
