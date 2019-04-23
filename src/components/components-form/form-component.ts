import { Component } from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { NavController, AlertController } from "ionic-angular";

/**
 * Generated class for the ComponentsFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "form-component",
  templateUrl: "form-component.html"
})
export class FormComponent {
  states: any = [
    "Baja California",
    "Baja California Sur",
    "Nuevo Leon",
    "Jalisco"
  ];
  form: FormGroup;
  name: AbstractControl;
  dateOfBirth: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  confirmPass: AbstractControl;
  address: AbstractControl;
  city: AbstractControl;
  state: AbstractControl;
  errorMessages = [
    { required: "is required." },
    { pattern: "Enter a valid" },
    { match: "doesn't match." },
    { missing: "All fields are required." }
  ];

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.form = formBuilder.group({
      name: ["", [Validators.required, Validators.pattern("^[a-zA-Z\\s]+$")]],
      email: ["", [Validators.required, Validators.email]],
      dateOfBirth: ["", Validators.required],
      password: ["", Validators.required],
      confirmPass: ["", Validators.required],
      address: [
        "",
        [Validators.required, Validators.pattern("^[a-z0-9A-Z\\s]+$")]
      ],
      city: ["", [Validators.required, Validators.pattern("^[a-zA-Z\\s]+$")]],
      state: ["", Validators.required]
    });

    this.initFormControls();
    this.checkPasswordMatch();
  }

  initFormControls() {
    this.name = this.form.controls.name;
    this.email = this.form.controls.email;
    this.dateOfBirth = this.form.controls.dateOfBirth;
    this.password = this.form.controls.password;
    this.confirmPass = this.form.controls.confirmPass;
    this.address = this.form.controls.address;
    this.city = this.form.controls.city;
    this.state = this.form.controls.state;
  }

  checkPasswordMatch() {
    this.form.valueChanges.subscribe(control => {
      if (control.password !== control.confirmPass) {
        this.confirmPass.setErrors({ missmatch: true });
      } else {
        this.confirmPass.setErrors(null);
      }
    });
  }

  submit() {
    const alert = this.alertCtrl.create({
      title: "New Friend",
      subTitle: "Welcome to DUDE!",
      buttons: ["OK"]
    });
    alert.present();
  }
}
