import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const GITHUB_URL = 'https://github.com/REDREDGROUP/samsungknox';

const config: Config = {
  title: 'Samsung Knox Library',
  tagline: 'Samsung provides an SDK that makes it easier to use the Samsung Knox API.',
  favicon: 'img/favicon.ico',

  url: 'https://redredgroup.github.io',
  baseUrl: '/samsungknox/',

  organizationName: 'REDREDGROUP',
  projectName: 'samsungknox',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          editUrl: GITHUB_URL,

          // versions: {
          //   current: {
          //     label: 'current',
          //   },
          // },
          // lastVersion: 'current',
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-PR2Y55ZKJD',
        anonymizeIP: true,
      },
    ]
  ],

  themeConfig: {
    announcementBar: {
      id: 'support_us',
      content:
        'Knox Fastlane (Beta) has been released! see the <a target="_blank" href="/samsungknox/docs/knox-fastlane-plugin">Knox Fastlane Plugin documentation</a> for more information on how to use it.',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: false,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
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
          label: 'Knox Fastlane Plugin (Beta)',
          to: '/docs/knox-fastlane-plugin',
          sidebarId: 's',
          position: 'left',
        },
        // {
        //   type: 'docsVersionDropdown',
        //   position: 'right',
        // },
        {
          href: GITHUB_URL,
          position: 'right',
          className: 'header-github-link',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Product Docs',
          items: [
            {
              label: 'Knox Token Library',
              to: '/docs/knox-token-library',
            },
            {
              label: 'Knox API',
              to: '/docs/knox-api',
            },
            {
              label: 'Knox Fastlane Plugin (Beta)',
              to: '/docs/knox-fastlane-plugin',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: GITHUB_URL,
            },
          ],
        },
        {
          title: 'Info',
          items: [
            {
              html: `
              <p>
              All rights to SamsungKnox products are reserved by Samsung, and REDREDGROUP Web Service has no relationship with Samsung.
              <br/>
              <a href="https://docs.samsungknox.com" target="_blank" >Go To SamsungKnox Official Document</a>
              </p>
              `,
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
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
