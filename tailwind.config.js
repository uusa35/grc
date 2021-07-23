const colors = require('tailwindcss/colors')
module.exports = {
    purge: {
        enabled : false,
        options: {
            // Whitelisting some classes to avoid purge
            // safelist: [
            //     /^bg-/, /^text-/, /^border-/,/^rtl:/,
            //     /^ltr:/,/^p/,/^m/,/^leading/,/^font/,/^hover/,/^w-/,/^h-/,/^space/,
            //     /^w/,/^h/,/^m/
            // ]
        },
        content: [
            './resources/views/**/*.blade.php',
            './resources/css/**/*.css',
        ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors : {
                // 'hippie-blue': {
                //     '50': '#f7fafb',
                //     '100': '#eff5f6',
                //     '200': '#d8e6e9',
                //     '300': '#c0d7dc',
                //     '400': '#90b8c2',
                //     '500': '#619aa8',
                //     '600': '#578b97',
                //     '700': '#49747e',
                //     '800': '#3a5c65',
                //     '900': '#304b52'
                // },
                // 'gothic': {
                //     '50': '#f8fafb',
                //     '100': '#f1f5f7',
                //     '200': '#dde6ea',
                //     '300': '#c9d7de',
                //     '400': '#a0b8c5',
                //     '500': '#779aac',
                //     '600': '#6b8b9b',
                //     '700': '#597481',
                //     '800': '#475c67',
                //     '900': '#3a4b54'
                // }
            }
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
        //     // amber: colors.amber,
            black: '#000',
        //     // blue: colors.blue,
        //     // blueGray: colors.blueGray,
        //     // coolGray: colors.coolGray,
        //     // cyan: colors.cyan,
        //     // emerald: colors.emerald,
        //     // fuchsia: colors.fuchsia,
            gray: colors.trueGray,
            green: colors.green,
            // indigo: colors.indigo,
        //     // sky: colors.sky,
        //     // lime: colors.lime,
        //     // orange: colors.orange,
        //  pink: colors.pink,
        // purple: colors.purple,
             red: colors.red,
        //     // rose: colors.rose,
        //     // teal: colors.teal,
        //     // trueGray: colors.trueGray,
        //     // violet: colors.violet,
        //     // warmGray: colors.warmGray,
            white: '#FFF',
        //     // yellow: colors.yellow,
        },
        fontFamily: {
            cairo: ['cairo', 'sans-serif'],
            DroidArabicKufi: ['DroidArabicKufi', 'sans-serif'],
            'DroidArabicKufi-bold': ['DroidArabicKufi-bold', 'sans-serif'],
            'Tajawal-Light': ['Tajawal-Light', 'sans-serif'],
            'Tajawal-Medium': ['Tajawal-Medium', 'sans-serif'],
            'AR-Almarai-Font': ['AR-Almarai-Font', 'sans-serif'],
            'bein-ar-black_0': ['bein-ar-black_0', 'sans-serif'],
        },
    },
    variants: {
        extend: {
            backgroundColor: ['responsive', 'hover', 'focus', 'active'],
        },
        float: ['responsive', 'direction'],
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
