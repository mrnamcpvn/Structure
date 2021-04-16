import { Injectable } from "@angular/core";
import { INavData } from "@coreui/angular";

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

    //====Setup Menu cha Maintain======
    const navItemMaintain = {
      name: "1. MAINTAIN",
      url: "maintain",
      icon: "icon-list",
      children: [],
    };
    //=================================
    //===Setup Menu cha Kaizen=========
    const navItemKaizen = {
      name: "2. KAIZEN",
      url: "kaizen",
      icon: "icon-pie-chart",
      children: [],
    };
    //=================================
    //===Setup Menu cha Measurement====
    const navItemMeasurement = {
      name: "3. MEASUREMENT",
      url: "measurement",
      icon: "icon-grid",
      children: [],
    };
    //=================================
    //===Setup Menu cha Report=========
    const navItemReport = {
      name: "4. Report",
      url: "report",
      icon: "icon-chart",
      children: [],
    };
    //=================================
    //===Setup Menu cha Measurement====
    const navItemUser = {
      name: "5. USER MANAGER",
      url: "user",
      icon: "icon-user",
      children: [],
    };
    //=================================
    if(user != null) {
      user.role.forEach((element) => {
        //====Setup Menu con cho Maintain
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
        if (element === "ksmt.ModelEfficiency") {
          const children = {
            name: "1.3 Model Efficiency",
            url: "/maintain/model-efficiency/edit",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navItemMaintain.children.push(children);
        }
      });
    }

    //kiểm tra xem có Maintain không
    if (this.hasMaintain) {
      this.navItems.push(navItemMaintain);
    }

    return this.navItems;
  }
}
