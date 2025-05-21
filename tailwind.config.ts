// tailwind.config.ts
import type { Config } from 'tailwindcss';

// 아직 디자이너가 정의한 색상과 폰트 사이즈가 없어서 임의로 넣어두었습니다
const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                main: '#02112C',
                point: {
                    1: '#008080',
                    2: '#0D409D',
                },
                primary: {
                    50: '#DFE8F9',
                    100: '#B2C8EE',
                    // ...
                },
                error: {
                    50: '#FFF6F6',
                    100: '#FFEAEA',
                    // ...
                },
            },
            fontSize: {
                bold_28: ['28px', { lineHeight: '150%', letterSpacing: '0.56px' }],
                bold_24: ['24px', { lineHeight: '150%', letterSpacing: '0.48px' }],
                // ...
            },
            boxShadow: {
                shadow_1: '0px 2px 4px rgba(0, 0, 0, 0.20)',
                shadow_2: '0px 1px 10px rgba(0, 0, 0, 0.10)',
            },
        },
    },
    plugins: [],
};

export default config;
