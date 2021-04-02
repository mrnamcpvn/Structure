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
  {
    title: true,
    name: 'XuanTung'
  },
  {
    name: '1. MAINTAIN',
    url: '/maintain',
    icon: 'icon-list',
    children: [
      {
        name: '1.1 Model',
        url: '/maintain/model/list',
        class: 'menu-margin'
      },
      {
        name: '1.2 Model Operation',
        url: '/maintain/model-operation/list',
        class: 'menu-margin'
      }
    ],
  },
  {
    name: '2. USER MANAGER',
    url: '/user',
    icon: 'icon-user',
    children: [
      {
        name: '2.1 User list',
        url: '/user',
        class: 'menu-margin'
      }
    ]
  },
  {
    name: '3. MAINTAIN-A',
    url: '/maintain-a',
    icon: 'icon-list',
    children: [
      {
        name: '3.1 Model-A',
        url: '/maintain-a/model-a/',
        class: 'menu-margin'
      }
    ],
  },
  {
    name: '4. KAIZEN',
    url: '/kaizen',
    icon: 'icon-list',
    children: [
      {
        name: '4.1 Kaizen',
        url: '/kaizen/kaizen/',
        class: 'menu-margin'
      },
      {
        name: '4.1 Kaizen RTF',
        url: '/kaizen/kaizen-rft/',
        class: 'menu-margin'
      }
    ],
  },
  {
    name: '5. REPORT',
    url: '/report',
    icon: 'icon-list',
    children: [
      {
        name: '5.1 Kaizen Report',
        url: '/report/kaizen-report/',
        class: 'menu-margin'
      },
      {
        name: '5.2 Group Kaizen Report',
        url: '/report/group-kaizen-report/',
        class: 'menu-margin'
      },
      {
        name: '5.3 RFT Report',
        url: '/report/rft-report/',
        class: 'menu-margin'
      },
      {
        name: '5.4 Group RFT Report',
        url: '/report/group-rft-report/',
        class: 'menu-margin'
      }
    ],
  },

];
