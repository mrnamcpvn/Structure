import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { isTemplateExpression } from "typescript";
import { environment } from "../../../../../environments/environment";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { ModelService } from "../../../../_core/_services/model.service";

@Component({
  selector: "app-model-edit",
  templateUrl: "./model-edit.component.html",
  styleUrls: ["./model-edit.component.scss"],
})
export class ModelEditComponent implements OnInit {
  editModelForm: FormGroup;
  url: string = environment.imageUrl;
  modelTypeList: Array<Select2OptionData>;
  constructor(
    private modelService: ModelService,
    private route: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.getAllModelType();
  }
  initForm() {
    this.editModelForm = this.fb.group({
      factory_id: "",
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
      create_by: "",
      create_time: "",
      update_by: "",
      update_time: "",
    });
    console.log(this.editModelForm);
  }
  checkedValue() {
    this.alertify.error("this log");

    console.log(this.editModelForm);
  }

  getAllModelType() {
    this.modelService.getAllModelType().subscribe((res) => {
      this.modelTypeList = res.map((item) => {
        return { id: item.id, text: item.name };
      });
    });
  }
}
