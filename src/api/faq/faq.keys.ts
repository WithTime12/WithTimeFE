export const faqKeys = {
    all: ['faqs'] as const,
    list: (p: { category: string; page: number; size: number }) => [...faqKeys.all, 'list', p] as const,
    search: (p: { keyword: string; category?: string; page: number; size: number }) => [...faqKeys.all, 'search', p] as const,
};
