export function getNextSevenDay(startDate: string): string[] {
    const result: string[] = [];
    const start = new Date(startDate);

    for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const label = date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

        result.push(label);
    }

    return result;
}
