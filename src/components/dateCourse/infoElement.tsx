import type { ReactElement } from 'react';

import KeywordButton from './keywordButton';

type TInfoElement = {
    children: ReactElement;
    title: string;
    tags: string[];
};
export default function InfoElement({ children, title, tags }: TInfoElement) {
    return (
        <div className="flex w-full gap-[16px] items-start">
            <div className="flex gap-[2px] items-center w-[83px] text-default-gray-800 font-body2">
                {children}
                {title}
            </div>
            <div className="flex flex-1 flex-wrap gap-[8px]">
                {tags.map((tag, idx) => {
                    return <KeywordButton tag={tag} key={idx} />;
                })}
            </div>
        </div>
    );
}
