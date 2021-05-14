import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Select2OptionData } from "ng-select2";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { environment } from "../../../../../environments/environment";
import { Model } from "../../../../_core/_models/model";
import { ModelQuery } from "../../../../_core/_queries/model.query";
import { ModelService } from "../../../../_core/_services/model.service";
import { CustomNgSnotifyService } from "../../../../_core/_services/snotify.service";
@UntilDestroy()
@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  editModelForm: FormGroup;
  url: string = environment.imageUrl;
  modelTypeList: Array<Select2OptionData>;
  model: Model;
  constructor(
    private modelService: ModelService,
    private snotify: CustomNgSnotifyService,
    private router: Router,
    private fb: FormBuilder,
    private modelQuery: ModelQuery
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.model = this.modelQuery.getActive() as Model;

    this.model ? this.editModelForm.patchValue(this.model) : this.router.navigate(['/maintain/model/list']);

    this.modelService.getAllModelType().subscribe();
    this.modelQuery.select(state => state.modelTypes).subscribe(modelTypes => {
      this.modelTypeList = modelTypes.map(type => ({ id: type.id, text: type.name }));
    });
  }

  initForm() {
    this.editModelForm = this.fb.group({
      factory_id: "",
      model_no: ["", Validators.compose([Validators.required, Validators.maxLength(8)])],
      upper_id: ["", Validators.compose([Validators.required, Validators.maxLength(6)])],
      model_name: ["", Validators.compose([Validators.required])],
      model_family: [""],
      model_type_id: ["", Validators.compose([Validators.required])],
      is_active: true,
      volume: [null, Validators.compose([Validators.min(0)])],
      volume_percent: [null, Validators.compose([Validators.min(0)])],
      dev_season: ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
      prod_season: ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
      remarks: [""],
      model_picture: "",
      create_time: "",
      update_time: "",
      create_by: Date,
      update_by: Date
    });
  }

  // changeToUppercase() {
  //   this.editModelForm.patchValue({
  //     model_no: this.editModelForm.value.model_no.toUpperCase(),
  //     model_name: this.editModelForm.value.model_name.toUpperCase(),
  //     model_family: this.editModelForm.value.model_family.toUpperCase(),
  //     dev_season: this.editModelForm.value.dev_season.toUpperCase(),
  //     prod_season: this.editModelForm.value.prod_season.toUpperCase(),
  //   });
  // }

  backList() {
    this.router.navigate(["/maintain/model/list"]);
  }
  onSelectFile(event) {
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
            this.url = event.target.result.toString();
            this.editModelForm.patchValue({
              model_picture: event.target.result.toString(),
            });
          };
        } else {
          this.snotify.error("Image size is larger than 5mb");
        }
      }
    }
  }
  // getAllModelType() {
  //   this.modelService.getAllModelType().subscribe((res) => {
  //     this.modelTypeList = res.map((item) => {
  //       return { id: item.id, text: item.name };
  //     });
  //   });
  // }
  cancel() {
    this.backList();
  }
  onSubmit(model: Model) {
    model.update_by = JSON.parse(localStorage.getItem('user')).name;
    model.update_time = new Date(Date());
    this.modelService.updateModel(model).pipe(untilDestroyed(this))
      .subscribe(() => {
        this.snotify.success("Model was successfully updated.", "Success!");
        this.router.navigate(['/maintain/model/list']);
      }, error => this.snotify.error(error, "Error!"));
  }

}
