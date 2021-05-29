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
  hasMeasurement: boolean;
  hasReport: boolean;
  contructor() {}

  getNav(user: any) {
    if (user == null) return [];
    this.navItems = [];
    this.hasMaintain = false;
    this.hasKaizen = false;
    this.hasReport = false;

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
    //////////
    const navItemMeasurement = {
      name: "3. MEASUREMENT",
      url: "measurement",
      icon: "icon-grid",
      children: [],
    };
    ///////////
    const navItemReport = {
      name: "4. REPORT",
      url: "report",
      icon: "icon-grid",
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
        if (element == "ksmt.Kaizen") {
          const children = {
            name: "2.2 Kaizen RFT",
            url: "/kaizen/kaizen-rft/kaizen-rft-list",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasKaizen = true;
          navItemKaizen.children.push(children);
        }
        /////////////////////////////////
        if (element == "ksmt.RFT") {
          const children = {
            name: "RFT",
            url: "/measurement/list",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasMeasurement = true;
          navItemMeasurement.children.push(children);
        }
        ///////////////////////////////
        if (element === "ksmt.KaizenReport") {
          const children = {
            name: "4.1 Kaizen Report",
            url: "/report/kaizen-report/main",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasReport = true;
          navItemReport.children.push(children);
        }
        if (element == "ksmt.GroupKaizenReport") {
          const children = {
            name: "4.2 Group Kaizen Report",
            url: "/report/group-kaizen-report/main",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasReport = true;
          navItemReport.children.push(children);
        }
        if (element == "ksmt.RFTReport") {
          const children = {
            name: "4.3 RFT Report",
            url: "/report/rft-report/main",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasReport = true;
          navItemReport.children.push(children);
        }
        if (element == "ksmt.GroupRFTReport") {
          const children = {
            name: "4.4 Group RFT Report",
            url: "/report/group-rft-report/main",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasReport = true;
          navItemReport.children.push(children);
        }
        if (element == "ksmt.CrossSiteSharingApplication") {
          const children = {
            name: "4.5 Cross Site Sharing Application",
            url: "/report/cross-site-sharing-application/main",
            icon: "cil-hand-point-right",
            class: "menu-margin",
          };
          this.hasReport = true;
          navItemReport.children.push(children);
        }
      });

      if (this.hasMaintain) {
        this.navItems.push(navItemMaintain);
      }
      if (this.hasKaizen) {
        this.navItems.push(navItemKaizen);
      }
      if (this.hasMeasurement) {
        this.navItems.push(navItemMeasurement);
      }
      if (this.hasReport) {
        this.navItems.push(navItemReport);
      }
    }
    return this.navItems;
  }
}
