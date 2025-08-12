import type { TempCategory, WeatherType } from '@/constants/weather';
import { TempCategoryLabel, WeatherTypeLabel } from '@/constants/weather';

export function getWeatherSentence({ weather, temp }: { weather: WeatherType; temp: TempCategory }): string {
    return `${WeatherTypeLabel[weather]} ${TempCategoryLabel[temp]}`;
}
