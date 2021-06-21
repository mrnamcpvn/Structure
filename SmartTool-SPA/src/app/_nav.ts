import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [];

@Injectable({
  providedIn: "root", // <- ADD THIS
})
export class NavItem {
  navItems: INavData[] = [];
  hasMaintain: boolean;
  hasUserList: boolean;
  hasKaizen: boolean;
  hasReport: boolean;
  hasMeasurement: boolean;
  constructor() {}


  getNav(user: any) {
    if( user == null) return [];
    this.navItems = [];
    this.hasUserList = false;
    this.hasMaintain = false;
    this.hasKaizen = false;
    this.hasReport = false;
    this.hasMeasurement = false;

    //user
    const navItemUser = {
      name: "1. USER MANAGER",
      url: "user",
      icon: "icon-user",
      children: [],
    };
    //maintain
    const navMainTain = {
      name: "2. MAINTAIN",
      url: "maintain",
      icon: "icon-list",
      children: [],
    };
    //Kaizen
    const navItemKaizen = {
      name: "3. KAIZEN",
      url: "kaizen",
      icon: "icon-pie-chart",
      children: [],
    };

    //Report
    const navReport = {
      name: "4. REPORT",
      url: "report",
      icon: "icon-chart",
      children: [],
    };
    

    if(user != null) {
      user.role.forEach((element) => {
        //====Setup Menu con cho user
       if (element === "ksmt.UserList") {
          const children = {
            name: "1.1 User List",
            url: "/user",
            class: "menu-margin",
          };
          this.hasUserList = true;
          navItemUser.children.push(children);
        }


        //Maintain
        if (element === "ksmt.DefectReason") {
          const children = {
            name: "2.1 Defect Reason",
            url: "/maintain/defect-reason/list",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navMainTain.children.push(children);
        }

        if (element === "ksmt.Model") {
          const children = {
            name: "2.2 Model",
            url: "/maintain/model/list",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navMainTain.children.push(children);
        }

        if (element === "ksmt.ModelOperation") {
          const children = {
            name: "2.3 Model Operation",
            url: "/maintain/model-operation/list",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navMainTain.children.push(children);
        }

        //kaizen list
        if (element === "ksmt.Kaizen") {
          const children = {
            name: "3.1 Kaizen",
            url: "/kaizen/kaizen/list",
            class: "menu-margin",
          };
          this.hasKaizen = true;
          navItemKaizen.children.push(children);
        }

        //Report
        if (element === "ksmt.Kaizen") {
          const children = {
            name: "4.1 Kaizen report",
            url: "/report/kaizen-report/list",
            class: "menu-margin",
          };
          this.hasReport = true;
          navReport.children.push(children);
        }
      });
    }   

    
    //thêm user sau cùng nếu có quyền user
    if (this.hasUserList) {
      this.navItems.push(navItemUser);
    }
    if (this.hasMaintain) {
      this.navItems.push(navMainTain);
    }
    if (this.hasKaizen) {
      this.navItems.push(navItemKaizen);
    }
    if (this.hasReport) {
      this.navItems.push(navReport);
    }
    return this.navItems;
  }

}






  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   icon: 'icon-drop'
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
  // {
  //   title: true,
  //   name: 'Components'
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Carousels',
  //       url: '/base/carousels',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Collapses',
  //       url: '/base/collapses',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Forms',
  //       url: '/base/forms',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Navbars',
  //       url: '/base/navbars',
  //       icon: 'icon-puzzle'

  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/paginations',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Switches',
  //       url: '/base/switches',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'icon-puzzle'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Brand Buttons',
  //       url: '/buttons/brand-buttons',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   icon: 'icon-pie-chart'
  // },
  // {
  //   name: 'Icons',
  //   url: '/icons',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'CoreUI Icons',
  //       url: '/icons/coreui-icons',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'success',
  //         text: 'NEW'
  //       }
  //     },
  //     {
  //       name: 'Flags',
  //       url: '/icons/flags',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Font Awesome',
  //       url: '/icons/font-awesome',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'secondary',
  //         text: '4.7'
  //       }
  //     },
  //     {
  //       name: 'Simple Line Icons',
  //       url: '/icons/simple-line-icons',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   icon: 'icon-bell',
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Modals',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   icon: 'icon-calculator',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   divider: true
  // },
  // {
  //   title: true,
  //   name: 'Extras',
  // },
  // {
  //   name: 'Pages',
  //   url: '/pages',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Disabled',
  //   url: '/dashboard',
  //   icon: 'icon-ban',
  //   badge: {
  //     variant: 'secondary',
  //     text: 'NEW'
  //   },
  //   attributes: { disabled: true },
  // },
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // }