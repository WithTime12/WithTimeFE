export function getNextSevenDay(startDate: string) {
    const result = [];
    const start = new Date(startDate);

    for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);

        // // YYYY-MM-DD
        // const yyyy = date.getFullYear();
        // const mm = String(date.getMonth() + 1).padStart(2, '0');
        // const dd = String(date.getDate()).padStart(2, '0');

        // 한국어 표기 (예: 8월 12일)
        const label = `${date.getMonth() + 1}월 ${date.getDate()}일`;

        result.push(label);
    }

    return result;
}
