import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "../../../../../environments/environment";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { ModelService } from "../../../../_core/_services/model.service";
import { Model } from "./../../../../_core/_model/model";
import { ModelsQuery } from "./../../../../_core/_queries/model.query";
import { ModelsStore } from "./../../../../_core/_stores/model.stores";
@UntilDestroy()
@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  modelTypeList: Array<Select2OptionData>;
  url: string = environment.imageUrl;
  editModelForm: FormGroup;
  constructor(
    private modelService: ModelService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private modelsStore: ModelsStore,
    private modelsQuery: ModelsQuery
  ) {}

  ngOnInit() {
    this.initForm();
    let model = this.modelsQuery.getActive() as Model;
    this.editModelForm.patchValue(model);
    // this.route.data.subscribe((data) => {
    //   this.spinner.hide();
    //   this.editModelForm.setValue(data.model);
    //   this.url =
    //     this.url + this.editModelForm.value.model_picture + "?" + Math.random();
    // });
    this.modelService.getAllModelType().subscribe();
    this.modelsQuery
      .select((state) => state.modelTypes)
      .subscribe((modelTypes) => {
        console.log(modelTypes);
        this.modelTypeList = modelTypes.map((type) => ({
          id: type.id,
          text: type.name,
        }));
      });
    // this.getAllModelType();
  }

  initForm() {
    this.editModelForm = this.fb.group({
      factory_id: { value: "", disabled: true },
      model_no: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
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
      create_by: "",
      create_time: "",
      update_by: "",
      update_time: "",
    });
  }

  getAllModelType() {
    this.modelService.getAllModelType().subscribe((res) => {
      this.modelTypeList = res.map((item) => {
        return { id: item.id, text: item.name };
      });
    });
  }

  backList() {
    this.router.navigate(["/maintain/model/list"]);
  }

  btnSave() {
    this.changeToUppercase();
    this.modelService.updateModel(this.editModelForm.value).subscribe(
      () => {
        this.router.navigate(["/maintain/model/list"]);
        this.alertify.success("Edit succeed ");
      },
      (error) => {
        this.alertify.error("Can not update Model");
      }
    );
  }

  onSelectFile(event) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const file = event.target.files[0];
      const title = event.target.files[0].name.split(".").pop();
      const fileZise = event.target.files[0].size;
      if (
        title === "jpg" ||
        title === "jpeg" ||
        title === "png" ||
        title === "JPG" ||
        title === "JPEG" ||
        title === "PNG"
      ) {
        if (fileZise <= 5242880) {
          reader.onload = (event) => {
            this.url = event.target.result.toString();
            this.editModelForm.patchValue({
              model_picture: event.target.result.toString(),
            });
          };
        } else {
          this.alertify.error("Image size is larger than 5mb");
        }
      }
    }
  }

  changeToUppercase() {
    this.editModelForm.patchValue({
      model_no: this.editModelForm.value.model_no.toUpperCase(),
      model_name: this.editModelForm.value.model_name.toUpperCase(),
      model_family: this.editModelForm.value.model_family.toUpperCase(),
      dev_season: this.editModelForm.value.dev_season.toUpperCase(),
      prod_season: this.editModelForm.value.prod_season.toUpperCase(),
    });
  }

  cancel() {
    this.backList();
  }
}
