import { Subscription } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { ModelService } from '../../../../_core/_services/model.service';
import { Router } from '@angular/router';
import { AlertUtilityService } from '../../../../_core/_services/alertUtility.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addModelForm: FormGroup;
  apiUrl: string = environment.apiUrl;
  addModelSub: Subscription;
  defaultImage: string = this.apiUrl + environment.factory + '/Model/no-image.jpg';
  modelTypeList: Array<Select2OptionData>;
  user = JSON.parse(localStorage.getItem('userSmartTooling'));

  constructor(
    private modelService: ModelService,
    private router: Router,
    private alertUtility: AlertUtilityService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllModelType();
    this.initForm();
  }

  changeToUppercase() {
    this.addModelForm.patchValue({
      factory_id: this.addModelForm.value.factory_id.toUpperCase(),
      model_no: this.addModelForm.value.model_no.toUpperCase(),
      model_name: this.addModelForm.value.model_name.toUpperCase(),
      model_family: this.addModelForm.value.model_family.toUpperCase(),
      dev_season: this.addModelForm.value.dev_season.toUpperCase(),
      prod_season: this.addModelForm.value.prod_season.toUpperCase(),
    });
  }

  saveAndNext() {
    this.changeToUppercase();
    console.log(this.user);
    this.modelService.AddAsync(this.addModelForm.value).subscribe(
      (res) => {
        this.alertUtility.success('Add model was success', 'Successfully');
        console.log(this.addModelForm.value);
        this.router.navigate(['/maintain-a/model-a']);
      },
      (error) => {
        this.alertUtility.error('Add Model failed on save', 'Faile');
      }
    );
  }

  save() {
    this.changeToUppercase();
    console.log(this.user);

    this.modelService.AddAsync(this.addModelForm.value).subscribe(
      () => {
        this.alertUtility.success('Add succeed', 'Successfully');
        console.log(this.addModelForm.value);
        console.log('abc');

        this.resetForm();
      },
      (error) => {
        this.alertUtility.error('Add Model failed on save', 'Faile');
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
        title == 'jpg' ||
        title == 'jpeg' ||
        title == 'png' ||
        title == 'JPG' ||
        title == 'JPEG' ||
        title == 'PNG'
      ) {
        if (fileSize <= 5242880) {
          reader.onload = (event) => {
            this.addModelForm.patchValue({ model_picture: event.target.result.toString()});
          };
        } else {
          this.alertUtility.error('Video cannot be larger than 5MB', 'Error');
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

  cancel() {
    this.resetForm();
    console.log(this.addModelForm.value);
  }

  initForm() {
    this.addModelForm = this.formBuilder.group({
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
      update_by: [this.user.username],
      create_by: [this.user.username],
    });
  }

  resetForm() {
    this.addModelForm.setValue({
      factory_id: '',
      model_no: '',
      upper_id: '',
      model_name: '',
      model_family: '',
      model_type_id: '',
      is_active: true,
      volume: null,
      volume_percent: null,
      dev_season: '',
      prod_season: '',
      remarks: '',
      model_picture: '',
      update_by: this.user.username,
      create_by: this.user.username
    });
  }

  backList() {
    this.router.navigate(['/maintain-a/model-a']);
  }
}
