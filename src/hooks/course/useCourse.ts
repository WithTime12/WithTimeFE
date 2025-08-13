import { useCoreMutation } from '../customQuery';

import { getBookmarkedDateCourse, getDateCourse, postDateCourse } from '@/api/course/course';

export default function useCourse() {
    const useMakeCourse = useCoreMutation(postDateCourse);
    const useGetCourse = useCoreMutation(getDateCourse);
    const useGetBookmarkedCourse = useCoreMutation(getBookmarkedDateCourse);
    return { useMakeCourse, useGetBookmarkedCourse, useGetCourse };
}
