import React from 'react';

type TMainCardProps = {
    children: React.ReactNode;
};
export default function MainCard({ children }: TMainCardProps) {
    return <div className={'bg-default-gray-100 rounded-2xl shadow-black items-center justify-center flex flex-col h-full w-full'}>{children}</div>;
}
