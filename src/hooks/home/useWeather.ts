import { getPrecipitation, getWeeklyWeatherRecommendation } from '../../api/home/weather';
import { useCoreQuery } from '../customQuery';

import { HomeKeys } from '@/queryKey/queryKey';

// 주간 날씨 추천 훅
export const useWeatherForecast = ({ startDate, regionId }: { startDate: string; regionId: number }) => {
    return useCoreQuery(HomeKeys.weather(startDate, regionId).queryKey, () => getWeeklyWeatherRecommendation({ startDate, regionId: regionId! }), {
        staleTime: 1000 * 60 * 30,
        enabled: !!startDate && !!regionId,
    });
};

export const useRainyInfo = ({ startDate, regionId }: { startDate: string; regionId: number }) => {
    return useCoreQuery(HomeKeys.rainyInfo(startDate, regionId).queryKey, () => getPrecipitation({ startDate, regionId: regionId! }), {
        staleTime: 1000 * 60 * 30,
        enabled: !!startDate && !!regionId,
    });
};
