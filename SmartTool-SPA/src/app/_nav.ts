import { Injectable } from "@angular/core";
import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [];

@Injectable({
  providedIn: "root",
})
export class NavItem {
  navItems: INavData[] = [];
  hasMaintain: boolean;
  hasKaizen: boolean;
  contructor() {}

  getNav(user: any) {
    if (user == null) return [];
    this.navItems = [];
    this.hasMaintain = false;
    this.hasKaizen = false;

    const navItemMaintain = {
      name: "1. MAINTAIN",
      url: "maintain",
      icon: "icon-list",
      children: [],
    };
    //////////
    const navItemKaizen = {
      name: "2. KAIZEN",
      url: "kaizen",
      icon: "cil-chart-pie",
      children: [],
    };

    if (user != null) {
      user.role.forEach((element) => {
        if (element == "ksmt.Model") {
          const children = {
            name: "1.1 Model",
            url: "/maintain/model/list",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navItemMaintain.children.push(children);
        }
        if (element == "ksmt.ModelOperation") {
          const children = {
            name: "1.2 Model Operation",
            url: "/maintain/model-operation/list",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navItemMaintain.children.push(children);
        }
        if (element == "ksmt.ModelEfficiency") {
          const children = {
            name: "1.3 Model Efficiency",
            url: "/maintain/model-efficiency/edit",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navItemMaintain.children.push(children);
        }
        if (element == "ksmt.DefectReason") {
          const children = {
            name: "1.4 Defect Reason",
            url: "/maintain/defect-reason/list",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navItemMaintain.children.push(children);
        }
        ///////////////////////////////////////
        if (element == "ksmt.Kaizen") {
          const children = {
            name: "2.1 Kaizen",
            url: "/kaizen/kaizen/kaizen-list",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasKaizen = true;
          navItemKaizen.children.push(children);
        }
      });

      if (this.hasMaintain) {
        this.navItems.push(navItemMaintain);
      }
      if (this.hasKaizen) {
        this.navItems.push(navItemKaizen);
      }
    }
    return this.navItems;
  }
}
