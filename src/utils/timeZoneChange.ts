export function toKSTISOString(date: Date, withOffset = false) {
    const pad = (n: number) => String(n).padStart(2, '0');

    // 현재 로컬 시간이 UTC+9인지 보장하기 위해 UTC 기준에서 9시간 더해줌
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    const result =
        kstDate.getFullYear() +
        '-' +
        pad(kstDate.getMonth() + 1) +
        '-' +
        pad(kstDate.getDate()) +
        'T' +
        pad(kstDate.getHours()) +
        ':' +
        pad(kstDate.getMinutes()) +
        ':' +
        pad(kstDate.getSeconds()) +
        '.' +
        String(kstDate.getMilliseconds()).padStart(3, '0');

    // withOffset = true → "+09:00" 붙이기
    return withOffset ? `${result}+09:00` : result;
}
