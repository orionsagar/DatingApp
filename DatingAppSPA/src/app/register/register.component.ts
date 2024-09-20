import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Input() valueFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  user: User;

  constructor(
    private authservice: AuthService,
    private alertify: AlertifyService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-red',
    };
    // this.registerForm = new FormGroup(
    //   {
    //     username: new FormControl('', Validators.required),
    //     password: new FormControl('', [
    //       Validators.required,
    //       Validators.minLength(4),
    //       Validators.maxLength(8),
    //     ]),
    //     confirmpassword: new FormControl('', Validators.required),
    //   },
    //   this.passwordMatchValidator
    // );
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formbuilder.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmpassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmpassword').value
      ? null
      : { mismatch: true };
  }

  register(): void {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      // console.log(this.user);
      this.authservice.register(this.user).subscribe(
        () => {
          this.alertify.success('Registration Successful');
        },
        (error) => {
          this.alertify.error(error);
        },
        () => {
          this.authservice.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
        }
      );
    }

    /// Old Code;
    // this.authservice.register(this.model).subscribe(
    //   () => {
    //     this.alertify.success('Registration Successful');
    //   },
    //   (error) => {
    //     this.alertify.error(error);
    //   }
    // );
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }
}
