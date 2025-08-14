import { useCoreQuery } from '@/hooks/customQuery';

import { getPrecipitation, getWeeklyWeatherRecommendation } from '@/api/home/weather';
import { homeKeys } from '@/queryKey/queryKey';

// 주간 날씨 추천 훅
export const useWeatherForecast = ({ startDate, regionId }: { startDate: string; regionId: number }) => {
    return useCoreQuery(homeKeys.weather(startDate, regionId).queryKey, () => getWeeklyWeatherRecommendation({ startDate, regionId }), {
        staleTime: 1000 * 60 * 30,
        enabled: !!startDate && !!regionId,
    });
};

export const useRainyInfo = ({ startDate, regionId }: { startDate: string; regionId: number }) => {
    return useCoreQuery(homeKeys.rainyInfo(startDate, regionId).queryKey, () => getPrecipitation({ startDate, regionId }), {
        staleTime: 1000 * 60 * 30,
        enabled: !!startDate && !!regionId,
    });
};
