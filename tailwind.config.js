const colors = require('tailwindcss/colors')
module.exports = {
    content: [
        './resources/views/**/*.blade.php',
        'resources/js/**/*.js',
        './resources/**/*.blade.php',
        'resources/js/**/*.js',
        './storage/framework/views/*.php',
    ],
    safelist: [
        {
            pattern: /(bg|text|fill|border)-(pink|blue|amber|cyan|corn|hippie-blue)-(50|100|200|300|400|500|600|700|800|900)/,
            variants: ['lg', 'hover', 'focus', 'lg:hover'],
        },
    ],
    theme: {
        extend: {
            screens: {
                print: { raw: 'print' },
            },
            colors: {
                'hippie-blue': {
                    300: '#b4d4db',
                    400: '#7bb4c1',
                    500: '#4394a6',
                    600: '#3c8595',
                    800: '#285964',
                    900: '#304b52',
                },
                red: {
                    900: '#d7161f',
                },
                green: {
                    900: '#078231',
                    950: '#25d366',
                },
                yellow: {
                    400: '#FBBF24',
                },
                'corn': {
                    '50': '#fefcf2',
                    '100': '#fcf9e6',
                    '200': '#f8f0c0',
                    '300': '#f4e69a',
                    '400': '#ebd44e',
                    '500': '#e3c102',
                    '600': '#ccae02',
                    '700': '#aa9102',
                    '800': '#887401',
                    '900': '#6f5f01'
                }
            },
        },
        fontFamily: {
            // 'HelveticaNeueME_1': ['HelveticaNeueME_1', 'sans-serif'],
            // 'GESSTwoBold': ['GESSTwoBold', 'sans-serif'],
            GESSTwoMedium: ['GESSTwoMedium', 'sans-serif'],
            // 'DroidArabicKufi': ['DroidArabicKufi', 'sans-serif'],
            // 'droid-bold': ['DroidArabicKufi-bold', 'sans-serif'],
            // 'Tajawal-Light': ['Tajawal-Light', 'sans-serif'],
            'Tajawal-Medium': ['Tajawal-Medium', 'sans-serif'],
            // 'AR-Almarai-Font': ['AR-Almarai-Font', 'sans-serif'],
            // 'AR-BBC-Regular' : ['AR-BBC-Regular', 'sans-serif'],
            // 'AR-Almarai-Font' : ['AR-Almarai-Font', 'sans-serif'],
            // 'AlMohanad': ['AlMohanad', 'sans-serif'],
            // 'Ar-Ith': ['Ar-Ith', 'sans-serif'],
            // 'bein-ar-black_zzbzbbedb0': ['bein-ar-black_0', 'sans-serif'],
        },
        colors: {
            transparent: 'transparent',
            black: '#000',
            blue: colors.blue,
            cyan: colors.cyan,
            // emerald: colors.emerald,
            // fuchsia: colors.fuchsia,
            gray: colors.stone,
            // indigo: colors.indigo,
            red: colors.red,
            pink: colors.pink,
            amber : colors.amber,
            white: '#FFF',
            // yellow: colors.yellow,
        },

        animations: {
            spin: 'spin 6s liner once',
        },
    },
    variants: {
        extend: {
            backgroundColor: ['responsive', 'hover', 'focus', 'active'],
            animation: ['hover', 'group-hover'],
        },
        float: ['responsive', 'direction'],
        position: ['responsive', 'direction'],
        margin: ['responsive', 'direction'],
        padding: ['responsive', 'direction'],
        textAlign: ['responsive', 'direction'],
        space: ['responsive', 'direction'],
        alignContent: ['responsive', 'direction'],
        alignItems: ['responsive', 'direction'],
        alignSelf: ['responsive', 'direction'],
        animation: ['responsive', 'direction'],
        flex: ['responsive', 'direction'],
        flexDirection: ['responsive', 'direction'],
        flexGrow: ['responsive', 'direction'],
        flexShrink: ['responsive', 'direction'],
        flexWrap: ['responsive', 'direction'],
    },
    plugins: [
        // require('tailwindcss-rtl'),
        require('tailwindcss-dir')(),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
    ],
}
