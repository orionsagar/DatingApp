"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(authservice, alertify, formbuilder, router) {
        this.authservice = authservice;
        this.alertify = alertify;
        this.formbuilder = formbuilder;
        this.router = router;
        this.model = {};
        this.cancelRegister = new core_1.EventEmitter();
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.bsConfig = {
            containerClass: 'theme-red'
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
    };
    RegisterComponent.prototype.createRegisterForm = function () {
        this.registerForm = this.formbuilder.group({
            gender: ['male'],
            username: ['', forms_1.Validators.required],
            knownAs: ['', forms_1.Validators.required],
            dateOfBirth: [null, forms_1.Validators.required],
            city: ['', forms_1.Validators.required],
            country: ['', forms_1.Validators.required],
            password: [
                '',
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(8),
                ],
            ],
            confirmpassword: ['', forms_1.Validators.required]
        }, {
            validator: this.passwordMatchValidator
        });
    };
    Object.defineProperty(RegisterComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () {
            return this.registerForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    RegisterComponent.prototype.passwordMatchValidator = function (g) {
        return g.get('password').value === g.get('confirmpassword').value
            ? null
            : { mismatch: true };
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        if (this.registerForm.valid) {
            this.user = Object.assign({}, this.registerForm.value);
            // console.log(this.user);
            this.authservice.register(this.user).subscribe(function () {
                _this.alertify.success('Registration Successful');
            }, function (error) {
                _this.alertify.error(error);
            }, function () {
                _this.authservice.login(_this.user).subscribe(function () {
                    _this.router.navigate(['/members']);
                });
            });
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
    };
    RegisterComponent.prototype.cancel = function () {
        this.cancelRegister.emit(false);
    };
    __decorate([
        core_1.Input()
    ], RegisterComponent.prototype, "valueFromHome");
    __decorate([
        core_1.Output()
    ], RegisterComponent.prototype, "cancelRegister");
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
