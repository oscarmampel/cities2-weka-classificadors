webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".spacer {\r\n  -webkit-box-flex: 1;\r\n      -ms-flex: 1 1 auto;\r\n          flex: 1 1 auto;\r\n}\r\n.card {\r\n  margin: 15px auto;\r\n  max-width: 650px;\r\n}\r\n.upload-file{\r\n  margin-top: 1em;\r\n  margin-bottom: 1em;\r\n}\r\n.component-field {\r\n  display: block\r\n}\r\n.component-button {\r\n  max-width: 8em;\r\n}\r\n.material-icons {\r\n  margin-right: 1em;\r\n}\r\n.function {\r\n  margin-top: 2em;\r\n  margin-bottom: 2em;\r\n}\r\n.explanation{\r\n  padding: 1.75em 2em 2em;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<mat-toolbar color=\"primary\">\r\n  <span>Cities 2 - Image Classification</span>\r\n  <span class=\"spacer\"></span>\r\n  <a href=\"https://eetac.upc.edu/ca\" target=\"_blank\"><img src=\"../../assets/image.png\" height=\"50\" width=\"50\" style=\"margin-left: 0.5em; margin-right: 0.5em\"></a>\r\n  <button mat-button><i class=\"fab fa-github\"></i> GitHub</button>\r\n</mat-toolbar>\r\n\r\n<div class=\"container\">\r\n  <div class=\"row\">\r\n    <div class=\"function col-md-12\">\r\n      <h2 style=\"text-align: center; margin-bottom: 0.5em\">Cities 2 - Image Classification</h2>\r\n      <mat-card class=\"card col-md-6\">\r\n        <mat-card-title>Selecciona una imatge!</mat-card-title>\r\n\r\n        <div class=\"upload-file\">\r\n          <input type=\"file\" id=\"file1\" (change)=\"handleFileInput($event)\">\r\n        </div>\r\n        <button mat-raised-button color=\"primary\" class=\"component-button\" (click)=\"submitImage()\">Pujar</button>\r\n      </mat-card>\r\n      <mat-card class=\"card col-md-6\">\r\n        <mat-card-title>Estadístiques!</mat-card-title>\r\n        <div class=\"col-md-12\">\r\n          <mat-label>{{result?.acerts}} % acerts</mat-label>\r\n        </div>\r\n        <div class=\"col-md-12\">\r\n          <mat-label>Matriu de resultats correctes:</mat-label><br>\r\n          {{result?.matrix1}}<br>\r\n          {{result?.matrix2}}<br>\r\n          {{result?.matrix3}}<br>\r\n        </div>\r\n\r\n      </mat-card>\r\n      <div class=\"col-md-12\">\r\n        Realitzat per: Erik Blanca, Aleix Cánovas, Oscar Mampel\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PizzaPartyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var httpOptions = { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
        'Access-Control-Allow-Origin': '*',
    })
};
var AppComponent = /** @class */ (function () {
    function AppComponent(http, snackBar) {
        var _this = this;
        this.http = http;
        this.snackBar = snackBar;
        this.url = '';
        this.http.get("http://localhost:3000/myapp/image/hi", httpOptions)
            .subscribe(function (data) {
            console.log(data);
        });
        this.http.get("http://localhost:3000/myapp/image/statistics", this.base64textString)
            .subscribe(function (data) {
            _this.result = data;
        });
    }
    AppComponent.prototype.handleFileInput = function (event) {
        var files = event.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    };
    AppComponent.prototype._handleReaderLoaded = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
        console.log(btoa(binaryString));
    };
    AppComponent.prototype.submitImage = function () {
        var _this = this;
        this.http.post("http://localhost:3000/myapp/image/add", this.base64textString)
            .subscribe(function (data) {
            var result = '';
            if (data === 0) {
                result = 'Ascensor';
            }
            else if (data === 1) {
                result = 'Floristeria';
            }
            else if (data === 2) {
                result = 'Armari';
            }
            _this.snackBar.openFromComponent(PizzaPartyComponent, {
                duration: 10000,
                data: {
                    option: result
                }
            });
        });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["g" /* MatSnackBar */]])
    ], AppComponent);
    return AppComponent;
}());

var PizzaPartyComponent = /** @class */ (function () {
    function PizzaPartyComponent(data) {
        this.data = data;
    }
    PizzaPartyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'snack-bar-component-example-snack',
            template: __webpack_require__("./src/app/snack-bar-component-example-snack.html"),
            styles: ["\n    .example-pizza-party {\n      color: hotpink;\n    }\n  "],
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MAT_SNACK_BAR_DATA */])),
        __metadata("design:paramtypes", [Object])
    ], PizzaPartyComponent);
    return PizzaPartyComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["H" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_2__app_component__["b" /* PizzaPartyComponent */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_2__app_component__["b" /* PizzaPartyComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_material__["e" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_material__["f" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_material__["i" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_material__["j" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_material__["k" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_material__["h" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_material__["c" /* MatCardModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/snack-bar-component-example-snack.html":
/***/ (function(module, exports) {

module.exports = "<span class=\"example-pizza-party\">\r\n  Resultat: {{data.option}}!\r\n</span>\r\n"

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map