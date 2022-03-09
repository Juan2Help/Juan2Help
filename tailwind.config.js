module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],

    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#7e22ce',
                    secondary: '#ec4899',
                    accent: '#1FB2A6',
                    neutral: '#191D24',
                    'base-100': '#F1F5F9',
                    info: '#3ABFF8',
                    success: '#36D399',
                    warning: '#FBBD23',
                    error: '#f43f5e',
                },
            },
        ],
    },
};
