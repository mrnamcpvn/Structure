import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { AlertUtilityService } from '../../../../_core/_services/alertUtility.service';
import { ModelService } from '../../../../_core/_services/model.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  editModelForm: FormGroup;
  url: string = environment.imageUrl;
  modelTypeList: Array<Select2OptionData>;
  user = JSON.parse(localStorage.getItem('userSmartTooling'));
  constructor(
    private modelService: ModelService,
    private route: ActivatedRoute,
    private alertUtility: AlertUtilityService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.data.subscribe((data) => {
      console.log(data);
      this.spinner.hide();
      this.editModelForm.setValue(data.model);
      this.url = this.url + this.editModelForm.value.model_picture + '?' + Math.random();
    });
    this.getAllModelType();
  }

  initForm() {
    this.editModelForm = this.formBuilder.group({
      factory_id: ['', Validators.compose([Validators.required])],
      model_no: ['', Validators.compose([Validators.required])],
      upper_id: ['', Validators.compose([Validators.required, Validators.maxLength(6)])],
      model_name: ['', Validators.compose([Validators.required])],
      model_family: [''],
      model_type_id: ['', Validators.compose([Validators.required])],
      is_active: true,
      volume: [null, Validators.compose([Validators.min(0)])],
      volume_percent: [null, Validators.compose([Validators.min(0)])],
      dev_season: ['', Validators.compose([Validators.required])],
      prod_season: ['', Validators.compose([Validators.required])],
      remarks: [''],
      model_picture: '',
      create_by: '',
      create_time: '',
      update_by: '',
      update_time: '',
    });
  }

  changeToUppercase() {
    this.editModelForm.patchValue({
      factory_id: this.editModelForm.value.factory_id.toUpperCase(),
      model_no: this.editModelForm.value.model_no.toUpperCase(),
      model_name: this.editModelForm.value.model_name.toUpperCase(),
      model_family: this.editModelForm.value.model_family.toUpperCase(),
      dev_season: this.editModelForm.value.dev_season.toUpperCase(),
      prod_season: this.editModelForm.value.prod_season.toUpperCase()
    });
  }

  btnSave() {
    this.changeToUppercase();
    this.modelService.Update(this.editModelForm.value).subscribe((res) => {
        console.log(this.editModelForm.value);
        this.router.navigate(['/maintain-a/model-a']);
        this.alertUtility.success('Edit succeed ', 'Success');
      },
      (error) => {
        this.alertUtility.error('Can not update Model', 'Error');
      }
    );
  }

  onSelectFile(event) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const file = event.target.files[0];
      const title = event.target.files[0].name.split('.').pop();
      const fileSize = event.target.files[0].size;
      if (
        title === 'jpg' ||
        title === 'jpeg' ||
        title === 'png' ||
        title === 'JPG' ||
        title === 'JPEG' ||
        title === 'PNG'
      ) {
        if (fileSize <= 5242880) {
          reader.onload = (event) => {
            this.url = event.target.result.toString();
            this.editModelForm.patchValue({
              model_picture: event.target.result.toString(),
            });
          };
        } else {
          this.alertUtility.error('Image size is larger than 5mb', 'Error');
        }
      }
    }
  }

  getAllModelType() {
    this.modelService.getAllModelType().subscribe((res) => {
      this.modelTypeList = res.map((item) => {
        return { id: item.id, text: item.name };
      });
    });
  }


  backList() {
    this.router.navigate(['/maintain-a/model-a']);
  }


  cancel() {
    this.backList();
  }

}
