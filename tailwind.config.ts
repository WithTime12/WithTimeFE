// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary_main: '#7FE5C1',
                primary_green: '#080C52',
                primary_yellow: '#FDFA91',
                primary_lightblue: '#E7F7FF',
                primary_blue: '#005880',
                default_gray: {
                    100: '#FEFEFE',
                    200: '#FAFAFA',
                    300: '#F4F6F8',
                    400: '#E6E6E6',
                    500: '#C3C3C3',
                    600: '#919191',
                    700: '#616161',
                    800: '#212121',
                },
                danger: '#FF517C',
            },
        },
    },
    plugins: [],
};

export default config;
