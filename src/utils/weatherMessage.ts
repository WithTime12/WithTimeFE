import type { TempCategory, WeatherType } from '@/constants/weather';
import { TempCategoryLabel, WeatherTypeLabel } from '@/constants/weather';

export function getWeatherSentence({ weather, temp }: { weather: WeatherType; temp: TempCategory }): string {
    const weatherLabel = WeatherTypeLabel[weather];
    const tempLabel = TempCategoryLabel[temp];
    return [weatherLabel, tempLabel].filter(Boolean).join(' ');
}
