import GettingStarted from './getting-started.mdx';
import WithJSSDK from './getting-started/with-js-sdk.mdx';
import WithIOSSDK from './getting-started/with-ios-sdk.mdx';
import AboutUs from './index.mdx';
import JSSDK from './js-sdk.mdx';
export const tutorials: any = {
  'about-us': {
    href: `about-us`,
    title: 'About Us',
    tutorialId: 'about-us',
    component: <AboutUs />,
  },
  'getting-started': {
    href: `getting-started`,
    title: 'Getting Started',
    tutorialId: 'getting-started',
    component: <GettingStarted />,
    subMenu: {
      'with-js-sdk': {
        component: <WithJSSDK />,
        title: 'with JS SDK',
        tutorialId: 'with-js-sdk',
        href: `with-js-sdk`,
      },
      'with-ios-sdk': {
        component: <WithIOSSDK />,
        title: 'with IOS SDK',
        tutorialId: 'with-ios-sdk',
        href: `with-ios-sdk`,
      },
    },
  },
  'js-sdk': {
    href: `js-sdk`,
    title: 'JS SDK',
    tutorialId: 'js-sdk',
    component: <JSSDK />,
  },
};
