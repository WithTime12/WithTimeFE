import React, { useMemo } from 'react';

import { useMontlyPlaceStates } from '@/hooks/home/useDatePlaceStates';

import MainCard from '@/components/home/mainCard';

function DateLocation() {
    const { data } = useMontlyPlaceStates();
    const maxCount = useMemo(() => {
        return data?.result?.datePlaceLogList?.reduce((max, cur) => Math.max(max, cur.count), 0) ?? 0;
    }, [data]);
    return (
        <MainCard>
            <div className="py-[28px] flex flex-col">
                <div className="text-xl font-bold text-[#616161] mb-6">WithTime에 등록된 데이트 장소 수</div>
                <div className="flex items-end gap-8 w-full justify-center">
                    {data?.result.datePlaceLogList.map((graph, idx) => {
                        // 비율 계산
                        const height = maxCount ? (graph.count / maxCount) * 200 : 0; // 최대 높이 200px 기준
                        return (
                            <div className="flex flex-col items-center" key={idx}>
                                <span className="text-xs text-default-gray-500 mb-1">{graph.count}</span>
                                <div
                                    className="w-10 bg-default-gray-400 mb-2 flex items-start justify-center transition-all duration-300"
                                    style={{ height: `${height}px` }}
                                />
                                <div className="text-default-gray-500 mt-1">{graph.month}월</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </MainCard>
    );
}
export default React.memo(DateLocation);
