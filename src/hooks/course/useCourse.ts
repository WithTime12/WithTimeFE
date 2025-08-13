import { useCoreMutation } from '../customQuery';

import { postDateCourse } from '@/api/course/course';

export const useCourse = () => {
    const useMakeCourse = useCoreMutation(postDateCourse);
    return { useMakeCourse };
};
