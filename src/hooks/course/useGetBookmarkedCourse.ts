import type { TCourseFilter } from '@/types/dateCourse/dateCourse';

import { useCoreQuery } from '../customQuery';

import { getBookmarkedDateCourse } from '@/api/course/course';
import { dateCourseKeys } from '@/queryKey/queryKey';

type TUseGetBookmarkedCourseProps = TCourseFilter & {
    size: number;
    page: number;
    isBookmarked: boolean;
};
export default function useGetBookmarkedCourse({
    budget,
    datePlaces,
    mealTypes,
    dateDurationTime,
    transportation,
    userPreferredKeywords,
    startTime,
    size,
    page,
    isBookmarked,
}: TUseGetBookmarkedCourseProps) {
    return useCoreQuery(
        dateCourseKeys.getBookmarkedDateCourse({
            budget,
            datePlaces,
            mealTypes,
            dateDurationTime,
            transportation,
            userPreferredKeywords,
            startTime,
            size,
            page,
        }).queryKey,
        () =>
            getBookmarkedDateCourse({
                budget,
                datePlaces,
                mealTypes,
                dateDurationTime,
                transportation,
                userPreferredKeywords,
                startTime,
                size,
                page,
            }),
        {
            enabled: isBookmarked,
        },
    );
}
