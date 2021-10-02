const colors = require('tailwindcss/colors')
module.exports = {
    purge: {
        enabled : false,
        // options: {
        // Whitelisting some classes to avoid purge
        // safelist: [
        //     /^bg-/, /^text-/, /^border-/,/^rtl:/,
        //     /^ltr:/,/^p/,/^m/,/^leading/,/^font/,/^hover/,/^w-/,/^h-/,/^space/,
        //     /^w/,/^h/,/^m/
        // ]
        // },
        content: [
            './resources/views/**/*.blade.php',
            './resources/css/**/*.css',
        ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            screens : {
                'print': {'raw': 'print'},
            },
            colors: {
                'hippie-blue': {
                    '300': '#b4d4db',
                    '400': '#7bb4c1',
                    '500': '#4394a6',
                    '600': '#3c8595',
                    '700': '#326f7d',
                    '800': '#285964',
                    '900': '#304b52'
                },
                'red': {
                    '900': '#d7161f'
                },
                'green': {
                    '900': '#078231',
                    '950' : '#25d366'
                },
                'yellow': {
                    '400': '#FBBF24'
                },
            }
        },
        colors: {
            transparent: 'transparent',
            black: '#000',
            //     // blue: colors.blue,
            //     // blueGray: colors.blueGray,
            //     // coolGray: colors.coolGray,
            //     // cyan: colors.cyan,
            //     // emerald: colors.emerald,
            //     // fuchsia: colors.fuchsia,
            gray: colors.trueGray,
            // green: colors.green,
            // indigo: colors.indigo,
            //      red: colors.red,
            //     // warmGray: colors.warmGray,
            white: '#FFF',
            //     // yellow: colors.yellow,
        },
        fontFamily: {
            'cairo': ['cairo', 'sans-serif'],
            'DroidArabicKufi': ['DroidArabicKufi', 'sans-serif'],
            'droid-bold': ['DroidArabicKufi-bold', 'sans-serif'],
            // 'Tajawal-Light': ['Tajawal-Light', 'sans-serif'],
            // 'Tajawal-Medium': ['Tajawal-Medium', 'sans-serif'],
            // 'AR-Almarai-Font': ['AR-Almarai-Font', 'sans-serif'],
            'AR-BBC-Regular' : ['AR-BBC-Regular', 'sans-serif'],
            'AR-Almarai-Font' : ['AR-Almarai-Font', 'sans-serif'],
            'AlMohanad': ['AlMohanad', 'sans-serif'],
            'Ar-Ith': ['Ar-Ith', 'sans-serif'],
            'bein-ar-black_0': ['bein-ar-black_0', 'sans-serif'],
        },
        animations : {
            spin : 'spin 6s liner once'
        }
    },
    variants: {
        extend: {
            backgroundColor: ['responsive', 'hover', 'focus', 'active'],
            animation: ['hover', 'group-hover']
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
        float: ['responsive', 'direction'],
    },
    plugins: [
        // require('tailwindcss-rtl'),
        require('tailwindcss-dir')(),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography')
    ],
}
