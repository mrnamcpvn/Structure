import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { environment } from "../../../../../environments/environment";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { ModelService } from "../../../../_core/_services/model.service";

@Component({
  selector: "app-model-add",
  templateUrl: "./model-add.component.html",
  styleUrls: ["./model-add.component.scss"],
})
export class ModelAddComponent implements OnInit {
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
  ) {}

  ngOnInit() {
    this.getAllModelType();
    this.initForm();
  }

  backList() {
    this.router.navigate(["/maintain/model/list"]);
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
    });
  }
  changeToUppercase() {
    this.addModelForm.patchValue({
      model_no: this.addModelForm.value.model_no.toUpperCase(),
      model_name: this.addModelForm.value.model_name.toUpperCase(),
      model_family: this.addModelForm.value.model_family.toUpperCase(),
      dev_season: this.addModelForm.value.dev_season.toUpperCase(),
      prod_season: this.addModelForm.value.prod_season.toUpperCase(),
    });
  }

  saveAndNext() {
    this.changeToUppercase();
    this.modelService.createModel(this.addModelForm.value).subscribe(
      () => {
        this.alertify.success("Add succeed");
        this.resetForm();
        console.log(this.addModelForm.value);
      },
      (error) => {
        this.alertify.error("Add Model failed on save");
      }
    );
  }
  checkedValue() {
    console.log(this.addModelForm);
  }
  save() {
    this.changeToUppercase();
    console.log(this.addModelForm.value);
    this.modelService.createModel(this.addModelForm.value).subscribe(
      () => {
        // this.alertify.success("Add succeed");
        this.router.navigate(["/maintain/model/list"]);
      },
      (error) => {
        this.alertify.error("Add Model failed on save");
      }
    );
  }

  onSelectFile(event) {
    console.log(event);
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
          this.alertify.error("Video cannot be larger than 5MB");
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
    this.addModelForm = this.fb.group({
      model_no: ["", Validators.compose([Validators.required])],
      upper_id: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(6)]),
      ],
      model_name: ["", Validators.compose([Validators.required])],
      model_family: [""],
      model_type_id: ["", Validators.compose([Validators.required])],
      is_active: true,
      volume: [null, Validators.compose([Validators.min(0)])],
      volume_percent: [null, Validators.compose([Validators.min(0)])],
      dev_season: ["", Validators.compose([Validators.required])],
      prod_season: ["", Validators.compose([Validators.required])],
      remarks: [""],
      model_picture: "",
    });
  }
}
