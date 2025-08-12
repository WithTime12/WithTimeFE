export enum WeatherType {
    CLEAR = 'CLEAR', // 맑고
    CLOUDY = 'CLOUDY', // 흐리고
    RAINY = 'RAINY', // 비오고
    SNOWY = 'SNOWY', // 눈오고
    RAIN_SNOW = 'RAIN_SNOW', // 비/눈오는
    SHOWER = 'SHOWER', // 소나기
}

export const WeatherTypeLabel: Record<WeatherType, string> = {
    [WeatherType.CLEAR]: '맑고',
    [WeatherType.CLOUDY]: '흐리고',
    [WeatherType.RAINY]: '비오고',
    [WeatherType.SNOWY]: '눈오는',
    [WeatherType.RAIN_SNOW]: '비/눈오는',
    [WeatherType.SHOWER]: '소나기오는',
};

export enum TempCategory {
    CHILLY = 'CHILLY', // 쌀쌀한 날씨
    COOL = 'COOL', // 선선한 날씨
    MILD = 'MILD', // 무난한 날씨
    HOT = 'HOT', // 무더운 날씨
}

export const TempCategoryLabel: Record<TempCategory, string> = {
    [TempCategory.CHILLY]: '쌀쌀한 날씨',
    [TempCategory.COOL]: '선선한 날씨',
    [TempCategory.MILD]: '무난한 날씨',
    [TempCategory.HOT]: '무더운 날씨',
};
