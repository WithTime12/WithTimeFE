export function normalizeEmojiKey(k?: string): string {
    if (!k) return '';
    return k
        .normalize('NFKD')
        .replace(/[\uFE0E\uFE0F\u200D]/g, '')
        .replace(/\p{M}/gu, '')
        .trim()
        .toLowerCase();
}
