module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'emerald-customized': {
          ...require('daisyui/src/colors/themes')['[data-theme=emerald]'],
          '--btn-text-case': 'none',
          primary: '#4e46dc'
        }
      }
    ]
  }
};
