import type { TCommonResponse } from '../common/common';

export interface IDateTestQuestion {
    question: string;
    firstAnswer: string;
    secondAnswer: string;
}

export default interface IDateTestResult {
    aPercentage: number;
    bPercentage: number;
    cPercentage: number;
    dPercentage: number;
    typeDescription: {
        symbolicAnimal: string;
        preferenceType: string;
        simpleDescription: string;
        analysis: string;
    };
    partTypeDescriptions: {
        types: {
            typeInitial: string;
            typeEng: string;
            type: string;
            description: string;
        }[];
        size: number;
    };
}

export interface IRelationTypeResult {
    bestType: string;
    bestReason: string;
    worstType: string;
    worstReason: string;
    bestTypeDescription: {
        symbolicAnimal: string;
        preferenceType: string;
        simpleDescription: string;
        analysis: string;
    };
    worstTypeDescription: {
        symbolicAnimal: string;
        preferenceType: string;
        simpleDescription: string;
        analysis: string;
    };
}

export type TDateTestQuestion = TCommonResponse<{
    questions: IDateTestQuestion[];
    size: number;
}>;
export type TDateTestResultResponse = TCommonResponse<IDateTestResult>;
export type TRelationTypeResponse = TCommonResponse<IRelationTypeResult>;
