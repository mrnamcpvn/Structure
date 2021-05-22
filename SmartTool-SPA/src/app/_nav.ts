import { Injectable } from "@angular/core";
import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [];

@Injectable({
  providedIn: "root",
})
export class NavItem {
  navItems: INavData[] = [];
  hasMaintain: boolean;
  contructor() {}

  getNav(user: any) {
    if (user == null) {
      return [];
    }
    this.navItems = [];
    this.hasMaintain = false;

    const navItemMaintain = {
      name: "1. MAINTAIN",
      url: "maintain",
      icon: "cid-hamburger-menu",
      class: "menu-margin",
      children: [],
    };
    if (user != null) {
      user.role.forEach((element) => {
        if (element === "ksmt.Model") {
          const children = {
            name: "1.1 Model",
            url: "/maintain/model/list",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navItemMaintain.children.push(children);
        }
        if (element === "ksmt.ModelOperation") {
          const children = {
            name: "1.2 Model Oparation",
            url: "/maintain/model-operation/list",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navItemMaintain.children.push(children);
        }
        if (element == "ksmt.ModelEfficiency") {
          const children = {
            name: "1.3 Model Efficiency",
            url: "/maintain/model-efficiency/edit",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navItemMaintain.children.push(children);
        }
        if (element == "ksmt.DefectReason") {
          const children = {
            name: "1.4 Defect Reason",
            url: "/maintain/defect-reason/list",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navItemMaintain.children.push(children);
        }
      });
      if (this.hasMaintain) {
        this.navItems.push(navItemMaintain);
      }
    }
    return this.navItems;
  }
}
