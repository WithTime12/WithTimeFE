import { useCoreMutation } from '../customQuery';

import { deleteBookmark, postBookmark } from '@/api/course/course';

export default function useBookmark() {
    const usePostBookmark = useCoreMutation(postBookmark);
    const useDeleteBookmark = useCoreMutation(deleteBookmark);
    return { usePostBookmark, useDeleteBookmark };
}
