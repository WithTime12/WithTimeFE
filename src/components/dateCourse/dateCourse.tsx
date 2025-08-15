import { useEffect, useRef, useState } from 'react';

import type { TDateCourse, TDateCourseSearchCondInfo } from '@/types/dateCourse/dateCourse';

import useBookmark from '@/hooks/course/useBookmark';

import Info from './info';
import Timeline from './timeline';
import DeleteBookmarkModal from '../modal/deleteBookmarkModal';

import BookmarkBlank from '@/assets/icons/Bookmark_Blank.svg?react';
import BookmarkFill from '@/assets/icons/Bookmark_Fill.svg?react';
import KeyboardArrowDown from '@/assets/icons/keyboard_arrow_down_False.svg?react';

type TDateCourseProps = TDateCourse & {
    defaultOpen?: boolean;
    isBookmarked: boolean | null;
    signature: string;
    make?: boolean;
    dateCourseSearchCondInfo: TDateCourseSearchCondInfo;
};

function DateCourse({ defaultOpen = false, name, make, dateCourseId, isBookmarked, datePlaces, dateCourseSearchCondInfo }: TDateCourseProps) {
    const [open, setOpen] = useState(defaultOpen || false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [bookmarked, setBookmarked] = useState<boolean | null>(isBookmarked);
    const [dateCourseID, setDateCourseID] = useState<number | undefined>(dateCourseId);
    const moreRef = useRef<HTMLDivElement>(null);
    const { usePostBookmark, usePostMakeBookmark } = useBookmark();
    const { mutate: postBookmark } = usePostBookmark;
    const { mutate: postMakeBookmark } = usePostMakeBookmark;
    const ids = (datePlaces ?? []).map((p) => p.datePlaceId);

    useEffect(() => {
        setBookmarked(isBookmarked);
        setDateCourseID(dateCourseId);
    }, [isBookmarked, dateCourseId]);

    const clickBookmark = () => {
        if (bookmarked) {
            setOpenModal(true);
        } else if (make === true) {
            postMakeBookmark(
                {
                    datePlaceIds: ids,
                    name: name,
                },
                {
                    onSuccess: (response) => {
                        setDateCourseID(response.result.dateCourseId);
                        setBookmarked(true);
                    },
                    onError: () => {
                        console.error('북마크 도중 에러가 발생하였습니다.');
                    },
                },
            );
        } else {
            if (dateCourseID == null) {
                console.error('dateCourseId가 없어 북마크를 생성할 수 없습니다');
                return;
            }
            postBookmark({
                dateCourseId: dateCourseID!,
            });
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openEdit && moreRef.current && !moreRef.current.contains(event.target as Node)) {
                setOpenEdit(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openEdit]);
    const lastEndTime = datePlaces[datePlaces.length - 1]?.endTime;

    return (
        <div className="flex flex-col h-fit w-full min-w-[250px] self-center rounding-32 border-b-[1px] border-r-[1px] border-l-[1px] border-primary-700 bg-default-gray-100">
            <div
                className={`w-full rounding-32 flex border-primary-700 px-[24px] py-[16px] bg-default-gray-100 shadow-default 
                    ${open ? 'border-[1px]' : 'border-t-[1px]'}
                `}
            >
                <div className="flex w-full justify-between items-center">
                    <div className="flex items-center hover:cursor-pointer" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowDown /> : <KeyboardArrowDown className="rotate-270" />}

                        <div className="text-default-gray-800 gap-[4px] select-none flex flex-col sm:flex-row pl-[4px]">
                            <span>{name}</span>
                            <span>데이트 코스</span>
                        </div>
                    </div>
                    <div className="flex">
                        {bookmarked ? (
                            <BookmarkFill fill="#4b4b4b" className="hover:cursor-pointer" onClick={clickBookmark} />
                        ) : (
                            <BookmarkBlank stroke="#212121" className="hover:cursor-pointer" onClick={clickBookmark} />
                        )}
                    </div>
                </div>
            </div>

            {open && (
                <div className="w-full flex h-fit bg-default-gray-100 rounding-32 justify-center items-start self-stretch">
                    <div className="w-full lg:px-[48px] px-[24px] py-[40px] gap-[48px] flex justify-between h-fit lg:flex-row flex-col">
                        <div className="flex flex-col lg:w-[60%] gap-[16px]">
                            {datePlaces.map((place, idx) => {
                                return <Timeline key={idx} time={place.startTime} {...place} />;
                            })}
                            <Timeline end={true} time={lastEndTime} />
                        </div>
                        <div className="border-[0.5px] border-default-gray-700 w-full lg:w-[1px]" />
                        <div className="flex flex-col lg:w-[50%]">
                            <Info
                                cashTag={dateCourseSearchCondInfo?.budget}
                                locationTag={dateCourseSearchCondInfo?.datePlaces}
                                timeTag={dateCourseSearchCondInfo?.dateDurationTime}
                                MealTag={dateCourseSearchCondInfo?.mealTypes}
                                keywordTags={dateCourseSearchCondInfo?.userPreferredKeywords}
                            />
                        </div>
                    </div>
                </div>
            )}
            {openModal && (
                <DeleteBookmarkModal
                    dateCourseId={dateCourseID!}
                    onClose={() => {
                        setOpenModal(false);
                    }}
                    changeState={(state: boolean) => {
                        setBookmarked(state);
                    }}
                    isOpen={openModal}
                />
            )}
        </div>
    );
}

export default DateCourse;
