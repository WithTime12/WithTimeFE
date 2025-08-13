import type { TDateKeyword } from '@/types/dateCourse/dateCourse';

import KeywordButton from './keywordButton';

export default function DateKeyword<T>({ category, tags, setState, state }: TDateKeyword<T>) {
    const toggleItem = (item: string) => {
        if (setState) {
            const list: string[] = Array.isArray(state) ? state : [];
            const newState = list.includes(item) ? list.filter((v) => v !== item) : [...list, item];
            setState(newState as T);
        }
    };
    return (
        <div className="flex gap-[40px] p-[24px] w-full flex-col">
            <div className="font-heading3 text-default-gray-700">#{category}</div>
            <div className="flex w-full flex-wrap gap-[16px] sm:justify-start justify-center">
                {tags.map((tag) => {
                    return (
                        <KeywordButton
                            selected={Array.isArray(state) && state.includes(tag.code)}
                            isButton={true}
                            key={tag.id}
                            tag={tag.label}
                            onClick={() => {
                                toggleItem(tag.code);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
