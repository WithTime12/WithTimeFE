import type { Dispatch, SetStateAction } from 'react';

import KeywordButton from './keywordButton';

type TTag = {
    id: number;
    label: string;
    code: string;
};

type TTags = TTag[];

type TDateKeyword<T> = {
    state?: T;
    setState?: Dispatch<SetStateAction<T>>;
    category: string;
    tags: TTags;
};

export default function DateKeyword<T>({ category, tags, setState, state }: TDateKeyword<T>) {
    const toggleItem = (item: string) => {
        if (setState) {
            setState((prev) => {
                const list: string[] = Array.isArray(prev) ? prev : [];
                return list.includes(item) ? (list.filter((v) => v !== item) as T) : ([...list, item] as T);
            });
        }
    };
    return (
        <div className="flex gap-[40px] p-[24px] w-full flex-col">
            <div className="font-heading2 text-default-gray-700">#{category}</div>
            <div className="flex w-full flex-wrap gap-[16px] sm:justify-start justify-center">
                {tags.map((tag) => {
                    return (
                        <KeywordButton
                            selected={Array.isArray(state) && state.includes(tag.label)}
                            isButton={true}
                            key={tag.id}
                            tag={tag.label}
                            onClick={() => {
                                toggleItem(tag.label);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
