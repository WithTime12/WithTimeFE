import { useCoreMutation } from '../customQuery';

import { postDeviceToken } from '@/api/alarm/alarm';

export function useFirebase() {
    const postDeviceTokenMutation = useCoreMutation(postDeviceToken);
    return { postDeviceTokenMutation };
}
