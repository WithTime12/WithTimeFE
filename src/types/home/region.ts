import type { TCommonResponse } from '../common/common';

export type TPatchUserRegionRequest = {
    regionId: number;
};

export type TPatchUserRegionResponse = TCommonResponse<{
    regionId: number;
    name: string;
    regionCode: TRegionCode;
    message: string;
}>;

type TRegionCode = {
    regionCodeId: number;
    landRegCode: string;
    tempRegCode: string;
    name: string;
};

export type TGetUserRegionResponse = TCommonResponse<{
    regionId: number;
    name: string;
    latitude: number;
    longitude: number;
    gridX: number;
    gridY: number;
    regionCode: TRegionCode;
}>;
