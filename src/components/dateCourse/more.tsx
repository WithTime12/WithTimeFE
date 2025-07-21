import cx from 'clsx';

import Bin from '@/assets/icons/Bin_Blank.svg?react';
// import Edit from '@/assets/icons/Edit_Blank.svg?react';

export default function MoreOption({ className }: { className: string }) {
    return (
        <div className={cx(className, 'flex border-[1px] rounded-[4px] bg-white flex-col min-w-[80px] border-default-gray-700 w-fit')}>
            {/* <div className="flex gap-[8px] px-[8px] py-[4px] rounded-t-[4px] hover:cursor-pointer">
                <Edit stroke="#616161" />
                <span className="text-default-gray-700 font-[12px] flex-nowrap select-none">편집</span>
            </div> */}
            {/* <div className="border-[0.5px] border-default-gray-700 w-full h-[1px]" /> */}
            <div className="flex gap-[8px] px-[8px] py-[4px] rounded-b-[4px] hover:cursor-pointer">
                <Bin stroke="#616161" />
                <span className="text-default-gray-700 font-[12px] select-none">삭제</span>
            </div>
        </div>
    );
}
