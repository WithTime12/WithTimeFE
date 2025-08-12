import ChevronDown from '@/assets/icons/default_arrows/chevron_down.svg?react';

interface IFaqItemProps {
    item: {
        faqId: number;
        title: string;
        content: string;
        categoryLabel?: string;
    };
    isOpen: boolean;
    onToggle: () => void;
}

export default function FAQItem({ item, isOpen, onToggle }: IFaqItemProps) {
    const contentId = `faq-answer-${item.faqId}`;

    return (
        <li className="py-4">
            <button type="button" onClick={onToggle} className="flex w-full items-center gap-4 text-left" aria-expanded={isOpen} aria-controls={contentId}>
                {item.categoryLabel && (
                    <span className="px-3 py-2 font-body2 rounded-full bg-primary-100 text-default-gray-700 whitespace-nowrap">{item.categoryLabel}</span>
                )}
                <span className="font-body2 text-default-gray-800 flex-1">Q. {item.title}</span>
                <ChevronDown
                    className={`shrink-0 stroke-current text-primary-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    aria-hidden
                />
            </button>

            <section
                id={contentId}
                role="region"
                aria-hidden={!isOpen}
                className={`ml-0 sm:ml-9 overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-4 py-3 rounded-md leading-relaxed whitespace-pre-line text-default-gray-700 font-body2 bg-white/50">{item.content}</div>
            </section>
        </li>
    );
}
