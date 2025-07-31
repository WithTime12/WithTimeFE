import { useCoreMutation } from '../customQuery';

import { searchRegion } from '@/api/course/course';

export function useCourse() {
    const useSearchRegion = useCoreMutation(searchRegion);
    return { useSearchRegion };
}
