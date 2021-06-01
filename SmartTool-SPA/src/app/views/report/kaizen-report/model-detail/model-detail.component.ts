import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Highcharts from "highcharts";
import { NgxSpinnerModule } from "ngx-spinner";
import { environment } from "../../../../../environments/environment";
import { Efficiency } from "../../../../_core/_model/efficiency";
import { ModelKaizenReport } from "../../../../_core/_model/model-kaizen-report";
import { Pagination } from "../../../../_core/_model/pagination";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { KaizenReportService } from "../../../../_core/_services/kaizen-report.service";
import { FunctionUtility } from "../../../../_core/_utility/function-utility";
@Component({
  selector: "app-model-detail",
  templateUrl: "./model-detail.component.html",
  styleUrls: ["./model-detail.component.scss"],
})
export class ModelDetailComponent implements OnInit {
  url: any = environment.imageUrl;
  highcharts = Highcharts;
  model: ModelKaizenReport;
  efficiencyTargetData: number[] = [];
  actualModelEfficiencyData: number[] = [];
  monthData: string[] = [];
  dataChart: Efficiency[];
  seasons: string[] = [];
  season: string;
  chartOptions = null;
  dataTable: any = [];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 0,
    totalPages: 0,
  };
  constructor(
    private kaizenReportService: KaizenReportService,
    private router: Router,
    private snipper: NgxSpinnerModule,
    private alertify: AlertifyService,
    private utility: FunctionUtility
  ) {}

  ngOnInit() {
    this.kaizenReportService.currentModel.subscribe(
      (res) => (this.model = res)
    );
    if (this.model !== null) {
      this.model.volume_string = this.utility.convertNumber(this.model.volume);
      // Thay thế kí tự ngắt dòng bằng thẻ <br>
      this.model.remarks = this.utility.replaceLineBreak(this.model.remarks);
      this.getSeasonByUpperID();
      this.getDataTable();
    } else {
      this.backForm();
    }
  }

  getDataTable() {
    this.kaizenReportService
      .getKaizens(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.model.model_no
      )
      .subscribe((res) => {
        this.dataTable = res.result;
        this.dataTable.map((item) => {
          item.improv = Math.round(
            100 *
              ((item.ct_before_sec - item.ct_after_sec) / item.ct_before_sec)
          );
          console.log(item);
          return item;
        });
        this.pagination = res.pagination;
      });
  }
  getSeasonByUpperID() {
    this.kaizenReportService
      .getSeasonByUpper(this.model.upper_id)
      .subscribe((res) => {
        this.seasons = res;
        if (this.seasons.length > 0) {
          this.season = this.seasons[0].toString();
          this.getDataChart();
        }
      });
  }
  kaizenDetail(model: any) {
    this.kaizenReportService.updateClickTimes(model).subscribe();
    this.kaizenReportService.changeKaizen(model);
    this.router.navigate(["/report/kaizen-report/kaizen-detail"]);
  }
  
  getDataChart() {
    this.kaizenReportService
      .getDataChart(this.model.upper_id, this.season)
      .subscribe((res) => {
        this.dataChart = res;
        this.efficiencyTargetData = this.dataChart.map((obj) => {
          return obj.efficiency_target;
        });
        this.actualModelEfficiencyData = this.dataChart.map((obj) => {
          return obj.efficiency_actual;
        });
        let dataMonth = this.dataChart.map((obj) => {
          return obj.month.toString().trim();
        });
        this.monthData = dataMonth.map((obj) => {
          if (obj === "1") {
            obj = "January";
          } else if (obj === "2") {
            obj = "February";
          } else if (obj === "3") {
            obj = "March";
          } else if (obj === "4") {
            obj = "April";
          } else if (obj === "5") {
            obj = "May";
          } else if (obj === "6") {
            obj = "June";
          } else if (obj === "7") {
            obj = "July";
          } else if (obj === "8") {
            obj = "August";
          } else if (obj === "9") {
            obj = "September";
          } else if (obj === "10") {
            obj = "October";
          } else if (obj === "11") {
            obj = "November";
          } else if (obj === "12") {
            obj = "December";
          }
          return obj;
        });
        this.chartOptions = {
          chart: {
            type: "spline",
          },
          title: {
            text: "Model Efficiency Tracking",
          },
          xAxis: {
            categories: this.monthData,
          },
          yAxis: {
            title: {
              text: "",
            },
            labels: {
              formatter: function () {
                return this.value + "%";
              },
            },
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                format: "{y} %",
              },
              enableMouseTracking: true,
            },
          },
          tooltip: {
            valueSuffix: "%",
            enabled: false,
          },
          series: [
            {
              name: "Model Efficiency Target",
              data: this.efficiencyTargetData,
              color: "#62a8e8",
            },
            {
              name: "Actual Model Efficiency",
              data: this.actualModelEfficiencyData,
              color: "#de8e58",
            },
          ],
        };
      });
  }
  changeSeason() {
    this.getDataChart();
  }

  pageChanged(event) {
    this.pagination.currentPage = event.page;
    this.getDataTable();
  }

  backForm() {
    this.router.navigate(["/report/kaizen-report/main"]);
  }
}
