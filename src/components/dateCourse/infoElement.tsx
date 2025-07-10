import type { ReactElement } from 'react';

import InfoTag from './infoTag';

type TInfoElement = {
    children: ReactElement;
    title: string;
    tags: string[];
};
export default function InfoElement({ children, title, tags }: TInfoElement) {
    return (
        <div className="flex w-full gap-[16px]">
            <div className="flex gap-[2px] items-center w-[83px] text-default-gray-800 font-body2">
                {children}
                {title}
            </div>
            <div className="flex">
                {tags.map((tag, idx) => {
                    return <InfoTag tag={tag} key={idx} />;
                })}
            </div>
        </div>
    );
}
