import { type Dispatch, type SetStateAction, useState } from 'react';

import DATE_KEYWORD from '@/constants/dateKeywords';

import DateCourseOptionButton from './dateCourseOptionButton';
import DateKeyword from './dateKeyword';
import PlaceButton from './placeButton';

type TDateCourseSearchFilterOption<T> = {
    options?: string[];
    state?: T;
    setState?: Dispatch<SetStateAction<T>>;
    title: string;
    subTitle?: string;
    type: 'choice' | 'search' | 'time' | 'choices' | 'keyword';
};

export default function DateCourseSearchFilterOption<T>({ options, type, state, setState, title, subTitle }: TDateCourseSearchFilterOption<T>) {
    const handleDeletePlaceOption = (value: string) => {
        if (Array.isArray(state) && setState) {
            const updated = state.filter((item) => item !== value);
            setState(updated as T);
        }
    };
    const [inputValue, setInputValue] = useState('');
    return (
        <div className="flex w-full gap-[24px] flex-col">
            <div className={'flex w-full font-heading2 text-default-gray-700 sm:flex-row flex-col gap-[8px] sm:items-center'}>
                <div className="flex flex-nowrap">{title}</div>
                <span className="text-default-gray-700 font-heading3 flex">{subTitle}</span>
            </div>
            <div className="flex w-full gap-[16px] flex-wrap sm:justify-start justify-center">
                {type == 'choice' &&
                    options?.map((option, idx) => {
                        return (
                            <DateCourseOptionButton
                                key={idx}
                                option={option}
                                isSelected={state == option ? true : false}
                                onClick={() => setState && setState(() => option as T)}
                            />
                        );
                    })}
                {type === 'search' && (
                    <div className="flex flex-col w-full">
                        <div className="flex justify-center items-center gap-4 w-full">
                            <input
                                type="text"
                                className="w-[90%] border-[1px] border-primary-500 py-2 rounding-32"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button
                                className="flex flex-nowrap bg-primary-300 px-4 rounding-16 py-1"
                                onClick={() => {
                                    if (!setState || inputValue.trim() === '') return;
                                    setState((prev) => {
                                        const list = Array.isArray(prev) ? prev : ([] as string[]);
                                        // 이미 존재하면 추가하지 않음
                                        if (list.includes(inputValue)) return prev;
                                        return [...list, inputValue] as T;
                                    });
                                    setInputValue('');
                                }}
                            >
                                추가
                            </button>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {Array.isArray(state) &&
                                state.map((place, idx) => <PlaceButton key={idx} placeName={place} onClick={() => handleDeletePlaceOption(place)} />)}
                        </div>
                    </div>
                )}
                {type === 'choices' &&
                    options?.map((option, idx) => {
                        const isSelected = Array.isArray(state) && state.includes(option);
                        return (
                            <DateCourseOptionButton
                                key={idx}
                                option={option}
                                isSelected={isSelected}
                                onClick={() => {
                                    if (!setState) return;
                                    setState((prev) => {
                                        const list = Array.isArray(prev) ? prev : ([] as string[]);
                                        return list.includes(option) ? (list.filter((item) => item !== option) as T) : ([...list, option] as T);
                                    });
                                }}
                            />
                        );
                    })}

                {type === 'keyword' && (
                    <div className="flex w-full flex-col md:px-[16px] gap-[64px]">
                        {Object.entries(DATE_KEYWORD).map(([category, keywords]) => (
                            <div key={category} className="flex flex-wrap gap-2 self-center min-w-[260px] shadow-default rounding-16">
                                <DateKeyword category={category} tags={keywords} setState={setState} state={state} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
