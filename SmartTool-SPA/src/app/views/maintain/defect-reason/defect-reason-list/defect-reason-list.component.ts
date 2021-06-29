import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { DefectReason } from '../../../../_core/_models/defect-reason';
import { PaginatedResult, Pagination } from '../../../../_core/_models/pagination';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { DefectReasonService } from '../../../../_core/_services/defect-reason.service';
import { SweetAlertService } from '../../../../_core/_services/sweet-alert.service';

@Component({
  selector: 'app-defect-reason-list',
  templateUrl: './defect-reason-list.component.html',
  styleUrls: ['./defect-reason-list.component.scss']
})
export class DefectReasonListComponent implements OnInit {
  paramSearch: any = {};
  defectreasons: DefectReason[];
  fileImportExcel: File = null;
  defectreason: any = {};
  pagination : Pagination ={currentPage:1, itemsPerPage:10,totalItems:1,totalPages:1};

  constructor( private defectreasonService: DefectReasonService,
                private spinner: NgxSpinnerService,
                private alertify: AlertifyService,
                private sweetAlertService: SweetAlertService,
                private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.paramSearch.active ='all';
    this.paramSearch.defect_reason ="";
    this.loadData();
    this.spinner.hide();
  }


  //load data
  loadData(){
    this.defectreasonService
    .getdr( this.pagination.currentPage,
              this.pagination.itemsPerPage, this.paramSearch)
    .subscribe((res : PaginatedResult<DefectReason[]>) =>{
      this.defectreasons = res.result;
      this.pagination = res.pagination;
      this.spinner.hide();
    }, error =>{
      this.alertify.error(error);
    })
  }

  searchDr(){
    this.spinner.show();
    this.pagination.currentPage =1;
    this.loadData();
    this.spinner.hide();
  }

  clearDr(){
    this.paramSearch.defect_Reason ='';
    this.paramSearch.active ='all';
    this.loadData();
  }

  pageChanged(event : any): void{
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  addNew(){
    this.defectreason ={};
    this.defectreasonService.adddr(this.defectreason);
    this.defectreasonService.changeFlag("0");
    this.router.navigate(["/maintain/defect-reason/add"]);
  }

  edit(defactreason: DefectReason){
    localStorage.setItem('defactreasonSmartTooling', JSON.stringify(defactreason));
    this.router.navigate(["/maintain/defect-reason/edit"]);
  }
  downloadExcelTemplate(){
    window.location.href ='../../../../../assets/fileExcelTemplate/New Microsoft Excel Worksheet.xlsx';
  }
  import() {
    if (this.fileImportExcel == null) {
      this.sweetAlertService.warning('Warning', 'Please choose file upload!');
      return;
    }

    this.sweetAlertService.confirm('Are you sure import file?', 'import?', () => {
      this.defectreasonService.importExcel(this.fileImportExcel)
        .pipe()
        .subscribe((res) => {
          debugger
          if (res.success) {
            this.sweetAlertService.success('Success!', 'Import file successfuly');
          } else {
            this.sweetAlertService.error('Error!', 'Import file failse');
          }
          this.onRemoveFile();
        }, error => {
          this.sweetAlertService.error('Error', 'Upload Data Fail!');
        });
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      const file = event.target.files[0];
      // check file name extension
      const fileNameExtension = event.target.files[0].name.split('.').pop();
      if (fileNameExtension != 'xlsx' && fileNameExtension != 'xlsm') {
        this.sweetAlertService.warning('Warning', "Please select a file '.xlsx' or '.xls'");
        return;
      }

      this.fileImportExcel = file;
    }
  }

 

  onRemoveFile() {
    (<HTMLInputElement>document.getElementById("input_uploadFile")).value = null;
    this.fileImportExcel = null;
  }

  // delete(account: string){
  //   this.sweetAlertService.confirm('Delete User?', 'are you sure you want to delete this record', () =>{
  //     const currentUser: any = JSON.parse(localStorage.getItem('userSmartTooling'));
  //     if(account === currentUser.username)
  //     this.sweetAlertService.error('The current user cannot be deleted.');
  //     else{
  //       this.spinnerService.show();
  //       this.userService.deleteUser(account).subscribe(res =>{
  //         this.spinnerService.hide();
  //         if(res.success){
  //           this.getUser();
  //           this.sweetAlertService.success('done', res.message);
  //         }
  //         else{
  //           this.sweetAlertService.error('fail', res.message);
  //         } 
  //       }, error =>{
  //         console.log(error);
  //         this.spinnerService.hide();
  //       });
  //     }
  //   });
  // }

}
