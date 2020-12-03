const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/stories/**/*',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    const postCssRule = config.module.rules[7].use[2];
    postCssRule.options = {
      sourceMap: true,
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    };

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            postcssOptions: {
              sourceMap: true,
              plugins: [
                require('postcss-import'),
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve.alias['tailwind.config'] = path.resolve(
      path.join(__dirname, '../tailwind.config.js')
    );

    config.resolve.alias['next/config'] = path.resolve(
      path.join(__dirname, '../mocks/next/config.js')
    );

    config.resolve.alias['next/router'] = path.resolve(
      path.join(__dirname, '../mocks/next/router.js')
    );

    config.resolve.alias['dizzle'] = path.resolve(
      path.join(__dirname, '../mocks/drizzle/index.js')
    );

    config.resolve.alias['src'] = path.resolve(path.join(__dirname, '../src'));

    return config;
  },
};
