import React, { useEffect, useMemo, useRef, useState } from 'react';

import type { TDateCourseSearchFilterOption, TRegion } from '@/types/dateCourse/dateCourse';
import DATE_KEYWORD from '@/constants/dateKeywords';

import { useSearchRegion } from '@/hooks/course/useSearchRegion';

import DateCourseOptionButton from './dateCourseOptionButton';
import DateKeyword from './dateKeyword';
import PlaceButton from './placeButton';
import EditableInputBox from '../common/EditableInputBox';

import Calendar from '@/assets/icons/calendar_Blank.svg?react';

export default function DateCourseSearchFilterOption({
    options,
    apiRequestValue,
    type,
    value,
    onChange,
    title,
    subTitle,
    errorMessage,
    autoInit,
}: TDateCourseSearchFilterOption) {
    const now = new Date();

    const defaultDate = now.toISOString().split('T')[0]; // '2025-07-17'
    const defaultTime = now.toTimeString().slice(0, 5);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const timeInputRef = useRef<HTMLInputElement>(null);

    const [date, setDate] = useState(defaultDate);
    const [time, setTime] = useState(defaultTime);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (type === 'time' && autoInit && (value == null || value === '')) {
            onChange(`${date}T${time}`);
        }
    }, [type, autoInit, value]);

    const handleDateClick = () => {
        dateInputRef.current?.showPicker?.();
    };

    const handleTimeClick = () => {
        timeInputRef.current?.showPicker?.();
    };

    const handleDeletePlaceOption = (val: string) => {
        if (Array.isArray(value) && type === 'search') {
            onChange(value.filter((v) => v !== val));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };

    const { data: regionList, refetch } = useSearchRegion({ keyword: inputValue }, { enabled: false });

    const handleSearch = () => {
        const keyword = inputValue.trim();
        if (!keyword) return;
        refetch();
    };

    const items = useMemo(
        () =>
            options?.map((label, idx) => ({
                label,
                value: apiRequestValue && apiRequestValue[idx],
            })),
        [options, apiRequestValue],
    );

    return (
        <div className="flex w-full gap-[24px] flex-col h-fit">
            <div className="flex w-full text-default-gray-700 sm:flex-row flex-col gap-[8px] sm:items-center">
                <div className="flex flex-nowrap font-heading3">{title}</div>
                <span className="text-default-gray-700 font-heading3 flex">{subTitle}</span>
            </div>
            <div className="font-body3 text-warning">{errorMessage}</div>
            <div className="flex w-full gap-[16px] flex-wrap sm:justify-start justify-center">
                {type === 'choice' &&
                    items?.map(({ label, value: apiValue }, idx) => {
                        return (
                            <DateCourseOptionButton
                                key={idx}
                                option={label}
                                isSelected={value === apiValue}
                                onClick={() => {
                                    onChange(apiValue!);
                                }}
                            />
                        );
                    })}

                {type === 'choices' &&
                    items?.map(({ label, value: apiValue }, idx) => {
                        const current = Array.isArray(value) ? value : [];
                        const isSelected = current.includes(apiValue!);
                        return (
                            <DateCourseOptionButton
                                key={idx}
                                option={label}
                                isSelected={isSelected}
                                onClick={() => onChange(isSelected ? current.filter((v) => v !== apiValue) : [...current, apiValue!])}
                            />
                        );
                    })}

                {type === 'search' && (
                    <div className="flex flex-col w-full">
                        <div className="flex justify-center items-center gap-4 w-full relative">
                            <EditableInputBox
                                mode="search"
                                onSearchClick={handleSearch}
                                placeholder="ex: 서울시 강남구"
                                className="!w-full min-w-full"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </div>
                        {regionList && regionList.result.regions.length > 0 && (
                            <ul className="mt-2 w-full border border-primary-500 rounding-16 shadow-default bg-white max-h-[200px] overflow-auto">
                                {regionList.result.regions.map((region: TRegion, idx: number) => (
                                    <li
                                        key={idx}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-default-gray-800"
                                        onClick={() => {
                                            const current = Array.isArray(value) ? value : [];
                                            if (!current.includes(region.name)) {
                                                onChange([...current, region.name]);
                                            }
                                            setInputValue('');
                                        }}
                                    >
                                        {region.name}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                            {Array.isArray(value) && value.map((v, idx) => <PlaceButton key={idx} placeName={v} onClick={() => handleDeletePlaceOption(v)} />)}
                        </div>
                    </div>
                )}

                {type === 'keyword' && (
                    <div className="flex w-full flex-col md:px-[16px] gap-[64px]">
                        {Object.entries(DATE_KEYWORD).map(([category, keywords]) => (
                            <div key={category} className="flex flex-wrap gap-2 self-center max-w-[90%] w-[656px] min-w-[260px] shadow-default rounding-16">
                                <DateKeyword
                                    category={category}
                                    tags={keywords}
                                    setState={(val) => {
                                        if (val !== null && typeof val !== 'function') onChange(val);
                                    }}
                                    state={value}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {type === 'time' && (
                    <div className="flex flex-col gap-4 justify-center items-center w-full">
                        <div className="flex gap-3 items-center w-fit flex-nowrap sm:flex-nowrap rounding-32 border-[2px] border-primary-500 py-[16px] px-[32px]">
                            <div className="relative flex gap-[4px]" onClick={handleDateClick}>
                                <Calendar stroke="#000000" />
                                <div className="cursor-pointer font-heading3 text-default-gray-800 whitespace-nowrap">{date}</div>

                                <input
                                    ref={dateInputRef}
                                    type="date"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setDate(val);
                                        if (time) onChange(`${val}T${time}:00.000Z`);
                                    }}
                                    className="absolute top-0 left-0 w-full h-full opacity-0"
                                />
                            </div>
                            <div className="w-[1px] h-full border-[1px] border-default-gray-500" />
                            <div className="relative flex" onClick={handleTimeClick}>
                                <div className="cursor-pointer font-heading3 text-default-gray-800">{time || '시간 선택'}</div>
                                <input
                                    type="time"
                                    ref={timeInputRef}
                                    value={time}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setTime(val);
                                        if (date) onChange(`${date}T${val}:00.000Z`);
                                    }}
                                    className="absolute top-0 left-0 w-full h-full opacity-0"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
