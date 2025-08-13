import React, { useState } from 'react';

import { useSearchRegion } from '@/hooks/course/useSearchRegion';
import { useUserRegion } from '@/hooks/home/useUserRegion';

import EditableInputBox from '@/components/common/EditableInputBox';
import Modal from '@/components/common/modal';

import { queryClient } from '@/api/queryClient';
import { HomeKeys } from '@/queryKey/queryKey';

interface IRegionModalProps {
    onClose: () => void;
}

function RegionModal({ onClose }: IRegionModalProps) {
    const [searchQuery, setSearchQuery] = useState(''); // 검색어
    const [showResults, setShowResults] = useState(false); // 검색 결과 표시 여부
    const { mutate: patchUserRegionMutate } = useUserRegion();
    const { data: regionList, refetch } = useSearchRegion({ keyword: searchQuery }, { enabled: false });

    const handleRegionSelect = (regionId: number) => {
        patchUserRegionMutate(
            {
                regionId: regionId,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: HomeKeys.userRegion().queryKey });
                    onClose();
                },
            },
        );
    };

    const handleSearch = () => {
        const keyword = searchQuery.trim();
        if (!keyword) return;
        refetch();
        setShowResults(true);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Modal onClose={onClose} title="현재 장소">
            <div className="flex flex-col w-[80vw] max-w-[500px] overflow-hidden max-h-[500px]">
                {/* 검색바 */}
                <div className="p-6 flex">
                    <div className="flex w-full">
                        <EditableInputBox
                            onSearchClick={handleSearch}
                            value={searchQuery}
                            placeholder="Ex: 서울시 강남구"
                            onChange={handleInputChange}
                            mode="search"
                            className="!w-full"
                        />
                    </div>
                </div>
                {/* 검색 결과 리스트 */}
                {showResults && (
                    <div className="px-6 pb-6 w-full h-full flex flex-col">
                        <ul className="border-t border-default-gray-400 flex flex-col w-full overflow-y-auto " role="listbox" aria-label="검색된 지역 목록">
                            {regionList?.result.regions.length === 0 && <div className="text-center py-8 text-default-gray-500">검색 결과가 없습니다</div>}
                            {regionList?.result.regions.map((region, index) => (
                                <li key={region.regionId}>
                                    <button
                                        type="button"
                                        onClick={() => handleRegionSelect(region.regionId)}
                                        className={`w-full text-left py-3 px-4 hover:bg-primary-100 transition-colors`}
                                    >
                                        <div className="font-medium">{region.name}</div>
                                    </button>
                                    {index < regionList.result.regions.length - 1 && <div className="border-b border-default-gray-400" />}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default RegionModal;
