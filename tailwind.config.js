module.exports = {
  purge: [
    './resources/views/**/*.blade.php',
    './resources/css/**/*.css',
  ],
    darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
        colors : {
            'gothic': {
                '50': '#f8fafb',
                '100': '#f1f5f7',
                '200': '#dde6ea',
                '300': '#c9d7de',
                '400': '#a0b8c5',
                '500': '#779aac',
                '600': '#6b8b9b',
                '700': '#597481',
                '800': '#475c67',
                '900': '#3a4b54'
            }
        }
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
      alignContent: ['responsive','direction'],
      alignItems: ['responsive','direction'],
      alignSelf: ['responsive','direction'],
      animation: ['responsive','direction'],
      flex: ['responsive','direction'],
      flexDirection: ['responsive','direction'],
      flexGrow: ['responsive','direction'],
      flexShrink: ['responsive','direction'],
      flexWrap: ['responsive','direction'],
      float: ['responsive','direction'],
  },
  plugins: [
    require('@tailwindcss/ui'),
      require('tailwindcss-dir')(),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
  ]
}
