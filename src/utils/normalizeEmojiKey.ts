export function normalizeEmojiKey(k?: string) {
    if (!k) return '';
    return k
        .normalize('NFKD')
        .replace(/\uFE0F/g, '') // VS-16 (emoji variation selector)
        .replace(/\u200D/g, '') // zero width joiner
        .replace(/\p{Mn}|\p{Me}|\p{Mc}/gu, '') // 결합표식 제거(유니코드 카테고리)
        .trim()
        .toLowerCase();
}
