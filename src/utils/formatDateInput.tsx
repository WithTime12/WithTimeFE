export default function formatDateInput(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 8); // 숫자만, 8자리 제한

    if (digits.length <= 4) {
        return digits; // 연도까지만
    } else if (digits.length <= 6) {
        return `${digits.slice(0, 4)}.${digits.slice(4)}`; // 연도.월
    } else {
        return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`; // 연도.월.일
    }
}
