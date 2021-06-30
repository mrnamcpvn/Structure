import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { environment } from '../../../../../environments/environment';
import { Efficiency } from '../../../../_core/_models/efficiency';
import { ModelKaizenReport } from '../../../../_core/_models/model-kaizen-report';
import { Pagination } from '../../../../_core/_models/pagination';
import { GroupKaizenReportService } from '../../../../_core/_services/group-kaizen-report.service';
import { FunctionUtility } from '../../../../_core/_utility/function-utility';
declare var $: any;

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.scss']
})
export class ModelDetailComponent implements OnInit {

  model: ModelKaizenReport;
  highcharts = Highcharts;
  seasons: string[] = [];
  season: string;
  dataTable: any = [];
  dataChart: Efficiency[];
  efficiencyTargetData: number[] = [];
  url: any = environment.imageUrl;
  actualModelEfficiencyData: number[] = [];
  chartOptions = null;
  monthData: string[] = [];
  pagination: Pagination = {
    currentPage: 1,
    totalPage: 0,
    pageSize: 3,
    totalCount: 0,
  };
  constructor(
    private kaizenService: GroupKaizenReportService,
    private functionUtility: FunctionUtility,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.kaizenService.currentModel.subscribe((res) => (this.model = res));
    if (this.model !== null) {
      this.model.volume_string = this.functionUtility.convertNumber(this.model.volume);
      // Thay thế kí tự ngắt dòng bằng thẻ <br>
      this.model.remarks = this.functionUtility.replaceLineBreak(this.model.remarks);
      this.getSeasonByUpperID();
      this.getDataTable();
    } else {
      this.backForm();
    }
  }

  backForm(){
    this.router.navigate(["/report/group-kaizen-report/list"]);
  }

  getSeasonByUpperID() {
    this.kaizenService
      .getSeasonByUpper(this.model.factory_id,this.model.upper_id)
      .subscribe((res) => {
        this.seasons = res;
        if (this.seasons.length > 0) {
          this.season = this.seasons[0].toString();
          this.getDataChart();
        }
      });
  }

  getDataTable() {
    this.kaizenService.getKaizens(this.pagination.currentPage, this.pagination.pageSize, this.model.factory_id, this.model.model_no)
    .subscribe(res => {
      console.log(res);
      this.dataTable = res.result;
        this.dataTable.map((obj) => {
          obj.improv = Math.round(
            100 * ((obj.ct_before_sec - obj.ct_after_sec) / obj.ct_before_sec)
          );
          return obj;
        });
        this.pagination = res.pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getDataTable();
  }

  kaizenDetail(item: object) {
    this.kaizenService.updateClickTimes(item).subscribe();
    this.kaizenService.changeKaizen(item);
    this.router.navigate(['/report/group-kaizen-report/kaizen-detail']);
  }

  getDataChart() {
    this.kaizenService
      .getDataChart(this.model.factory_id,this.model.upper_id, this.season)
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
          //  subtitle: {
          //     text: "Source: WorldClimate.com"
          //  },
          xAxis: {
            categories: this.monthData,
          },
          yAxis: {
            title: {
              text: "",
            },
            labels: {
              formatter: function() {
                return this.value + '%';
              }
            }
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                format: '{y} %'
              },
              enableMouseTracking: true
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

  ngAfterViewChecked() {
    $('.highcharts-credits').html('');
  }
}
