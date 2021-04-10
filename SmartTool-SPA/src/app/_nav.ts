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
  constructor() { }

  getNav(user: any) {
    if (user == null) return [];

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
    // const navItemReport = {
    //   name: "4. Report",
    //   url: "report",
    //   icon: "icon-chart",
    //   children: [],
    // };
    //=================================
    //===Setup Menu cha Measurement====
    // const navItemUser = {
    //   name: "5. USER MANAGER",
    //   url: "user",
    //   icon: "icon-user",
    //   children: [],
    // };
    //=================================
    if (user != null) {
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
        if (element === "ksmt.DefectReason") {
          const children = {
            name: "1.4 Defect Reason",
            url: "/maintain/defect-reason/list",
            class: "menu-margin",
          };
          this.hasMaintain = true;
          navItemMaintain.children.push(children);
        }
        //=================================

        //====Setup Menu con cho Kaizen====
        if (element === "ksmt.Kaizen") {
          const children = {
            name: "2.1 Kaizen",
            url: "/kaizen/kaizen/",
            class: "menu-margin",
          };
          this.hasKaizen = true;
          navItemKaizen.children.push(children);
        }
        if (element === "ksmt.KaizenRFT") {
          const children = {
            name: "2.2 Kaizen RFT",
            url: "/kaizen/kaizen-rft/",
            class: "menu-margin",
          };
          this.hasKaizen = true;
          navItemKaizen.children.push(children);
        }
        //====================================

        //====Setup Menu con cho Measurement====
        // if (element === "ksmt.RFT") {
        //   const children = {
        //     name: "3.1 RFT ",
        //     url: "/measurement/list",
        //     class: "menu-margin",
        //   };
        //   this.hasMeasurement = true;
        //   navItemMeasurement.children.push(children);
        // }
        //====================================
        //====Setup menu con cho Report=======
        // if (element === "ksmt.KaizenReport") {
        //   const children = {
        //     name: "4.1 Kaizen Report",
        //     url: "/report/kaizen-report/main",
        //     class: "menu-margin",
        //   };
        //   this.hasReport = true;
        //   navItemReport.children.push(children);
        // }
        // if (element === "ksmt.GroupKaizenReport") {
        //   const children = {
        //     name: "4.2 Group Kaizen Report",
        //     url: "/report/group-kaizen-report/main",
        //     class: "menu-margin",
        //   };
        //   this.hasReport = true;
        //   navItemReport.children.push(children);
        // }
        // if (element === "ksmt.RFTReport") {
        //   const children = {
        //     name: "4.3 RFT Report",
        //     url: "/report/rft-report/main",
        //     class: "menu-margin",
        //   };
        //   this.hasReport = true;
        //   navItemReport.children.push(children);
        // }
        // if (element === "ksmt.GroupRFTReport") {
        //   const children = {
        //     name: "4.4 Group RFT Report",
        //     url: "/report/group-rft-report/main",
        //     class: "menu-margin",
        //   };
        //   this.hasReport = true;
        //   navItemReport.children.push(children);
        // }
        // if (element === "ksmt.CrossSiteSharingApplication") {
        //   const children1 = {
        //     name: "4.5 Cross Site Sharing Application",
        //     url: "/report/cross-site-sharing/main",
        //     class: "menu-margin",
        //   };
        //   this.hasReport = true;
        //   navItemReport.children.push(children1);
        // }

        //====================================
        //Setup menu con cho User Manager
        // if (element === "ksmt.UserList") {
        //   const children = {
        //     name: "5.1 User List",
        //     url: "/user",
        //     class: "menu-margin",
        //   };
        //   this.hasUserList = true;
        //   navItemUser.children.push(children);
        // }
      });
    }

    //kiểm tra xem có Maintain không
    if (this.hasMaintain) {
      this.navItems.push(navItemMaintain);
    }
    //kiểm tra xem có Kaizen không
    if (this.hasKaizen) {
      this.navItems.push(navItemKaizen);
    }
    //kiểm tra xem có Measurement không
    if (this.hasMeasurement) {
      this.navItems.push(navItemMeasurement);
    }
    //kiểm tra xem có Report không
    // if (this.hasReport) {
    //   this.navItems.push(navItemReport);
    // }
    //thêm user sau cùng nếu có quyền user
    // if (this.hasUserList) {
    //   this.navItems.push(navItemUser);
    // }

    return this.navItems;
  }
}
