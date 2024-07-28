const cssnano = [
  'cssnano',
  {
    preset: 'advanced',
    discardComments: { removeAll: true },
    normalizeWhitespace: true,
    mergeLonghand: true,
    minifySelectors: true,
    reduceTransforms: true,
    convertValues: true,
    reduceIdents: false,
  },
];

module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    ...(process.env.NODE_ENV === 'production' ? [cssnano] : []),
  ],
};
