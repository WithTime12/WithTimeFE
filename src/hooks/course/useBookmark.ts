import { useCoreMutation } from '../customQuery';

import { deleteBookmark, postBookmark, postMakeBookmark } from '@/api/course/course';

export default function useBookmark() {
    const usePostBookmark = useCoreMutation(postBookmark);
    const usePostMakeBookmark = useCoreMutation(postMakeBookmark);
    const useDeleteBookmark = useCoreMutation(deleteBookmark);
    return { usePostBookmark, usePostMakeBookmark, useDeleteBookmark };
}
