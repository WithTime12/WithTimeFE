import { useCoreMutation } from '../customQuery';

import { patchUserRegion } from '@/api/home/region';

export default function useUserRegion() {
    const usePatchUserRegion = useCoreMutation(patchUserRegion);
    return { usePatchUserRegion };
}
