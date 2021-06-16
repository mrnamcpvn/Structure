import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwIfEmpty } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { ModelService } from '../../../../_core/_services/model.service';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  
  addModelForm: FormGroup;
  baseUrl: string = environment.imageUrl;
  defaultImage: string =
    this.baseUrl + environment.factory + "/Model/no-image.jpg";
  modelTypeList: Array<Select2OptionData>;

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private modelService: ModelService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getAllModelType();
    this.initForm();
    
  }
  backlist(){
    this.router.navigate(["/maintain/model/list"]);
  }


  //touppercase
  changeToUpperCase(){
    this.addModelForm.patchValue(
      {
        model_no: this.addModelForm.value.model_no.toUpperCase(),
        model_name: this.addModelForm.value.model_name.toUpperCase(),
        model_family: this.addModelForm.value.model_family.toUpperCase(),
        dev_season: this.addModelForm.value.dev_season.toUpperCase(),
        prod_season: this.addModelForm.value.prod_season.toUpperCase()
      }
    );
  }

  saveAndNext(){
    this.spinner.show();
    this.changeToUpperCase();
    this.modelService.addMd(this.addModelForm.value).subscribe(
      () =>{
        this.alertify.success("Add Model succeed");
        this.resetF();
      }, error =>{
        this.alertify.error("Add Model failed on save");
      }
      
    )
    this.spinner.hide();
  }


  resetF(){
    this.addModelForm.setValue(
      {
        model_no: "",
        upper_id: "",
        model_name: "",
        model_family: "",
        model_type_id: "",
        is_active: true,
        volume: null,
        volume_percent: null,
        dev_season: "",
        prod_season:"",
        remarks: "",
        model_picture:"",
      }
    )
  }
  

  getAllModelType(){
    this.modelService.getModelType().subscribe((res) => {
      this.modelTypeList = res.map((item) => {
        return { id: item.id, text: item.name };
      });
    });
  }

  initForm(){
    this.addModelForm = this.formBuilder.group({
      model_no: ["", Validators.compose([Validators.required, Validators.maxLength(8)])],
      upper_id: ["", Validators.compose([Validators.required, Validators.maxLength(10)])],
      model_name: ["", Validators.compose([Validators.required])],
      model_family: [""],
      model_type_id: ["", Validators.compose([Validators.required, Validators.maxLength(5)])],
      is_active: true,
      volume: [null, Validators.compose([Validators.min(0)])],
      volume_percent: [null, Validators.compose([Validators.min(0)])],
      dev_season: ["", Validators.compose([Validators.required, Validators.maxLength(4)])],
      prod_season: ["", Validators.compose([Validators.required, Validators.maxLength(4)])],
      remarks: [""],
      model_picture: "",
    });
  }

  save(){
    this.spinner.show();
    this.changeToUpperCase();
    this.modelService.addMd(this.addModelForm.value).subscribe(
      () =>{
        this.alertify.success("Add Model succeed");
        this.router.navigate(["/maintain/model/list"]);
      }, error =>{
        this.alertify.error("Add Model failed on save");
      }
      
    )
    this.spinner.hide();
    
  }

  onSelectFile(event){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      var file = event.target.files[0];
      var title = event.target.files[0].name.split(".").pop();
      var fileZise = event.target.files[0].size;
      if (
        title == "jpg" ||
        title == "jpeg" ||
        title == "png" ||
        title == "JPG" ||
        title == "JPEG" ||
        title == "PNG"
      ) {
        if (fileZise <= 5242880) {
          reader.onload = (event) => {
            this.addModelForm.patchValue({
              model_picture: event.target.result.toString(),
            });
          };
        } else {
          this.alertify.error("Larger than 5MB");
        }
      }
    }
  }
}
