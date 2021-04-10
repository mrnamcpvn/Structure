import { Component, OnInit } from "@angular/core";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Select2OptionData } from 'ng-select2';
import { environment } from "../../../../../environments/environment";
import { Model } from "../../../../_core/_models/model";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { ModelService } from "../../../../_core/_services/model.service";
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  addModelForm: FormGroup;
  baseUrl: string = environment.imageUrl;
  defaultImage: string =
    this.baseUrl + environment.factory + "/Model/no-image.jpg";
  modelTypeList: Array<Select2OptionData>;


  constructor(
    private modelService: ModelService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.getAllModel();
    this.initForm();
  }


  backList() {
    this.router.navigate(["/maintain/model/list"]);
  }

  changeToUppercase() {
    this.addModelForm.patchValue({
      model_no: this.addModelForm.value.model_no.toUppercase,
      model_name: this.addModelForm.value.model_name.toUppercase,
      model_family: this.addModelForm.value.model_family.toUppercase,
      dev_season: this.addModelForm.value.dev_season.toUppercase,
      prod_season: this.addModelForm.value.prod_season.toUppercase,
    });
  }

  getAllModel() {
    this.modelService.getAllModelType().subscribe((res) => {
      this.modelTypeList = res.map((item) => {
        return { id: item.id, text: item.name }
      })
    })
  }
  onSelectFile(event) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      var file = event.target.files[0];
      var title = event.target.files[0].name.split(".").pop();
      var fileSize = event.target.files[0].size;
      if (title == "jpg" || title == "jpeg" || title == "png" || title == "JPG" || title == "JPEG" || title == "PNG") {
        if (fileSize <= 5242880) {
          reader.onload = (event) => {
            this.addModelForm.patchValue({
              model_picture: event.target.result.toString(),
            });
          };
        } else {
          this.alertify.error("Video cannot be larger than 5MB");
        }
      } else {
        this.alertify.error("Cannot Load img");
      }
    }
  }

  initForm() {
    this.addModelForm = this.fb.group({
      model_no: ["", [Validators.required]],
      upper_id: ["", [Validators.required, Validators.maxLength(6)]],
      model_name: ["", Validators.required],
      model_family: [""],
      model_type_id: ["", [Validators.required]],
      is_active: true,
      volume: [null, [Validators.min(0)]],
      volume_percent: [null, [Validators.min(0)]],
      dev_season: ["", [Validators.required]],
      prod_season: ["", [Validators.required]],
      remarks: [""],
      model_picture: [""],
    })
  }

  cancel() {
    this.resetForm();

  }
  saveAndNext() {
    this.changeToUppercase();
    console.log(this.addModelForm.value);
    this.modelService.createModel(this.addModelForm.value).subscribe(() => {
      this.alertify.success("Add succeed")
      this.resetForm();
      console.log(this.addModelForm.value);
    },
      (error) => {
        this.alertify.error("Add model failed on save");
      })
  }

  save() {

  }

  resetForm() {
    this.addModelForm.setValue({
      model_no: "",
      upper_id: "",
      model_name: "",
      model_family: "",
      model_type_id: "",
      is_active: true,
      volume: null,
      volume_percent: null,
      dev_season: "",
      prod_season: "",
      remarks: "",
      model_picture: "",
    })
  }


}