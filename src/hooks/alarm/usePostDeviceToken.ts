import { useCoreMutation } from '../customQuery';

import { postDeviceToken } from '@/api/alarm/alarm';

export function useFirebase() {
    const usePostDeviceToken = useCoreMutation(postDeviceToken);
    return { usePostDeviceToken };
}
