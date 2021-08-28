const nightOwl = require("prism-react-renderer/themes/nightOwl");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Hydyco",
  tagline: "Hydyco helps you to build your APIs fast 💨",
  url: "https://hydyco.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Hydyco",
  projectName: "hydyco",
  themeConfig: {
    colorMode: {
      defaultMode: "light",

      disableSwitch: true,
    },
    navbar: {
      logo: {
        alt: "Hydyco Logo",
        src: "img/black-logo.png",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/hydyco",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Docs",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Linkedin",
              to: "https://www.linkedin.com/in/rahul-tanwar-bb048a119/",
            },
            {
              label: "GitHub",
              href: "https://github.com/hydyco/code",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hydyco.`,
    },
    prism: {
      theme: nightOwl,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
