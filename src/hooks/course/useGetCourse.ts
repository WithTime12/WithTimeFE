import type { TCourseFilter } from '@/types/dateCourse/dateCourse';

import { useCoreQuery } from '../customQuery';

import { getDateCourse } from '@/api/course/course';
import { dateCourseKeys } from '@/queryKey/queryKey';

type TUseGetCourseProps = TCourseFilter & {
    size: number;
    page: number;
};
export default function useGetCourse({
    budget,
    datePlaces,
    mealTypes,
    dateDurationTime,
    transportation,
    userPreferredKeywords,
    startTime,
    size,
    page,
}: TUseGetCourseProps) {
    return useCoreQuery(
        dateCourseKeys.getDateCourse({ budget, datePlaces, mealTypes, dateDurationTime, transportation, userPreferredKeywords, startTime, size, page })
            .queryKey,
        () => getDateCourse({ budget, datePlaces, mealTypes, dateDurationTime, transportation, userPreferredKeywords, startTime, size, page }),
    );
}
