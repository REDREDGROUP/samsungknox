import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Samsung Knox Library',
  tagline: 'Samsung provides an SDK that makes it easier to use the Samsung Knox API.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://redredgroup.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/samsungknox/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'REDREDGROUP', // Usually your GitHub org/user name.
  projectName: 'samsungknox', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
 
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/REDREDGROUP/samsungknox',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'SamsungKnox Library',
      logo: {
        alt: 'SamsungKnox Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: 'Knox Token Library',
          to: '/docs/knox-token-library',
          sidebarId: 's',
          position: 'left',
        },
        {
          type: 'dropdown',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Knox API',
          items: [
            {
              label: 'Knox Cloud Authentication',
              to: '/docs/category/knox-cloud-authentication',
            },
            {
              label: 'Knox Configure',
              to: '/docs/category/knox-configure',
            },
          ],
        },
        {
          href: 'https://github.com/REDREDGROUP/samsungknox',
          position: 'right',
          className: 'header-github-link',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Samsung Knox Token Library',
              to: '/docs/knox-token-library',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © 2023 REDREDGROUP Web Service. All Right Reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: 'Q0ALUGVYTA',
      apiKey: '472314be6391bcd9c9ec9319af2994a9',
      contextualSearch: true,
      indexName: 'samsungknox',
    }
  } satisfies Preset.ThemeConfig,
};

export default config;