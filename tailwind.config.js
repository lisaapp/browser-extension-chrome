/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#FFC35D',
                    default: '#F5A00D',
                    dark: '#E88011',
                    darkest: '#E88011'
                },
                secondary: {
                    light: '#D5C9B9',
                    default: '#AB987F',
                    dark: '#846E52',
                    darkest: '#745E42'
                },
                grayscale: {
                    light: '#BDC5CE',
                    default: '#56677A',
                    dark: '#434F5D',
                    darkest: '#202831'
                },
                link: {
                    light: '#EEF5FD',
                    default: '#4A97E4',
                    dark: '#1F72C4',
                    darkest: '#12508D'
                },
                teal: {
                    light: '#E5FAF9',
                    default: '#02C2BD',
                    dark: '#147C79',
                    darkest: '#0E605C'
                },
                success: {
                    light: '#E8F8F0',
                    default: '#4CBB88',
                    dark: '#1D7E51',
                    darkest: '#0F5937'
                },
                warning: {
                    light: '#FFF7D9',
                    default: '#F5C006',
                    dark: '#884D17',
                    darkest: '#66310B'
                },
                danger: {
                    light: '#FCE9E3',
                    default: '#EC7D59',
                    dark: '#BF4119',
                    darkest: '#983414'
                },
                // Web UIKit
                sunny: {
                    100: '#FFFDF8',
                    200: '#FDEFD7',
                    300: '#FCE2B4',
                    400: '#FFC35D',
                    500: '#F5A00D',
                    600: '#E88011',
                    700: '#B25E05'
                },
                purple: {
                    100: '#F2F3F9',
                    400: '#ADADF3',
                    500: '#6C66B9',
                    600: '#433A83'
                },
                blue: {
                    100: '#EDF9FE',
                    400: '#4A97E4',
                    500: '#1F72C4',
                    600: '#12508D'
                },
                turquoise: {
                    100: '#E5FAF9',
                    400: '#02C2BD',
                    500: '#147C79',
                    600: '#0E605C'
                },
                green: {
                    100: '#DCF4D2',
                    400: '#6DBB4C',
                    500: '#3A7E1D',
                    600: '#25590F'
                },
                salmon: {
                    100: '#FCE9E3',
                    400: '#EC7D59',
                    500: '#BF4119',
                    600: '#983414'
                },
                amber: {
                    100: '#FFF7D9',
                    400: '#F5C006',
                    500: '#884D17',
                    600: '#66310B'
                },
                gray: {
                    100: '#F7FAFC',
                    200: '#EDF2F7',
                    300: '#E2E8F0',
                    400: '#CBD5E0',
                    500: '#A0AEC0',
                    600: '#718096',
                    700: '#4A5568',
                    800: '#2D3748',
                    900: '#1A202C'
                },
                brass: {
                    100: '#F9F8F5',
                    200: '#D5C9B9',
                    300: '#AB987F',
                    400: '#846E52',
                    500: '#745E42',
                    600: '#574732',
                    700: '#403425'
                }
            }
        }
    },
    plugins: []
};
