import { useCoreQuery } from '../customQuery';

import { searchRegion } from '@/api/course/course';

export function useSearchRegion({ keyword }: { keyword: string }) {
    return useCoreQuery(['searchRegion', keyword], () => searchRegion({ keyword }), {
        enabled: !!keyword,
    });
}
