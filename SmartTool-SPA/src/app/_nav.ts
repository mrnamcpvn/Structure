import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  //
  {
    title: true,
    name: 'Components'
  },
  {
    name: '1.MAINTAIN',
    url: '/maintain',
    icon: 'icon-puzzle',
    children: [
      {
        name: '1.1 Model',
        url: '/maintain/model',
        icon: 'icon-puzzle'
      }, {
        name: '1.2 Model Operation',
        url: '/maintain/model-operation',
        icon: 'icon-puzzle'
      }
    ]
  },
];
