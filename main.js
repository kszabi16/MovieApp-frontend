import { injectQuery as __vite__injectQuery } from "/@vite/client";import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/main.js");var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b ||= {})
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/main.ts
import { bootstrapApplication } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_platform-browser.js?v=3f3fab55";

// src/app/app.config.ts
import { provideRouter } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";

// src/app/core/guards/auth.guard.ts
import { inject } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { Router } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";

// src/app/core/services/auth.service.ts
var auth_service_exports = {};
__export(auth_service_exports, {
  AuthService: () => AuthService
});
import { Injectable } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { tap } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/rxjs.js?v=3f3fab55";

// src/environments/environments.ts
var environment = {
  production: false,
  apiUrl: "https://localhost:7066/api"
};

// src/app/core/utils/jwt.util.ts
function getRoleFromToken(token) {
  if (!token)
    return null;
  const payload = token.split(".")[1];
  if (!payload)
    return null;
  try {
    const decoded = JSON.parse(atob(payload));
    return decoded["role"] || decoded["Role"] || decoded["roles"] || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
  } catch {
    return null;
  }
}

// src/app/core/services/auth.service.ts
import * as i0 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i1 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common_http.js?v=3f3fab55";
var AuthService = class _AuthService {
  http;
  baseUrl = `${environment.apiUrl}/auth`;
  constructor(http) {
    this.http = http;
  }
  register(dto) {
    return this.http.post(`${this.baseUrl}/register`, dto).pipe(tap((res) => this.saveAuth(res)));
  }
  login(dto) {
    return this.http.post(`${this.baseUrl}/login`, dto).pipe(tap((res) => this.saveAuth(res)));
  }
  saveAuth(res) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  get token() {
    return localStorage.getItem("token");
  }
  get user() {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  }
  get isLoggedIn() {
    return !!this.token;
  }
  get role() {
    return getRoleFromToken(this.token);
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(i0.\u0275\u0275inject(i1.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: i1.HttpClient }], null);
})();

// src/app/core/guards/auth.guard.ts
var roleGuard = (expectedRole) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (!authService.isLoggedIn) {
      console.log("RoleGuard: Nincs bejelentkezve, \xE1tir\xE1ny\xEDt\xE1s /login-ra");
      router.navigate(["/login"]);
      return false;
    }
    const userRole = authService.role;
    if (userRole === expectedRole) {
      return true;
    }
    console.warn(`RoleGuard: Jogosulatlan hozz\xE1f\xE9r\xE9s (v\xE1rt: ${expectedRole}, kapott: ${userRole})`);
    if (userRole === "Admin") {
      router.navigate(["/admin-dashboard"]);
    } else if (userRole === "User") {
      router.navigate(["/user-dashboard"]);
    } else {
      authService.logout();
      router.navigate(["/login"]);
    }
    return false;
  };
};

// src/app/features/auth/pages/login/login.component.ts
import { Component } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { FormsModule } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
import { CommonModule } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import { RouterModule } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i02 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i2 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i3 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import * as i4 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
function LoginComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "div", 9);
    i02.\u0275\u0275element(1, "div", 10);
    i02.\u0275\u0275elementEnd();
  }
}
function LoginComponent_form_8_div_9_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "div", 19);
    i02.\u0275\u0275text(1);
    i02.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = i02.\u0275\u0275nextContext(2);
    i02.\u0275\u0275advance();
    i02.\u0275\u0275textInterpolate1(" ", ctx_r1.error, " ");
  }
}
function LoginComponent_form_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = i02.\u0275\u0275getCurrentView();
    i02.\u0275\u0275elementStart(0, "form", 11);
    i02.\u0275\u0275listener("ngSubmit", function LoginComponent_form_8_Template_form_ngSubmit_0_listener() {
      i02.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i02.\u0275\u0275nextContext();
      return i02.\u0275\u0275resetView(ctx_r1.submit());
    });
    i02.\u0275\u0275elementStart(1, "div", 12)(2, "label", 13);
    i02.\u0275\u0275text(3, "Email C\xEDm");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(4, "input", 14);
    i02.\u0275\u0275twoWayListener("ngModelChange", function LoginComponent_form_8_Template_input_ngModelChange_4_listener($event) {
      i02.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i02.\u0275\u0275nextContext();
      i02.\u0275\u0275twoWayBindingSet(ctx_r1.model.email, $event) || (ctx_r1.model.email = $event);
      return i02.\u0275\u0275resetView($event);
    });
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(5, "div", 12)(6, "label", 15);
    i02.\u0275\u0275text(7, "Jelsz\xF3");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(8, "input", 16);
    i02.\u0275\u0275twoWayListener("ngModelChange", function LoginComponent_form_8_Template_input_ngModelChange_8_listener($event) {
      i02.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i02.\u0275\u0275nextContext();
      i02.\u0275\u0275twoWayBindingSet(ctx_r1.model.password, $event) || (ctx_r1.model.password = $event);
      return i02.\u0275\u0275resetView($event);
    });
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275template(9, LoginComponent_form_8_div_9_Template, 2, 1, "div", 17);
    i02.\u0275\u0275elementStart(10, "button", 18);
    i02.\u0275\u0275text(11, " Bejelentkez\xE9s ");
    i02.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = i02.\u0275\u0275nextContext();
    i02.\u0275\u0275advance(4);
    i02.\u0275\u0275twoWayProperty("ngModel", ctx_r1.model.email);
    i02.\u0275\u0275advance(4);
    i02.\u0275\u0275twoWayProperty("ngModel", ctx_r1.model.password);
    i02.\u0275\u0275advance();
    i02.\u0275\u0275property("ngIf", ctx_r1.error);
  }
}
var LoginComponent = class _LoginComponent {
  authService;
  router;
  model = {
    email: "",
    password: ""
  };
  isLoading = false;
  error = "";
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  submit() {
    this.error = "";
    this.isLoading = true;
    this.authService.login(this.model).subscribe({
      next: () => {
        const role = this.authService.role;
        this.isLoading = false;
        if (role === "Admin") {
          this.router.navigate(["/admin-dashboard"]);
        } else {
          this.router.navigate(["/user-dashboard"]);
        }
      },
      error: (err) => {
        console.log("LOGIN ERROR:", err);
        this.isLoading = false;
        this.error = err.status === 401 ? "Hib\xE1s email vagy jelsz\xF3" : err.error?.message ?? "V\xE1ratlan hiba t\xF6rt\xE9nt";
      }
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(i02.\u0275\u0275directiveInject(AuthService), i02.\u0275\u0275directiveInject(i2.Router));
  };
  static \u0275cmp = /* @__PURE__ */ i02.\u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 14, vars: 2, consts: [[1, "auth-page"], [1, "auth-card"], [1, "card-header"], [1, "title"], [1, "subtitle"], ["class", "loading-state", 4, "ngIf"], ["class", "auth-form", 3, "ngSubmit", 4, "ngIf"], [1, "card-footer"], ["routerLink", "/register", 1, "link"], [1, "loading-state"], [1, "loader"], [1, "auth-form", 3, "ngSubmit"], [1, "form-group"], ["for", "email"], ["type", "email", "id", "email", "name", "email", "placeholder", "pelda@email.com", "required", "", 1, "input-field", 3, "ngModelChange", "ngModel"], ["for", "password"], ["type", "password", "id", "password", "name", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required", "", 1, "input-field", 3, "ngModelChange", "ngModel"], ["class", "error-msg fade-in", 4, "ngIf"], ["type", "submit", 1, "btn-submit"], [1, "error-msg", "fade-in"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      i02.\u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
      i02.\u0275\u0275text(4, "\xDCdv\xF6zl\xFCnk!");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(5, "p", 4);
      i02.\u0275\u0275text(6, "Jelentkezz be a fi\xF3kodba");
      i02.\u0275\u0275elementEnd()();
      i02.\u0275\u0275template(7, LoginComponent_div_7_Template, 2, 0, "div", 5)(8, LoginComponent_form_8_Template, 12, 3, "form", 6);
      i02.\u0275\u0275elementStart(9, "div", 7)(10, "p");
      i02.\u0275\u0275text(11, "M\xE9g nincs fi\xF3kod? ");
      i02.\u0275\u0275elementStart(12, "a", 8);
      i02.\u0275\u0275text(13, "Regisztr\xE1lj itt!");
      i02.\u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      i02.\u0275\u0275advance(7);
      i02.\u0275\u0275property("ngIf", ctx.isLoading);
      i02.\u0275\u0275advance();
      i02.\u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule, i3.NgClass, i3.NgComponentOutlet, i3.NgForOf, i3.NgIf, i3.NgTemplateOutlet, i3.NgStyle, i3.NgSwitch, i3.NgSwitchCase, i3.NgSwitchDefault, i3.NgPlural, i3.NgPluralCase, FormsModule, i4.\u0275NgNoValidate, i4.NgSelectOption, i4.\u0275NgSelectMultipleOption, i4.DefaultValueAccessor, i4.NumberValueAccessor, i4.RangeValueAccessor, i4.CheckboxControlValueAccessor, i4.SelectControlValueAccessor, i4.SelectMultipleControlValueAccessor, i4.RadioControlValueAccessor, i4.NgControlStatus, i4.NgControlStatusGroup, i4.RequiredValidator, i4.MinLengthValidator, i4.MaxLengthValidator, i4.PatternValidator, i4.CheckboxRequiredValidator, i4.EmailValidator, i4.MinValidator, i4.MaxValidator, i4.NgModel, i4.NgModelGroup, i4.NgForm, RouterModule, i2.RouterOutlet, i2.RouterLink, i2.RouterLinkActive, i2.\u0275EmptyOutletComponent, i3.AsyncPipe, i3.UpperCasePipe, i3.LowerCasePipe, i3.JsonPipe, i3.SlicePipe, i3.DecimalPipe, i3.PercentPipe, i3.TitleCasePipe, i3.CurrencyPipe, i3.DatePipe, i3.I18nPluralPipe, i3.I18nSelectPipe, i3.KeyValuePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  --primary: #00f0ff;\n  --bg-dark: #050b14;\n  --bg-panel: #0f1623;\n  --text-main: #fff;\n  --input-bg: #111827;\n  --accent-red: #ff003c;\n}\n.auth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  background-image:\n    radial-gradient(\n      circle at center,\n      #1a2332 0%,\n      var(--bg-dark) 70%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 1rem;\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: var(--bg-panel);\n  width: 100%;\n  max-width: 450px;\n  padding: 2.5rem;\n  border-radius: 16px;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  position: relative;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_slideUp 0.5s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.auth-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--primary),\n      transparent);\n  box-shadow: 0 0 15px var(--primary);\n}\n.card-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 800;\n  color: #fff;\n  margin: 0 0 0.5rem;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  margin: 0;\n  font-size: 0.95rem;\n}\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  color: #cbd5e1;\n  font-size: 0.85rem;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.input-field[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.9rem 1rem;\n  background: var(--input-bg);\n  border: 1px solid #334155;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.3s ease;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: #4b5563;\n}\n.input-field[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.2);\n  background: #162032;\n}\n.btn-submit[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  width: 100%;\n  padding: 1rem;\n  background: var(--primary);\n  color: #000;\n  border: none;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);\n}\n.btn-submit[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0 25px rgba(0, 240, 255, 0.5);\n  background: #33f3ff;\n}\n.error-msg[_ngcontent-%COMP%] {\n  color: #ff8fa3;\n  background: rgba(255, 0, 60, 0.1);\n  padding: 0.75rem;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  text-align: center;\n  border: 1px solid rgba(255, 0, 60, 0.3);\n}\n.card-footer[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  text-align: center;\n  font-size: 0.9rem;\n  color: #94a3b8;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n  padding-top: 1.5rem;\n}\n.link[_ngcontent-%COMP%] {\n  color: var(--primary);\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.2s;\n}\n.link[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  text-shadow: 0 0 8px var(--primary);\n}\n.loader[_ngcontent-%COMP%] {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, FormsModule, RouterModule], template: '<div class="auth-page">\r\n  <div class="auth-card">\r\n    \r\n    <div class="card-header">\r\n      <h1 class="title">\xDCdv\xF6zl\xFCnk!</h1>\r\n      <p class="subtitle">Jelentkezz be a fi\xF3kodba</p>\r\n    </div>\r\n\r\n    <div *ngIf="isLoading" class="loading-state">\r\n      <div class="loader"></div>\r\n    </div>\r\n\r\n    <form *ngIf="!isLoading" (ngSubmit)="submit()" class="auth-form">\r\n      \r\n      <div class="form-group">\r\n        <label for="email">Email C\xEDm</label>\r\n        <input \r\n          type="email" \r\n          id="email"\r\n          [(ngModel)]="model.email" \r\n          name="email" \r\n          class="input-field" \r\n          placeholder="pelda@email.com"\r\n          required />\r\n      </div>\r\n\r\n      <div class="form-group">\r\n        <label for="password">Jelsz\xF3</label>\r\n        <input \r\n          type="password" \r\n          id="password"\r\n          [(ngModel)]="model.password" \r\n          name="password" \r\n          class="input-field" \r\n          placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"\r\n          required />\r\n      </div>\r\n\r\n      <div *ngIf="error" class="error-msg fade-in">\r\n        {{ error }}\r\n      </div>\r\n\r\n      <button type="submit" class="btn-submit">\r\n        Bejelentkez\xE9s\r\n      </button>\r\n\r\n    </form>\r\n\r\n    <div class="card-footer">\r\n      <p>M\xE9g nincs fi\xF3kod? <a routerLink="/register" class="link">Regisztr\xE1lj itt!</a></p>\r\n    </div>\r\n\r\n  </div>\r\n</div>', styles: ['/* src/app/features/auth/pages/login/login.component.css */\n:host {\n  display: block;\n  --primary: #00f0ff;\n  --bg-dark: #050b14;\n  --bg-panel: #0f1623;\n  --text-main: #fff;\n  --input-bg: #111827;\n  --accent-red: #ff003c;\n}\n.auth-page {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  background-image:\n    radial-gradient(\n      circle at center,\n      #1a2332 0%,\n      var(--bg-dark) 70%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 1rem;\n}\n.auth-card {\n  background: var(--bg-panel);\n  width: 100%;\n  max-width: 450px;\n  padding: 2.5rem;\n  border-radius: 16px;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  position: relative;\n  overflow: hidden;\n  animation: slideUp 0.5s ease-out;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.auth-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--primary),\n      transparent);\n  box-shadow: 0 0 15px var(--primary);\n}\n.card-header {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.title {\n  font-size: 2rem;\n  font-weight: 800;\n  color: #fff;\n  margin: 0 0 0.5rem;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.subtitle {\n  color: #94a3b8;\n  margin: 0;\n  font-size: 0.95rem;\n}\n.auth-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-group label {\n  display: block;\n  color: #cbd5e1;\n  font-size: 0.85rem;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.input-field {\n  width: 100%;\n  padding: 0.9rem 1rem;\n  background: var(--input-bg);\n  border: 1px solid #334155;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.3s ease;\n}\n.input-field::placeholder {\n  color: #4b5563;\n}\n.input-field:focus {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.2);\n  background: #162032;\n}\n.btn-submit {\n  margin-top: 0.5rem;\n  width: 100%;\n  padding: 1rem;\n  background: var(--primary);\n  color: #000;\n  border: none;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);\n}\n.btn-submit:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0 25px rgba(0, 240, 255, 0.5);\n  background: #33f3ff;\n}\n.error-msg {\n  color: #ff8fa3;\n  background: rgba(255, 0, 60, 0.1);\n  padding: 0.75rem;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  text-align: center;\n  border: 1px solid rgba(255, 0, 60, 0.3);\n}\n.card-footer {\n  margin-top: 2rem;\n  text-align: center;\n  font-size: 0.9rem;\n  color: #94a3b8;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n  padding-top: 1.5rem;\n}\n.link {\n  color: var(--primary);\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.2s;\n}\n.link:hover {\n  color: #fff;\n  text-shadow: 0 0 8px var(--primary);\n}\n.loader {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin: 0 auto;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.fade-in {\n  animation: fadeIn 0.3s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: i2.Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/pages/login/login.component.ts", lineNumber: 16 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Fauth%2Fpages%2Flogin%2Flogin.component.ts%40LoginComponent";
  function LoginComponent_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i02.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i02.\u0275\u0275replaceMetadata(LoginComponent, m.default, [i02, i3, i4, i2, auth_service_exports], [CommonModule, FormsModule, RouterModule, Component], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && LoginComponent_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && LoginComponent_HmrLoad(d.timestamp)));
})();

// src/app/features/auth/pages/register/register.component.ts
import { Component as Component2 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { FormsModule as FormsModule2 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
import { CommonModule as CommonModule2 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import { RouterModule as RouterModule2 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i03 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i22 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i32 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import * as i42 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
function RegisterComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    i03.\u0275\u0275elementStart(0, "div", 9);
    i03.\u0275\u0275element(1, "div", 10);
    i03.\u0275\u0275elementEnd();
  }
}
function RegisterComponent_form_8_div_13_Template(rf, ctx) {
  if (rf & 1) {
    i03.\u0275\u0275elementStart(0, "div", 21);
    i03.\u0275\u0275text(1);
    i03.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = i03.\u0275\u0275nextContext(2);
    i03.\u0275\u0275advance();
    i03.\u0275\u0275textInterpolate1(" ", ctx_r1.error, " ");
  }
}
function RegisterComponent_form_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = i03.\u0275\u0275getCurrentView();
    i03.\u0275\u0275elementStart(0, "form", 11);
    i03.\u0275\u0275listener("ngSubmit", function RegisterComponent_form_8_Template_form_ngSubmit_0_listener() {
      i03.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i03.\u0275\u0275nextContext();
      return i03.\u0275\u0275resetView(ctx_r1.submit());
    });
    i03.\u0275\u0275elementStart(1, "div", 12)(2, "label", 13);
    i03.\u0275\u0275text(3, "Felhaszn\xE1l\xF3n\xE9v");
    i03.\u0275\u0275elementEnd();
    i03.\u0275\u0275elementStart(4, "input", 14);
    i03.\u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_form_8_Template_input_ngModelChange_4_listener($event) {
      i03.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i03.\u0275\u0275nextContext();
      i03.\u0275\u0275twoWayBindingSet(ctx_r1.model.username, $event) || (ctx_r1.model.username = $event);
      return i03.\u0275\u0275resetView($event);
    });
    i03.\u0275\u0275elementEnd()();
    i03.\u0275\u0275elementStart(5, "div", 12)(6, "label", 15);
    i03.\u0275\u0275text(7, "Email C\xEDm");
    i03.\u0275\u0275elementEnd();
    i03.\u0275\u0275elementStart(8, "input", 16);
    i03.\u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_form_8_Template_input_ngModelChange_8_listener($event) {
      i03.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i03.\u0275\u0275nextContext();
      i03.\u0275\u0275twoWayBindingSet(ctx_r1.model.email, $event) || (ctx_r1.model.email = $event);
      return i03.\u0275\u0275resetView($event);
    });
    i03.\u0275\u0275elementEnd()();
    i03.\u0275\u0275elementStart(9, "div", 12)(10, "label", 17);
    i03.\u0275\u0275text(11, "Jelsz\xF3");
    i03.\u0275\u0275elementEnd();
    i03.\u0275\u0275elementStart(12, "input", 18);
    i03.\u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_form_8_Template_input_ngModelChange_12_listener($event) {
      i03.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i03.\u0275\u0275nextContext();
      i03.\u0275\u0275twoWayBindingSet(ctx_r1.model.password, $event) || (ctx_r1.model.password = $event);
      return i03.\u0275\u0275resetView($event);
    });
    i03.\u0275\u0275elementEnd()();
    i03.\u0275\u0275template(13, RegisterComponent_form_8_div_13_Template, 2, 1, "div", 19);
    i03.\u0275\u0275elementStart(14, "button", 20);
    i03.\u0275\u0275text(15, " Regisztr\xE1ci\xF3 ");
    i03.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = i03.\u0275\u0275nextContext();
    i03.\u0275\u0275advance(4);
    i03.\u0275\u0275twoWayProperty("ngModel", ctx_r1.model.username);
    i03.\u0275\u0275advance(4);
    i03.\u0275\u0275twoWayProperty("ngModel", ctx_r1.model.email);
    i03.\u0275\u0275advance(4);
    i03.\u0275\u0275twoWayProperty("ngModel", ctx_r1.model.password);
    i03.\u0275\u0275advance();
    i03.\u0275\u0275property("ngIf", ctx_r1.error);
  }
}
var RegisterComponent = class _RegisterComponent {
  authService;
  router;
  model = {
    username: "",
    email: "",
    password: ""
  };
  isLoading = false;
  error = "";
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  submit() {
    this.error = "";
    this.isLoading = true;
    this.authService.register(this.model).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(["/user-dashboard"]);
      },
      error: (err) => {
        console.error("REGISTER ERROR:", err);
        this.isLoading = false;
        this.error = err.error?.message ?? "Hiba t\xF6rt\xE9nt a regisztr\xE1ci\xF3 sor\xE1n.";
      }
    });
  }
  static \u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegisterComponent)(i03.\u0275\u0275directiveInject(AuthService), i03.\u0275\u0275directiveInject(i22.Router));
  };
  static \u0275cmp = /* @__PURE__ */ i03.\u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 14, vars: 2, consts: [[1, "auth-page"], [1, "auth-card"], [1, "card-header"], [1, "title"], [1, "subtitle"], ["class", "loading-state", 4, "ngIf"], ["class", "auth-form", 3, "ngSubmit", 4, "ngIf"], [1, "card-footer"], ["routerLink", "/login", 1, "link"], [1, "loading-state"], [1, "loader"], [1, "auth-form", 3, "ngSubmit"], [1, "form-group"], ["for", "username"], ["type", "text", "id", "username", "name", "username", "placeholder", "GamerTag123", "required", "", 1, "input-field", 3, "ngModelChange", "ngModel"], ["for", "email"], ["type", "email", "id", "email", "name", "email", "placeholder", "pelda@email.com", "required", "", 1, "input-field", 3, "ngModelChange", "ngModel"], ["for", "password"], ["type", "password", "id", "password", "name", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required", "", 1, "input-field", 3, "ngModelChange", "ngModel"], ["class", "error-msg fade-in", 4, "ngIf"], ["type", "submit", 1, "btn-submit"], [1, "error-msg", "fade-in"]], template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      i03.\u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
      i03.\u0275\u0275text(4, "Csatlakozz Hozz\xE1nk!");
      i03.\u0275\u0275elementEnd();
      i03.\u0275\u0275elementStart(5, "p", 4);
      i03.\u0275\u0275text(6, "Hozz l\xE9tre egy \xFAj fi\xF3kot");
      i03.\u0275\u0275elementEnd()();
      i03.\u0275\u0275template(7, RegisterComponent_div_7_Template, 2, 0, "div", 5)(8, RegisterComponent_form_8_Template, 16, 4, "form", 6);
      i03.\u0275\u0275elementStart(9, "div", 7)(10, "p");
      i03.\u0275\u0275text(11, "M\xE1r van fi\xF3kod? ");
      i03.\u0275\u0275elementStart(12, "a", 8);
      i03.\u0275\u0275text(13, "Jelentkezz be!");
      i03.\u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      i03.\u0275\u0275advance(7);
      i03.\u0275\u0275property("ngIf", ctx.isLoading);
      i03.\u0275\u0275advance();
      i03.\u0275\u0275property("ngIf", !ctx.isLoading);
    }
  }, dependencies: [CommonModule2, i32.NgClass, i32.NgComponentOutlet, i32.NgForOf, i32.NgIf, i32.NgTemplateOutlet, i32.NgStyle, i32.NgSwitch, i32.NgSwitchCase, i32.NgSwitchDefault, i32.NgPlural, i32.NgPluralCase, FormsModule2, i42.\u0275NgNoValidate, i42.NgSelectOption, i42.\u0275NgSelectMultipleOption, i42.DefaultValueAccessor, i42.NumberValueAccessor, i42.RangeValueAccessor, i42.CheckboxControlValueAccessor, i42.SelectControlValueAccessor, i42.SelectMultipleControlValueAccessor, i42.RadioControlValueAccessor, i42.NgControlStatus, i42.NgControlStatusGroup, i42.RequiredValidator, i42.MinLengthValidator, i42.MaxLengthValidator, i42.PatternValidator, i42.CheckboxRequiredValidator, i42.EmailValidator, i42.MinValidator, i42.MaxValidator, i42.NgModel, i42.NgModelGroup, i42.NgForm, RouterModule2, i22.RouterOutlet, i22.RouterLink, i22.RouterLinkActive, i22.\u0275EmptyOutletComponent, i32.AsyncPipe, i32.UpperCasePipe, i32.LowerCasePipe, i32.JsonPipe, i32.SlicePipe, i32.DecimalPipe, i32.PercentPipe, i32.TitleCasePipe, i32.CurrencyPipe, i32.DatePipe, i32.I18nPluralPipe, i32.I18nSelectPipe, i32.KeyValuePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  --primary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-panel: #0f1623;\n  --text-main: #fff;\n  --input-bg: #111827;\n}\n.auth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  background-image:\n    radial-gradient(\n      circle at center,\n      #1f1a33 0%,\n      var(--bg-dark) 70%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 1rem;\n}\n.auth-card[_ngcontent-%COMP%] {\n  background: var(--bg-panel);\n  width: 100%;\n  max-width: 450px;\n  padding: 2.5rem;\n  border-radius: 16px;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  position: relative;\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_slideUp 0.5s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.auth-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--primary),\n      transparent);\n  box-shadow: 0 0 15px var(--primary);\n}\n.card-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 800;\n  color: #fff;\n  margin: 0 0 0.5rem;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  margin: 0;\n  font-size: 0.95rem;\n}\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  color: #cbd5e1;\n  font-size: 0.85rem;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.input-field[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.9rem 1rem;\n  background: var(--input-bg);\n  border: 1px solid #334155;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.3s ease;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: #4b5563;\n}\n.input-field[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 2px rgba(112, 0, 255, 0.3);\n  background: #1a1625;\n}\n.btn-submit[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  width: 100%;\n  padding: 1rem;\n  background: var(--primary);\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  box-shadow: 0 0 15px rgba(112, 0, 255, 0.4);\n}\n.btn-submit[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0 25px rgba(112, 0, 255, 0.6);\n  background: #8a2be2;\n}\n.error-msg[_ngcontent-%COMP%] {\n  color: #ff8fa3;\n  background: rgba(255, 0, 60, 0.1);\n  padding: 0.75rem;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  text-align: center;\n  border: 1px solid rgba(255, 0, 60, 0.3);\n}\n.card-footer[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  text-align: center;\n  font-size: 0.9rem;\n  color: #94a3b8;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n  padding-top: 1.5rem;\n}\n.link[_ngcontent-%COMP%] {\n  color: var(--primary);\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.2s;\n}\n.link[_ngcontent-%COMP%]:hover {\n  color: #d8b4fe;\n  text-shadow: 0 0 8px var(--primary);\n}\n.loader[_ngcontent-%COMP%] {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=register.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i03.\u0275setClassMetadata(RegisterComponent, [{
    type: Component2,
    args: [{ selector: "app-register", standalone: true, imports: [CommonModule2, FormsModule2, RouterModule2], template: '<div class="auth-page">\r\n  <div class="auth-card">\r\n    \r\n    <div class="card-header">\r\n      <h1 class="title">Csatlakozz Hozz\xE1nk!</h1>\r\n      <p class="subtitle">Hozz l\xE9tre egy \xFAj fi\xF3kot</p>\r\n    </div>\r\n\r\n    <div *ngIf="isLoading" class="loading-state">\r\n      <div class="loader"></div>\r\n    </div>\r\n\r\n    <form *ngIf="!isLoading" (ngSubmit)="submit()" class="auth-form">\r\n      \r\n      <div class="form-group">\r\n        <label for="username">Felhaszn\xE1l\xF3n\xE9v</label>\r\n        <input \r\n          type="text" \r\n          id="username"\r\n          [(ngModel)]="model.username" \r\n          name="username" \r\n          class="input-field" \r\n          placeholder="GamerTag123"\r\n          required />\r\n      </div>\r\n\r\n      <div class="form-group">\r\n        <label for="email">Email C\xEDm</label>\r\n        <input \r\n          type="email" \r\n          id="email"\r\n          [(ngModel)]="model.email" \r\n          name="email" \r\n          class="input-field" \r\n          placeholder="pelda@email.com"\r\n          required />\r\n      </div>\r\n\r\n      <div class="form-group">\r\n        <label for="password">Jelsz\xF3</label>\r\n        <input \r\n          type="password" \r\n          id="password"\r\n          [(ngModel)]="model.password" \r\n          name="password" \r\n          class="input-field" \r\n          placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"\r\n          required />\r\n      </div>\r\n\r\n      <div *ngIf="error" class="error-msg fade-in">\r\n        {{ error }}\r\n      </div>\r\n\r\n      <button type="submit" class="btn-submit">\r\n        Regisztr\xE1ci\xF3\r\n      </button>\r\n\r\n    </form>\r\n\r\n    <div class="card-footer">\r\n      <p>M\xE1r van fi\xF3kod? <a routerLink="/login" class="link">Jelentkezz be!</a></p>\r\n    </div>\r\n\r\n  </div>\r\n</div>', styles: ['/* src/app/features/auth/pages/register/register.component.css */\n:host {\n  display: block;\n  --primary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-panel: #0f1623;\n  --text-main: #fff;\n  --input-bg: #111827;\n}\n.auth-page {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  background-image:\n    radial-gradient(\n      circle at center,\n      #1f1a33 0%,\n      var(--bg-dark) 70%);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 1rem;\n}\n.auth-card {\n  background: var(--bg-panel);\n  width: 100%;\n  max-width: 450px;\n  padding: 2.5rem;\n  border-radius: 16px;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  position: relative;\n  overflow: hidden;\n  animation: slideUp 0.5s ease-out;\n}\n@keyframes slideUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.auth-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--primary),\n      transparent);\n  box-shadow: 0 0 15px var(--primary);\n}\n.card-header {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.title {\n  font-size: 2rem;\n  font-weight: 800;\n  color: #fff;\n  margin: 0 0 0.5rem;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n}\n.subtitle {\n  color: #94a3b8;\n  margin: 0;\n  font-size: 0.95rem;\n}\n.auth-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-group label {\n  display: block;\n  color: #cbd5e1;\n  font-size: 0.85rem;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.input-field {\n  width: 100%;\n  padding: 0.9rem 1rem;\n  background: var(--input-bg);\n  border: 1px solid #334155;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.3s ease;\n}\n.input-field::placeholder {\n  color: #4b5563;\n}\n.input-field:focus {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 2px rgba(112, 0, 255, 0.3);\n  background: #1a1625;\n}\n.btn-submit {\n  margin-top: 0.5rem;\n  width: 100%;\n  padding: 1rem;\n  background: var(--primary);\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  box-shadow: 0 0 15px rgba(112, 0, 255, 0.4);\n}\n.btn-submit:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0 25px rgba(112, 0, 255, 0.6);\n  background: #8a2be2;\n}\n.error-msg {\n  color: #ff8fa3;\n  background: rgba(255, 0, 60, 0.1);\n  padding: 0.75rem;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  text-align: center;\n  border: 1px solid rgba(255, 0, 60, 0.3);\n}\n.card-footer {\n  margin-top: 2rem;\n  text-align: center;\n  font-size: 0.9rem;\n  color: #94a3b8;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n  padding-top: 1.5rem;\n}\n.link {\n  color: var(--primary);\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.2s;\n}\n.link:hover {\n  color: #d8b4fe;\n  text-shadow: 0 0 8px var(--primary);\n}\n.loader {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin: 0 auto;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.fade-in {\n  animation: fadeIn 0.3s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=register.component.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: i22.Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i03.\u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src/app/features/auth/pages/register/register.component.ts", lineNumber: 16 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Fauth%2Fpages%2Fregister%2Fregister.component.ts%40RegisterComponent";
  function RegisterComponent_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i03.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i03.\u0275\u0275replaceMetadata(RegisterComponent, m.default, [i03, i32, i42, i22, auth_service_exports], [CommonModule2, FormsModule2, RouterModule2, Component2], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && RegisterComponent_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && RegisterComponent_HmrLoad(d.timestamp)));
})();

// src/app/features/dashboards/admin-dashboard/admin-dashboard..component.ts
import { Component as Component3 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { CommonModule as CommonModule3 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import { RouterModule as RouterModule3 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i04 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i12 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import * as i23 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
var AdminDashboardComponent = class _AdminDashboardComponent {
  static \u0275fac = function AdminDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminDashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ i04.\u0275\u0275defineComponent({ type: _AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 31, vars: 0, consts: [[1, "admin-page"], [1, "content-wrapper"], [1, "page-header"], [1, "title"], [1, "decoration-line"], [1, "subtitle"], [1, "dashboard-grid"], ["routerLink", "/manage-movies", 1, "action-card"], [1, "card-icon"], [1, "card-content"], [1, "card-arrow"], ["routerLink", "/manage-users", 1, "action-card"]], template: function AdminDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      i04.\u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "header", 2)(3, "h1", 3);
      i04.\u0275\u0275text(4, "Admin Fel\xFClet");
      i04.\u0275\u0275elementEnd();
      i04.\u0275\u0275element(5, "div", 4);
      i04.\u0275\u0275elementStart(6, "p", 5);
      i04.\u0275\u0275text(7, "Rendszer karbantart\xE1sa \xE9s kezel\xE9se");
      i04.\u0275\u0275elementEnd()();
      i04.\u0275\u0275elementStart(8, "div", 6)(9, "div", 7)(10, "div", 8)(11, "span");
      i04.\u0275\u0275text(12, "\u{1F39E}\uFE0F");
      i04.\u0275\u0275elementEnd()();
      i04.\u0275\u0275elementStart(13, "div", 9)(14, "h2");
      i04.\u0275\u0275text(15, "Filmek Kezel\xE9se");
      i04.\u0275\u0275elementEnd();
      i04.\u0275\u0275elementStart(16, "p");
      i04.\u0275\u0275text(17, "\xDAj filmek hozz\xE1ad\xE1sa, szerkeszt\xE9se, t\xF6rl\xE9se \xE9s m\u0171fajok karbantart\xE1sa.");
      i04.\u0275\u0275elementEnd()();
      i04.\u0275\u0275elementStart(18, "div", 10);
      i04.\u0275\u0275text(19, "\u2192");
      i04.\u0275\u0275elementEnd()();
      i04.\u0275\u0275elementStart(20, "div", 11)(21, "div", 8)(22, "span");
      i04.\u0275\u0275text(23, "\u{1F464}");
      i04.\u0275\u0275elementEnd()();
      i04.\u0275\u0275elementStart(24, "div", 9)(25, "h2");
      i04.\u0275\u0275text(26, "Felhaszn\xE1l\xF3k Kezel\xE9se");
      i04.\u0275\u0275elementEnd();
      i04.\u0275\u0275elementStart(27, "p");
      i04.\u0275\u0275text(28, "Felhaszn\xE1l\xF3i fi\xF3kok list\xE1z\xE1sa, jogosults\xE1gok m\xF3dos\xEDt\xE1sa \xE9s tilt\xE1s.");
      i04.\u0275\u0275elementEnd()();
      i04.\u0275\u0275elementStart(29, "div", 10);
      i04.\u0275\u0275text(30, "\u2192");
      i04.\u0275\u0275elementEnd()()()()();
    }
  }, dependencies: [CommonModule3, i12.NgClass, i12.NgComponentOutlet, i12.NgForOf, i12.NgIf, i12.NgTemplateOutlet, i12.NgStyle, i12.NgSwitch, i12.NgSwitchCase, i12.NgSwitchDefault, i12.NgPlural, i12.NgPluralCase, RouterModule3, i23.RouterOutlet, i23.RouterLink, i23.RouterLinkActive, i23.\u0275EmptyOutletComponent, i12.AsyncPipe, i12.UpperCasePipe, i12.LowerCasePipe, i12.JsonPipe, i12.SlicePipe, i12.DecimalPipe, i12.PercentPipe, i12.TitleCasePipe, i12.CurrencyPipe, i12.DatePipe, i12.I18nPluralPipe, i12.I18nSelectPipe, i12.KeyValuePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  --primary: #00f0ff;\n  --secondary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --card-radius: 16px;\n}\n.admin-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  background-image:\n    radial-gradient(\n      circle at 50% 0%,\n      #1a2332 0%,\n      var(--bg-dark) 80%);\n  color: var(--text-main);\n  font-family:\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  max-width: 1000px;\n  width: 100%;\n  padding: 2rem;\n  text-align: center;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 4rem;\n  animation: _ngcontent-%COMP%_fadeInDown 0.6s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  letter-spacing: 3px;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  display: inline-block;\n}\n.decoration-line[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 4px;\n  background: var(--primary);\n  margin: 0.5rem auto 1rem auto;\n  box-shadow: 0 0 15px var(--primary);\n  border-radius: 2px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 1.1rem;\n  margin: 0;\n  letter-spacing: 0.5px;\n}\n.dashboard-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n  animation: _ngcontent-%COMP%_fadeInUp 0.8s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.action-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: var(--card-radius);\n  padding: 2.5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n  position: relative;\n  overflow: hidden;\n  text-decoration: none;\n}\n.action-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-10px);\n  background-color: rgba(15, 22, 35, 0.8);\n  border-color: var(--primary);\n  box-shadow: 0 20px 50px rgba(0, 240, 255, 0.15);\n}\n.action-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--primary),\n      transparent);\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.action-card[_ngcontent-%COMP%]:hover::before {\n  opacity: 1;\n}\n.card-icon[_ngcontent-%COMP%] {\n  font-size: 3.5rem;\n  margin-bottom: 1.5rem;\n  background: rgba(0, 240, 255, 0.1);\n  width: 80px;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  transition: transform 0.3s, background 0.3s;\n}\n.action-card[_ngcontent-%COMP%]:hover   .card-icon[_ngcontent-%COMP%] {\n  transform: scale(1.1) rotate(5deg);\n  background: rgba(0, 240, 255, 0.2);\n  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);\n}\n.card-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 1.5rem;\n  margin: 0 0 0.5rem 0;\n  font-weight: 700;\n}\n.card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 0.95rem;\n  line-height: 1.5;\n  margin: 0;\n}\n.card-arrow[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  font-size: 1.5rem;\n  color: var(--primary);\n  opacity: 0;\n  transform: translateX(-20px);\n  transition: all 0.3s;\n}\n.action-card[_ngcontent-%COMP%]:hover   .card-arrow[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateX(0);\n}\n@media (max-width: 768px) {\n  .content-wrapper[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .title[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .action-card[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n/*# sourceMappingURL=admin-dashboard.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i04.\u0275setClassMetadata(AdminDashboardComponent, [{
    type: Component3,
    args: [{ selector: "app-admin-dashboard", standalone: true, imports: [CommonModule3, RouterModule3], template: '<div class="admin-page">\r\n  <div class="content-wrapper">\r\n    \r\n    <header class="page-header">\r\n      <h1 class="title">Admin Fel\xFClet</h1>\r\n      <div class="decoration-line"></div>\r\n      <p class="subtitle">Rendszer karbantart\xE1sa \xE9s kezel\xE9se</p>\r\n    </header>\r\n\r\n    <div class="dashboard-grid">\r\n      \r\n      <!-- Filmek Kezel\xE9se K\xE1rtya -->\r\n      <div class="action-card" routerLink="/manage-movies">\r\n        <div class="card-icon">\r\n          <span>\u{1F39E}\uFE0F</span>\r\n        </div>\r\n        <div class="card-content">\r\n          <h2>Filmek Kezel\xE9se</h2>\r\n          <p>\xDAj filmek hozz\xE1ad\xE1sa, szerkeszt\xE9se, t\xF6rl\xE9se \xE9s m\u0171fajok karbantart\xE1sa.</p>\r\n        </div>\r\n        <div class="card-arrow">\u2192</div>\r\n      </div>\r\n\r\n      <!-- Felhaszn\xE1l\xF3k Kezel\xE9se K\xE1rtya -->\r\n      <div class="action-card" routerLink="/manage-users">\r\n        <div class="card-icon">\r\n          <span>\u{1F464}</span>\r\n        </div>\r\n        <div class="card-content">\r\n          <h2>Felhaszn\xE1l\xF3k Kezel\xE9se</h2>\r\n          <p>Felhaszn\xE1l\xF3i fi\xF3kok list\xE1z\xE1sa, jogosults\xE1gok m\xF3dos\xEDt\xE1sa \xE9s tilt\xE1s.</p>\r\n        </div>\r\n        <div class="card-arrow">\u2192</div>\r\n      </div>\r\n\r\n    </div>\r\n\r\n  </div>\r\n</div>', styles: ['/* src/app/features/dashboards/admin-dashboard/admin-dashboard.component.css */\n:host {\n  display: block;\n  --primary: #00f0ff;\n  --secondary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --card-radius: 16px;\n}\n.admin-page {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  background-image:\n    radial-gradient(\n      circle at 50% 0%,\n      #1a2332 0%,\n      var(--bg-dark) 80%);\n  color: var(--text-main);\n  font-family:\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.content-wrapper {\n  max-width: 1000px;\n  width: 100%;\n  padding: 2rem;\n  text-align: center;\n}\n.page-header {\n  margin-bottom: 4rem;\n  animation: fadeInDown 0.6s ease;\n}\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.title {\n  font-size: 3rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  letter-spacing: 3px;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  display: inline-block;\n}\n.decoration-line {\n  width: 100px;\n  height: 4px;\n  background: var(--primary);\n  margin: 0.5rem auto 1rem auto;\n  box-shadow: 0 0 15px var(--primary);\n  border-radius: 2px;\n}\n.subtitle {\n  color: var(--text-muted);\n  font-size: 1.1rem;\n  margin: 0;\n  letter-spacing: 0.5px;\n}\n.dashboard-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n  animation: fadeInUp 0.8s ease;\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.action-card {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: var(--card-radius);\n  padding: 2.5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n  position: relative;\n  overflow: hidden;\n  text-decoration: none;\n}\n.action-card:hover {\n  transform: translateY(-10px);\n  background-color: rgba(15, 22, 35, 0.8);\n  border-color: var(--primary);\n  box-shadow: 0 20px 50px rgba(0, 240, 255, 0.15);\n}\n.action-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--primary),\n      transparent);\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.action-card:hover::before {\n  opacity: 1;\n}\n.card-icon {\n  font-size: 3.5rem;\n  margin-bottom: 1.5rem;\n  background: rgba(0, 240, 255, 0.1);\n  width: 80px;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  transition: transform 0.3s, background 0.3s;\n}\n.action-card:hover .card-icon {\n  transform: scale(1.1) rotate(5deg);\n  background: rgba(0, 240, 255, 0.2);\n  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);\n}\n.card-content h2 {\n  color: #fff;\n  font-size: 1.5rem;\n  margin: 0 0 0.5rem 0;\n  font-weight: 700;\n}\n.card-content p {\n  color: var(--text-muted);\n  font-size: 0.95rem;\n  line-height: 1.5;\n  margin: 0;\n}\n.card-arrow {\n  margin-top: 2rem;\n  font-size: 1.5rem;\n  color: var(--primary);\n  opacity: 0;\n  transform: translateX(-20px);\n  transition: all 0.3s;\n}\n.action-card:hover .card-arrow {\n  opacity: 1;\n  transform: translateX(0);\n}\n@media (max-width: 768px) {\n  .content-wrapper {\n    padding: 1rem;\n  }\n  .title {\n    font-size: 2rem;\n  }\n  .action-card {\n    padding: 2rem;\n  }\n}\n/*# sourceMappingURL=admin-dashboard.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i04.\u0275setClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src/app/features/dashboards/admin-dashboard/admin-dashboard..component.ts", lineNumber: 12 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Fdashboards%2Fadmin-dashboard%2Fadmin-dashboard..component.ts%40AdminDashboardComponent";
  function AdminDashboardComponent_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i04.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i04.\u0275\u0275replaceMetadata(AdminDashboardComponent, m.default, [i04, i12, i23], [CommonModule3, RouterModule3, Component3], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && AdminDashboardComponent_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && AdminDashboardComponent_HmrLoad(d.timestamp)));
})();

// src/app/features/dashboards/user-dashboard/user-dashboard..component.ts
import { Component as Component4 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { CommonModule as CommonModule4 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import { FormsModule as FormsModule3 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
import { catchError, forkJoin, of as of4 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/rxjs.js?v=3f3fab55";
import * as i09 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";

// src/app/core/services/movie.service.ts
var movie_service_exports = {};
__export(movie_service_exports, {
  MovieService: () => MovieService
});
import { Injectable as Injectable2 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { tap as tap2 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/rxjs.js?v=3f3fab55";
import * as i05 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i13 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common_http.js?v=3f3fab55";
var MovieService = class _MovieService {
  http;
  movieUrl = `${environment.apiUrl}/Movie`;
  ratingUrl = `${environment.apiUrl}/Rating`;
  favoriteUrl = `${environment.apiUrl}/Favorite`;
  viewHistoryUrl = `${environment.apiUrl}/ViewHistory`;
  constructor(http) {
    this.http = http;
  }
  getMovies() {
    console.log("MovieService: Filmek lek\xE9r\xE9se...");
    return this.http.get(this.movieUrl).pipe(tap2((response) => {
      console.log("API v\xE1lasz:", response);
    }));
  }
  rateMovie(dto) {
    return this.http.post(this.ratingUrl, dto).pipe(tap2(() => console.log(`Film \xE9rt\xE9kelve: ${dto.movieId}, \xC9rt\xE9kel\xE9s: ${dto.rating}`)));
  }
  favoriteMovie(dto) {
    return this.http.post(this.favoriteUrl, dto).pipe(tap2(() => console.log(`Film kedvencekhez adva: ${dto.movieId}`)));
  }
  markAsSeen(dto) {
    return this.http.post(this.viewHistoryUrl, dto).pipe(tap2(() => console.log(`Film l\xE1tottnak jel\xF6lve: ${dto.movieId}`)));
  }
  getById(id) {
    return this.http.get(`${this.movieUrl}/${id}`);
  }
  create(movie) {
    return this.http.post(this.movieUrl, movie);
  }
  update(id, movie) {
    return this.http.put(`${this.movieUrl}/${id}`, movie);
  }
  delete(id) {
    return this.http.delete(`${this.movieUrl}/${id}`).pipe(tap2(() => {
      console.log(`Film t\xF6r\xF6lve: ${id}`);
    }));
  }
  static \u0275fac = function MovieService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MovieService)(i05.\u0275\u0275inject(i13.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i05.\u0275\u0275defineInjectable({ token: _MovieService, factory: _MovieService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i05.\u0275setClassMetadata(MovieService, [{
    type: Injectable2,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: i13.HttpClient }], null);
})();

// src/app/core/services/rating.service.ts
var rating_service_exports = {};
__export(rating_service_exports, {
  RatingService: () => RatingService
});
import { Injectable as Injectable3, inject as inject2 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { tap as tap3, of, throwError } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/rxjs.js?v=3f3fab55";
import * as i06 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i14 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common_http.js?v=3f3fab55";
var RatingService = class _RatingService {
  http;
  ratingUrl = `${environment.apiUrl}/Rating`;
  authService = inject2(AuthService);
  constructor(http) {
    this.http = http;
  }
  getMyRatings() {
    const userId = this.authService.user?.id;
    if (!userId) {
      console.warn("RatingService: Nincs userId, \xE9rt\xE9kel\xE9sek lek\xE9r\xE9se sikertelen.");
      return of([]);
    }
    return this.http.get(`${this.ratingUrl}/user/${userId}`);
  }
  rateMovie(dto) {
    const userId = this.authService.user?.id;
    if (!userId) {
      return throwError(() => new Error("A felhaszn\xE1l\xF3 nincs bejelentkezve."));
    }
    return this.http.post(`${this.ratingUrl}/${userId}`, dto).pipe(tap3(() => console.log(`Film \xE9rt\xE9kelve: ${dto.movieId}, \xC9rt\xE9kel\xE9s: ${dto.score}`)));
  }
  static \u0275fac = function RatingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RatingService)(i06.\u0275\u0275inject(i14.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i06.\u0275\u0275defineInjectable({ token: _RatingService, factory: _RatingService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i06.\u0275setClassMetadata(RatingService, [{
    type: Injectable3,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: i14.HttpClient }], null);
})();

// src/app/core/services/favorite.service.ts
var favorite_service_exports = {};
__export(favorite_service_exports, {
  FavoriteService: () => FavoriteService
});
import { Injectable as Injectable4, inject as inject3 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { tap as tap4, of as of2, throwError as throwError2 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/rxjs.js?v=3f3fab55";
import * as i07 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i15 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common_http.js?v=3f3fab55";
var FavoriteService = class _FavoriteService {
  http;
  favoriteUrl = `${environment.apiUrl}/Favorite`;
  authService = inject3(AuthService);
  constructor(http) {
    this.http = http;
  }
  getMyFavorites() {
    const userId = this.authService.user?.id;
    if (!userId) {
      return of2([]);
    }
    return this.http.get(`${this.favoriteUrl}/user/${userId}`);
  }
  favoriteMovie(dto) {
    const userId = this.authService.user?.id;
    if (!userId) {
      return throwError2(() => new Error("Nincs user ID a kedvenc hozz\xE1ad\xE1s\xE1hoz."));
    }
    return this.http.post(`${this.favoriteUrl}/${userId}`, dto).pipe(tap4(() => console.log(`Film kedvencekhez adva: ${dto.movieId}`)));
  }
  unfavoriteMovie(movieId) {
    const userId = this.authService.user?.id;
    if (!userId) {
      return throwError2(() => new Error("Nincs user ID a kedvenc t\xF6rl\xE9s\xE9hez."));
    }
    return this.http.delete(`${this.favoriteUrl}/${userId}/${movieId}`).pipe(tap4(() => console.log(`Film kedvencekb\u0151l t\xF6r\xF6lve: ${movieId}`)));
  }
  static \u0275fac = function FavoriteService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FavoriteService)(i07.\u0275\u0275inject(i15.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i07.\u0275\u0275defineInjectable({ token: _FavoriteService, factory: _FavoriteService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i07.\u0275setClassMetadata(FavoriteService, [{
    type: Injectable4,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: i15.HttpClient }], null);
})();

// src/app/core/services/view-history.service.ts
var view_history_service_exports = {};
__export(view_history_service_exports, {
  ViewHistoryService: () => ViewHistoryService
});
import { Injectable as Injectable5, inject as inject4 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { tap as tap5, of as of3, throwError as throwError3 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/rxjs.js?v=3f3fab55";
import * as i08 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i16 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common_http.js?v=3f3fab55";
var ViewHistoryService = class _ViewHistoryService {
  http;
  viewHistoryUrl = `${environment.apiUrl}/ViewHistory`;
  authService = inject4(AuthService);
  constructor(http) {
    this.http = http;
  }
  getMyViewHistory() {
    const userId = this.authService.user?.id;
    if (!userId) {
      return of3([]);
    }
    return this.http.get(`${this.viewHistoryUrl}/user/${userId}`);
  }
  markAsSeen(movieId) {
    const userId = this.authService.user?.id;
    if (!userId) {
      return throwError3(() => new Error('Nincs user ID a "l\xE1ttam" jel\xF6l\xE9shez.'));
    }
    return this.http.post(`${this.viewHistoryUrl}/${userId}/${movieId}`, {}).pipe(tap5(() => console.log(`Film l\xE1tottnak jel\xF6lve: ${movieId}`)));
  }
  removeFromSeen(movieId) {
    const userId = this.authService.user?.id;
    if (!userId) {
      return throwError3(() => new Error('Nincs user ID a "l\xE1ttam" t\xF6rl\xE9s\xE9hez.'));
    }
    return this.http.delete(`${this.viewHistoryUrl}/${userId}/${movieId}`).pipe(tap5(() => console.log(`Film "l\xE1ttam" jel\xF6l\xE9s t\xF6r\xF6lve: ${movieId}`)));
  }
  static \u0275fac = function ViewHistoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ViewHistoryService)(i08.\u0275\u0275inject(i16.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i08.\u0275\u0275defineInjectable({ token: _ViewHistoryService, factory: _ViewHistoryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i08.\u0275setClassMetadata(ViewHistoryService, [{
    type: Injectable5,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: i16.HttpClient }], null);
})();

// src/app/features/dashboards/user-dashboard/user-dashboard..component.ts
import * as i5 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import * as i6 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
var _c0 = () => [1, 2, 3, 4, 5];
function UserDashboardComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = i09.\u0275\u0275getCurrentView();
    i09.\u0275\u0275elementStart(0, "div", 21)(1, "button", 22);
    i09.\u0275\u0275listener("click", function UserDashboardComponent_div_18_Template_button_click_1_listener() {
      i09.\u0275\u0275restoreView(_r2);
      const ctx_r2 = i09.\u0275\u0275nextContext();
      return i09.\u0275\u0275resetView(ctx_r2.setSearchField("all"));
    });
    i09.\u0275\u0275text(2, "Minden");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(3, "button", 22);
    i09.\u0275\u0275listener("click", function UserDashboardComponent_div_18_Template_button_click_3_listener() {
      i09.\u0275\u0275restoreView(_r2);
      const ctx_r2 = i09.\u0275\u0275nextContext();
      return i09.\u0275\u0275resetView(ctx_r2.setSearchField("title"));
    });
    i09.\u0275\u0275text(4, "C\xEDm");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(5, "button", 22);
    i09.\u0275\u0275listener("click", function UserDashboardComponent_div_18_Template_button_click_5_listener() {
      i09.\u0275\u0275restoreView(_r2);
      const ctx_r2 = i09.\u0275\u0275nextContext();
      return i09.\u0275\u0275resetView(ctx_r2.setSearchField("director"));
    });
    i09.\u0275\u0275text(6, "Rendez\u0151");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(7, "button", 22);
    i09.\u0275\u0275listener("click", function UserDashboardComponent_div_18_Template_button_click_7_listener() {
      i09.\u0275\u0275restoreView(_r2);
      const ctx_r2 = i09.\u0275\u0275nextContext();
      return i09.\u0275\u0275resetView(ctx_r2.setSearchField("genre"));
    });
    i09.\u0275\u0275text(8, "M\u0171faj");
    i09.\u0275\u0275elementEnd()();
  }
}
function UserDashboardComponent_div_19_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = i09.\u0275\u0275getCurrentView();
    i09.\u0275\u0275elementStart(0, "button", 25);
    i09.\u0275\u0275listener("click", function UserDashboardComponent_div_19_button_1_Template_button_click_0_listener() {
      const g_r5 = i09.\u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = i09.\u0275\u0275nextContext(2);
      return i09.\u0275\u0275resetView(ctx_r2.selectGenre(g_r5));
    });
    i09.\u0275\u0275text(1);
    i09.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r5 = ctx.$implicit;
    i09.\u0275\u0275advance();
    i09.\u0275\u0275textInterpolate1(" ", g_r5, " ");
  }
}
function UserDashboardComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    i09.\u0275\u0275elementStart(0, "div", 23);
    i09.\u0275\u0275template(1, UserDashboardComponent_div_19_button_1_Template, 2, 1, "button", 24);
    i09.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = i09.\u0275\u0275nextContext();
    i09.\u0275\u0275advance();
    i09.\u0275\u0275property("ngForOf", ctx_r2.genreSuggestions);
  }
}
function UserDashboardComponent_ng_container_20_div_1_Template(rf, ctx) {
  if (rf & 1) {
    i09.\u0275\u0275elementStart(0, "div", 27)(1, "strong");
    i09.\u0275\u0275text(2, "Hiba t\xF6rt\xE9nt:");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(3, "span");
    i09.\u0275\u0275text(4);
    i09.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = i09.\u0275\u0275nextContext(2);
    i09.\u0275\u0275advance(4);
    i09.\u0275\u0275textInterpolate1(" ", ctx_r2.error);
  }
}
function UserDashboardComponent_ng_container_20_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    i09.\u0275\u0275elementStart(0, "div", 28);
    i09.\u0275\u0275element(1, "div", 29);
    i09.\u0275\u0275elementStart(2, "p");
    i09.\u0275\u0275text(3, "Rendszer bet\xF6lt\xE9se...");
    i09.\u0275\u0275elementEnd()();
  }
}
function UserDashboardComponent_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    i09.\u0275\u0275elementContainerStart(0);
    i09.\u0275\u0275template(1, UserDashboardComponent_ng_container_20_div_1_Template, 5, 1, "div", 26)(2, UserDashboardComponent_ng_container_20_ng_template_2_Template, 4, 0, "ng-template", null, 1, i09.\u0275\u0275templateRefExtractor);
    i09.\u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const loading_r6 = i09.\u0275\u0275reference(3);
    const ctx_r2 = i09.\u0275\u0275nextContext();
    i09.\u0275\u0275advance();
    i09.\u0275\u0275property("ngIf", ctx_r2.error)("ngIfElse", loading_r6);
  }
}
function UserDashboardComponent_ng_template_21_div_0_div_1_span_15_Template(rf, ctx) {
  if (rf & 1) {
    i09.\u0275\u0275elementStart(0, "span", 54);
    i09.\u0275\u0275text(1);
    i09.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const genre_r8 = ctx.$implicit;
    i09.\u0275\u0275advance();
    i09.\u0275\u0275textInterpolate1(" ", genre_r8, " ");
  }
}
function UserDashboardComponent_ng_template_21_div_0_div_1_button_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = i09.\u0275\u0275getCurrentView();
    i09.\u0275\u0275elementStart(0, "button", 55);
    i09.\u0275\u0275listener("click", function UserDashboardComponent_ng_template_21_div_0_div_1_button_22_Template_button_click_0_listener() {
      const star_r10 = i09.\u0275\u0275restoreView(_r9).$implicit;
      const movie_r11 = i09.\u0275\u0275nextContext().$implicit;
      const ctx_r2 = i09.\u0275\u0275nextContext(3);
      return i09.\u0275\u0275resetView(ctx_r2.onRate(movie_r11.id, star_r10));
    });
    i09.\u0275\u0275text(1, " \u2605 ");
    i09.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const star_r10 = ctx.$implicit;
    const movie_r11 = i09.\u0275\u0275nextContext().$implicit;
    const ctx_r2 = i09.\u0275\u0275nextContext(3);
    i09.\u0275\u0275classProp("active", ctx_r2.getRating(movie_r11.id) >= star_r10);
    i09.\u0275\u0275property("title", i09.\u0275\u0275interpolate1("", star_r10, " csillag"));
  }
}
function UserDashboardComponent_ng_template_21_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = i09.\u0275\u0275getCurrentView();
    i09.\u0275\u0275elementStart(0, "div", 33)(1, "div", 34);
    i09.\u0275\u0275element(2, "img", 35)(3, "div", 36);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(4, "div", 37)(5, "div", 38)(6, "h2", 39);
    i09.\u0275\u0275text(7);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(8, "span", 40);
    i09.\u0275\u0275text(9);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(10, "h3", 41);
    i09.\u0275\u0275text(11);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(12, "p", 42);
    i09.\u0275\u0275text(13);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(14, "div", 43);
    i09.\u0275\u0275template(15, UserDashboardComponent_ng_template_21_div_0_div_1_span_15_Template, 2, 1, "span", 44);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275element(16, "div", 45);
    i09.\u0275\u0275elementStart(17, "div", 46)(18, "div", 47)(19, "span", 48);
    i09.\u0275\u0275text(20, "Rating:");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(21, "div", 49);
    i09.\u0275\u0275template(22, UserDashboardComponent_ng_template_21_div_0_div_1_button_22_Template, 2, 4, "button", 50);
    i09.\u0275\u0275elementEnd()();
    i09.\u0275\u0275elementStart(23, "div", 51)(24, "button", 52);
    i09.\u0275\u0275listener("click", function UserDashboardComponent_ng_template_21_div_0_div_1_Template_button_click_24_listener() {
      const movie_r11 = i09.\u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = i09.\u0275\u0275nextContext(3);
      return i09.\u0275\u0275resetView(ctx_r2.onToggleFavorite(movie_r11.id));
    });
    i09.\u0275\u0275text(25);
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(26, "button", 53);
    i09.\u0275\u0275listener("click", function UserDashboardComponent_ng_template_21_div_0_div_1_Template_button_click_26_listener() {
      const movie_r11 = i09.\u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = i09.\u0275\u0275nextContext(3);
      return i09.\u0275\u0275resetView(ctx_r2.onToggleSeen(movie_r11.id));
    });
    i09.\u0275\u0275text(27);
    i09.\u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const movie_r11 = ctx.$implicit;
    const ctx_r2 = i09.\u0275\u0275nextContext(3);
    i09.\u0275\u0275advance(2);
    i09.\u0275\u0275property("src", movie_r11.posterUrl, i09.\u0275\u0275sanitizeUrl)("alt", movie_r11.title);
    i09.\u0275\u0275advance(4);
    i09.\u0275\u0275property("title", movie_r11.title);
    i09.\u0275\u0275advance();
    i09.\u0275\u0275textInterpolate(movie_r11.title);
    i09.\u0275\u0275advance(2);
    i09.\u0275\u0275textInterpolate(movie_r11.releaseYear);
    i09.\u0275\u0275advance(2);
    i09.\u0275\u0275textInterpolate1("Rendezte: ", movie_r11.director || "Ismeretlen");
    i09.\u0275\u0275advance(2);
    i09.\u0275\u0275textInterpolate1(" ", movie_r11.description, " ");
    i09.\u0275\u0275advance(2);
    i09.\u0275\u0275property("ngForOf", movie_r11.genres);
    i09.\u0275\u0275advance(7);
    i09.\u0275\u0275property("ngForOf", i09.\u0275\u0275pureFunction0(15, _c0));
    i09.\u0275\u0275advance(2);
    i09.\u0275\u0275classProp("active", ctx_r2.isFavorite(movie_r11.id));
    i09.\u0275\u0275advance();
    i09.\u0275\u0275textInterpolate1(" ", ctx_r2.isFavorite(movie_r11.id) ? "\u2665 Kedvenc" : "\u2661 Hozz\xE1ad\xE1s", " ");
    i09.\u0275\u0275advance();
    i09.\u0275\u0275classProp("active", ctx_r2.isSeen(movie_r11.id));
    i09.\u0275\u0275advance();
    i09.\u0275\u0275textInterpolate1(" ", ctx_r2.isSeen(movie_r11.id) ? "\u{1F441} L\xE1ttam" : "\u25CB Megn\xE9zem", " ");
  }
}
function UserDashboardComponent_ng_template_21_div_0_Template(rf, ctx) {
  if (rf & 1) {
    i09.\u0275\u0275elementStart(0, "div", 31);
    i09.\u0275\u0275template(1, UserDashboardComponent_ng_template_21_div_0_div_1_Template, 28, 16, "div", 32);
    i09.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = i09.\u0275\u0275nextContext(2);
    i09.\u0275\u0275advance();
    i09.\u0275\u0275property("ngForOf", ctx_r2.filteredMovies);
  }
}
function UserDashboardComponent_ng_template_21_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    i09.\u0275\u0275elementStart(0, "div", 56)(1, "div", 57);
    i09.\u0275\u0275text(2, "\u2205");
    i09.\u0275\u0275elementEnd();
    i09.\u0275\u0275elementStart(3, "p");
    i09.\u0275\u0275text(4, "Nincs tal\xE1lat a keres\xE9si felt\xE9telek alapj\xE1n.");
    i09.\u0275\u0275elementEnd()();
  }
}
function UserDashboardComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    i09.\u0275\u0275template(0, UserDashboardComponent_ng_template_21_div_0_Template, 2, 1, "div", 30)(1, UserDashboardComponent_ng_template_21_ng_template_1_Template, 5, 0, "ng-template", null, 2, i09.\u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const noMovies_r12 = i09.\u0275\u0275reference(2);
    const ctx_r2 = i09.\u0275\u0275nextContext();
    i09.\u0275\u0275property("ngIf", ctx_r2.filteredMovies.length > 0)("ngIfElse", noMovies_r12);
  }
}
var UserDashboardComponent = class _UserDashboardComponent {
  movieService;
  ratingService;
  favoriteService;
  viewHistoryService;
  movies = [];
  myRatings = /* @__PURE__ */ new Map();
  myFavorites = /* @__PURE__ */ new Set();
  mySeen = /* @__PURE__ */ new Set();
  isLoading = true;
  error = null;
  searchTerm = "";
  searchField = "all";
  isSearchDropdownOpen = false;
  allGenres = [];
  genreSuggestions = [];
  selectedGenre = null;
  constructor(movieService, ratingService, favoriteService, viewHistoryService) {
    this.movieService = movieService;
    this.ratingService = ratingService;
    this.favoriteService = favoriteService;
    this.viewHistoryService = viewHistoryService;
  }
  ngOnInit() {
    this.isLoading = true;
    this.error = null;
    forkJoin({
      movies: this.movieService.getMovies(),
      ratings: this.ratingService.getMyRatings(),
      favorites: this.favoriteService.getMyFavorites(),
      seenHistory: this.viewHistoryService.getMyViewHistory()
    }).pipe(catchError((err) => {
      console.error("Hiba a dashboard adatok bet\xF6lt\xE9sekor:", err);
      if (err.status === 401 || err.status === 403) {
        this.error = "Nincs jogosults\xE1god az adatok megtekint\xE9s\xE9hez.";
      } else {
        this.error = "Ismeretlen hiba t\xF6rt\xE9nt az adatok bet\xF6lt\xE9se k\xF6zben. (Val\xF3sz\xEDn\u0171leg API \xFAtvonal hiba)";
      }
      return of4(null);
    })).subscribe((data) => {
      if (!data) {
        this.isLoading = false;
        return;
      }
      this.movies = data.movies;
      data.ratings.forEach((r) => this.myRatings.set(r.movieId, r.score));
      data.favorites.forEach((f) => this.myFavorites.add(f.movieId));
      data.seenHistory.forEach((s) => this.mySeen.add(s.movieId));
      const genreSet = /* @__PURE__ */ new Set();
      this.movies.forEach((m) => {
        const names = this.getMovieGenreNames(m);
        names.forEach((genreName) => {
          if (genreName)
            genreSet.add(genreName);
        });
      });
      this.allGenres = Array.from(genreSet).sort();
      this.isLoading = false;
    });
  }
  isFavorite(movieId) {
    return this.myFavorites.has(movieId);
  }
  getMovieGenreNames(m) {
    if (m.genres && Array.isArray(m.genres)) {
      return m.genres.map((x) => (x ?? "").toString());
    }
    if (m.genreIds && Array.isArray(m.genreIds)) {
      const ids = m.genreIds;
      if (this.genres && Array.isArray(this.genres)) {
        return ids.map((id) => {
          const found = this.genres.find((gg) => gg.id === id);
          return found ? found.name : `#${id}`;
        });
      }
      return ids.map((id) => `#${id}`);
    }
    return [];
  }
  isSeen(movieId) {
    return this.mySeen.has(movieId);
  }
  getRating(movieId) {
    const score = this.myRatings.get(movieId) || 0;
    return score / 2;
  }
  onRate(movieId, rating) {
    const score = rating * 2;
    const oldScore = this.myRatings.get(movieId) || 0;
    this.myRatings.set(movieId, score);
    this.myRatings = new Map(this.myRatings);
    this.ratingService.rateMovie({ movieId, score }).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error("Hiba az \xE9rt\xE9kel\xE9s ment\xE9sekor, UI vissza\xE1ll\xEDtva:", err);
        this.myRatings.set(movieId, oldScore);
        this.myRatings = new Map(this.myRatings);
      }
    });
  }
  onToggleFavorite(movieId) {
    const wasFavorite = this.isFavorite(movieId);
    if (wasFavorite) {
      this.myFavorites.delete(movieId);
    } else {
      this.myFavorites.add(movieId);
    }
    this.myFavorites = new Set(this.myFavorites);
    const request$ = wasFavorite ? this.favoriteService.unfavoriteMovie(movieId) : this.favoriteService.favoriteMovie({ movieId });
    request$.subscribe({
      next: () => {
      },
      error: (err) => {
        console.error("Hiba a kedvenc ment\xE9sekor, UI vissza\xE1ll\xEDtva:", err);
        if (wasFavorite) {
          this.myFavorites.add(movieId);
        } else {
          this.myFavorites.delete(movieId);
        }
        this.myFavorites = new Set(this.myFavorites);
      }
    });
  }
  onToggleSeen(movieId) {
    const wasSeen = this.isSeen(movieId);
    if (wasSeen) {
      this.mySeen.delete(movieId);
    } else {
      this.mySeen.add(movieId);
    }
    this.mySeen = new Set(this.mySeen);
    const request$ = wasSeen ? this.viewHistoryService.removeFromSeen(movieId) : this.viewHistoryService.markAsSeen(movieId);
    request$.subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Hiba a "L\xE1ttam" ment\xE9sekor, UI vissza\xE1ll\xEDtva:', err);
        if (wasSeen) {
          this.mySeen.add(movieId);
        } else {
          this.mySeen.delete(movieId);
        }
        this.mySeen = new Set(this.mySeen);
      }
    });
  }
  toggleSearchDropdown() {
    this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
  }
  setSearchField(field) {
    this.searchField = field;
    this.isSearchDropdownOpen = false;
    if (field !== "genre") {
      this.selectedGenre = null;
      this.genreSuggestions = [];
    }
  }
  getSearchFieldLabel() {
    switch (this.searchField) {
      case "title":
        return "C\xEDm";
      case "director":
        return "Rendez\u0151";
      case "genre":
        return "M\u0171faj";
      default:
        return "Minden";
    }
  }
  onSearchTermChange(term) {
    this.searchTerm = term;
    if (this.searchField === "genre") {
      const t = term.trim().toLowerCase();
      if (!t) {
        this.genreSuggestions = [];
        this.selectedGenre = null;
        return;
      }
      this.genreSuggestions = this.allGenres.filter((g) => g.toLowerCase().includes(t));
      this.selectedGenre = null;
    } else {
      this.genreSuggestions = [];
      this.selectedGenre = null;
    }
  }
  selectGenre(genre) {
    this.selectedGenre = genre;
    this.searchTerm = genre;
    this.genreSuggestions = [];
  }
  getGenres(movie) {
    return movie.genres?.map((g) => g.toLowerCase()) ?? [];
  }
  get filteredMovies() {
    const term = this.searchTerm.trim().toLowerCase();
    if (this.searchField === "genre") {
      if (!this.selectedGenre)
        return this.movies;
      const selected = this.selectedGenre.toLowerCase();
      return this.movies.filter((m) => this.getGenres(m).some((genreName) => genreName.toLowerCase() === selected));
    }
    if (!term)
      return this.movies;
    return this.movies.filter((movie) => {
      const title = movie.title?.toLowerCase() ?? "";
      const description = movie.description?.toLowerCase() ?? "";
      const director = movie.director?.toLowerCase() ?? "";
      const genreNames = this.getGenres(movie).map((g) => g.toLowerCase());
      switch (this.searchField) {
        case "title":
          return title.includes(term);
        case "director":
          return director.includes(term);
        case "all":
        default:
          return title.includes(term) || description.includes(term) || director.includes(term) || genreNames.some((g) => g.includes(term));
      }
    });
  }
  static \u0275fac = function UserDashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserDashboardComponent)(i09.\u0275\u0275directiveInject(MovieService), i09.\u0275\u0275directiveInject(RatingService), i09.\u0275\u0275directiveInject(FavoriteService), i09.\u0275\u0275directiveInject(ViewHistoryService));
  };
  static \u0275cmp = /* @__PURE__ */ i09.\u0275\u0275defineComponent({ type: _UserDashboardComponent, selectors: [["app-user-dashboard"]], decls: 23, vars: 6, consts: [["moviesContent", ""], ["loading", ""], ["noMovies", ""], [1, "dashboard-page"], [1, "content-wrapper"], [1, "page-header"], [1, "title"], [1, "decoration-line"], [1, "search-section"], [1, "search-bar"], ["type", "button", 1, "filter-toggle-btn", 3, "click"], [1, "filter-label"], [1, "filter-arrow"], ["type", "text", "placeholder", "Keres\xE9s...", 1, "search-input", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "search-icon-btn"], ["xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["class", "dropdown-menu fade-in", 4, "ngIf"], ["class", "suggestions-menu fade-in", 4, "ngIf"], [4, "ngIf", "ngIfElse"], [1, "dropdown-menu", "fade-in"], ["type", "button", 1, "dropdown-item", 3, "click"], [1, "suggestions-menu", "fade-in"], ["type", "button", "class", "suggestion-item", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "suggestion-item", 3, "click"], ["class", "message-box error", 4, "ngIf", "ngIfElse"], [1, "message-box", "error"], [1, "message-box", "loading"], [1, "loader"], ["class", "media-grid", 4, "ngIf", "ngIfElse"], [1, "media-grid"], ["class", "media-card", 4, "ngFor", "ngForOf"], [1, "media-card"], [1, "poster-wrapper"], ["onerror", "this.src='https://placehold.co/400x600/0f1623/ffffff?text=No+Cover'", 1, "poster-image", 3, "src", "alt"], [1, "poster-overlay"], [1, "card-body"], [1, "card-header"], [1, "media-title", 3, "title"], [1, "media-year"], [1, "media-director"], [1, "media-desc"], [1, "tags-container"], ["class", "tag", 4, "ngFor", "ngForOf"], [1, "spacer"], [1, "actions-panel"], [1, "rating-wrapper"], [1, "label"], [1, "stars"], ["class", "star-btn", 3, "active", "title", "click", 4, "ngFor", "ngForOf"], [1, "buttons-row"], [1, "btn", "btn-favorite", 3, "click"], [1, "btn", "btn-seen", 3, "click"], [1, "tag"], [1, "star-btn", 3, "click", "title"], [1, "empty-state"], [1, "empty-icon"]], template: function UserDashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = i09.\u0275\u0275getCurrentView();
      i09.\u0275\u0275elementStart(0, "div", 3)(1, "main", 4)(2, "header", 5)(3, "h1", 6);
      i09.\u0275\u0275text(4, "Filmek");
      i09.\u0275\u0275elementEnd();
      i09.\u0275\u0275element(5, "div", 7);
      i09.\u0275\u0275elementEnd();
      i09.\u0275\u0275elementStart(6, "div", 8)(7, "div", 9)(8, "button", 10);
      i09.\u0275\u0275listener("click", function UserDashboardComponent_Template_button_click_8_listener() {
        i09.\u0275\u0275restoreView(_r1);
        return i09.\u0275\u0275resetView(ctx.toggleSearchDropdown());
      });
      i09.\u0275\u0275elementStart(9, "span", 11);
      i09.\u0275\u0275text(10);
      i09.\u0275\u0275elementEnd();
      i09.\u0275\u0275elementStart(11, "span", 12);
      i09.\u0275\u0275text(12, "\u25BC");
      i09.\u0275\u0275elementEnd()();
      i09.\u0275\u0275elementStart(13, "input", 13);
      i09.\u0275\u0275listener("ngModelChange", function UserDashboardComponent_Template_input_ngModelChange_13_listener($event) {
        i09.\u0275\u0275restoreView(_r1);
        return i09.\u0275\u0275resetView(ctx.onSearchTermChange($event));
      });
      i09.\u0275\u0275elementEnd();
      i09.\u0275\u0275elementStart(14, "button", 14);
      i09.\u0275\u0275namespaceSVG();
      i09.\u0275\u0275elementStart(15, "svg", 15);
      i09.\u0275\u0275element(16, "circle", 16)(17, "line", 17);
      i09.\u0275\u0275elementEnd()();
      i09.\u0275\u0275template(18, UserDashboardComponent_div_18_Template, 9, 0, "div", 18)(19, UserDashboardComponent_div_19_Template, 2, 1, "div", 19);
      i09.\u0275\u0275elementEnd()();
      i09.\u0275\u0275template(20, UserDashboardComponent_ng_container_20_Template, 4, 2, "ng-container", 20)(21, UserDashboardComponent_ng_template_21_Template, 3, 2, "ng-template", null, 0, i09.\u0275\u0275templateRefExtractor);
      i09.\u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const moviesContent_r13 = i09.\u0275\u0275reference(22);
      i09.\u0275\u0275advance(10);
      i09.\u0275\u0275textInterpolate(ctx.getSearchFieldLabel());
      i09.\u0275\u0275advance(3);
      i09.\u0275\u0275property("ngModel", ctx.searchTerm);
      i09.\u0275\u0275advance(5);
      i09.\u0275\u0275property("ngIf", ctx.isSearchDropdownOpen);
      i09.\u0275\u0275advance();
      i09.\u0275\u0275property("ngIf", ctx.searchField === "genre" && ctx.genreSuggestions.length > 0 && ctx.searchTerm);
      i09.\u0275\u0275advance();
      i09.\u0275\u0275property("ngIf", ctx.isLoading || ctx.error)("ngIfElse", moviesContent_r13);
    }
  }, dependencies: [CommonModule4, i5.NgClass, i5.NgComponentOutlet, i5.NgForOf, i5.NgIf, i5.NgTemplateOutlet, i5.NgStyle, i5.NgSwitch, i5.NgSwitchCase, i5.NgSwitchDefault, i5.NgPlural, i5.NgPluralCase, FormsModule3, i6.\u0275NgNoValidate, i6.NgSelectOption, i6.\u0275NgSelectMultipleOption, i6.DefaultValueAccessor, i6.NumberValueAccessor, i6.RangeValueAccessor, i6.CheckboxControlValueAccessor, i6.SelectControlValueAccessor, i6.SelectMultipleControlValueAccessor, i6.RadioControlValueAccessor, i6.NgControlStatus, i6.NgControlStatusGroup, i6.RequiredValidator, i6.MinLengthValidator, i6.MaxLengthValidator, i6.PatternValidator, i6.CheckboxRequiredValidator, i6.EmailValidator, i6.MinValidator, i6.MaxValidator, i6.NgModel, i6.NgModelGroup, i6.NgForm, i5.AsyncPipe, i5.UpperCasePipe, i5.LowerCasePipe, i5.JsonPipe, i5.SlicePipe, i5.DecimalPipe, i5.PercentPipe, i5.TitleCasePipe, i5.CurrencyPipe, i5.DatePipe, i5.I18nPluralPipe, i5.I18nSelectPipe, i5.KeyValuePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  --primary: #00f0ff;\n  --secondary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --bg-input: #111827;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --card-radius: 12px;\n  --gold: #ffd700;\n  --accent-red: #ff003c;\n  --accent-green: #10b981;\n}\n.dashboard-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  color: var(--text-main);\n  font-family:\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n}\n.media-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  line-height: 1.3;\n  height: 5rem;\n  overflow: hidden;\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n  position: relative;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  display: inline-block;\n}\n.decoration-line[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 4px;\n  background: var(--primary);\n  margin-top: 0.5rem;\n  box-shadow: 0 0 10px var(--primary);\n  border-radius: 2px;\n}\n.search-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 3rem;\n  position: relative;\n  z-index: 10;\n}\n.search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  background: rgba(15, 22, 35, 0.8);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(0, 240, 255, 0.3);\n  border-radius: 50px;\n  padding: 5px;\n  width: 100%;\n  max-width: 700px;\n  box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);\n  position: relative;\n  transition: box-shadow 0.3s ease;\n}\n.search-bar[_ngcontent-%COMP%]:focus-within {\n  box-shadow: 0 0 30px rgba(0, 240, 255, 0.25);\n  border-color: var(--primary);\n}\n.filter-toggle-btn[_ngcontent-%COMP%] {\n  background: var(--bg-input);\n  color: var(--primary);\n  border: 1px solid rgba(0, 240, 255, 0.2);\n  border-radius: 40px;\n  padding: 8px 16px;\n  margin-right: 10px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 600;\n  font-size: 0.85rem;\n  transition: all 0.2s;\n}\n.filter-toggle-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 240, 255, 0.1);\n  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);\n}\n.filter-arrow[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  background: transparent;\n  border: none;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  padding: 8px;\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: rgba(255, 255, 255, 0.3);\n}\n.search-icon-btn[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: #000;\n  border: none;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.search-icon-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n  box-shadow: 0 0 15px var(--primary);\n}\n.dropdown-menu[_ngcontent-%COMP%], \n.suggestions-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 110%;\n  left: 20px;\n  background: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 12px;\n  overflow: hidden;\n  min-width: 150px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n}\n.suggestions-menu[_ngcontent-%COMP%] {\n  left: 50%;\n  transform: translateX(-50%);\n  width: 90%;\n}\n.dropdown-item[_ngcontent-%COMP%], \n.suggestion-item[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  text-align: left;\n  padding: 10px 15px;\n  background: transparent;\n  border: none;\n  color: var(--text-muted);\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n  font-size: 0.9rem;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover, \n.suggestion-item[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n}\n.media-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 2rem;\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.media-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: var(--card-radius);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition:\n    transform 0.3s,\n    box-shadow 0.3s,\n    border-color 0.3s;\n}\n.media-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);\n  border-color: rgba(0, 240, 255, 0.4);\n}\n.poster-wrapper[_ngcontent-%COMP%] {\n  height: 400px;\n  position: relative;\n  overflow: hidden;\n}\n.poster-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.5s;\n}\n.media-card[_ngcontent-%COMP%]:hover   .poster-image[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n}\n.poster-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background:\n    linear-gradient(\n      to top,\n      var(--bg-card) 0%,\n      transparent 60%);\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.media-year[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.1);\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  color: var(--text-muted);\n}\n.media-director[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--primary);\n  margin-bottom: 1rem;\n}\n.media-desc[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--text-muted);\n  margin-bottom: 1rem;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.tags-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.tag[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  padding: 4px 8px;\n  border-radius: 4px;\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n  border: 1px solid rgba(0, 240, 255, 0.2);\n}\n.spacer[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.actions-panel[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  padding-top: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.rating-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.stars[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n}\n.star-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #334155;\n  font-size: 1.5rem;\n  cursor: pointer;\n  transition: all 0.2s;\n  line-height: 1;\n  padding: 0;\n}\n.star-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.2);\n  color: var(--gold);\n}\n.star-btn.active[_ngcontent-%COMP%] {\n  color: var(--gold);\n  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);\n}\n.buttons-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem;\n}\n.btn[_ngcontent-%COMP%] {\n  border: none;\n  padding: 0.6rem;\n  border-radius: 6px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  color: #fff;\n}\n.btn-favorite[_ngcontent-%COMP%] {\n  background: rgba(255, 0, 60, 0.1);\n  color: var(--accent-red);\n  border: 1px solid rgba(255, 0, 60, 0.3);\n}\n.btn-favorite[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 0, 60, 0.2);\n  box-shadow: 0 0 15px rgba(255, 0, 60, 0.3);\n}\n.btn-favorite.active[_ngcontent-%COMP%] {\n  background: var(--accent-red);\n  color: #fff;\n  box-shadow: 0 0 15px var(--accent-red);\n}\n.btn-seen[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-muted);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.btn-seen[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fff;\n}\n.btn-seen.active[_ngcontent-%COMP%] {\n  background: var(--accent-green);\n  color: #fff;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 15px var(--accent-green);\n}\n.empty-state[_ngcontent-%COMP%], \n.message-box[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-muted);\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n.loader[_ngcontent-%COMP%] {\n  border: 3px solid rgba(0, 240, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .app-container[_ngcontent-%COMP%], \n   .content-wrapper[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .title[_ngcontent-%COMP%] {\n    font-size: 1.8rem;\n  }\n  .media-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .search-bar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    border-radius: 20px;\n    padding: 10px;\n  }\n  .filter-toggle-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    margin: 0 0 10px 0;\n  }\n}\n/*# sourceMappingURL=user-dashboard.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i09.\u0275setClassMetadata(UserDashboardComponent, [{
    type: Component4,
    args: [{ selector: "app-user-dashboard", standalone: true, imports: [CommonModule4, FormsModule3], template: `<div class="dashboard-page">\r
  <main class="content-wrapper">\r
\r
    <header class="page-header">\r
      <h1 class="title">Filmek</h1>\r
      <div class="decoration-line"></div>\r
    </header>\r
\r
    <div class="search-section">\r
      <div class="search-bar">\r
\r
        <button type="button" class="filter-toggle-btn" (click)="toggleSearchDropdown()">\r
          <span class="filter-label">{{ getSearchFieldLabel() }}</span>\r
          <span class="filter-arrow">\u25BC</span>\r
        </button>\r
\r
        <input\r
          type="text"\r
          class="search-input"\r
          [ngModel]="searchTerm"\r
          (ngModelChange)="onSearchTermChange($event)"\r
          placeholder="Keres\xE9s..." />\r
\r
        <button type="button" class="search-icon-btn">\r
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>\r
        </button>\r
\r
        <div *ngIf="isSearchDropdownOpen" class="dropdown-menu fade-in">\r
          <button type="button" class="dropdown-item" (click)="setSearchField('all')">Minden</button>\r
          <button type="button" class="dropdown-item" (click)="setSearchField('title')">C\xEDm</button>\r
          <button type="button" class="dropdown-item" (click)="setSearchField('director')">Rendez\u0151</button>\r
          <button type="button" class="dropdown-item" (click)="setSearchField('genre')">M\u0171faj</button>\r
        </div>\r
\r
        <div *ngIf="searchField === 'genre' && genreSuggestions.length > 0 && searchTerm" class="suggestions-menu fade-in">\r
          <button *ngFor="let g of genreSuggestions" type="button" class="suggestion-item" (click)="selectGenre(g)">\r
            {{ g }}\r
          </button>\r
        </div>\r
\r
      </div>\r
    </div>\r
\r
    <ng-container *ngIf="isLoading || error; else moviesContent">\r
      <div *ngIf="error; else loading" class="message-box error">\r
        <strong>Hiba t\xF6rt\xE9nt:</strong>\r
        <span> {{ error }}</span>\r
      </div>\r
\r
      <ng-template #loading>\r
        <div class="message-box loading">\r
          <div class="loader"></div>\r
          <p>Rendszer bet\xF6lt\xE9se...</p>\r
        </div>\r
      </ng-template>\r
    </ng-container>\r
\r
    <ng-template #moviesContent>\r
\r
      <div *ngIf="filteredMovies.length > 0; else noMovies" class="media-grid">\r
        \r
        <div *ngFor="let movie of filteredMovies" class="media-card">\r
          \r
          <div class="poster-wrapper">\r
            <img [src]="movie.posterUrl" \r
                 [alt]="movie.title" \r
                 class="poster-image"\r
                 onerror="this.src='https://placehold.co/400x600/0f1623/ffffff?text=No+Cover'">\r
            <div class="poster-overlay"></div>\r
          </div>\r
\r
          <div class="card-body">\r
            <div class="card-header">\r
              <h2 class="media-title" [title]="movie.title">{{ movie.title }}</h2>\r
              <span class="media-year">{{ movie.releaseYear }}</span>\r
            </div>\r
\r
            <h3 class="media-director">Rendezte: {{ movie.director || 'Ismeretlen' }}</h3>\r
\r
            <p class="media-desc">\r
              {{ movie.description }}\r
            </p>\r
\r
            <div class="tags-container">\r
              <span *ngFor="let genre of movie.genres" class="tag">\r
                {{ genre }}\r
              </span>\r
            </div>\r
\r
            <div class="spacer"></div>\r
\r
            <div class="actions-panel">\r
              \r
              <div class="rating-wrapper">\r
                <span class="label">Rating:</span>\r
                <div class="stars">\r
                  <button *ngFor="let star of [1,2,3,4,5]" \r
                          (click)="onRate(movie.id, star)" \r
                          class="star-btn"\r
                          [class.active]="getRating(movie.id) >= star"\r
                          title="{{star}} csillag">\r
                    \u2605\r
                  </button>\r
                </div>\r
              </div>\r
\r
              <div class="buttons-row">\r
                <button (click)="onToggleFavorite(movie.id)" \r
                        class="btn btn-favorite"\r
                        [class.active]="isFavorite(movie.id)">\r
                  {{ isFavorite(movie.id) ? '\u2665 Kedvenc' : '\u2661 Hozz\xE1ad\xE1s' }}\r
                </button>\r
                \r
                <button (click)="onToggleSeen(movie.id)" \r
                        class="btn btn-seen"\r
                        [class.active]="isSeen(movie.id)">\r
                  {{ isSeen(movie.id) ? '\u{1F441} L\xE1ttam' : '\u25CB Megn\xE9zem' }}\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
      </div>\r
\r
      <ng-template #noMovies>\r
        <div class="empty-state">\r
          <div class="empty-icon">\u2205</div>\r
          <p>Nincs tal\xE1lat a keres\xE9si felt\xE9telek alapj\xE1n.</p>\r
        </div>\r
      </ng-template>\r
\r
    </ng-template>\r
  </main>\r
</div>`, styles: ['/* src/app/features/dashboards/user-dashboard/user-dashboard.component.css */\n:host {\n  display: block;\n  --primary: #00f0ff;\n  --secondary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --bg-input: #111827;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --card-radius: 12px;\n  --gold: #ffd700;\n  --accent-red: #ff003c;\n  --accent-green: #10b981;\n}\n.dashboard-page {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  color: var(--text-main);\n  font-family:\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n}\n.media-title {\n  font-size: 1.1rem;\n  font-weight: 700;\n  line-height: 1.3;\n  height: 5rem;\n  overflow: hidden;\n}\n.content-wrapper {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.page-header {\n  margin-bottom: 2rem;\n  position: relative;\n}\n.title {\n  font-size: 2.5rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  display: inline-block;\n}\n.decoration-line {\n  width: 60px;\n  height: 4px;\n  background: var(--primary);\n  margin-top: 0.5rem;\n  box-shadow: 0 0 10px var(--primary);\n  border-radius: 2px;\n}\n.search-section {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 3rem;\n  position: relative;\n  z-index: 10;\n}\n.search-bar {\n  display: flex;\n  align-items: center;\n  background: rgba(15, 22, 35, 0.8);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(0, 240, 255, 0.3);\n  border-radius: 50px;\n  padding: 5px;\n  width: 100%;\n  max-width: 700px;\n  box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);\n  position: relative;\n  transition: box-shadow 0.3s ease;\n}\n.search-bar:focus-within {\n  box-shadow: 0 0 30px rgba(0, 240, 255, 0.25);\n  border-color: var(--primary);\n}\n.filter-toggle-btn {\n  background: var(--bg-input);\n  color: var(--primary);\n  border: 1px solid rgba(0, 240, 255, 0.2);\n  border-radius: 40px;\n  padding: 8px 16px;\n  margin-right: 10px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 600;\n  font-size: 0.85rem;\n  transition: all 0.2s;\n}\n.filter-toggle-btn:hover {\n  background: rgba(0, 240, 255, 0.1);\n  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);\n}\n.filter-arrow {\n  font-size: 0.7rem;\n}\n.search-input {\n  flex: 1;\n  background: transparent;\n  border: none;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  padding: 8px;\n}\n.search-input::placeholder {\n  color: rgba(255, 255, 255, 0.3);\n}\n.search-icon-btn {\n  background: var(--primary);\n  color: #000;\n  border: none;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.search-icon-btn:hover {\n  transform: scale(1.05);\n  box-shadow: 0 0 15px var(--primary);\n}\n.dropdown-menu,\n.suggestions-menu {\n  position: absolute;\n  top: 110%;\n  left: 20px;\n  background: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 12px;\n  overflow: hidden;\n  min-width: 150px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n}\n.suggestions-menu {\n  left: 50%;\n  transform: translateX(-50%);\n  width: 90%;\n}\n.dropdown-item,\n.suggestion-item {\n  display: block;\n  width: 100%;\n  text-align: left;\n  padding: 10px 15px;\n  background: transparent;\n  border: none;\n  color: var(--text-muted);\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n  font-size: 0.9rem;\n}\n.dropdown-item:hover,\n.suggestion-item:hover {\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n}\n.media-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 2rem;\n  animation: fadeIn 0.5s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.media-card {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: var(--card-radius);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition:\n    transform 0.3s,\n    box-shadow 0.3s,\n    border-color 0.3s;\n}\n.media-card:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);\n  border-color: rgba(0, 240, 255, 0.4);\n}\n.poster-wrapper {\n  height: 400px;\n  position: relative;\n  overflow: hidden;\n}\n.poster-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.5s;\n}\n.media-card:hover .poster-image {\n  transform: scale(1.05);\n}\n.poster-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background:\n    linear-gradient(\n      to top,\n      var(--bg-card) 0%,\n      transparent 60%);\n}\n.card-body {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n}\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.media-year {\n  background: rgba(255, 255, 255, 0.1);\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  color: var(--text-muted);\n}\n.media-director {\n  font-size: 0.85rem;\n  color: var(--primary);\n  margin-bottom: 1rem;\n}\n.media-desc {\n  font-size: 0.9rem;\n  color: var(--text-muted);\n  margin-bottom: 1rem;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.tags-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.tag {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  padding: 4px 8px;\n  border-radius: 4px;\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n  border: 1px solid rgba(0, 240, 255, 0.2);\n}\n.spacer {\n  flex-grow: 1;\n}\n.actions-panel {\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  padding-top: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.rating-wrapper {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.stars {\n  display: flex;\n  gap: 2px;\n}\n.star-btn {\n  background: none;\n  border: none;\n  color: #334155;\n  font-size: 1.5rem;\n  cursor: pointer;\n  transition: all 0.2s;\n  line-height: 1;\n  padding: 0;\n}\n.star-btn:hover {\n  transform: scale(1.2);\n  color: var(--gold);\n}\n.star-btn.active {\n  color: var(--gold);\n  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);\n}\n.buttons-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem;\n}\n.btn {\n  border: none;\n  padding: 0.6rem;\n  border-radius: 6px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  color: #fff;\n}\n.btn-favorite {\n  background: rgba(255, 0, 60, 0.1);\n  color: var(--accent-red);\n  border: 1px solid rgba(255, 0, 60, 0.3);\n}\n.btn-favorite:hover {\n  background: rgba(255, 0, 60, 0.2);\n  box-shadow: 0 0 15px rgba(255, 0, 60, 0.3);\n}\n.btn-favorite.active {\n  background: var(--accent-red);\n  color: #fff;\n  box-shadow: 0 0 15px var(--accent-red);\n}\n.btn-seen {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-muted);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.btn-seen:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fff;\n}\n.btn-seen.active {\n  background: var(--accent-green);\n  color: #fff;\n  border-color: var(--accent-green);\n  box-shadow: 0 0 15px var(--accent-green);\n}\n.empty-state,\n.message-box {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-muted);\n}\n.empty-icon {\n  font-size: 4rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n.loader {\n  border: 3px solid rgba(0, 240, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .app-container,\n  .content-wrapper {\n    padding: 1rem;\n  }\n  .title {\n    font-size: 1.8rem;\n  }\n  .media-grid {\n    grid-template-columns: 1fr;\n  }\n  .search-bar {\n    flex-direction: column;\n    border-radius: 20px;\n    padding: 10px;\n  }\n  .filter-toggle-btn {\n    width: 100%;\n    justify-content: center;\n    margin: 0 0 10px 0;\n  }\n}\n/*# sourceMappingURL=user-dashboard.component.css.map */\n'] }]
  }], () => [{ type: MovieService }, { type: RatingService }, { type: FavoriteService }, { type: ViewHistoryService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i09.\u0275setClassDebugInfo(UserDashboardComponent, { className: "UserDashboardComponent", filePath: "src/app/features/dashboards/user-dashboard/user-dashboard..component.ts", lineNumber: 19 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Fdashboards%2Fuser-dashboard%2Fuser-dashboard..component.ts%40UserDashboardComponent";
  function UserDashboardComponent_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i09.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i09.\u0275\u0275replaceMetadata(UserDashboardComponent, m.default, [i09, i5, i6, movie_service_exports, rating_service_exports, favorite_service_exports, view_history_service_exports], [CommonModule4, FormsModule3, Component4], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && UserDashboardComponent_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && UserDashboardComponent_HmrLoad(d.timestamp)));
})();

// src/app/features/user-favorites/user-favorites.component.ts
import { Component as Component5 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { CommonModule as CommonModule5 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import { catchError as catchError2, forkJoin as forkJoin2, of as of5 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/rxjs.js?v=3f3fab55";
import * as i010 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i43 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i52 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
function UserFavoritesComponent_ng_container_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    i010.\u0275\u0275elementStart(0, "div", 10)(1, "strong");
    i010.\u0275\u0275text(2, "Hiba t\xF6rt\xE9nt:");
    i010.\u0275\u0275elementEnd();
    i010.\u0275\u0275elementStart(3, "span");
    i010.\u0275\u0275text(4);
    i010.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = i010.\u0275\u0275nextContext(2);
    i010.\u0275\u0275advance(4);
    i010.\u0275\u0275textInterpolate1(" ", ctx_r0.error);
  }
}
function UserFavoritesComponent_ng_container_6_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    i010.\u0275\u0275elementStart(0, "div", 11);
    i010.\u0275\u0275element(1, "div", 12);
    i010.\u0275\u0275elementStart(2, "p");
    i010.\u0275\u0275text(3, "Kedvencek bet\xF6lt\xE9se...");
    i010.\u0275\u0275elementEnd()();
  }
}
function UserFavoritesComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    i010.\u0275\u0275elementContainerStart(0);
    i010.\u0275\u0275template(1, UserFavoritesComponent_ng_container_6_div_1_Template, 5, 1, "div", 9)(2, UserFavoritesComponent_ng_container_6_ng_template_2_Template, 4, 0, "ng-template", null, 1, i010.\u0275\u0275templateRefExtractor);
    i010.\u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const loading_r2 = i010.\u0275\u0275reference(3);
    const ctx_r0 = i010.\u0275\u0275nextContext();
    i010.\u0275\u0275advance();
    i010.\u0275\u0275property("ngIf", ctx_r0.error)("ngIfElse", loading_r2);
  }
}
function UserFavoritesComponent_ng_template_7_div_0_div_1_span_13_Template(rf, ctx) {
  if (rf & 1) {
    i010.\u0275\u0275elementStart(0, "span", 31);
    i010.\u0275\u0275text(1);
    i010.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const genre_r4 = ctx.$implicit;
    i010.\u0275\u0275advance();
    i010.\u0275\u0275textInterpolate(genre_r4);
  }
}
function UserFavoritesComponent_ng_template_7_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = i010.\u0275\u0275getCurrentView();
    i010.\u0275\u0275elementStart(0, "div", 16)(1, "div", 17);
    i010.\u0275\u0275element(2, "img", 18)(3, "div", 19);
    i010.\u0275\u0275elementEnd();
    i010.\u0275\u0275elementStart(4, "div", 20)(5, "div", 21)(6, "h2", 22);
    i010.\u0275\u0275text(7);
    i010.\u0275\u0275elementEnd();
    i010.\u0275\u0275elementStart(8, "span", 23);
    i010.\u0275\u0275text(9);
    i010.\u0275\u0275elementEnd()();
    i010.\u0275\u0275elementStart(10, "h3", 24);
    i010.\u0275\u0275text(11);
    i010.\u0275\u0275elementEnd();
    i010.\u0275\u0275elementStart(12, "div", 25);
    i010.\u0275\u0275template(13, UserFavoritesComponent_ng_template_7_div_0_div_1_span_13_Template, 2, 1, "span", 26);
    i010.\u0275\u0275elementEnd();
    i010.\u0275\u0275element(14, "div", 27);
    i010.\u0275\u0275elementStart(15, "div", 28)(16, "button", 29);
    i010.\u0275\u0275listener("click", function UserFavoritesComponent_ng_template_7_div_0_div_1_Template_button_click_16_listener() {
      const movie_r5 = i010.\u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = i010.\u0275\u0275nextContext(3);
      return i010.\u0275\u0275resetView(ctx_r0.removeFromFavorites(movie_r5.id));
    });
    i010.\u0275\u0275elementStart(17, "span", 30);
    i010.\u0275\u0275text(18, "\u{1F5D1}");
    i010.\u0275\u0275elementEnd();
    i010.\u0275\u0275text(19, " Elt\xE1vol\xEDt\xE1s ");
    i010.\u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const movie_r5 = ctx.$implicit;
    i010.\u0275\u0275advance(2);
    i010.\u0275\u0275property("src", movie_r5.posterUrl, i010.\u0275\u0275sanitizeUrl)("alt", movie_r5.title);
    i010.\u0275\u0275advance(4);
    i010.\u0275\u0275property("title", movie_r5.title);
    i010.\u0275\u0275advance();
    i010.\u0275\u0275textInterpolate(movie_r5.title);
    i010.\u0275\u0275advance(2);
    i010.\u0275\u0275textInterpolate(movie_r5.releaseYear);
    i010.\u0275\u0275advance(2);
    i010.\u0275\u0275textInterpolate1("Rendezte: ", movie_r5.director || "Ismeretlen");
    i010.\u0275\u0275advance(2);
    i010.\u0275\u0275property("ngForOf", movie_r5.genres);
  }
}
function UserFavoritesComponent_ng_template_7_div_0_Template(rf, ctx) {
  if (rf & 1) {
    i010.\u0275\u0275elementStart(0, "div", 14);
    i010.\u0275\u0275template(1, UserFavoritesComponent_ng_template_7_div_0_div_1_Template, 20, 7, "div", 15);
    i010.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i010.\u0275\u0275nextContext(2);
    i010.\u0275\u0275advance();
    i010.\u0275\u0275property("ngForOf", ctx_r0.movies);
  }
}
function UserFavoritesComponent_ng_template_7_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    i010.\u0275\u0275elementStart(0, "div", 32)(1, "div", 33);
    i010.\u0275\u0275text(2, "\u{1F494}");
    i010.\u0275\u0275elementEnd();
    i010.\u0275\u0275elementStart(3, "p");
    i010.\u0275\u0275text(4, "Jelenleg nincs egyetlen kedvenc filmed sem.");
    i010.\u0275\u0275elementEnd();
    i010.\u0275\u0275elementStart(5, "p", 34);
    i010.\u0275\u0275text(6, "Jel\xF6lj meg p\xE1rat a f\u0151oldalon!");
    i010.\u0275\u0275elementEnd()();
  }
}
function UserFavoritesComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    i010.\u0275\u0275template(0, UserFavoritesComponent_ng_template_7_div_0_Template, 2, 1, "div", 13)(1, UserFavoritesComponent_ng_template_7_ng_template_1_Template, 7, 0, "ng-template", null, 2, i010.\u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const noFavorites_r6 = i010.\u0275\u0275reference(2);
    const ctx_r0 = i010.\u0275\u0275nextContext();
    i010.\u0275\u0275property("ngIf", ctx_r0.movies.length > 0)("ngIfElse", noFavorites_r6);
  }
}
var UserFavoritesComponent = class _UserFavoritesComponent {
  movieService;
  favoriteService;
  authService;
  router;
  movies = [];
  isLoading = true;
  error = null;
  constructor(movieService, favoriteService, authService, router) {
    this.movieService = movieService;
    this.favoriteService = favoriteService;
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    this.isLoading = true;
    this.error = null;
    forkJoin2({
      movies: this.movieService.getMovies(),
      favorites: this.favoriteService.getMyFavorites()
    }).pipe(catchError2((err) => {
      console.error("Hiba a kedvencek bet\xF6lt\xE9sekor:", err);
      if (err.status === 401 || err.status === 403) {
        this.error = "Nincs jogosults\xE1god az adatok megtekint\xE9s\xE9hez.";
      } else {
        this.error = "Ismeretlen hiba t\xF6rt\xE9nt a kedvencek bet\xF6lt\xE9se k\xF6zben.";
      }
      return of5(null);
    })).subscribe((data) => {
      if (!data) {
        this.isLoading = false;
        return;
      }
      const favIds = new Set(data.favorites.map((f) => f.movieId));
      this.movies = data.movies.filter((m) => favIds.has(m.id));
      this.isLoading = false;
    });
  }
  removeFromFavorites(movieId) {
    const oldMovies = [...this.movies];
    this.movies = this.movies.filter((m) => m.id !== movieId);
    this.favoriteService.unfavoriteMovie(movieId).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error("Hiba a kedvenc t\xF6rl\xE9sekor, UI vissza\xE1ll\xEDtva:", err);
        this.movies = oldMovies;
      }
    });
  }
  static \u0275fac = function UserFavoritesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserFavoritesComponent)(i010.\u0275\u0275directiveInject(MovieService), i010.\u0275\u0275directiveInject(FavoriteService), i010.\u0275\u0275directiveInject(AuthService), i010.\u0275\u0275directiveInject(i43.Router));
  };
  static \u0275cmp = /* @__PURE__ */ i010.\u0275\u0275defineComponent({ type: _UserFavoritesComponent, selectors: [["app-user-favorites"]], decls: 9, vars: 2, consts: [["favoritesContent", ""], ["loading", ""], ["noFavorites", ""], [1, "page-container"], [1, "content-wrapper"], [1, "page-header"], [1, "title"], [1, "decoration-line"], [4, "ngIf", "ngIfElse"], ["class", "message-box error", 4, "ngIf", "ngIfElse"], [1, "message-box", "error"], [1, "message-box", "loading"], [1, "loader"], ["class", "media-grid", 4, "ngIf", "ngIfElse"], [1, "media-grid"], ["class", "media-card", 4, "ngFor", "ngForOf"], [1, "media-card"], [1, "poster-wrapper"], ["onerror", "this.src='https://placehold.co/400x600/0f1623/ffffff?text=No+Cover'", 1, "poster-image", 3, "src", "alt"], [1, "poster-overlay"], [1, "card-body"], [1, "card-header"], [1, "media-title", 3, "title"], [1, "media-year"], [1, "media-director"], [1, "tags-container"], ["class", "tag", 4, "ngFor", "ngForOf"], [1, "spacer"], [1, "actions-panel"], [1, "btn", "btn-remove", 3, "click"], [1, "icon"], [1, "tag"], [1, "empty-state"], [1, "empty-icon"], [1, "sub-text"]], template: function UserFavoritesComponent_Template(rf, ctx) {
    if (rf & 1) {
      i010.\u0275\u0275elementStart(0, "div", 3)(1, "main", 4)(2, "header", 5)(3, "h1", 6);
      i010.\u0275\u0275text(4, "Kedvenc Filmjeim");
      i010.\u0275\u0275elementEnd();
      i010.\u0275\u0275element(5, "div", 7);
      i010.\u0275\u0275elementEnd();
      i010.\u0275\u0275template(6, UserFavoritesComponent_ng_container_6_Template, 4, 2, "ng-container", 8)(7, UserFavoritesComponent_ng_template_7_Template, 3, 2, "ng-template", null, 0, i010.\u0275\u0275templateRefExtractor);
      i010.\u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const favoritesContent_r7 = i010.\u0275\u0275reference(8);
      i010.\u0275\u0275advance(6);
      i010.\u0275\u0275property("ngIf", ctx.isLoading || ctx.error)("ngIfElse", favoritesContent_r7);
    }
  }, dependencies: [CommonModule5, i52.NgClass, i52.NgComponentOutlet, i52.NgForOf, i52.NgIf, i52.NgTemplateOutlet, i52.NgStyle, i52.NgSwitch, i52.NgSwitchCase, i52.NgSwitchDefault, i52.NgPlural, i52.NgPluralCase, i52.AsyncPipe, i52.UpperCasePipe, i52.LowerCasePipe, i52.JsonPipe, i52.SlicePipe, i52.DecimalPipe, i52.PercentPipe, i52.TitleCasePipe, i52.CurrencyPipe, i52.DatePipe, i52.I18nPluralPipe, i52.I18nSelectPipe, i52.KeyValuePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  --primary: #00f0ff;\n  --accent: #ff003c;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --card-radius: 12px;\n}\n.page-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  color: var(--text-main);\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--accent),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  color: transparent;\n  -webkit-text-fill-color: transparent;\n}\n.decoration-line[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 4px;\n  background: var(--accent);\n  margin-top: 0.5rem;\n  box-shadow: 0 0 10px var(--accent);\n}\n.media-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 2rem;\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.media-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: var(--card-radius);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.3s;\n}\n.media-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  border-color: var(--accent);\n  box-shadow: 0 10px 30px rgba(255, 0, 60, 0.2);\n}\n.poster-wrapper[_ngcontent-%COMP%] {\n  height: 350px;\n  position: relative;\n  overflow: hidden;\n}\n.poster-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.5s;\n}\n.media-card[_ngcontent-%COMP%]:hover   .poster-image[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.2rem;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n}\n.media-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #fff;\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.media-year[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-muted);\n  background: rgba(255, 255, 255, 0.1);\n  padding: 2px 5px;\n  border-radius: 4px;\n  margin-left: 8px;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.media-director[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  margin-bottom: 0.8rem;\n}\n.tags-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  flex-wrap: wrap;\n  margin-bottom: 1rem;\n}\n.tag[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  background: rgba(255, 255, 255, 0.05);\n  padding: 2px 6px;\n  border-radius: 4px;\n  color: var(--text-muted);\n}\n.spacer[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.btn-remove[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.8rem;\n  border: none;\n  border-radius: 8px;\n  background: rgba(255, 0, 60, 0.1);\n  border: 1px solid rgba(255, 0, 60, 0.3);\n  color: var(--accent);\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  font-size: 0.8rem;\n}\n.btn-remove[_ngcontent-%COMP%]:hover {\n  background: var(--accent);\n  color: white;\n  box-shadow: 0 0 15px var(--accent);\n}\n.empty-state[_ngcontent-%COMP%], \n.message-box[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-muted);\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n.loader[_ngcontent-%COMP%] {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--accent);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=user-favorites.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i010.\u0275setClassMetadata(UserFavoritesComponent, [{
    type: Component5,
    args: [{ selector: "app-user-favorites", standalone: true, imports: [CommonModule5], template: `<div class="page-container">\r
  <main class="content-wrapper">\r
    \r
    <header class="page-header">\r
      <h1 class="title">Kedvenc Filmjeim</h1>\r
      <div class="decoration-line"></div>\r
    </header>\r
\r
    <ng-container *ngIf="isLoading || error; else favoritesContent">\r
      <div *ngIf="error; else loading" class="message-box error">\r
        <strong>Hiba t\xF6rt\xE9nt:</strong> <span> {{ error }}</span>\r
      </div>\r
      <ng-template #loading>\r
        <div class="message-box loading">\r
          <div class="loader"></div>\r
          <p>Kedvencek bet\xF6lt\xE9se...</p>\r
        </div>\r
      </ng-template>\r
    </ng-container>\r
\r
    <ng-template #favoritesContent>\r
      \r
      <div *ngIf="movies.length > 0; else noFavorites" class="media-grid">\r
        <div *ngFor="let movie of movies" class="media-card">\r
          \r
          <div class="poster-wrapper">\r
            <img [src]="movie.posterUrl" \r
                 [alt]="movie.title" \r
                 class="poster-image"\r
                 onerror="this.src='https://placehold.co/400x600/0f1623/ffffff?text=No+Cover'">\r
            <div class="poster-overlay"></div>\r
          </div>\r
\r
          <div class="card-body">\r
            <div class="card-header">\r
              <h2 class="media-title" [title]="movie.title">{{ movie.title }}</h2>\r
              <span class="media-year">{{ movie.releaseYear }}</span>\r
            </div>\r
\r
            <h3 class="media-director">Rendezte: {{ movie.director || 'Ismeretlen' }}</h3>\r
\r
            <div class="tags-container">\r
              <span *ngFor="let genre of movie.genres" class="tag">{{ genre }}</span>\r
            </div>\r
\r
            <div class="spacer"></div>\r
\r
            <div class="actions-panel">\r
              <button (click)="removeFromFavorites(movie.id)" class="btn btn-remove">\r
                <span class="icon">\u{1F5D1}</span> Elt\xE1vol\xEDt\xE1s\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <ng-template #noFavorites>\r
        <div class="empty-state">\r
          <div class="empty-icon">\u{1F494}</div>\r
          <p>Jelenleg nincs egyetlen kedvenc filmed sem.</p>\r
          <p class="sub-text">Jel\xF6lj meg p\xE1rat a f\u0151oldalon!</p>\r
        </div>\r
      </ng-template>\r
\r
    </ng-template>\r
  </main>\r
</div>`, styles: ["/* src/app/features/user-favorites/user-favorites.component.css */\n:host {\n  display: block;\n  --primary: #00f0ff;\n  --accent: #ff003c;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --card-radius: 12px;\n}\n.page-container {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  color: var(--text-main);\n}\n.content-wrapper {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.page-header {\n  margin-bottom: 3rem;\n}\n.title {\n  font-size: 2.5rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--accent),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  color: transparent;\n  -webkit-text-fill-color: transparent;\n}\n.decoration-line {\n  width: 80px;\n  height: 4px;\n  background: var(--accent);\n  margin-top: 0.5rem;\n  box-shadow: 0 0 10px var(--accent);\n}\n.media-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: 2rem;\n  animation: fadeIn 0.5s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.media-card {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: var(--card-radius);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.3s;\n}\n.media-card:hover {\n  transform: translateY(-5px);\n  border-color: var(--accent);\n  box-shadow: 0 10px 30px rgba(255, 0, 60, 0.2);\n}\n.poster-wrapper {\n  height: 350px;\n  position: relative;\n  overflow: hidden;\n}\n.poster-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.5s;\n}\n.media-card:hover .poster-image {\n  transform: scale(1.05);\n}\n.card-body {\n  padding: 1.2rem;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n}\n.media-title {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #fff;\n  margin: 0;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.media-year {\n  font-size: 0.75rem;\n  color: var(--text-muted);\n  background: rgba(255, 255, 255, 0.1);\n  padding: 2px 5px;\n  border-radius: 4px;\n  margin-left: 8px;\n}\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.media-director {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  margin-bottom: 0.8rem;\n}\n.tags-container {\n  display: flex;\n  gap: 5px;\n  flex-wrap: wrap;\n  margin-bottom: 1rem;\n}\n.tag {\n  font-size: 0.65rem;\n  background: rgba(255, 255, 255, 0.05);\n  padding: 2px 6px;\n  border-radius: 4px;\n  color: var(--text-muted);\n}\n.spacer {\n  flex-grow: 1;\n}\n.btn-remove {\n  width: 100%;\n  padding: 0.8rem;\n  border: none;\n  border-radius: 8px;\n  background: rgba(255, 0, 60, 0.1);\n  border: 1px solid rgba(255, 0, 60, 0.3);\n  color: var(--accent);\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  font-size: 0.8rem;\n}\n.btn-remove:hover {\n  background: var(--accent);\n  color: white;\n  box-shadow: 0 0 15px var(--accent);\n}\n.empty-state,\n.message-box {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-muted);\n}\n.empty-icon {\n  font-size: 4rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n.loader {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--accent);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=user-favorites.component.css.map */\n"] }]
  }], () => [{ type: MovieService }, { type: FavoriteService }, { type: AuthService }, { type: i43.Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i010.\u0275setClassDebugInfo(UserFavoritesComponent, { className: "UserFavoritesComponent", filePath: "src/app/features/user-favorites/user-favorites.component.ts", lineNumber: 17 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Fuser-favorites%2Fuser-favorites.component.ts%40UserFavoritesComponent";
  function UserFavoritesComponent_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i010.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i010.\u0275\u0275replaceMetadata(UserFavoritesComponent, m.default, [i010, i52, movie_service_exports, favorite_service_exports, auth_service_exports, i43], [CommonModule5, Component5], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && UserFavoritesComponent_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && UserFavoritesComponent_HmrLoad(d.timestamp)));
})();

// src/app/features/profile/profile.component.ts
import { Component as Component6 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { CommonModule as CommonModule6 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import { FormsModule as FormsModule4 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
import * as i012 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";

// src/app/core/services/user-profile.service.ts
var user_profile_service_exports = {};
__export(user_profile_service_exports, {
  UserService: () => UserService
});
import { Injectable as Injectable6 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i011 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i17 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common_http.js?v=3f3fab55";
var UserService = class _UserService {
  http;
  baseUrl = `${environment.apiUrl}/user`;
  constructor(http) {
    this.http = http;
  }
  getUserById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  updateUser(user) {
    return this.http.put(`${this.baseUrl}/${user.id}`, user);
  }
  createUser(user) {
    return this.http.post(`${this.baseUrl}`, user);
  }
  deleteUser(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getAllUsers() {
    return this.http.get(`${this.baseUrl}`);
  }
  static \u0275fac = function UserService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserService)(i011.\u0275\u0275inject(i17.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i011.\u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i011.\u0275setClassMetadata(UserService, [{
    type: Injectable6,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: i17.HttpClient }], null);
})();

// src/app/features/profile/profile.component.ts
import * as i33 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i44 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import * as i53 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
function ProfileComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    i012.\u0275\u0275elementStart(0, "div", 10);
    i012.\u0275\u0275element(1, "div", 11);
    i012.\u0275\u0275elementEnd();
  }
}
function ProfileComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    i012.\u0275\u0275elementStart(0, "div", 12);
    i012.\u0275\u0275text(1);
    i012.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i012.\u0275\u0275nextContext();
    i012.\u0275\u0275advance();
    i012.\u0275\u0275textInterpolate1(" ", ctx_r0.error, " ");
  }
}
function ProfileComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    i012.\u0275\u0275elementStart(0, "div", 13);
    i012.\u0275\u0275text(1);
    i012.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i012.\u0275\u0275nextContext();
    i012.\u0275\u0275advance();
    i012.\u0275\u0275textInterpolate1(" ", ctx_r0.success, " ");
  }
}
function ProfileComponent_form_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = i012.\u0275\u0275getCurrentView();
    i012.\u0275\u0275elementStart(0, "form", 14);
    i012.\u0275\u0275listener("ngSubmit", function ProfileComponent_form_13_Template_form_ngSubmit_0_listener() {
      i012.\u0275\u0275restoreView(_r2);
      const ctx_r0 = i012.\u0275\u0275nextContext();
      return i012.\u0275\u0275resetView(ctx_r0.onSave());
    });
    i012.\u0275\u0275elementStart(1, "div", 15)(2, "label");
    i012.\u0275\u0275text(3, "Felhaszn\xE1l\xF3n\xE9v");
    i012.\u0275\u0275elementEnd();
    i012.\u0275\u0275elementStart(4, "input", 16);
    i012.\u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_form_13_Template_input_ngModelChange_4_listener($event) {
      i012.\u0275\u0275restoreView(_r2);
      const ctx_r0 = i012.\u0275\u0275nextContext();
      i012.\u0275\u0275twoWayBindingSet(ctx_r0.profile.username, $event) || (ctx_r0.profile.username = $event);
      return i012.\u0275\u0275resetView($event);
    });
    i012.\u0275\u0275elementEnd()();
    i012.\u0275\u0275elementStart(5, "div", 15)(6, "label");
    i012.\u0275\u0275text(7, "Email C\xEDm");
    i012.\u0275\u0275elementEnd();
    i012.\u0275\u0275elementStart(8, "input", 17);
    i012.\u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_form_13_Template_input_ngModelChange_8_listener($event) {
      i012.\u0275\u0275restoreView(_r2);
      const ctx_r0 = i012.\u0275\u0275nextContext();
      i012.\u0275\u0275twoWayBindingSet(ctx_r0.profile.email, $event) || (ctx_r0.profile.email = $event);
      return i012.\u0275\u0275resetView($event);
    });
    i012.\u0275\u0275elementEnd()();
    i012.\u0275\u0275elementStart(9, "div", 18)(10, "div", 15)(11, "label");
    i012.\u0275\u0275text(12, "Szerepk\xF6r");
    i012.\u0275\u0275elementEnd();
    i012.\u0275\u0275element(13, "input", 19);
    i012.\u0275\u0275elementEnd();
    i012.\u0275\u0275elementStart(14, "div", 15)(15, "label");
    i012.\u0275\u0275text(16, "Regisztr\xE1ci\xF3");
    i012.\u0275\u0275elementEnd();
    i012.\u0275\u0275element(17, "input", 20);
    i012.\u0275\u0275pipe(18, "date");
    i012.\u0275\u0275elementEnd()();
    i012.\u0275\u0275elementStart(19, "button", 21);
    i012.\u0275\u0275text(20, " V\xE1ltoztat\xE1sok Ment\xE9se ");
    i012.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = i012.\u0275\u0275nextContext();
    i012.\u0275\u0275advance(4);
    i012.\u0275\u0275twoWayProperty("ngModel", ctx_r0.profile.username);
    i012.\u0275\u0275advance(4);
    i012.\u0275\u0275twoWayProperty("ngModel", ctx_r0.profile.email);
    i012.\u0275\u0275advance(5);
    i012.\u0275\u0275property("ngModel", ctx_r0.profile.role);
    i012.\u0275\u0275advance(4);
    i012.\u0275\u0275property("ngModel", i012.\u0275\u0275pipeBind2(18, 4, ctx_r0.profile.createdAt, "yyyy.MM.dd"));
  }
}
var ProfileComponent = class _ProfileComponent {
  authService;
  userService;
  router;
  profile = null;
  isLoading = true;
  error = null;
  success = null;
  constructor(authService, userService, router) {
    this.authService = authService;
    this.userService = userService;
    this.router = router;
  }
  ngOnInit() {
    const currentUser = this.authService.user;
    if (!currentUser) {
      this.router.navigate(["/login"]);
      return;
    }
    const id = Number(currentUser.id);
    if (isNaN(id)) {
      this.error = "\xC9rv\xE9nytelen felhaszn\xE1l\xF3i azonos\xEDt\xF3.";
      this.isLoading = false;
      return;
    }
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.profile = user;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Profil bet\xF6lt\xE9si hiba:", err);
        this.error = err.status === 401 || err.status === 403 ? "Nincs jogosults\xE1god a profil megtekint\xE9s\xE9hez." : "Nem siker\xFClt bet\xF6lteni a profilt.";
        this.isLoading = false;
      }
    });
  }
  onSave() {
    if (!this.profile) {
      return;
    }
    this.error = null;
    this.success = null;
    this.userService.updateUser(this.profile).subscribe({
      next: (updated) => {
        this.profile = updated;
        this.success = "Profil sikeresen friss\xEDtve.";
        setTimeout(() => {
          this.success = null;
        }, 3e3);
      },
      error: (err) => {
        console.error("Profil ment\xE9si hiba:", err);
        this.error = err.error?.message ?? "Nem siker\xFClt friss\xEDteni a profilt.";
      }
    });
  }
  static \u0275fac = function ProfileComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileComponent)(i012.\u0275\u0275directiveInject(AuthService), i012.\u0275\u0275directiveInject(UserService), i012.\u0275\u0275directiveInject(i33.Router));
  };
  static \u0275cmp = /* @__PURE__ */ i012.\u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], decls: 14, vars: 5, consts: [[1, "profile-page"], [1, "profile-card"], [1, "card-header"], [1, "avatar-placeholder"], [1, "title"], [1, "subtitle"], ["class", "loading-state", 4, "ngIf"], ["class", "error-msg", 4, "ngIf"], ["class", "success-msg", 4, "ngIf"], ["class", "profile-form", 3, "ngSubmit", 4, "ngIf"], [1, "loading-state"], [1, "loader"], [1, "error-msg"], [1, "success-msg"], [1, "profile-form", 3, "ngSubmit"], [1, "form-group"], ["type", "text", "name", "username", 1, "input-field", 3, "ngModelChange", "ngModel"], ["type", "email", "name", "email", 1, "input-field", 3, "ngModelChange", "ngModel"], [1, "row"], ["type", "text", "name", "role", "disabled", "", 1, "input-field", "disabled", 3, "ngModel"], ["type", "text", "name", "createdAt", "disabled", "", 1, "input-field", "disabled", 3, "ngModel"], ["type", "submit", 1, "btn-save"]], template: function ProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      i012.\u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span");
      i012.\u0275\u0275text(5);
      i012.\u0275\u0275elementEnd()();
      i012.\u0275\u0275elementStart(6, "h1", 4);
      i012.\u0275\u0275text(7, "Profilom");
      i012.\u0275\u0275elementEnd();
      i012.\u0275\u0275elementStart(8, "p", 5);
      i012.\u0275\u0275text(9, "Adataid kezel\xE9se");
      i012.\u0275\u0275elementEnd()();
      i012.\u0275\u0275template(10, ProfileComponent_div_10_Template, 2, 0, "div", 6)(11, ProfileComponent_div_11_Template, 2, 1, "div", 7)(12, ProfileComponent_div_12_Template, 2, 1, "div", 8)(13, ProfileComponent_form_13_Template, 21, 7, "form", 9);
      i012.\u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      i012.\u0275\u0275advance(5);
      i012.\u0275\u0275textInterpolate((ctx.profile == null ? null : ctx.profile.username == null ? null : ctx.profile.username.charAt(0)) || "U");
      i012.\u0275\u0275advance(5);
      i012.\u0275\u0275property("ngIf", ctx.isLoading);
      i012.\u0275\u0275advance();
      i012.\u0275\u0275property("ngIf", !ctx.isLoading && ctx.error);
      i012.\u0275\u0275advance();
      i012.\u0275\u0275property("ngIf", ctx.success);
      i012.\u0275\u0275advance();
      i012.\u0275\u0275property("ngIf", !ctx.isLoading && ctx.profile);
    }
  }, dependencies: [CommonModule6, i44.NgClass, i44.NgComponentOutlet, i44.NgForOf, i44.NgIf, i44.NgTemplateOutlet, i44.NgStyle, i44.NgSwitch, i44.NgSwitchCase, i44.NgSwitchDefault, i44.NgPlural, i44.NgPluralCase, FormsModule4, i53.\u0275NgNoValidate, i53.NgSelectOption, i53.\u0275NgSelectMultipleOption, i53.DefaultValueAccessor, i53.NumberValueAccessor, i53.RangeValueAccessor, i53.CheckboxControlValueAccessor, i53.SelectControlValueAccessor, i53.SelectMultipleControlValueAccessor, i53.RadioControlValueAccessor, i53.NgControlStatus, i53.NgControlStatusGroup, i53.RequiredValidator, i53.MinLengthValidator, i53.MaxLengthValidator, i53.PatternValidator, i53.CheckboxRequiredValidator, i53.EmailValidator, i53.MinValidator, i53.MaxValidator, i53.NgModel, i53.NgModelGroup, i53.NgForm, i44.AsyncPipe, i44.UpperCasePipe, i44.LowerCasePipe, i44.JsonPipe, i44.SlicePipe, i44.DecimalPipe, i44.PercentPipe, i44.TitleCasePipe, i44.CurrencyPipe, i44.DatePipe, i44.I18nPluralPipe, i44.I18nSelectPipe, i44.KeyValuePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  --primary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-panel: #1e293b;\n  --text-main: #fff;\n  --input-bg: #0f1623;\n}\n.profile-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  display: flex;\n  justify-content: center;\n  padding-top: 4rem;\n  padding-bottom: 2rem;\n}\n.profile-card[_ngcontent-%COMP%] {\n  background: var(--bg-panel);\n  width: 100%;\n  max-width: 600px;\n  padding: 3rem;\n  border-radius: 20px;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  position: relative;\n  overflow: hidden;\n}\n.profile-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--primary),\n      transparent);\n  box-shadow: 0 0 20px var(--primary);\n}\n.card-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2.5rem;\n}\n.avatar-placeholder[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      #a855f7);\n  border-radius: 50%;\n  margin: 0 auto 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 2.5rem;\n  font-weight: 800;\n  color: #fff;\n  box-shadow: 0 0 20px rgba(112, 0, 255, 0.4);\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 800;\n  margin: 0 0 0.5rem;\n  color: #fff;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  margin: 0;\n}\n.profile-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  color: #cbd5e1;\n  font-size: 0.85rem;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n}\n.input-field[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1rem;\n  background: var(--input-bg);\n  border: 1px solid #334155;\n  border-radius: 10px;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.2s;\n}\n.input-field[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px rgba(112, 0, 255, 0.2);\n}\n.input-field.disabled[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: not-allowed;\n  background: #151f32;\n}\n.row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n}\n.btn-save[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 1rem;\n  background: var(--primary);\n  color: #fff;\n  border: none;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: all 0.2s;\n  box-shadow: 0 4px 15px rgba(112, 0, 255, 0.3);\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(112, 0, 255, 0.5);\n}\n.success-msg[_ngcontent-%COMP%] {\n  color: #4ade80;\n  background: rgba(74, 222, 128, 0.1);\n  padding: 1rem;\n  border-radius: 8px;\n  text-align: center;\n  border: 1px solid rgba(74, 222, 128, 0.2);\n}\n.error-msg[_ngcontent-%COMP%] {\n  color: #f87171;\n  background: rgba(248, 113, 113, 0.1);\n  padding: 1rem;\n  border-radius: 8px;\n  text-align: center;\n  border: 1px solid rgba(248, 113, 113, 0.2);\n}\n.loader[_ngcontent-%COMP%] {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 600px) {\n  .row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n  }\n  .profile-card[_ngcontent-%COMP%] {\n    padding: 2rem 1.5rem;\n  }\n}\n/*# sourceMappingURL=profile.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i012.\u0275setClassMetadata(ProfileComponent, [{
    type: Component6,
    args: [{ selector: "app-profile", standalone: true, imports: [CommonModule6, FormsModule4], template: `<div class="profile-page">\r
  <div class="profile-card">\r
    \r
    <div class="card-header">\r
      <div class="avatar-placeholder">\r
        <span>{{ profile?.username?.charAt(0) || 'U' }}</span>\r
      </div>\r
      <h1 class="title">Profilom</h1>\r
      <p class="subtitle">Adataid kezel\xE9se</p>\r
    </div>\r
\r
    <div *ngIf="isLoading" class="loading-state">\r
      <div class="loader"></div>\r
    </div>\r
\r
    <div *ngIf="!isLoading && error" class="error-msg">\r
      {{ error }}\r
    </div>\r
\r
    <div *ngIf="success" class="success-msg">\r
      {{ success }}\r
    </div>\r
\r
    <form *ngIf="!isLoading && profile" (ngSubmit)="onSave()" class="profile-form">\r
      \r
      <div class="form-group">\r
        <label>Felhaszn\xE1l\xF3n\xE9v</label>\r
        <input type="text" [(ngModel)]="profile.username" name="username" class="input-field" />\r
      </div>\r
\r
      <div class="form-group">\r
        <label>Email C\xEDm</label>\r
        <input type="email" [(ngModel)]="profile.email" name="email" class="input-field" />\r
      </div>\r
\r
      <div class="row">\r
        <div class="form-group">\r
          <label>Szerepk\xF6r</label>\r
          <input type="text" [ngModel]="profile.role" name="role" disabled class="input-field disabled" />\r
        </div>\r
\r
        <div class="form-group">\r
          <label>Regisztr\xE1ci\xF3</label>\r
          <input type="text" [ngModel]="(profile.createdAt | date:'yyyy.MM.dd')" name="createdAt" disabled class="input-field disabled" />\r
        </div>\r
      </div>\r
\r
      <button type="submit" class="btn-save">\r
        V\xE1ltoztat\xE1sok Ment\xE9se\r
      </button>\r
\r
    </form>\r
  </div>\r
</div>`, styles: ['/* src/app/features/profile/profile.component.css */\n:host {\n  display: block;\n  --primary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-panel: #1e293b;\n  --text-main: #fff;\n  --input-bg: #0f1623;\n}\n.profile-page {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  display: flex;\n  justify-content: center;\n  padding-top: 4rem;\n  padding-bottom: 2rem;\n}\n.profile-card {\n  background: var(--bg-panel);\n  width: 100%;\n  max-width: 600px;\n  padding: 3rem;\n  border-radius: 20px;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  position: relative;\n  overflow: hidden;\n}\n.profile-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--primary),\n      transparent);\n  box-shadow: 0 0 20px var(--primary);\n}\n.card-header {\n  text-align: center;\n  margin-bottom: 2.5rem;\n}\n.avatar-placeholder {\n  width: 80px;\n  height: 80px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      #a855f7);\n  border-radius: 50%;\n  margin: 0 auto 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 2.5rem;\n  font-weight: 800;\n  color: #fff;\n  box-shadow: 0 0 20px rgba(112, 0, 255, 0.4);\n}\n.title {\n  font-size: 2rem;\n  font-weight: 800;\n  margin: 0 0 0.5rem;\n  color: #fff;\n}\n.subtitle {\n  color: #94a3b8;\n  margin: 0;\n}\n.profile-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-group label {\n  display: block;\n  color: #cbd5e1;\n  font-size: 0.85rem;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n}\n.input-field {\n  width: 100%;\n  padding: 1rem;\n  background: var(--input-bg);\n  border: 1px solid #334155;\n  border-radius: 10px;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.2s;\n}\n.input-field:focus {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px rgba(112, 0, 255, 0.2);\n}\n.input-field.disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  background: #151f32;\n}\n.row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n}\n.btn-save {\n  margin-top: 1rem;\n  padding: 1rem;\n  background: var(--primary);\n  color: #fff;\n  border: none;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  cursor: pointer;\n  transition: all 0.2s;\n  box-shadow: 0 4px 15px rgba(112, 0, 255, 0.3);\n}\n.btn-save:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(112, 0, 255, 0.5);\n}\n.success-msg {\n  color: #4ade80;\n  background: rgba(74, 222, 128, 0.1);\n  padding: 1rem;\n  border-radius: 8px;\n  text-align: center;\n  border: 1px solid rgba(74, 222, 128, 0.2);\n}\n.error-msg {\n  color: #f87171;\n  background: rgba(248, 113, 113, 0.1);\n  padding: 1rem;\n  border-radius: 8px;\n  text-align: center;\n  border: 1px solid rgba(248, 113, 113, 0.2);\n}\n.loader {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin: 0 auto;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 600px) {\n  .row {\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n  }\n  .profile-card {\n    padding: 2rem 1.5rem;\n  }\n}\n/*# sourceMappingURL=profile.component.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: UserService }, { type: i33.Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i012.\u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src/app/features/profile/profile.component.ts", lineNumber: 16 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Fprofile%2Fprofile.component.ts%40ProfileComponent";
  function ProfileComponent_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i012.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i012.\u0275\u0275replaceMetadata(ProfileComponent, m.default, [i012, i44, i53, auth_service_exports, user_profile_service_exports, i33], [CommonModule6, FormsModule4, Component6], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && ProfileComponent_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && ProfileComponent_HmrLoad(d.timestamp)));
})();

// src/app/features/recommendation/recommendation.component.ts
import { Component as Component7 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { CommonModule as CommonModule7 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import { catchError as catchError3, forkJoin as forkJoin3, of as of6 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/rxjs.js?v=3f3fab55";
import * as i014 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";

// src/app/core/services/recommendation.service.ts
var recommendation_service_exports = {};
__export(recommendation_service_exports, {
  RecommendationService: () => RecommendationService
});
import { Injectable as Injectable7 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i013 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i18 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common_http.js?v=3f3fab55";
var RecommendationService = class _RecommendationService {
  http;
  baseUrl = `${environment.apiUrl}/recommendation`;
  constructor(http) {
    this.http = http;
  }
  getRecommendations(userId, count = 10) {
    return this.http.get(`${this.baseUrl}/${userId}`, {
      params: { count }
    });
  }
  static \u0275fac = function RecommendationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RecommendationService)(i013.\u0275\u0275inject(i18.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i013.\u0275\u0275defineInjectable({ token: _RecommendationService, factory: _RecommendationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i013.\u0275setClassMetadata(RecommendationService, [{
    type: Injectable7,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: i18.HttpClient }], null);
})();

// src/app/features/recommendation/recommendation.component.ts
import * as i62 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i7 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
function RecommendationsComponent_ng_container_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    i014.\u0275\u0275elementStart(0, "div", 11)(1, "strong");
    i014.\u0275\u0275text(2, "Hiba t\xF6rt\xE9nt:");
    i014.\u0275\u0275elementEnd();
    i014.\u0275\u0275elementStart(3, "span");
    i014.\u0275\u0275text(4);
    i014.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = i014.\u0275\u0275nextContext(2);
    i014.\u0275\u0275advance(4);
    i014.\u0275\u0275textInterpolate1(" ", ctx_r0.error);
  }
}
function RecommendationsComponent_ng_container_8_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    i014.\u0275\u0275elementStart(0, "div", 12);
    i014.\u0275\u0275element(1, "div", 13);
    i014.\u0275\u0275elementStart(2, "p");
    i014.\u0275\u0275text(3, "AI elemz\xE9s futtat\xE1sa...");
    i014.\u0275\u0275elementEnd()();
  }
}
function RecommendationsComponent_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    i014.\u0275\u0275elementContainerStart(0);
    i014.\u0275\u0275template(1, RecommendationsComponent_ng_container_8_div_1_Template, 5, 1, "div", 10)(2, RecommendationsComponent_ng_container_8_ng_template_2_Template, 4, 0, "ng-template", null, 1, i014.\u0275\u0275templateRefExtractor);
    i014.\u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const loading_r2 = i014.\u0275\u0275reference(3);
    const ctx_r0 = i014.\u0275\u0275nextContext();
    i014.\u0275\u0275advance();
    i014.\u0275\u0275property("ngIf", ctx_r0.error)("ngIfElse", loading_r2);
  }
}
function RecommendationsComponent_ng_template_9_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    i014.\u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    i014.\u0275\u0275element(2, "img", 19)(3, "div", 20);
    i014.\u0275\u0275elementEnd();
    i014.\u0275\u0275elementStart(4, "div", 21)(5, "h2", 22);
    i014.\u0275\u0275text(6);
    i014.\u0275\u0275elementEnd();
    i014.\u0275\u0275elementStart(7, "p", 23);
    i014.\u0275\u0275text(8);
    i014.\u0275\u0275elementEnd();
    i014.\u0275\u0275element(9, "div", 24);
    i014.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const movie_r3 = ctx.$implicit;
    i014.\u0275\u0275advance(2);
    i014.\u0275\u0275property("src", movie_r3.posterUrl, i014.\u0275\u0275sanitizeUrl)("alt", movie_r3.title);
    i014.\u0275\u0275advance(3);
    i014.\u0275\u0275property("title", movie_r3.title);
    i014.\u0275\u0275advance();
    i014.\u0275\u0275textInterpolate(movie_r3.title);
    i014.\u0275\u0275advance(2);
    i014.\u0275\u0275textInterpolate(movie_r3.description);
  }
}
function RecommendationsComponent_ng_template_9_div_0_Template(rf, ctx) {
  if (rf & 1) {
    i014.\u0275\u0275elementStart(0, "div", 15);
    i014.\u0275\u0275template(1, RecommendationsComponent_ng_template_9_div_0_div_1_Template, 10, 5, "div", 16);
    i014.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i014.\u0275\u0275nextContext(2);
    i014.\u0275\u0275advance();
    i014.\u0275\u0275property("ngForOf", ctx_r0.movies);
  }
}
function RecommendationsComponent_ng_template_9_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    i014.\u0275\u0275elementStart(0, "div", 25)(1, "div", 26);
    i014.\u0275\u0275text(2, "\u{1F916}");
    i014.\u0275\u0275elementEnd();
    i014.\u0275\u0275elementStart(3, "p");
    i014.\u0275\u0275text(4, "M\xE9g tanuljuk az \xEDzl\xE9sedet.");
    i014.\u0275\u0275elementEnd();
    i014.\u0275\u0275elementStart(5, "p", 27);
    i014.\u0275\u0275text(6, "\xC9rt\xE9kelj t\xF6bb filmet, hogy pontosabb aj\xE1nl\xE1sokat kaphass!");
    i014.\u0275\u0275elementEnd()();
  }
}
function RecommendationsComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    i014.\u0275\u0275template(0, RecommendationsComponent_ng_template_9_div_0_Template, 2, 1, "div", 14)(1, RecommendationsComponent_ng_template_9_ng_template_1_Template, 7, 0, "ng-template", null, 2, i014.\u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const noRecs_r4 = i014.\u0275\u0275reference(2);
    const ctx_r0 = i014.\u0275\u0275nextContext();
    i014.\u0275\u0275property("ngIf", ctx_r0.movies.length > 0)("ngIfElse", noRecs_r4);
  }
}
var RecommendationsComponent = class _RecommendationsComponent {
  recommendationService;
  ratingService;
  favoriteService;
  viewHistoryService;
  authService;
  router;
  movies = [];
  myRatings = /* @__PURE__ */ new Map();
  myFavorites = /* @__PURE__ */ new Set();
  mySeen = /* @__PURE__ */ new Set();
  isLoading = true;
  error = null;
  currentUserId = null;
  constructor(recommendationService, ratingService, favoriteService, viewHistoryService, authService, router) {
    this.recommendationService = recommendationService;
    this.ratingService = ratingService;
    this.favoriteService = favoriteService;
    this.viewHistoryService = viewHistoryService;
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    const currentUser = this.authService.user;
    if (!currentUser) {
      this.router.navigate(["/login"]);
      return;
    }
    this.currentUserId = currentUser.id;
    this.loadRecommendations();
  }
  loadRecommendations() {
    if (!this.currentUserId) {
      return;
    }
    this.isLoading = true;
    this.error = null;
    forkJoin3({
      recommendations: this.recommendationService.getRecommendations(this.currentUserId, 10),
      ratings: this.ratingService.getMyRatings(),
      favorites: this.favoriteService.getMyFavorites(),
      seenHistory: this.viewHistoryService.getMyViewHistory()
    }).pipe(catchError3((err) => {
      console.error("Hiba az aj\xE1nl\xE1sok bet\xF6lt\xE9sekor:", err);
      if (err.status === 404) {
        this.error = "Jelenleg nincs el\xE9g adat aj\xE1nl\xE1sokhoz. \xC9rt\xE9kelj \xE9s n\xE9zz meg n\xE9h\xE1ny filmet!";
      } else if (err.status === 401 || err.status === 403) {
        this.error = "Nincs jogosults\xE1god az aj\xE1nlott filmek megtekint\xE9s\xE9hez.";
      } else {
        this.error = "Ismeretlen hiba t\xF6rt\xE9nt az aj\xE1nl\xE1sok bet\xF6lt\xE9se k\xF6zben.";
      }
      return of6(null);
    })).subscribe((data) => {
      if (!data) {
        this.isLoading = false;
        return;
      }
      this.movies = data.recommendations;
      this.myRatings = /* @__PURE__ */ new Map();
      this.myFavorites = /* @__PURE__ */ new Set();
      this.mySeen = /* @__PURE__ */ new Set();
      data.ratings.forEach((r) => this.myRatings.set(r.movieId, r.score));
      data.favorites.forEach((f) => this.myFavorites.add(f.movieId));
      data.seenHistory.forEach((s) => this.mySeen.add(s.movieId));
      this.isLoading = false;
    });
  }
  isFavorite(movieId) {
    return this.myFavorites.has(movieId);
  }
  isSeen(movieId) {
    return this.mySeen.has(movieId);
  }
  getRating(movieId) {
    const score = this.myRatings.get(movieId) || 0;
    return score / 2;
  }
  onRate(movieId, rating) {
    const score = rating * 2;
    const oldScore = this.myRatings.get(movieId) || 0;
    this.myRatings.set(movieId, score);
    this.myRatings = new Map(this.myRatings);
    this.ratingService.rateMovie({ movieId, score }).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error("Hiba az \xE9rt\xE9kel\xE9s ment\xE9sekor, UI vissza\xE1ll\xEDtva:", err);
        this.myRatings.set(movieId, oldScore);
        this.myRatings = new Map(this.myRatings);
      }
    });
  }
  onToggleFavorite(movieId) {
    const wasFavorite = this.isFavorite(movieId);
    if (wasFavorite) {
      this.myFavorites.delete(movieId);
    } else {
      this.myFavorites.add(movieId);
    }
    this.myFavorites = new Set(this.myFavorites);
    const request$ = wasFavorite ? this.favoriteService.unfavoriteMovie(movieId) : this.favoriteService.favoriteMovie({ movieId });
    request$.subscribe({
      next: () => {
      },
      error: (err) => {
        console.error("Hiba a kedvenc ment\xE9sekor, UI vissza\xE1ll\xEDtva:", err);
        if (wasFavorite) {
          this.myFavorites.add(movieId);
        } else {
          this.myFavorites.delete(movieId);
        }
        this.myFavorites = new Set(this.myFavorites);
      }
    });
  }
  onToggleSeen(movieId) {
    const wasSeen = this.isSeen(movieId);
    if (wasSeen) {
      this.mySeen.delete(movieId);
    } else {
      this.mySeen.add(movieId);
    }
    this.mySeen = new Set(this.mySeen);
    const request$ = wasSeen ? this.viewHistoryService.removeFromSeen(movieId) : this.viewHistoryService.markAsSeen(movieId);
    request$.subscribe({
      next: () => {
        if (!wasSeen) {
          this.loadRecommendations();
        }
      },
      error: (err) => {
        console.error('Hiba a "L\xE1ttam" ment\xE9sekor, UI vissza\xE1ll\xEDtva:', err);
        if (wasSeen) {
          this.mySeen.add(movieId);
        } else {
          this.mySeen.delete(movieId);
        }
        this.mySeen = new Set(this.mySeen);
      }
    });
  }
  static \u0275fac = function RecommendationsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RecommendationsComponent)(i014.\u0275\u0275directiveInject(RecommendationService), i014.\u0275\u0275directiveInject(RatingService), i014.\u0275\u0275directiveInject(FavoriteService), i014.\u0275\u0275directiveInject(ViewHistoryService), i014.\u0275\u0275directiveInject(AuthService), i014.\u0275\u0275directiveInject(i62.Router));
  };
  static \u0275cmp = /* @__PURE__ */ i014.\u0275\u0275defineComponent({ type: _RecommendationsComponent, selectors: [["app-recommendations"]], decls: 11, vars: 2, consts: [["recContent", ""], ["loading", ""], ["noRecs", ""], [1, "page-container"], [1, "content-wrapper"], [1, "page-header"], [1, "title"], [1, "decoration-line"], [1, "subtitle"], [4, "ngIf", "ngIfElse"], ["class", "message-box error", 4, "ngIf", "ngIfElse"], [1, "message-box", "error"], [1, "message-box", "loading"], [1, "loader"], ["class", "media-grid", 4, "ngIf", "ngIfElse"], [1, "media-grid"], ["class", "media-card", 4, "ngFor", "ngForOf"], [1, "media-card"], [1, "poster-wrapper"], ["onerror", "this.src='https://placehold.co/400x600/0f1623/ffffff?text=No+Cover'", 1, "poster-image", 3, "src", "alt"], [1, "poster-overlay"], [1, "card-body"], [1, "media-title", 3, "title"], [1, "media-desc"], [1, "spacer"], [1, "empty-state"], [1, "empty-icon"], [1, "sub-text"]], template: function RecommendationsComponent_Template(rf, ctx) {
    if (rf & 1) {
      i014.\u0275\u0275elementStart(0, "div", 3)(1, "main", 4)(2, "header", 5)(3, "h1", 6);
      i014.\u0275\u0275text(4, "Neked Aj\xE1nljuk");
      i014.\u0275\u0275elementEnd();
      i014.\u0275\u0275element(5, "div", 7);
      i014.\u0275\u0275elementStart(6, "p", 8);
      i014.\u0275\u0275text(7, "Az AI szerint ezek tetszeni fognak neked");
      i014.\u0275\u0275elementEnd()();
      i014.\u0275\u0275template(8, RecommendationsComponent_ng_container_8_Template, 4, 2, "ng-container", 9)(9, RecommendationsComponent_ng_template_9_Template, 3, 2, "ng-template", null, 0, i014.\u0275\u0275templateRefExtractor);
      i014.\u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const recContent_r5 = i014.\u0275\u0275reference(10);
      i014.\u0275\u0275advance(8);
      i014.\u0275\u0275property("ngIf", ctx.isLoading || ctx.error)("ngIfElse", recContent_r5);
    }
  }, dependencies: [CommonModule7, i7.NgClass, i7.NgComponentOutlet, i7.NgForOf, i7.NgIf, i7.NgTemplateOutlet, i7.NgStyle, i7.NgSwitch, i7.NgSwitchCase, i7.NgSwitchDefault, i7.NgPlural, i7.NgPluralCase, i7.AsyncPipe, i7.UpperCasePipe, i7.LowerCasePipe, i7.JsonPipe, i7.SlicePipe, i7.DecimalPipe, i7.PercentPipe, i7.TitleCasePipe, i7.CurrencyPipe, i7.DatePipe, i7.I18nPluralPipe, i7.I18nSelectPipe, i7.KeyValuePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  --theme-color: #10b981;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n}\n.page-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  color: var(--text-main);\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--theme-color),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  color: transparent;\n  -webkit-text-fill-color: transparent;\n}\n.decoration-line[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 4px;\n  background: var(--theme-color);\n  margin: 0.5rem 0 1rem 0;\n  box-shadow: 0 0 10px var(--theme-color);\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 1.1rem;\n}\n.media-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 2rem;\n  animation: _ngcontent-%COMP%_fadeIn 0.6s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.media-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(16, 185, 129, 0.2);\n  border-radius: 12px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.3s;\n  height: 100%;\n}\n.media-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 10px 40px rgba(16, 185, 129, 0.2);\n}\n.poster-wrapper[_ngcontent-%COMP%] {\n  height: 380px;\n  position: relative;\n  overflow: hidden;\n}\n.poster-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n.media-title[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  margin: 0 0 0.5rem 0;\n}\n.media-desc[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--text-muted);\n  display: -webkit-box;\n  line-clamp: 4;\n  -webkit-line-clamp: 4;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.empty-state[_ngcontent-%COMP%], \n.message-box[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-muted);\n}\n.loader[_ngcontent-%COMP%] {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--theme-color);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=recommendation.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i014.\u0275setClassMetadata(RecommendationsComponent, [{
    type: Component7,
    args: [{ selector: "app-recommendations", standalone: true, imports: [CommonModule7], template: `<div class="page-container">\r
  <main class="content-wrapper">\r
    \r
    <header class="page-header">\r
      <h1 class="title">Neked Aj\xE1nljuk</h1>\r
      <div class="decoration-line"></div>\r
      <p class="subtitle">Az AI szerint ezek tetszeni fognak neked</p>\r
    </header>\r
\r
    <ng-container *ngIf="isLoading || error; else recContent">\r
      <div *ngIf="error; else loading" class="message-box error">\r
        <strong>Hiba t\xF6rt\xE9nt:</strong> <span> {{ error }}</span>\r
      </div>\r
      <ng-template #loading>\r
        <div class="message-box loading">\r
          <div class="loader"></div>\r
          <p>AI elemz\xE9s futtat\xE1sa...</p>\r
        </div>\r
      </ng-template>\r
    </ng-container>\r
\r
    <ng-template #recContent>\r
      \r
      <div *ngIf="movies.length > 0; else noRecs" class="media-grid">\r
        \r
        <div *ngFor="let movie of movies" class="media-card">\r
          <div class="poster-wrapper">\r
            <img [src]="movie.posterUrl" [alt]="movie.title" class="poster-image" onerror="this.src='https://placehold.co/400x600/0f1623/ffffff?text=No+Cover'">\r
            <div class="poster-overlay"></div>\r
          </div>\r
\r
          <div class="card-body">\r
            <h2 class="media-title" [title]="movie.title">{{ movie.title }}</h2>\r
            <p class="media-desc">{{ movie.description }}</p>\r
            <div class="spacer"></div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <ng-template #noRecs>\r
        <div class="empty-state">\r
          <div class="empty-icon">\u{1F916}</div>\r
          <p>M\xE9g tanuljuk az \xEDzl\xE9sedet.</p>\r
          <p class="sub-text">\xC9rt\xE9kelj t\xF6bb filmet, hogy pontosabb aj\xE1nl\xE1sokat kaphass!</p>\r
        </div>\r
      </ng-template>\r
\r
    </ng-template>\r
  </main>\r
</div>`, styles: ["/* src/app/features/recommendation/recommendation.component.css */\n:host {\n  display: block;\n  --theme-color: #10b981;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n}\n.page-container {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  color: var(--text-main);\n}\n.content-wrapper {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.title {\n  font-size: 2.5rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--theme-color),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  color: transparent;\n  -webkit-text-fill-color: transparent;\n}\n.decoration-line {\n  width: 120px;\n  height: 4px;\n  background: var(--theme-color);\n  margin: 0.5rem 0 1rem 0;\n  box-shadow: 0 0 10px var(--theme-color);\n}\n.subtitle {\n  color: var(--text-muted);\n  font-size: 1.1rem;\n}\n.media-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 2rem;\n  animation: fadeIn 0.6s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.media-card {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(16, 185, 129, 0.2);\n  border-radius: 12px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.3s;\n  height: 100%;\n}\n.media-card:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 10px 40px rgba(16, 185, 129, 0.2);\n}\n.poster-wrapper {\n  height: 380px;\n  position: relative;\n  overflow: hidden;\n}\n.poster-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.card-body {\n  padding: 1.5rem;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n.media-title {\n  font-size: 1.2rem;\n  margin: 0 0 0.5rem 0;\n}\n.media-desc {\n  font-size: 0.9rem;\n  color: var(--text-muted);\n  display: -webkit-box;\n  line-clamp: 4;\n  -webkit-line-clamp: 4;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.spacer {\n  flex-grow: 1;\n}\n.empty-state,\n.message-box {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-muted);\n}\n.loader {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--theme-color);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=recommendation.component.css.map */\n"] }]
  }], () => [{ type: RecommendationService }, { type: RatingService }, { type: FavoriteService }, { type: ViewHistoryService }, { type: AuthService }, { type: i62.Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i014.\u0275setClassDebugInfo(RecommendationsComponent, { className: "RecommendationsComponent", filePath: "src/app/features/recommendation/recommendation.component.ts", lineNumber: 19 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Frecommendation%2Frecommendation.component.ts%40RecommendationsComponent";
  function RecommendationsComponent_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i014.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i014.\u0275\u0275replaceMetadata(RecommendationsComponent, m.default, [i014, i7, recommendation_service_exports, rating_service_exports, favorite_service_exports, view_history_service_exports, auth_service_exports, i62], [CommonModule7, Component7], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && RecommendationsComponent_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && RecommendationsComponent_HmrLoad(d.timestamp)));
})();

// src/app/features/admin-pages/manage-movies/manage-movies.ts
import { Component as Component8 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { CommonModule as CommonModule8 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import { FormsModule as FormsModule5 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
import { RouterModule as RouterModule4 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i016 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";

// src/app/core/services/genre.services.ts
var genre_services_exports = {};
__export(genre_services_exports, {
  GenreService: () => GenreService
});
import { Injectable as Injectable8 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i015 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i19 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common_http.js?v=3f3fab55";
var GenreService = class _GenreService {
  http;
  genreUrl = `${environment.apiUrl}/Genre`;
  // Backend API URL
  constructor(http) {
    this.http = http;
  }
  // Műfajok lekérése
  getGenres() {
    return this.http.get(this.genreUrl);
  }
  static \u0275fac = function GenreService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GenreService)(i015.\u0275\u0275inject(i19.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i015.\u0275\u0275defineInjectable({ token: _GenreService, factory: _GenreService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i015.\u0275setClassMetadata(GenreService, [{
    type: Injectable8,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: i19.HttpClient }], null);
})();

// src/app/features/admin-pages/manage-movies/manage-movies.ts
import * as i34 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import * as i45 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
import * as i54 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
var _c02 = () => [];
function ManageMoviesComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = i016.\u0275\u0275getCurrentView();
    i016.\u0275\u0275elementStart(0, "div", 39)(1, "button", 40);
    i016.\u0275\u0275listener("click", function ManageMoviesComponent_div_19_Template_button_click_1_listener() {
      i016.\u0275\u0275restoreView(_r2);
      const ctx_r2 = i016.\u0275\u0275nextContext();
      return i016.\u0275\u0275resetView(ctx_r2.setSearchField("all"));
    });
    i016.\u0275\u0275text(2, "Minden");
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275elementStart(3, "button", 40);
    i016.\u0275\u0275listener("click", function ManageMoviesComponent_div_19_Template_button_click_3_listener() {
      i016.\u0275\u0275restoreView(_r2);
      const ctx_r2 = i016.\u0275\u0275nextContext();
      return i016.\u0275\u0275resetView(ctx_r2.setSearchField("title"));
    });
    i016.\u0275\u0275text(4, "C\xEDm");
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275elementStart(5, "button", 40);
    i016.\u0275\u0275listener("click", function ManageMoviesComponent_div_19_Template_button_click_5_listener() {
      i016.\u0275\u0275restoreView(_r2);
      const ctx_r2 = i016.\u0275\u0275nextContext();
      return i016.\u0275\u0275resetView(ctx_r2.setSearchField("director"));
    });
    i016.\u0275\u0275text(6, "Rendez\u0151");
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275elementStart(7, "button", 40);
    i016.\u0275\u0275listener("click", function ManageMoviesComponent_div_19_Template_button_click_7_listener() {
      i016.\u0275\u0275restoreView(_r2);
      const ctx_r2 = i016.\u0275\u0275nextContext();
      return i016.\u0275\u0275resetView(ctx_r2.setSearchField("genre"));
    });
    i016.\u0275\u0275text(8, "M\u0171faj");
    i016.\u0275\u0275elementEnd()();
  }
}
function ManageMoviesComponent_div_20_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = i016.\u0275\u0275getCurrentView();
    i016.\u0275\u0275elementStart(0, "button", 43);
    i016.\u0275\u0275listener("click", function ManageMoviesComponent_div_20_button_1_Template_button_click_0_listener() {
      const g_r5 = i016.\u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = i016.\u0275\u0275nextContext(2);
      return i016.\u0275\u0275resetView(ctx_r2.selectGenre(g_r5));
    });
    i016.\u0275\u0275text(1);
    i016.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const g_r5 = ctx.$implicit;
    i016.\u0275\u0275advance();
    i016.\u0275\u0275textInterpolate1(" ", g_r5, " ");
  }
}
function ManageMoviesComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    i016.\u0275\u0275elementStart(0, "div", 41);
    i016.\u0275\u0275template(1, ManageMoviesComponent_div_20_button_1_Template, 2, 1, "button", 42);
    i016.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = i016.\u0275\u0275nextContext();
    i016.\u0275\u0275advance();
    i016.\u0275\u0275property("ngForOf", ctx_r2.genreSuggestions);
  }
}
function ManageMoviesComponent_div_28_div_1_span_22_Template(rf, ctx) {
  if (rf & 1) {
    i016.\u0275\u0275elementStart(0, "span", 66);
    i016.\u0275\u0275text(1);
    i016.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const genre_r7 = ctx.$implicit;
    i016.\u0275\u0275advance();
    i016.\u0275\u0275textInterpolate1(" ", genre_r7, " ");
  }
}
function ManageMoviesComponent_div_28_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = i016.\u0275\u0275getCurrentView();
    i016.\u0275\u0275elementStart(0, "div", 46)(1, "div", 47);
    i016.\u0275\u0275element(2, "img", 48)(3, "div", 49);
    i016.\u0275\u0275elementStart(4, "div", 50);
    i016.\u0275\u0275text(5);
    i016.\u0275\u0275elementEnd()();
    i016.\u0275\u0275elementStart(6, "div", 51)(7, "div", 52)(8, "h2", 53);
    i016.\u0275\u0275text(9);
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275elementStart(10, "span", 54);
    i016.\u0275\u0275text(11);
    i016.\u0275\u0275elementEnd()();
    i016.\u0275\u0275elementStart(12, "h3", 55);
    i016.\u0275\u0275text(13);
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275elementStart(14, "p", 56);
    i016.\u0275\u0275text(15);
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275elementStart(16, "div", 57)(17, "span", 58);
    i016.\u0275\u0275text(18, "\u2B50");
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275elementStart(19, "span", 59);
    i016.\u0275\u0275text(20);
    i016.\u0275\u0275elementEnd()();
    i016.\u0275\u0275elementStart(21, "div", 60);
    i016.\u0275\u0275template(22, ManageMoviesComponent_div_28_div_1_span_22_Template, 2, 1, "span", 61);
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275element(23, "div", 62);
    i016.\u0275\u0275elementStart(24, "div", 63)(25, "button", 64);
    i016.\u0275\u0275listener("click", function ManageMoviesComponent_div_28_div_1_Template_button_click_25_listener() {
      const movie_r8 = i016.\u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = i016.\u0275\u0275nextContext(2);
      return i016.\u0275\u0275resetView(ctx_r2.editMovie(movie_r8));
    });
    i016.\u0275\u0275elementStart(26, "span", 14);
    i016.\u0275\u0275text(27, "\u270F\uFE0F");
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275text(28, " Szerkeszt\xE9s ");
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275element(29, "br");
    i016.\u0275\u0275elementStart(30, "button", 65);
    i016.\u0275\u0275listener("click", function ManageMoviesComponent_div_28_div_1_Template_button_click_30_listener() {
      const movie_r8 = i016.\u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = i016.\u0275\u0275nextContext(2);
      return i016.\u0275\u0275resetView(ctx_r2.deleteMovie(movie_r8.id));
    });
    i016.\u0275\u0275elementStart(31, "span", 14);
    i016.\u0275\u0275text(32, "\u{1F5D1}\uFE0F");
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275text(33, " T\xF6rl\xE9s ");
    i016.\u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const movie_r8 = ctx.$implicit;
    i016.\u0275\u0275advance(2);
    i016.\u0275\u0275property("src", movie_r8.posterUrl || "https://placehold.co/400x600/0f1623/ffffff?text=No+Poster", i016.\u0275\u0275sanitizeUrl)("alt", movie_r8.title);
    i016.\u0275\u0275advance(3);
    i016.\u0275\u0275textInterpolate1("ID: ", movie_r8.id);
    i016.\u0275\u0275advance(3);
    i016.\u0275\u0275property("title", movie_r8.title);
    i016.\u0275\u0275advance();
    i016.\u0275\u0275textInterpolate(movie_r8.title);
    i016.\u0275\u0275advance(2);
    i016.\u0275\u0275textInterpolate(movie_r8.releaseYear);
    i016.\u0275\u0275advance(2);
    i016.\u0275\u0275textInterpolate1("Rendezte: ", movie_r8.director || "Ismeretlen");
    i016.\u0275\u0275advance();
    i016.\u0275\u0275property("title", movie_r8.description);
    i016.\u0275\u0275advance();
    i016.\u0275\u0275textInterpolate1(" ", movie_r8.description, " ");
    i016.\u0275\u0275advance(5);
    i016.\u0275\u0275textInterpolate1("", movie_r8.averageRating, "/10");
    i016.\u0275\u0275advance(2);
    i016.\u0275\u0275property("ngForOf", movie_r8.genres);
  }
}
function ManageMoviesComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    i016.\u0275\u0275elementStart(0, "div", 44);
    i016.\u0275\u0275template(1, ManageMoviesComponent_div_28_div_1_Template, 34, 11, "div", 45);
    i016.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = i016.\u0275\u0275nextContext();
    i016.\u0275\u0275advance();
    i016.\u0275\u0275property("ngForOf", ctx_r2.filteredMovies);
  }
}
function ManageMoviesComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    i016.\u0275\u0275elementStart(0, "div", 67)(1, "div", 68);
    i016.\u0275\u0275text(2, "\u{1F4ED}");
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275elementStart(3, "p");
    i016.\u0275\u0275text(4, "Nincsenek megjelen\xEDthet\u0151 filmek.");
    i016.\u0275\u0275elementEnd()();
  }
}
function ManageMoviesComponent_label_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = i016.\u0275\u0275getCurrentView();
    i016.\u0275\u0275elementStart(0, "label", 69)(1, "input", 70);
    i016.\u0275\u0275listener("change", function ManageMoviesComponent_label_64_Template_input_change_1_listener($event) {
      const g_r10 = i016.\u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = i016.\u0275\u0275nextContext();
      return i016.\u0275\u0275resetView(ctx_r2.onGenreCheckboxChanged($event, g_r10.id));
    });
    i016.\u0275\u0275elementEnd();
    i016.\u0275\u0275elementStart(2, "span", 71);
    i016.\u0275\u0275text(3);
    i016.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const g_r10 = ctx.$implicit;
    const ctx_r2 = i016.\u0275\u0275nextContext();
    i016.\u0275\u0275advance();
    i016.\u0275\u0275property("checked", (ctx_r2.formModel.genreIds || i016.\u0275\u0275pureFunction0(2, _c02)).includes(g_r10.id));
    i016.\u0275\u0275advance(2);
    i016.\u0275\u0275textInterpolate(g_r10.name);
  }
}
var ManageMoviesComponent = class _ManageMoviesComponent {
  movieService;
  genreService;
  movies = [];
  genres = [];
  isFormOpen = false;
  editingMovie = null;
  formModel = {
    title: "",
    description: "",
    releaseYear: 2e3,
    posterUrl: "",
    director: "",
    genreIds: []
  };
  isLoading = true;
  error = null;
  // Keresés
  searchTerm = "";
  searchField = "all";
  isSearchDropdownOpen = false;
  allGenres = [];
  genreSuggestions = [];
  selectedGenre = null;
  constructor(movieService, genreService) {
    this.movieService = movieService;
    this.genreService = genreService;
  }
  ngOnInit() {
    this.loadMovies();
    this.loadGenres();
  }
  loadMovies() {
    this.isLoading = true;
    this.movieService.getMovies().subscribe({
      next: (res) => {
        this.movies = res;
        this.isLoading = false;
      },
      error: () => {
        this.error = "Nem siker\xFClt bet\xF6lteni a filmeket.";
        this.isLoading = false;
      }
    });
  }
  loadGenres() {
    this.genreService.getGenres().subscribe({
      next: (res) => {
        this.genres = res;
        this.allGenres = this.genres.map((g) => g.name).sort();
      },
      error: () => {
        this.error = "Nem siker\xFClt bet\xF6lteni a m\u0171fajokat.";
      }
    });
  }
  // ---------------------
  // KERESÉS
  // ---------------------
  toggleSearchDropdown() {
    this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
  }
  setSearchField(field) {
    this.searchField = field;
    this.isSearchDropdownOpen = false;
  }
  getSearchFieldLabel() {
    switch (this.searchField) {
      case "title":
        return "C\xEDm";
      case "director":
        return "Rendez\u0151";
      case "genre":
        return "M\u0171faj";
      default:
        return "Minden";
    }
  }
  onSearchTermChange(term) {
    this.searchTerm = term;
    if (this.searchField === "genre") {
      const t = term.trim().toLowerCase();
      if (!t)
        return;
      this.genreSuggestions = this.allGenres.filter((g) => g.toLowerCase().includes(t));
    }
  }
  selectGenre(genreName) {
    const genre = this.genres.find((g) => g.name === genreName);
    if (!genre)
      return;
    this.selectedGenre = genre.id.toString();
    this.searchTerm = genreName;
    this.genreSuggestions = [];
  }
  getGenres(movie) {
    return movie.genres?.map((g) => g.toLowerCase()) ?? [];
  }
  get filteredMovies() {
    const term = this.searchTerm.trim().toLowerCase();
    if (this.searchField === "genre") {
      if (!this.selectedGenre)
        return this.movies;
      const selected = this.selectedGenre.toLowerCase();
      return this.movies.filter((m) => this.getGenres(m).some((genreName) => genreName.toLowerCase() === selected));
    }
    if (!term)
      return this.movies;
    return this.movies.filter((movie) => {
      const title = movie.title?.toLowerCase() ?? "";
      const description = movie.description?.toLowerCase() ?? "";
      const director = movie.director?.toLowerCase() ?? "";
      const genreNames = this.getGenres(movie).map((g) => g.toLowerCase());
      switch (this.searchField) {
        case "title":
          return title.includes(term);
        case "director":
          return director.includes(term);
        case "all":
        default:
          return title.includes(term) || description.includes(term) || director.includes(term) || genreNames.some((g) => g.includes(term));
      }
    });
  }
  getGenreName(id) {
    return this.genres.find((g) => g.id === id)?.name ?? "Ismeretlen";
  }
  onGenreCheckboxChanged(event, genreId) {
    const checked = event.target.checked;
    if (checked) {
      if (!this.formModel.genreIds.includes(genreId))
        this.formModel.genreIds.push(genreId);
    } else {
      const idx = this.formModel.genreIds.indexOf(genreId);
      if (idx !== -1)
        this.formModel.genreIds.splice(idx, 1);
    }
  }
  // ---------------------
  // MŰFAJ VÁLASZTÁS – ID-ket tárolunk!
  // ---------------------
  onGenreChange(genreId) {
    const index = this.formModel.genreIds.indexOf(genreId);
    if (index === -1) {
      this.formModel.genreIds.push(genreId);
    } else {
      this.formModel.genreIds.splice(index, 1);
    }
  }
  // ---------------------
  // PLAKÁT KEZELÉSE
  // ---------------------
  onFileChange(event) {
    const file = event.target.files[0];
    if (!file)
      return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.formModel.posterUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  // ---------------------
  // FORM NYITÁS
  // ---------------------
  addMovie() {
    this.isFormOpen = true;
    this.editingMovie = null;
    this.formModel = {
      title: "",
      description: "",
      releaseYear: 2e3,
      posterUrl: "",
      director: "",
      genreIds: []
    };
  }
  editMovie(movie) {
    this.isFormOpen = true;
    this.editingMovie = movie;
    this.formModel = {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseYear: movie.releaseYear,
      posterUrl: movie.posterUrl,
      director: movie.director || "",
      genreIds: movie.genreIds || []
      // FONTOS!!
    };
  }
  // ---------------------
  // MENTÉS
  // ---------------------
  saveMovie() {
    if (!this.editingMovie) {
      const dto = {
        title: this.formModel.title,
        description: this.formModel.description,
        releaseYear: this.formModel.releaseYear,
        posterUrl: this.formModel.posterUrl,
        director: this.formModel.director,
        genreIds: this.formModel.genreIds
      };
      this.movieService.create(dto).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadMovies();
        }
      });
    } else {
      const dto = {
        id: this.editingMovie.id,
        title: this.formModel.title,
        description: this.formModel.description,
        releaseYear: this.formModel.releaseYear,
        posterUrl: this.formModel.posterUrl,
        director: this.formModel.director,
        genreIds: this.formModel.genreIds
      };
      this.movieService.update(this.editingMovie.id, dto).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadMovies();
        }
      });
    }
  }
  closeForm() {
    this.isFormOpen = false;
    this.editingMovie = null;
  }
  deleteMovie(id) {
    if (confirm("Biztosan t\xF6r\xF6lni szeretn\xE9d?")) {
      this.movieService.delete(id).subscribe({
        next: () => this.loadMovies()
      });
    }
  }
  static \u0275fac = function ManageMoviesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ManageMoviesComponent)(i016.\u0275\u0275directiveInject(MovieService), i016.\u0275\u0275directiveInject(GenreService));
  };
  static \u0275cmp = /* @__PURE__ */ i016.\u0275\u0275defineComponent({ type: _ManageMoviesComponent, selectors: [["app-manage-movies"]], decls: 70, vars: 16, consts: [["emptyState", ""], [1, "admin-page"], [1, "content-wrapper"], [1, "page-header"], [1, "title"], [1, "decoration-line"], [1, "subtitle"], [1, "toolbar-section"], [1, "search-bar"], ["type", "button", 1, "filter-toggle-btn", 3, "click"], [1, "filter-label"], [1, "filter-arrow"], ["type", "text", "placeholder", "Keres\xE9s...", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "search-icon-wrapper"], [1, "icon"], ["class", "dropdown-menu fade-in", 4, "ngIf"], ["class", "suggestions-menu fade-in", 4, "ngIf"], [1, "action-buttons"], ["routerLink", "/admin-dashboard", 1, "btn", "btn-secondary"], [1, "btn", "btn-add", 3, "click"], ["class", "media-grid", 4, "ngIf", "ngIfElse"], [1, "modal-overlay", 3, "click"], [1, "modal-container", 3, "click"], [1, "modal-header"], [1, "modal-title"], [1, "btn-close", 3, "click"], [1, "modal-form", 3, "ngSubmit"], [1, "form-group"], ["type", "text", "name", "title", "required", "", "placeholder", "Pl. Eredet", 1, "input-field", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["type", "number", "name", "releaseYear", "placeholder", "2010", 1, "input-field", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "director", "placeholder", "Christopher Nolan", 1, "input-field", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "posterUrl", "placeholder", "https://...", 1, "input-field", 3, "ngModelChange", "ngModel"], ["name", "description", "required", "", "placeholder", "R\xF6vid tartalom...", 1, "input-field", "textarea", 3, "ngModelChange", "ngModel"], [1, "genre-grid"], ["class", "genre-checkbox", 4, "ngFor", "ngForOf"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary"], [1, "dropdown-menu", "fade-in"], [1, "dropdown-item", 3, "click"], [1, "suggestions-menu", "fade-in"], ["class", "suggestion-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "suggestion-item", 3, "click"], [1, "media-grid"], ["class", "media-card", 4, "ngFor", "ngForOf"], [1, "media-card"], [1, "poster-wrapper"], [1, "poster-image", 3, "src", "alt"], [1, "poster-overlay"], [1, "admin-badge"], [1, "card-body"], [1, "card-header"], [1, "media-title", 3, "title"], [1, "media-year"], [1, "media-director"], [1, "media-desc", 3, "title"], [1, "rating-row"], [1, "rating-star"], [1, "rating-value"], [1, "tags-container"], ["class", "tag", 4, "ngFor", "ngForOf"], [1, "spacer"], [1, "card-actions"], [1, "btn", "btn-edit", 3, "click"], [1, "btn", "btn-delete", 3, "click"], [1, "tag"], [1, "empty-message"], [1, "empty-icon"], [1, "genre-checkbox"], ["type", "checkbox", 3, "change", "checked"], [1, "checkbox-label"]], template: function ManageMoviesComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = i016.\u0275\u0275getCurrentView();
      i016.\u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "header", 3)(3, "h1", 4);
      i016.\u0275\u0275text(4, "Film Kezel\u0151");
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275element(5, "div", 5);
      i016.\u0275\u0275elementStart(6, "p", 6);
      i016.\u0275\u0275text(7, "Adminisztr\xE1ci\xF3s fel\xFClet");
      i016.\u0275\u0275elementEnd()();
      i016.\u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "button", 9);
      i016.\u0275\u0275listener("click", function ManageMoviesComponent_Template_button_click_10_listener() {
        i016.\u0275\u0275restoreView(_r1);
        return i016.\u0275\u0275resetView(ctx.toggleSearchDropdown());
      });
      i016.\u0275\u0275elementStart(11, "span", 10);
      i016.\u0275\u0275text(12);
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(13, "span", 11);
      i016.\u0275\u0275text(14, "\u25BC");
      i016.\u0275\u0275elementEnd()();
      i016.\u0275\u0275elementStart(15, "input", 12);
      i016.\u0275\u0275listener("ngModelChange", function ManageMoviesComponent_Template_input_ngModelChange_15_listener($event) {
        i016.\u0275\u0275restoreView(_r1);
        return i016.\u0275\u0275resetView(ctx.onSearchTermChange($event));
      });
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(16, "div", 13)(17, "span", 14);
      i016.\u0275\u0275text(18, "\u{1F50D}");
      i016.\u0275\u0275elementEnd()();
      i016.\u0275\u0275template(19, ManageMoviesComponent_div_19_Template, 9, 0, "div", 15)(20, ManageMoviesComponent_div_20_Template, 2, 1, "div", 16);
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(21, "div", 17)(22, "button", 18);
      i016.\u0275\u0275text(23, " \u2190 Vissza a Dashboardra ");
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(24, "button", 19);
      i016.\u0275\u0275listener("click", function ManageMoviesComponent_Template_button_click_24_listener() {
        i016.\u0275\u0275restoreView(_r1);
        return i016.\u0275\u0275resetView(ctx.addMovie());
      });
      i016.\u0275\u0275elementStart(25, "span", 14);
      i016.\u0275\u0275text(26, "+");
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275text(27, " \xDAj Film ");
      i016.\u0275\u0275elementEnd()()();
      i016.\u0275\u0275template(28, ManageMoviesComponent_div_28_Template, 2, 1, "div", 20)(29, ManageMoviesComponent_ng_template_29_Template, 5, 0, "ng-template", null, 0, i016.\u0275\u0275templateRefExtractor);
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(31, "div", 21);
      i016.\u0275\u0275listener("click", function ManageMoviesComponent_Template_div_click_31_listener() {
        i016.\u0275\u0275restoreView(_r1);
        return i016.\u0275\u0275resetView(ctx.closeForm());
      });
      i016.\u0275\u0275elementStart(32, "div", 22);
      i016.\u0275\u0275listener("click", function ManageMoviesComponent_Template_div_click_32_listener($event) {
        i016.\u0275\u0275restoreView(_r1);
        return i016.\u0275\u0275resetView($event.stopPropagation());
      });
      i016.\u0275\u0275elementStart(33, "div", 23)(34, "h2", 24);
      i016.\u0275\u0275text(35);
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(36, "button", 25);
      i016.\u0275\u0275listener("click", function ManageMoviesComponent_Template_button_click_36_listener() {
        i016.\u0275\u0275restoreView(_r1);
        return i016.\u0275\u0275resetView(ctx.closeForm());
      });
      i016.\u0275\u0275text(37, "\xD7");
      i016.\u0275\u0275elementEnd()();
      i016.\u0275\u0275elementStart(38, "form", 26);
      i016.\u0275\u0275listener("ngSubmit", function ManageMoviesComponent_Template_form_ngSubmit_38_listener() {
        i016.\u0275\u0275restoreView(_r1);
        return i016.\u0275\u0275resetView(ctx.saveMovie());
      });
      i016.\u0275\u0275elementStart(39, "div", 27)(40, "label");
      i016.\u0275\u0275text(41, "C\xEDm");
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(42, "input", 28);
      i016.\u0275\u0275twoWayListener("ngModelChange", function ManageMoviesComponent_Template_input_ngModelChange_42_listener($event) {
        i016.\u0275\u0275restoreView(_r1);
        i016.\u0275\u0275twoWayBindingSet(ctx.formModel.title, $event) || (ctx.formModel.title = $event);
        return i016.\u0275\u0275resetView($event);
      });
      i016.\u0275\u0275elementEnd()();
      i016.\u0275\u0275elementStart(43, "div", 29)(44, "div", 27)(45, "label");
      i016.\u0275\u0275text(46, "Megjelen\xE9si \xE9v");
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(47, "input", 30);
      i016.\u0275\u0275twoWayListener("ngModelChange", function ManageMoviesComponent_Template_input_ngModelChange_47_listener($event) {
        i016.\u0275\u0275restoreView(_r1);
        i016.\u0275\u0275twoWayBindingSet(ctx.formModel.releaseYear, $event) || (ctx.formModel.releaseYear = $event);
        return i016.\u0275\u0275resetView($event);
      });
      i016.\u0275\u0275elementEnd()();
      i016.\u0275\u0275elementStart(48, "div", 27)(49, "label");
      i016.\u0275\u0275text(50, "Rendez\u0151");
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(51, "input", 31);
      i016.\u0275\u0275twoWayListener("ngModelChange", function ManageMoviesComponent_Template_input_ngModelChange_51_listener($event) {
        i016.\u0275\u0275restoreView(_r1);
        i016.\u0275\u0275twoWayBindingSet(ctx.formModel.director, $event) || (ctx.formModel.director = $event);
        return i016.\u0275\u0275resetView($event);
      });
      i016.\u0275\u0275elementEnd()()();
      i016.\u0275\u0275elementStart(52, "div", 27)(53, "label");
      i016.\u0275\u0275text(54, "Poszter URL");
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(55, "input", 32);
      i016.\u0275\u0275twoWayListener("ngModelChange", function ManageMoviesComponent_Template_input_ngModelChange_55_listener($event) {
        i016.\u0275\u0275restoreView(_r1);
        i016.\u0275\u0275twoWayBindingSet(ctx.formModel.posterUrl, $event) || (ctx.formModel.posterUrl = $event);
        return i016.\u0275\u0275resetView($event);
      });
      i016.\u0275\u0275elementEnd()();
      i016.\u0275\u0275elementStart(56, "div", 27)(57, "label");
      i016.\u0275\u0275text(58, "Le\xEDr\xE1s");
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(59, "textarea", 33);
      i016.\u0275\u0275twoWayListener("ngModelChange", function ManageMoviesComponent_Template_textarea_ngModelChange_59_listener($event) {
        i016.\u0275\u0275restoreView(_r1);
        i016.\u0275\u0275twoWayBindingSet(ctx.formModel.description, $event) || (ctx.formModel.description = $event);
        return i016.\u0275\u0275resetView($event);
      });
      i016.\u0275\u0275elementEnd()();
      i016.\u0275\u0275elementStart(60, "div", 27)(61, "label");
      i016.\u0275\u0275text(62, "M\u0171fajok");
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(63, "div", 34);
      i016.\u0275\u0275template(64, ManageMoviesComponent_label_64_Template, 4, 3, "label", 35);
      i016.\u0275\u0275elementEnd()();
      i016.\u0275\u0275elementStart(65, "div", 36)(66, "button", 37);
      i016.\u0275\u0275listener("click", function ManageMoviesComponent_Template_button_click_66_listener() {
        i016.\u0275\u0275restoreView(_r1);
        return i016.\u0275\u0275resetView(ctx.closeForm());
      });
      i016.\u0275\u0275text(67, "M\xE9gse");
      i016.\u0275\u0275elementEnd();
      i016.\u0275\u0275elementStart(68, "button", 38);
      i016.\u0275\u0275text(69);
      i016.\u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      const emptyState_r11 = i016.\u0275\u0275reference(30);
      i016.\u0275\u0275advance(12);
      i016.\u0275\u0275textInterpolate(ctx.getSearchFieldLabel());
      i016.\u0275\u0275advance(3);
      i016.\u0275\u0275property("ngModel", ctx.searchTerm);
      i016.\u0275\u0275advance(4);
      i016.\u0275\u0275property("ngIf", ctx.isSearchDropdownOpen);
      i016.\u0275\u0275advance();
      i016.\u0275\u0275property("ngIf", ctx.searchField === "genre" && ctx.genreSuggestions.length > 0 && ctx.searchTerm);
      i016.\u0275\u0275advance(8);
      i016.\u0275\u0275property("ngIf", ctx.filteredMovies.length > 0)("ngIfElse", emptyState_r11);
      i016.\u0275\u0275advance(3);
      i016.\u0275\u0275classProp("active", ctx.isFormOpen);
      i016.\u0275\u0275advance(4);
      i016.\u0275\u0275textInterpolate(ctx.editingMovie ? "Film Szerkeszt\xE9se" : "\xDAj Film Hozz\xE1ad\xE1sa");
      i016.\u0275\u0275advance(7);
      i016.\u0275\u0275twoWayProperty("ngModel", ctx.formModel.title);
      i016.\u0275\u0275advance(5);
      i016.\u0275\u0275twoWayProperty("ngModel", ctx.formModel.releaseYear);
      i016.\u0275\u0275advance(4);
      i016.\u0275\u0275twoWayProperty("ngModel", ctx.formModel.director);
      i016.\u0275\u0275advance(4);
      i016.\u0275\u0275twoWayProperty("ngModel", ctx.formModel.posterUrl);
      i016.\u0275\u0275advance(4);
      i016.\u0275\u0275twoWayProperty("ngModel", ctx.formModel.description);
      i016.\u0275\u0275advance(5);
      i016.\u0275\u0275property("ngForOf", ctx.genres);
      i016.\u0275\u0275advance(5);
      i016.\u0275\u0275textInterpolate1(" ", ctx.editingMovie ? "M\xF3dos\xEDt\xE1sok Ment\xE9se" : "Film L\xE9trehoz\xE1sa", " ");
    }
  }, dependencies: [CommonModule8, i34.NgClass, i34.NgComponentOutlet, i34.NgForOf, i34.NgIf, i34.NgTemplateOutlet, i34.NgStyle, i34.NgSwitch, i34.NgSwitchCase, i34.NgSwitchDefault, i34.NgPlural, i34.NgPluralCase, FormsModule5, i45.\u0275NgNoValidate, i45.NgSelectOption, i45.\u0275NgSelectMultipleOption, i45.DefaultValueAccessor, i45.NumberValueAccessor, i45.RangeValueAccessor, i45.CheckboxControlValueAccessor, i45.SelectControlValueAccessor, i45.SelectMultipleControlValueAccessor, i45.RadioControlValueAccessor, i45.NgControlStatus, i45.NgControlStatusGroup, i45.RequiredValidator, i45.MinLengthValidator, i45.MaxLengthValidator, i45.PatternValidator, i45.CheckboxRequiredValidator, i45.EmailValidator, i45.MinValidator, i45.MaxValidator, i45.NgModel, i45.NgModelGroup, i45.NgForm, RouterModule4, i54.RouterOutlet, i54.RouterLink, i54.RouterLinkActive, i54.\u0275EmptyOutletComponent, i34.AsyncPipe, i34.UpperCasePipe, i34.LowerCasePipe, i34.JsonPipe, i34.SlicePipe, i34.DecimalPipe, i34.PercentPipe, i34.TitleCasePipe, i34.CurrencyPipe, i34.DatePipe, i34.I18nPluralPipe, i34.I18nSelectPipe, i34.KeyValuePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  --primary: #00f0ff;\n  --secondary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --bg-input: #111827;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --card-radius: 12px;\n  --accent-red: #ff003c;\n  --accent-green: #10b981;\n}\n.admin-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  color: var(--text-main);\n  font-family:\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  padding-bottom: 4rem;\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  display: inline-block;\n}\n.decoration-line[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 4px;\n  background: var(--primary);\n  margin: 0.5rem 0 0.5rem 0;\n  box-shadow: 0 0 10px var(--primary);\n  border-radius: 2px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 1rem;\n  margin: 0;\n}\n.toolbar-section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 2rem;\n  margin-bottom: 3rem;\n  flex-wrap: wrap;\n  position: relative;\n  z-index: 50;\n}\n.search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  background: rgba(15, 22, 35, 0.8);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(0, 240, 255, 0.3);\n  border-radius: 50px;\n  padding: 5px;\n  width: 100%;\n  max-width: 700px;\n  box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);\n  position: relative;\n  transition: box-shadow 0.3s ease;\n}\n.search-bar[_ngcontent-%COMP%]:focus-within {\n  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);\n  border-color: var(--primary);\n}\n.filter-toggle-btn[_ngcontent-%COMP%] {\n  background: var(--bg-input);\n  color: var(--primary);\n  border: 1px solid rgba(0, 240, 255, 0.2);\n  border-radius: 40px;\n  padding: 8px 16px;\n  margin-right: 10px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 600;\n  font-size: 0.85rem;\n  transition: all 0.2s;\n}\n.filter-toggle-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 240, 255, 0.1);\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  background: transparent;\n  border: none;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  padding: 8px;\n}\n.search-icon-wrapper[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.2rem;\n  opacity: 0.7;\n}\n.dropdown-menu[_ngcontent-%COMP%], \n.suggestions-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 110%;\n  left: 20px;\n  background: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 12px;\n  overflow: hidden;\n  min-width: 150px;\n  z-index: 999999 !important;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n}\n.suggestions-menu[_ngcontent-%COMP%] {\n  left: 50%;\n  transform: translateX(-50%);\n  width: 90%;\n}\n.dropdown-item[_ngcontent-%COMP%], \n.suggestion-item[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  text-align: left;\n  padding: 10px 15px;\n  background: transparent;\n  border: none;\n  color: var(--text-muted);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover, \n.suggestion-item[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.85rem;\n  transition: all 0.2s;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  letter-spacing: 0.5px;\n}\n.btn-add[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      #00aaff);\n  color: #000;\n  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);\n}\n.btn-add[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0 25px rgba(0, 240, 255, 0.5);\n}\n.media-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));\n  gap: 2rem;\n  align-items: stretch;\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.media-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: var(--card-radius);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.3s, border-color 0.3s;\n  position: relative;\n  height: 100%;\n}\n.media-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  border-color: rgba(0, 240, 255, 0.3);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n}\n.poster-wrapper[_ngcontent-%COMP%] {\n  height: 400px;\n  position: relative;\n  overflow: hidden;\n}\n.poster-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.5s;\n}\n.media-card[_ngcontent-%COMP%]:hover   .poster-image[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n}\n.admin-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: rgba(0, 0, 0, 0.7);\n  color: #fff;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 0.7rem;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n[_nghost-%COMP%] {\n  position: relative;\n  z-index: 999999 !important;\n}\n.media-grid[_ngcontent-%COMP%], \n.media-card[_ngcontent-%COMP%], \n.poster-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n.top-controls[_ngcontent-%COMP%], \n.search-bar-wrapper[_ngcontent-%COMP%], \n.search-container[_ngcontent-%COMP%], \n.filter-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 999999 !important;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n}\n.suggestions-menu[_ngcontent-%COMP%] {\n  left: 50%;\n  transform: translateX(-50%);\n  width: 90%;\n}\n.dropdown-item[_ngcontent-%COMP%], \n.suggestion-item[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  text-align: left;\n  padding: 10px 15px;\n  background: transparent;\n  border: none;\n  color: var(--text-muted);\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n  font-size: 0.9rem;\n}\n.dropdown-item[_ngcontent-%COMP%]:hover, \n.suggestion-item[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.media-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  margin: 0;\n  color: #fff;\n  line-height: 1.3;\n  height: 2.6rem;\n  overflow: hidden;\n}\n.media-year[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  background: rgba(255, 255, 255, 0.1);\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.media-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  line-height: 1.3;\n  height: 5rem;\n  overflow: hidden;\n}\n.media-director[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--primary);\n  margin-bottom: 0.5rem;\n}\n.media-desc[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--text-muted);\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  margin-bottom: 1rem;\n  flex-grow: 1;\n  min-height: 120px;\n}\n.media-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.card-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n.media-desc[_ngcontent-%COMP%] {\n  min-height: 110px;\n  overflow: hidden;\n}\n.tags-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: auto;\n  margin-bottom: 1rem;\n}\n.rating-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  color: var(--text-main);\n  margin-bottom: 0.5rem;\n}\n.rating-star[_ngcontent-%COMP%] {\n  color: #ffd700;\n}\n.tags-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.tag[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  padding: 4px 8px;\n  border-radius: 4px;\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n  border: 1px solid rgba(0, 240, 255, 0.2);\n}\n.spacer[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.btn-edit[_ngcontent-%COMP%], \n.btn-delete[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.btn-edit[_ngcontent-%COMP%] {\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n  border: 1px solid rgba(0, 240, 255, 0.3);\n}\n.btn-edit[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 240, 255, 0.2);\n  color: #fff;\n}\n.btn-delete[_ngcontent-%COMP%] {\n  background: rgba(255, 0, 60, 0.1);\n  color: var(--accent-red);\n  border: 1px solid rgba(255, 0, 60, 0.3);\n}\n.btn-delete[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 0, 60, 0.2);\n  color: #fff;\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n  z-index: 1000;\n  display: none;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.modal-overlay.active[_ngcontent-%COMP%] {\n  display: flex;\n  opacity: 1;\n}\n.modal-container[_ngcontent-%COMP%] {\n  background: #111827;\n  border: 1px solid var(--primary);\n  border-radius: 16px;\n  width: 90%;\n  max-width: 700px;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding: 2rem;\n  box-shadow: 0 0 50px rgba(0, 240, 255, 0.15);\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  padding-bottom: 1rem;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  margin: 0;\n  color: #fff;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #94a3b8;\n  font-size: 2rem;\n  cursor: pointer;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n.modal-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  color: #cbd5e1;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n  font-size: 0.9rem;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n}\n.input-field[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.8rem;\n  background: #0f1623;\n  border: 1px solid #334155;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.2s;\n}\n.input-field[_ngcontent-%COMP%]:focus {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px rgba(0, 240, 255, 0.1);\n}\n.textarea[_ngcontent-%COMP%] {\n  height: 100px;\n  resize: vertical;\n}\n.genre-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));\n  gap: 0.5rem;\n  background: #0f1623;\n  padding: 1rem;\n  border-radius: 8px;\n  border: 1px solid #334155;\n}\n.genre-checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  padding: 0.5rem;\n  border-radius: 4px;\n  transition: background 0.2s;\n}\n.genre-checkbox[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0);\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  color: #cbd5e1;\n  font-size: 0.9rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-muted);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  margin-right: 1rem;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fff;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: #000;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0 15px var(--primary);\n}\n.empty-message[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 5rem;\n  color: var(--text-muted);\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n@media (max-width: 768px) {\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .toolbar-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n/*# sourceMappingURL=manage-movies.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i016.\u0275setClassMetadata(ManageMoviesComponent, [{
    type: Component8,
    args: [{ selector: "app-manage-movies", standalone: true, imports: [CommonModule8, FormsModule5, RouterModule4], template: `<div class="admin-page">\r
  <div class="content-wrapper">\r
    \r
    <!-- Header -->\r
    <header class="page-header">\r
      <h1 class="title">Film Kezel\u0151</h1>\r
      <div class="decoration-line"></div>\r
      <p class="subtitle">Adminisztr\xE1ci\xF3s fel\xFClet</p>\r
    </header>\r
\r
    <!-- Search & Toolbar -->\r
    <div class="toolbar-section">\r
      \r
      <!-- Search Bar -->\r
      <div class="search-bar">\r
        \r
        <button type="button" class="filter-toggle-btn" (click)="toggleSearchDropdown()">\r
          <span class="filter-label">{{ getSearchFieldLabel() }}</span>\r
          <span class="filter-arrow">\u25BC</span>\r
        </button>\r
\r
        <input\r
          type="text"\r
          class="search-input"\r
          [ngModel]="searchTerm"\r
          (ngModelChange)="onSearchTermChange($event)"\r
          placeholder="Keres\xE9s..." />\r
\r
        <div class="search-icon-wrapper">\r
          <span class="icon">\u{1F50D}</span>\r
        </div>\r
\r
        <!-- Dropdown menu -->\r
        <div *ngIf="isSearchDropdownOpen" class="dropdown-menu fade-in">\r
          <button class="dropdown-item" (click)="setSearchField('all')">Minden</button>\r
          <button class="dropdown-item" (click)="setSearchField('title')">C\xEDm</button>\r
          <button class="dropdown-item" (click)="setSearchField('director')">Rendez\u0151</button>\r
          <button class="dropdown-item" (click)="setSearchField('genre')">M\u0171faj</button>\r
        </div>\r
\r
        <!-- Genre suggestions -->\r
        <div *ngIf="searchField === 'genre' && genreSuggestions.length > 0 && searchTerm" class="suggestions-menu fade-in">\r
          <button *ngFor="let g of genreSuggestions" class="suggestion-item" (click)="selectGenre(g)">\r
            {{ g }}\r
          </button>\r
        </div>\r
\r
      </div>\r
\r
      <!-- Action Buttons -->\r
      <div class="action-buttons">\r
        <button class="btn btn-secondary" routerLink="/admin-dashboard">\r
          \u2190 Vissza a Dashboardra\r
        </button>\r
        <button class="btn btn-add" (click)="addMovie()">\r
          <span class="icon">+</span> \xDAj Film\r
        </button>\r
        \r
      </div>\r
\r
    </div>\r
\r
    <!-- Movie Grid -->\r
    <div *ngIf="filteredMovies.length > 0; else emptyState" class="media-grid">\r
      <div *ngFor="let movie of filteredMovies" class="media-card">\r
\r
        <div class="poster-wrapper">\r
          <img \r
            [src]="movie.posterUrl || 'https://placehold.co/400x600/0f1623/ffffff?text=No+Poster'"\r
            [alt]="movie.title"\r
            class="poster-image"\r
          />\r
          <div class="poster-overlay"></div>\r
          <div class="admin-badge">ID: {{ movie.id }}</div>\r
        </div>\r
\r
        <div class="card-body">\r
          <div class="card-header">\r
            <h2 class="media-title" [title]="movie.title">{{ movie.title }}</h2>\r
            <span class="media-year">{{ movie.releaseYear }}</span>\r
          </div>\r
\r
          <h3 class="media-director">Rendezte: {{ movie.director || 'Ismeretlen' }}</h3>\r
\r
          <p class="media-desc" [title]="movie.description">\r
            {{ movie.description }}\r
          </p>\r
          \r
          <div class="rating-row">\r
            <span class="rating-star">\u2B50</span>\r
            <span class="rating-value">{{ movie.averageRating }}/10</span>\r
          </div>\r
\r
          <div class="tags-container">\r
            <span class="tag" *ngFor="let genre of movie.genres">\r
              {{ genre }}\r
            </span>\r
          </div>\r
\r
          <div class="spacer"></div>\r
\r
          <div class="card-actions">\r
            <button class="btn btn-edit" (click)="editMovie(movie)">\r
              <span class="icon">\u270F\uFE0F</span> Szerkeszt\xE9s\r
            </button><br>\r
            <button class="btn btn-delete" (click)="deleteMovie(movie.id)">\r
              <span class="icon">\u{1F5D1}\uFE0F</span> T\xF6rl\xE9s\r
            </button>\r
          </div>\r
        </div>\r
\r
      </div>\r
    </div>\r
\r
    <!-- Empty State -->\r
    <ng-template #emptyState>\r
      <div class="empty-message">\r
        <div class="empty-icon">\u{1F4ED}</div>\r
        <p>Nincsenek megjelen\xEDthet\u0151 filmek.</p>\r
      </div>\r
    </ng-template>\r
\r
  </div>\r
\r
  <!-- MODAL OVERLAY -->\r
  <div class="modal-overlay" [class.active]="isFormOpen" (click)="closeForm()"> <!-- Klikk a h\xE1tt\xE9rre bez\xE1rja (opcion\xE1lis) -->\r
    <div class="modal-container" (click)="$event.stopPropagation()"> <!-- Megakad\xE1lyozza a bez\xE1r\xE1st ha a formra kattintasz -->\r
      \r
      <div class="modal-header">\r
        <h2 class="modal-title">{{ editingMovie ? 'Film Szerkeszt\xE9se' : '\xDAj Film Hozz\xE1ad\xE1sa' }}</h2>\r
        <button class="btn-close" (click)="closeForm()">\xD7</button>\r
      </div>\r
\r
      <form (ngSubmit)="saveMovie()" class="modal-form">\r
\r
        <div class="form-group">\r
          <label>C\xEDm</label>\r
          <input type="text" [(ngModel)]="formModel.title" name="title" class="input-field" required placeholder="Pl. Eredet" />\r
        </div>\r
\r
        <div class="form-row">\r
          <div class="form-group">\r
            <label>Megjelen\xE9si \xE9v</label>\r
            <input type="number" [(ngModel)]="formModel.releaseYear" name="releaseYear" class="input-field" placeholder="2010" />\r
          </div>\r
          <div class="form-group">\r
            <label>Rendez\u0151</label>\r
            <input type="text" [(ngModel)]="formModel.director" name="director" class="input-field" placeholder="Christopher Nolan" />\r
          </div>\r
        </div>\r
\r
        <div class="form-group">\r
          <label>Poszter URL</label>\r
          <input type="text" [(ngModel)]="formModel.posterUrl" name="posterUrl" class="input-field" placeholder="https://..." />\r
        </div>\r
\r
        <div class="form-group">\r
          <label>Le\xEDr\xE1s</label>\r
          <textarea [(ngModel)]="formModel.description" name="description" class="input-field textarea" required placeholder="R\xF6vid tartalom..."></textarea>\r
        </div>\r
\r
        <div class="form-group">\r
          <label>M\u0171fajok</label>\r
          <div class="genre-grid">\r
            <label *ngFor="let g of genres" class="genre-checkbox">\r
              <input type="checkbox"\r
                     [checked]="(formModel.genreIds || []).includes(g.id)"\r
                     (change)="onGenreCheckboxChanged($event, g.id)" />\r
              <span class="checkbox-label">{{ g.name }}</span>\r
            </label>\r
          </div>\r
        </div>\r
\r
        <div class="modal-footer">\r
          <button type="button" class="btn btn-secondary" (click)="closeForm()">M\xE9gse</button>\r
          <button type="submit" class="btn btn-primary">\r
            {{ editingMovie ? 'M\xF3dos\xEDt\xE1sok Ment\xE9se' : 'Film L\xE9trehoz\xE1sa' }}\r
          </button>\r
        </div>\r
\r
      </form>\r
    </div>\r
  </div>\r
\r
</div>`, styles: ['/* src/app/features/admin-pages/manage-movies/manage-movies.css */\n:host {\n  display: block;\n  --primary: #00f0ff;\n  --secondary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --bg-input: #111827;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --card-radius: 12px;\n  --accent-red: #ff003c;\n  --accent-green: #10b981;\n}\n.admin-page {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  color: var(--text-main);\n  font-family:\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  padding-bottom: 4rem;\n}\n.content-wrapper {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.page-header {\n  margin-bottom: 3rem;\n}\n.title {\n  font-size: 2.5rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  display: inline-block;\n}\n.decoration-line {\n  width: 80px;\n  height: 4px;\n  background: var(--primary);\n  margin: 0.5rem 0 0.5rem 0;\n  box-shadow: 0 0 10px var(--primary);\n  border-radius: 2px;\n}\n.subtitle {\n  color: var(--text-muted);\n  font-size: 1rem;\n  margin: 0;\n}\n.toolbar-section {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 2rem;\n  margin-bottom: 3rem;\n  flex-wrap: wrap;\n  position: relative;\n  z-index: 50;\n}\n.search-bar {\n  display: flex;\n  align-items: center;\n  background: rgba(15, 22, 35, 0.8);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(0, 240, 255, 0.3);\n  border-radius: 50px;\n  padding: 5px;\n  width: 100%;\n  max-width: 700px;\n  box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);\n  position: relative;\n  transition: box-shadow 0.3s ease;\n}\n.search-bar:focus-within {\n  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);\n  border-color: var(--primary);\n}\n.filter-toggle-btn {\n  background: var(--bg-input);\n  color: var(--primary);\n  border: 1px solid rgba(0, 240, 255, 0.2);\n  border-radius: 40px;\n  padding: 8px 16px;\n  margin-right: 10px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 600;\n  font-size: 0.85rem;\n  transition: all 0.2s;\n}\n.filter-toggle-btn:hover {\n  background: rgba(0, 240, 255, 0.1);\n}\n.search-input {\n  flex: 1;\n  background: transparent;\n  border: none;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  padding: 8px;\n}\n.search-icon-wrapper {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.2rem;\n  opacity: 0.7;\n}\n.dropdown-menu,\n.suggestions-menu {\n  position: absolute;\n  top: 110%;\n  left: 20px;\n  background: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 12px;\n  overflow: hidden;\n  min-width: 150px;\n  z-index: 999999 !important;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n}\n.suggestions-menu {\n  left: 50%;\n  transform: translateX(-50%);\n  width: 90%;\n}\n.dropdown-item,\n.suggestion-item {\n  display: block;\n  width: 100%;\n  text-align: left;\n  padding: 10px 15px;\n  background: transparent;\n  border: none;\n  color: var(--text-muted);\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.dropdown-item:hover,\n.suggestion-item:hover {\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n}\n.btn {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.85rem;\n  transition: all 0.2s;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  letter-spacing: 0.5px;\n}\n.btn-add {\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      #00aaff);\n  color: #000;\n  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);\n}\n.btn-add:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0 25px rgba(0, 240, 255, 0.5);\n}\n.media-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));\n  gap: 2rem;\n  align-items: stretch;\n  animation: fadeIn 0.5s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.media-card {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: var(--card-radius);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition: transform 0.3s, border-color 0.3s;\n  position: relative;\n  height: 100%;\n}\n.media-card:hover {\n  transform: translateY(-5px);\n  border-color: rgba(0, 240, 255, 0.3);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);\n}\n.poster-wrapper {\n  height: 400px;\n  position: relative;\n  overflow: hidden;\n}\n.poster-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.5s;\n}\n.media-card:hover .poster-image {\n  transform: scale(1.05);\n}\n.admin-badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: rgba(0, 0, 0, 0.7);\n  color: #fff;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 0.7rem;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n:host {\n  position: relative;\n  z-index: 999999 !important;\n}\n.media-grid,\n.media-card,\n.poster-wrapper {\n  position: relative;\n  z-index: 1;\n}\n.top-controls,\n.search-bar-wrapper,\n.search-container,\n.filter-container {\n  position: relative;\n  z-index: 999999 !important;\n}\n.card-body {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  border-top: 1px solid rgba(255, 255, 255, 0.05);\n}\n.suggestions-menu {\n  left: 50%;\n  transform: translateX(-50%);\n  width: 90%;\n}\n.dropdown-item,\n.suggestion-item {\n  display: block;\n  width: 100%;\n  text-align: left;\n  padding: 10px 15px;\n  background: transparent;\n  border: none;\n  color: var(--text-muted);\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n  font-size: 0.9rem;\n}\n.dropdown-item:hover,\n.suggestion-item:hover {\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n}\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.media-title {\n  font-size: 1.1rem;\n  font-weight: 700;\n  margin: 0;\n  color: #fff;\n  line-height: 1.3;\n  height: 2.6rem;\n  overflow: hidden;\n}\n.media-year {\n  font-size: 0.8rem;\n  color: var(--text-muted);\n  background: rgba(255, 255, 255, 0.1);\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.media-title {\n  font-size: 1.1rem;\n  font-weight: 700;\n  line-height: 1.3;\n  height: 5rem;\n  overflow: hidden;\n}\n.media-director {\n  font-size: 0.85rem;\n  color: var(--primary);\n  margin-bottom: 0.5rem;\n}\n.media-desc {\n  font-size: 0.9rem;\n  color: var(--text-muted);\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  margin-bottom: 1rem;\n  flex-grow: 1;\n  min-height: 120px;\n}\n.media-card {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.card-body {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n.media-desc {\n  min-height: 110px;\n  overflow: hidden;\n}\n.tags-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: auto;\n  margin-bottom: 1rem;\n}\n.rating-row {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  color: var(--text-main);\n  margin-bottom: 0.5rem;\n}\n.rating-star {\n  color: #ffd700;\n}\n.tags-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.tag {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  padding: 4px 8px;\n  border-radius: 4px;\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n  border: 1px solid rgba(0, 240, 255, 0.2);\n}\n.spacer {\n  flex-grow: 1;\n}\n.card-actions {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.btn-edit,\n.btn-delete {\n  width: 100%;\n}\n.btn-edit {\n  background: rgba(0, 240, 255, 0.1);\n  color: var(--primary);\n  border: 1px solid rgba(0, 240, 255, 0.3);\n}\n.btn-edit:hover {\n  background: rgba(0, 240, 255, 0.2);\n  color: #fff;\n}\n.btn-delete {\n  background: rgba(255, 0, 60, 0.1);\n  color: var(--accent-red);\n  border: 1px solid rgba(255, 0, 60, 0.3);\n}\n.btn-delete:hover {\n  background: rgba(255, 0, 60, 0.2);\n  color: #fff;\n}\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n  z-index: 1000;\n  display: none;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.modal-overlay.active {\n  display: flex;\n  opacity: 1;\n}\n.modal-container {\n  background: #111827;\n  border: 1px solid var(--primary);\n  border-radius: 16px;\n  width: 90%;\n  max-width: 700px;\n  max-height: 90vh;\n  overflow-y: auto;\n  padding: 2rem;\n  box-shadow: 0 0 50px rgba(0, 240, 255, 0.15);\n  animation: slideUp 0.3s ease;\n}\n@keyframes slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  padding-bottom: 1rem;\n}\n.modal-title {\n  font-size: 1.8rem;\n  margin: 0;\n  color: #fff;\n}\n.btn-close {\n  background: none;\n  border: none;\n  color: #94a3b8;\n  font-size: 2rem;\n  cursor: pointer;\n}\n.btn-close:hover {\n  color: #fff;\n}\n.modal-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.form-group label {\n  display: block;\n  color: #cbd5e1;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n  font-size: 0.9rem;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.5rem;\n}\n.input-field {\n  width: 100%;\n  padding: 0.8rem;\n  background: #0f1623;\n  border: 1px solid #334155;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.2s;\n}\n.input-field:focus {\n  border-color: var(--primary);\n  box-shadow: 0 0 0 3px rgba(0, 240, 255, 0.1);\n}\n.textarea {\n  height: 100px;\n  resize: vertical;\n}\n.genre-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));\n  gap: 0.5rem;\n  background: #0f1623;\n  padding: 1rem;\n  border-radius: 8px;\n  border: 1px solid #334155;\n}\n.genre-checkbox {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  padding: 0.5rem;\n  border-radius: 4px;\n  transition: background 0.2s;\n}\n.genre-checkbox:hover {\n  background: rgba(255, 255, 255, 0);\n}\n.checkbox-label {\n  color: #cbd5e1;\n  font-size: 0.9rem;\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n.btn-secondary {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-muted);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  margin-right: 1rem;\n}\n.btn-secondary:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fff;\n}\n.btn-primary {\n  background: var(--primary);\n  color: #000;\n}\n.btn-primary:hover {\n  box-shadow: 0 0 15px var(--primary);\n}\n.empty-message {\n  text-align: center;\n  padding: 5rem;\n  color: var(--text-muted);\n}\n.empty-icon {\n  font-size: 4rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n@media (max-width: 768px) {\n  .form-row {\n    grid-template-columns: 1fr;\n  }\n  .toolbar-section {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n/*# sourceMappingURL=manage-movies.css.map */\n'] }]
  }], () => [{ type: MovieService }, { type: GenreService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i016.\u0275setClassDebugInfo(ManageMoviesComponent, { className: "ManageMoviesComponent", filePath: "src/app/features/admin-pages/manage-movies/manage-movies.ts", lineNumber: 17 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Fadmin-pages%2Fmanage-movies%2Fmanage-movies.ts%40ManageMoviesComponent";
  function ManageMoviesComponent_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i016.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i016.\u0275\u0275replaceMetadata(ManageMoviesComponent, m.default, [i016, i34, i45, i54, movie_service_exports, genre_services_exports], [CommonModule8, FormsModule5, RouterModule4, Component8], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && ManageMoviesComponent_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && ManageMoviesComponent_HmrLoad(d.timestamp)));
})();

// src/app/features/leaderboard/leaderboard.component.ts
import { Component as Component9 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { CommonModule as CommonModule9 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import * as i018 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";

// src/app/core/services/statistics.service.ts
var statistics_service_exports = {};
__export(statistics_service_exports, {
  StatisticsService: () => StatisticsService
});
import { Injectable as Injectable9 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i017 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i110 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common_http.js?v=3f3fab55";
var StatisticsService = class _StatisticsService {
  http;
  baseUrl = `${environment.apiUrl}/statistics`;
  constructor(http) {
    this.http = http;
  }
  getMostActiveUsers(count = 20) {
    return this.http.get(`${this.baseUrl}/active-users?count=${count}`);
  }
  getTopRated(count = 10) {
    return this.http.get(`${this.baseUrl}/top-rated?count=${count}`, {
      params: { count }
    });
  }
  static \u0275fac = function StatisticsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StatisticsService)(i017.\u0275\u0275inject(i110.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i017.\u0275\u0275defineInjectable({ token: _StatisticsService, factory: _StatisticsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i017.\u0275setClassMetadata(StatisticsService, [{
    type: Injectable9,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: i110.HttpClient }], null);
})();

// src/app/features/leaderboard/leaderboard.component.ts
import * as i35 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
function LeaderboardComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275elementStart(0, "div", 9);
    i018.\u0275\u0275element(1, "div", 10);
    i018.\u0275\u0275elementStart(2, "span");
    i018.\u0275\u0275text(3, "Ranglista bet\xF6lt\xE9se...");
    i018.\u0275\u0275elementEnd()();
  }
}
function LeaderboardComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275elementStart(0, "div", 11);
    i018.\u0275\u0275text(1);
    i018.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i018.\u0275\u0275nextContext();
    i018.\u0275\u0275advance();
    i018.\u0275\u0275textInterpolate1(" ", ctx_r0.error, " ");
  }
}
function LeaderboardComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275elementStart(0, "div", 15);
    i018.\u0275\u0275text(1, " M\xE9g nincs el\xE9g aktivit\xE1s a ranglist\xE1hoz. ");
    i018.\u0275\u0275elementEnd();
  }
}
function LeaderboardComponent_div_11_div_2_tr_17_span_8_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275elementStart(0, "span", 30);
    i018.\u0275\u0275text(1, "Te");
    i018.\u0275\u0275elementEnd();
  }
}
function LeaderboardComponent_div_11_div_2_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275elementStart(0, "tr", 23)(1, "td", 18)(2, "span", 24);
    i018.\u0275\u0275text(3);
    i018.\u0275\u0275elementEnd()();
    i018.\u0275\u0275elementStart(4, "td", 19)(5, "div", 25)(6, "span", 26);
    i018.\u0275\u0275text(7);
    i018.\u0275\u0275elementEnd();
    i018.\u0275\u0275template(8, LeaderboardComponent_div_11_div_2_tr_17_span_8_Template, 2, 0, "span", 27);
    i018.\u0275\u0275elementEnd()();
    i018.\u0275\u0275elementStart(9, "td", 28);
    i018.\u0275\u0275text(10);
    i018.\u0275\u0275elementEnd();
    i018.\u0275\u0275elementStart(11, "td", 28);
    i018.\u0275\u0275text(12);
    i018.\u0275\u0275elementEnd();
    i018.\u0275\u0275elementStart(13, "td", 28);
    i018.\u0275\u0275text(14);
    i018.\u0275\u0275elementEnd();
    i018.\u0275\u0275elementStart(15, "td", 21)(16, "span", 29);
    i018.\u0275\u0275text(17);
    i018.\u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = i018.\u0275\u0275nextContext(3);
    i018.\u0275\u0275classProp("current-user-row", ctx_r0.isCurrentUser(item_r2));
    i018.\u0275\u0275advance(2);
    i018.\u0275\u0275classProp("rank-1", i_r3 === 0)("rank-2", i_r3 === 1)("rank-3", i_r3 === 2);
    i018.\u0275\u0275advance();
    i018.\u0275\u0275textInterpolate1(" ", i_r3 + 1, " ");
    i018.\u0275\u0275advance(4);
    i018.\u0275\u0275textInterpolate(item_r2.username);
    i018.\u0275\u0275advance();
    i018.\u0275\u0275property("ngIf", ctx_r0.isCurrentUser(item_r2));
    i018.\u0275\u0275advance(2);
    i018.\u0275\u0275textInterpolate1(" ", item_r2.totalRatings, " ");
    i018.\u0275\u0275advance(2);
    i018.\u0275\u0275textInterpolate1(" ", item_r2.totalFavorites, " ");
    i018.\u0275\u0275advance(2);
    i018.\u0275\u0275textInterpolate1(" ", item_r2.totalViews, " ");
    i018.\u0275\u0275advance(3);
    i018.\u0275\u0275textInterpolate(item_r2.points);
  }
}
function LeaderboardComponent_div_11_div_2_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275elementStart(0, "div", 16)(1, "table", 17)(2, "thead")(3, "tr")(4, "th", 18);
    i018.\u0275\u0275text(5, "#");
    i018.\u0275\u0275elementEnd();
    i018.\u0275\u0275elementStart(6, "th", 19);
    i018.\u0275\u0275text(7, "Felhaszn\xE1l\xF3");
    i018.\u0275\u0275elementEnd();
    i018.\u0275\u0275elementStart(8, "th", 20);
    i018.\u0275\u0275text(9, "\xC9rt\xE9kel\xE9sek");
    i018.\u0275\u0275elementEnd();
    i018.\u0275\u0275elementStart(10, "th", 20);
    i018.\u0275\u0275text(11, "Kedvencek");
    i018.\u0275\u0275elementEnd();
    i018.\u0275\u0275elementStart(12, "th", 20);
    i018.\u0275\u0275text(13, "Megtekint\xE9sek");
    i018.\u0275\u0275elementEnd();
    i018.\u0275\u0275elementStart(14, "th", 21);
    i018.\u0275\u0275text(15, "Pont");
    i018.\u0275\u0275elementEnd()()();
    i018.\u0275\u0275elementStart(16, "tbody");
    i018.\u0275\u0275template(17, LeaderboardComponent_div_11_div_2_tr_17_Template, 18, 15, "tr", 22);
    i018.\u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = i018.\u0275\u0275nextContext(2);
    i018.\u0275\u0275advance(17);
    i018.\u0275\u0275property("ngForOf", ctx_r0.items);
  }
}
function LeaderboardComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    i018.\u0275\u0275elementStart(0, "div", 12);
    i018.\u0275\u0275template(1, LeaderboardComponent_div_11_div_1_Template, 2, 0, "div", 13)(2, LeaderboardComponent_div_11_div_2_Template, 18, 1, "div", 14);
    i018.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i018.\u0275\u0275nextContext();
    i018.\u0275\u0275advance();
    i018.\u0275\u0275property("ngIf", ctx_r0.items.length === 0);
    i018.\u0275\u0275advance();
    i018.\u0275\u0275property("ngIf", ctx_r0.items.length > 0);
  }
}
var LeaderboardComponent = class _LeaderboardComponent {
  statisticsService;
  authService;
  items = [];
  isLoading = true;
  error = null;
  currentUserId = null;
  constructor(statisticsService, authService) {
    this.statisticsService = statisticsService;
    this.authService = authService;
  }
  ngOnInit() {
    const user = this.authService.user;
    this.currentUserId = user ? user.id : null;
    this.isLoading = true;
    this.error = null;
    this.statisticsService.getMostActiveUsers(50).subscribe({
      next: (data) => {
        this.items = data.map((u) => __spreadProps(__spreadValues({}, u), {
          points: u.totalRatings * 3 + u.totalFavorites * 2 + u.totalViews * 1
        })).sort((a, b) => b.points - a.points || a.username.localeCompare(b.username));
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Hiba a ranglista bet\xF6lt\xE9sekor:", err);
        this.error = "Nem siker\xFClt bet\xF6lteni a ranglist\xE1t.";
        this.isLoading = false;
      }
    });
  }
  isCurrentUser(item) {
    return this.currentUserId !== null && item.userId === this.currentUserId;
  }
  static \u0275fac = function LeaderboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeaderboardComponent)(i018.\u0275\u0275directiveInject(StatisticsService), i018.\u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ i018.\u0275\u0275defineComponent({ type: _LeaderboardComponent, selectors: [["app-leaderboard"]], decls: 12, vars: 3, consts: [[1, "leaderboard-page"], [1, "content-wrapper"], [1, "header-section"], [1, "page-title"], [1, "scoring-info"], [1, "highlight-rule"], ["class", "status-message loading", 4, "ngIf"], ["class", "error-alert", 4, "ngIf"], ["class", "leaderboard-content", 4, "ngIf"], [1, "status-message", "loading"], [1, "spinner"], [1, "error-alert"], [1, "leaderboard-content"], ["class", "status-message empty", 4, "ngIf"], ["class", "table-container glass-panel", 4, "ngIf"], [1, "status-message", "empty"], [1, "table-container", "glass-panel"], [1, "styled-table"], [1, "col-rank"], [1, "col-user"], [1, "col-stat", "text-center"], [1, "col-points", "text-right"], ["class", "data-row", 3, "current-user-row", 4, "ngFor", "ngForOf"], [1, "data-row"], [1, "rank-badge"], [1, "user-info"], [1, "username"], ["class", "badge-you", 4, "ngIf"], [1, "col-stat", "text-center", "text-dim"], [1, "points-value"], [1, "badge-you"]], template: function LeaderboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      i018.\u0275\u0275elementStart(0, "div", 0)(1, "main", 1)(2, "div", 2)(3, "h1", 3);
      i018.\u0275\u0275text(4, "Felhaszn\xE1l\xF3i Ranglista");
      i018.\u0275\u0275elementEnd();
      i018.\u0275\u0275elementStart(5, "p", 4);
      i018.\u0275\u0275text(6, " Pontsz\xE1m\xEDt\xE1s: ");
      i018.\u0275\u0275elementStart(7, "span", 5);
      i018.\u0275\u0275text(8, "3\xD7 \xE9rt\xE9kel\xE9s + 2\xD7 kedvenc + 1\xD7 megtekint\xE9s");
      i018.\u0275\u0275elementEnd()()();
      i018.\u0275\u0275template(9, LeaderboardComponent_div_9_Template, 4, 0, "div", 6)(10, LeaderboardComponent_div_10_Template, 2, 1, "div", 7)(11, LeaderboardComponent_div_11_Template, 3, 2, "div", 8);
      i018.\u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      i018.\u0275\u0275advance(9);
      i018.\u0275\u0275property("ngIf", ctx.isLoading);
      i018.\u0275\u0275advance();
      i018.\u0275\u0275property("ngIf", ctx.error && !ctx.isLoading);
      i018.\u0275\u0275advance();
      i018.\u0275\u0275property("ngIf", !ctx.isLoading && !ctx.error);
    }
  }, dependencies: [CommonModule9, i35.NgClass, i35.NgComponentOutlet, i35.NgForOf, i35.NgIf, i35.NgTemplateOutlet, i35.NgStyle, i35.NgSwitch, i35.NgSwitchCase, i35.NgSwitchDefault, i35.NgPlural, i35.NgPluralCase, i35.AsyncPipe, i35.UpperCasePipe, i35.LowerCasePipe, i35.JsonPipe, i35.SlicePipe, i35.DecimalPipe, i35.PercentPipe, i35.TitleCasePipe, i35.CurrencyPipe, i35.DatePipe, i35.I18nPluralPipe, i35.I18nSelectPipe, i35.KeyValuePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.leaderboard-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-deep);\n  background-image:\n    radial-gradient(\n      circle at 50% 0%,\n      #121e36 0%,\n      var(--bg-deep) 70%);\n  color: var(--text-main);\n  font-family: var(--font-main);\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  padding: 2rem;\n  max-width: 1200px;\n  margin: 0 auto;\n  width: 100%;\n}\n.header-section[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 3rem;\n  animation: _ngcontent-%COMP%_fadeInDown 0.6s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 900;\n  margin-bottom: 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--gold),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  text-shadow: 0 0 20px rgba(255, 215, 0, 0.2);\n}\n.scoring-info[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: var(--text-muted);\n}\n.highlight-rule[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--primary);\n  text-shadow: 0 0 5px rgba(0, 240, 255, 0.5);\n}\n.table-container.glass-panel[_ngcontent-%COMP%] {\n  background: rgba(15, 22, 35, 0.7);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);\n  animation: _ngcontent-%COMP%_fadeInUp 0.6s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.styled-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  min-width: 700px;\n}\n.styled-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.3);\n  color: var(--text-muted);\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.75rem;\n  letter-spacing: 1px;\n  padding: 1.2rem 1.5rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n}\n.styled-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1.2rem 1.5rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.02);\n  vertical-align: middle;\n}\n.data-row[_ngcontent-%COMP%] {\n  transition: background-color 0.2s;\n}\n.data-row[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.03);\n}\n.current-user-row[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(0, 240, 255, 0.05) 0%,\n      transparent 100%);\n  border-left: 3px solid var(--primary);\n}\n.badge-you[_ngcontent-%COMP%] {\n  background-color: var(--primary);\n  color: #000;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-weight: 800;\n  box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);\n  margin-left: 0.5rem;\n}\n.rank-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background-color: rgba(255, 255, 255, 0.05);\n  font-weight: 700;\n  font-size: 0.9rem;\n}\n.rank-badge.rank-1[_ngcontent-%COMP%] {\n  background: var(--gold);\n  color: #000;\n  box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);\n}\n.rank-badge.rank-2[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #000;\n  box-shadow: 0 0 15px rgba(226, 232, 240, 0.3);\n}\n.rank-badge.rank-3[_ngcontent-%COMP%] {\n  background: #cd7f32;\n  color: #000;\n  box-shadow: 0 0 15px rgba(205, 127, 50, 0.3);\n}\n.username[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n  font-size: 1rem;\n}\n.points-value[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 800;\n  color: var(--gold);\n  text-shadow: 0 0 10px rgba(255, 215, 0, 0.2);\n}\n.text-dim[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-weight: 500;\n}\n.text-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.status-message[_ngcontent-%COMP%], \n.error-alert[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem;\n  color: var(--text-muted);\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top-color: var(--gold);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem auto;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n/*# sourceMappingURL=leaderboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i018.\u0275setClassMetadata(LeaderboardComponent, [{
    type: Component9,
    args: [{ selector: "app-leaderboard", standalone: true, imports: [CommonModule9], template: '<div class="leaderboard-page">\r\n  <main class="content-wrapper">\r\n\r\n    <div class="header-section">\r\n      <h1 class="page-title">Felhaszn\xE1l\xF3i Ranglista</h1>\r\n      <p class="scoring-info">\r\n        Pontsz\xE1m\xEDt\xE1s: <span class="highlight-rule">3\xD7 \xE9rt\xE9kel\xE9s + 2\xD7 kedvenc + 1\xD7 megtekint\xE9s</span>\r\n      </p>\r\n    </div>\r\n\r\n    <div *ngIf="isLoading" class="status-message loading">\r\n      <div class="spinner"></div>\r\n      <span>Ranglista bet\xF6lt\xE9se...</span>\r\n    </div>\r\n\r\n    <div *ngIf="error && !isLoading" class="error-alert">\r\n      {{ error }}\r\n    </div>\r\n\r\n    <div *ngIf="!isLoading && !error" class="leaderboard-content">\r\n\r\n      <div *ngIf="items.length === 0" class="status-message empty">\r\n        M\xE9g nincs el\xE9g aktivit\xE1s a ranglist\xE1hoz.\r\n      </div>\r\n\r\n      <div *ngIf="items.length > 0" class="table-container glass-panel">\r\n        <table class="styled-table">\r\n          <thead>\r\n            <tr>\r\n              <th class="col-rank">#</th>\r\n              <th class="col-user">Felhaszn\xE1l\xF3</th>\r\n              <th class="col-stat text-center">\xC9rt\xE9kel\xE9sek</th>\r\n              <th class="col-stat text-center">Kedvencek</th>\r\n              <th class="col-stat text-center">Megtekint\xE9sek</th>\r\n              <th class="col-points text-right">Pont</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor="let item of items; let i = index"\r\n                [class.current-user-row]="isCurrentUser(item)"\r\n                class="data-row">\r\n              \r\n              <td class="col-rank">\r\n                <span class="rank-badge"\r\n                      [class.rank-1]="i === 0"\r\n                      [class.rank-2]="i === 1"\r\n                      [class.rank-3]="i === 2">\r\n                  {{ i + 1 }}\r\n                </span>\r\n              </td>\r\n              \r\n              <td class="col-user">\r\n                <div class="user-info">\r\n                  <span class="username">{{ item.username }}</span>\r\n                  <span *ngIf="isCurrentUser(item)" class="badge-you">Te</span>\r\n                </div>\r\n              </td>\r\n              \r\n              <td class="col-stat text-center text-dim">\r\n                {{ item.totalRatings }}\r\n              </td>\r\n              \r\n              <td class="col-stat text-center text-dim">\r\n                {{ item.totalFavorites }}\r\n              </td>\r\n              \r\n              <td class="col-stat text-center text-dim">\r\n                {{ item.totalViews }}\r\n              </td>\r\n              \r\n              <td class="col-points text-right">\r\n                <span class="points-value">{{ item.points }}</span>\r\n              </td>\r\n              \r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </main>\r\n</div>', styles: ["/* src/app/features/leaderboard/leaderboard.component.css */\n:host {\n  display: block;\n}\n.leaderboard-page {\n  min-height: 100vh;\n  background-color: var(--bg-deep);\n  background-image:\n    radial-gradient(\n      circle at 50% 0%,\n      #121e36 0%,\n      var(--bg-deep) 70%);\n  color: var(--text-main);\n  font-family: var(--font-main);\n}\n.content-wrapper {\n  padding: 2rem;\n  max-width: 1200px;\n  margin: 0 auto;\n  width: 100%;\n}\n.header-section {\n  text-align: center;\n  margin-bottom: 3rem;\n  animation: fadeInDown 0.6s ease;\n}\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.page-title {\n  font-size: 2.5rem;\n  font-weight: 900;\n  margin-bottom: 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      var(--gold),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  text-shadow: 0 0 20px rgba(255, 215, 0, 0.2);\n}\n.scoring-info {\n  font-size: 0.95rem;\n  color: var(--text-muted);\n}\n.highlight-rule {\n  font-weight: 600;\n  color: var(--primary);\n  text-shadow: 0 0 5px rgba(0, 240, 255, 0.5);\n}\n.table-container.glass-panel {\n  background: rgba(15, 22, 35, 0.7);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);\n  animation: fadeInUp 0.6s ease;\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.styled-table {\n  width: 100%;\n  border-collapse: collapse;\n  min-width: 700px;\n}\n.styled-table th {\n  background-color: rgba(0, 0, 0, 0.3);\n  color: var(--text-muted);\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.75rem;\n  letter-spacing: 1px;\n  padding: 1.2rem 1.5rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n}\n.styled-table td {\n  padding: 1.2rem 1.5rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.02);\n  vertical-align: middle;\n}\n.data-row {\n  transition: background-color 0.2s;\n}\n.data-row:hover {\n  background-color: rgba(255, 255, 255, 0.03);\n}\n.current-user-row {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(0, 240, 255, 0.05) 0%,\n      transparent 100%);\n  border-left: 3px solid var(--primary);\n}\n.badge-you {\n  background-color: var(--primary);\n  color: #000;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-weight: 800;\n  box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);\n  margin-left: 0.5rem;\n}\n.rank-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background-color: rgba(255, 255, 255, 0.05);\n  font-weight: 700;\n  font-size: 0.9rem;\n}\n.rank-badge.rank-1 {\n  background: var(--gold);\n  color: #000;\n  box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);\n}\n.rank-badge.rank-2 {\n  background: #e2e8f0;\n  color: #000;\n  box-shadow: 0 0 15px rgba(226, 232, 240, 0.3);\n}\n.rank-badge.rank-3 {\n  background: #cd7f32;\n  color: #000;\n  box-shadow: 0 0 15px rgba(205, 127, 50, 0.3);\n}\n.username {\n  font-weight: 600;\n  color: #fff;\n  font-size: 1rem;\n}\n.points-value {\n  font-size: 1.2rem;\n  font-weight: 800;\n  color: var(--gold);\n  text-shadow: 0 0 10px rgba(255, 215, 0, 0.2);\n}\n.text-dim {\n  color: #64748b;\n  font-weight: 500;\n}\n.text-center {\n  text-align: center;\n}\n.text-right {\n  text-align: right;\n}\n.status-message,\n.error-alert {\n  text-align: center;\n  padding: 3rem;\n  color: var(--text-muted);\n}\n.spinner {\n  width: 40px;\n  height: 40px;\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top-color: var(--gold);\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin: 0 auto 1rem auto;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.table-container {\n  overflow-x: auto;\n}\n/*# sourceMappingURL=leaderboard.component.css.map */\n"] }]
  }], () => [{ type: StatisticsService }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i018.\u0275setClassDebugInfo(LeaderboardComponent, { className: "LeaderboardComponent", filePath: "src/app/features/leaderboard/leaderboard.component.ts", lineNumber: 18 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Fleaderboard%2Fleaderboard.component.ts%40LeaderboardComponent";
  function LeaderboardComponent_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i018.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i018.\u0275\u0275replaceMetadata(LeaderboardComponent, m.default, [i018, i35, statistics_service_exports, auth_service_exports], [CommonModule9, Component9], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && LeaderboardComponent_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && LeaderboardComponent_HmrLoad(d.timestamp)));
})();

// src/app/features/admin-pages/manage-users/manage-users.ts
import { Component as Component10 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { CommonModule as CommonModule10 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import { FormsModule as FormsModule6 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
import { RouterModule as RouterModule5 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i019 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i24 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import * as i36 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
import * as i46 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
function ManageUsersComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    i019.\u0275\u0275elementStart(0, "div", 27);
    i019.\u0275\u0275element(1, "div", 28);
    i019.\u0275\u0275elementStart(2, "p");
    i019.\u0275\u0275text(3, "Adatok bet\xF6lt\xE9se...");
    i019.\u0275\u0275elementEnd()();
  }
}
function ManageUsersComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    i019.\u0275\u0275elementStart(0, "div", 29);
    i019.\u0275\u0275text(1);
    i019.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i019.\u0275\u0275nextContext();
    i019.\u0275\u0275advance();
    i019.\u0275\u0275textInterpolate1(" ", ctx_r0.error, " ");
  }
}
function ManageUsersComponent_div_10_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = i019.\u0275\u0275getCurrentView();
    i019.\u0275\u0275elementStart(0, "tr", 44)(1, "td", 37)(2, "span", 45);
    i019.\u0275\u0275text(3);
    i019.\u0275\u0275elementEnd()();
    i019.\u0275\u0275elementStart(4, "td", 38)(5, "span", 46);
    i019.\u0275\u0275text(6);
    i019.\u0275\u0275elementEnd()();
    i019.\u0275\u0275elementStart(7, "td", 39)(8, "span", 47);
    i019.\u0275\u0275text(9);
    i019.\u0275\u0275elementEnd()();
    i019.\u0275\u0275elementStart(10, "td", 40)(11, "span", 48);
    i019.\u0275\u0275text(12);
    i019.\u0275\u0275elementEnd()();
    i019.\u0275\u0275elementStart(13, "td", 41);
    i019.\u0275\u0275text(14);
    i019.\u0275\u0275pipe(15, "date");
    i019.\u0275\u0275elementEnd();
    i019.\u0275\u0275elementStart(16, "td", 42)(17, "div", 49)(18, "button", 50);
    i019.\u0275\u0275listener("click", function ManageUsersComponent_div_10_tr_25_Template_button_click_18_listener() {
      const user_r4 = i019.\u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = i019.\u0275\u0275nextContext(2);
      return i019.\u0275\u0275resetView(ctx_r0.openEditForm(user_r4));
    });
    i019.\u0275\u0275text(19, " \u270F\uFE0F ");
    i019.\u0275\u0275elementEnd();
    i019.\u0275\u0275elementStart(20, "button", 51);
    i019.\u0275\u0275listener("click", function ManageUsersComponent_div_10_tr_25_Template_button_click_20_listener() {
      const user_r4 = i019.\u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = i019.\u0275\u0275nextContext(2);
      return i019.\u0275\u0275resetView(ctx_r0.deleteUser(user_r4.id));
    });
    i019.\u0275\u0275text(21, " \u{1F5D1}\uFE0F ");
    i019.\u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const user_r4 = ctx.$implicit;
    i019.\u0275\u0275advance(3);
    i019.\u0275\u0275textInterpolate1("#", user_r4.id);
    i019.\u0275\u0275advance(3);
    i019.\u0275\u0275textInterpolate(user_r4.username);
    i019.\u0275\u0275advance(3);
    i019.\u0275\u0275textInterpolate(user_r4.email);
    i019.\u0275\u0275advance(2);
    i019.\u0275\u0275classProp("role-admin", user_r4.role === "Admin")("role-user", user_r4.role === "User");
    i019.\u0275\u0275advance();
    i019.\u0275\u0275textInterpolate1(" ", user_r4.role, " ");
    i019.\u0275\u0275advance(2);
    i019.\u0275\u0275textInterpolate1(" ", i019.\u0275\u0275pipeBind2(15, 9, user_r4.createdAt, "yyyy. MM. dd."), " ");
  }
}
function ManageUsersComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = i019.\u0275\u0275getCurrentView();
    i019.\u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "button", 32);
    i019.\u0275\u0275text(3, " \u2190 Vissza a Dashboardra ");
    i019.\u0275\u0275elementEnd();
    i019.\u0275\u0275elementStart(4, "button", 33);
    i019.\u0275\u0275listener("click", function ManageUsersComponent_div_10_Template_button_click_4_listener() {
      i019.\u0275\u0275restoreView(_r2);
      const ctx_r0 = i019.\u0275\u0275nextContext();
      return i019.\u0275\u0275resetView(ctx_r0.openEditForm());
    });
    i019.\u0275\u0275elementStart(5, "span", 34);
    i019.\u0275\u0275text(6, "+");
    i019.\u0275\u0275elementEnd();
    i019.\u0275\u0275text(7, " \xDAj Felhaszn\xE1l\xF3 ");
    i019.\u0275\u0275elementEnd()();
    i019.\u0275\u0275elementStart(8, "div", 35)(9, "table", 36)(10, "thead")(11, "tr")(12, "th", 37);
    i019.\u0275\u0275text(13, "ID");
    i019.\u0275\u0275elementEnd();
    i019.\u0275\u0275elementStart(14, "th", 38);
    i019.\u0275\u0275text(15, "Felhaszn\xE1l\xF3n\xE9v");
    i019.\u0275\u0275elementEnd();
    i019.\u0275\u0275elementStart(16, "th", 39);
    i019.\u0275\u0275text(17, "Email");
    i019.\u0275\u0275elementEnd();
    i019.\u0275\u0275elementStart(18, "th", 40);
    i019.\u0275\u0275text(19, "Szerepk\xF6r");
    i019.\u0275\u0275elementEnd();
    i019.\u0275\u0275elementStart(20, "th", 41);
    i019.\u0275\u0275text(21, "L\xE9trehozva");
    i019.\u0275\u0275elementEnd();
    i019.\u0275\u0275elementStart(22, "th", 42);
    i019.\u0275\u0275text(23, "M\u0171veletek");
    i019.\u0275\u0275elementEnd()()();
    i019.\u0275\u0275elementStart(24, "tbody");
    i019.\u0275\u0275template(25, ManageUsersComponent_div_10_tr_25_Template, 22, 12, "tr", 43);
    i019.\u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = i019.\u0275\u0275nextContext();
    i019.\u0275\u0275advance(25);
    i019.\u0275\u0275property("ngForOf", ctx_r0.users);
  }
}
function ManageUsersComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = i019.\u0275\u0275getCurrentView();
    i019.\u0275\u0275elementStart(0, "div", 16)(1, "label");
    i019.\u0275\u0275text(2, "Jelsz\xF3");
    i019.\u0275\u0275elementEnd();
    i019.\u0275\u0275elementStart(3, "input", 52);
    i019.\u0275\u0275twoWayListener("ngModelChange", function ManageUsersComponent_div_37_Template_input_ngModelChange_3_listener($event) {
      i019.\u0275\u0275restoreView(_r5);
      const ctx_r0 = i019.\u0275\u0275nextContext();
      i019.\u0275\u0275twoWayBindingSet(ctx_r0.formModel.password, $event) || (ctx_r0.formModel.password = $event);
      return i019.\u0275\u0275resetView($event);
    });
    i019.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = i019.\u0275\u0275nextContext();
    i019.\u0275\u0275advance(3);
    i019.\u0275\u0275twoWayProperty("ngModel", ctx_r0.formModel.password);
  }
}
var ManageUsersComponent = class _ManageUsersComponent {
  userApi;
  users = [];
  loading = true;
  error = null;
  // Modal állapota
  isFormOpen = false;
  isEditing = false;
  // Form modell inicializálása
  formModel = {
    id: 0,
    username: "",
    email: "",
    role: "User",
    password: "",
    createdAt: ""
  };
  // FIGYELEM: Ha a te service-ed neve UserApiService, cseréld ki itt a típust!
  constructor(userApi) {
    this.userApi = userApi;
  }
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.loading = true;
    this.userApi.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Nem siker\xFClt bet\xF6lteni a felhaszn\xE1l\xF3kat.";
        this.loading = false;
      }
    });
  }
  // ===== EGYIESÍTETT FORM MEGNYITÁS (JAVÍTVA) =====
  // A user paraméter most opcionális (?). 
  // Ha van user, akkor SZERKESZTÉS. Ha nincs, akkor HOZZÁADÁS.
  openEditForm(user) {
    this.isFormOpen = true;
    if (user) {
      this.isEditing = true;
      this.formModel = __spreadProps(__spreadValues({}, user), { password: "" });
    } else {
      this.isEditing = false;
      this.formModel = {
        id: 0,
        username: "",
        email: "",
        role: "User",
        password: "",
        // Jelszó kötelező lesz új usernél
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  // ===== MENTÉS (KÖZÖS FÜGGVÉNY) =====
  saveForm() {
    if (this.isEditing) {
      this.userApi.updateUser(this.formModel).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadUsers();
        },
        error: (err) => console.error("Hiba friss\xEDt\xE9skor:", err)
      });
    } else {
      this.userApi.createUser(this.formModel).subscribe({
        next: () => {
          this.isFormOpen = false;
          this.loadUsers();
        },
        error: (err) => console.error("Hiba l\xE9trehoz\xE1skor:", err)
      });
    }
  }
  deleteUser(id) {
    if (!confirm("Biztos t\xF6rl\xF6d a felhaszn\xE1l\xF3t?"))
      return;
    this.userApi.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u.id !== id);
      },
      error: (err) => console.error("Hiba t\xF6rl\xE9skor:", err)
    });
  }
  cancelForm() {
    this.isFormOpen = false;
  }
  static \u0275fac = function ManageUsersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ManageUsersComponent)(i019.\u0275\u0275directiveInject(UserService));
  };
  static \u0275cmp = /* @__PURE__ */ i019.\u0275\u0275defineComponent({ type: _ManageUsersComponent, selectors: [["app-manage-users"]], decls: 43, vars: 11, consts: [[1, "manage-users-page"], [1, "content-wrapper"], [1, "page-header"], [1, "title"], [1, "decoration-line"], [1, "subtitle"], ["class", "loading-state", 4, "ngIf"], ["class", "error-msg", 4, "ngIf"], ["class", "content-container", 4, "ngIf"], [1, "modal-overlay"], [1, "modal-container"], [1, "modal-header"], [1, "modal-title"], [1, "btn-close", 3, "click"], [1, "modal-body"], [1, "user-form", 3, "ngSubmit"], [1, "form-group"], ["type", "text", "name", "username", "required", "", 1, "input-field", 3, "ngModelChange", "ngModel"], ["type", "email", "name", "email", "required", "", 1, "input-field", 3, "ngModelChange", "ngModel"], [1, "select-wrapper"], ["name", "role", 1, "input-field", "select-field", 3, "ngModelChange", "ngModel"], ["value", "User"], ["value", "Admin"], ["class", "form-group", 4, "ngIf"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary"], [1, "loading-state"], [1, "loader"], [1, "error-msg"], [1, "content-container"], [1, "toolbar"], ["routerLink", "/admin-dashboard", 1, "btn", "btn-secondary"], [1, "btn", "btn-add", 3, "click"], [1, "icon"], [1, "table-container", "glass-panel"], [1, "styled-table"], [1, "col-id"], [1, "col-user"], [1, "col-email"], [1, "col-role", "text-center"], [1, "col-date", "text-right"], [1, "col-actions", "text-right"], ["class", "data-row", 4, "ngFor", "ngForOf"], [1, "data-row"], [1, "id-badge"], [1, "username"], [1, "email-text"], [1, "role-badge"], [1, "action-buttons"], ["title", "Szerkeszt\xE9s", 1, "btn-icon", "edit", 3, "click"], ["title", "T\xF6rl\xE9s", 1, "btn-icon", "delete", 3, "click"], ["type", "password", "name", "password", "required", "", 1, "input-field", 3, "ngModelChange", "ngModel"]], template: function ManageUsersComponent_Template(rf, ctx) {
    if (rf & 1) {
      i019.\u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "header", 2)(3, "h1", 3);
      i019.\u0275\u0275text(4, "Felhaszn\xE1l\xF3k Kezel\xE9se");
      i019.\u0275\u0275elementEnd();
      i019.\u0275\u0275element(5, "div", 4);
      i019.\u0275\u0275elementStart(6, "p", 5);
      i019.\u0275\u0275text(7, "Regisztr\xE1lt fi\xF3kok karbantart\xE1sa");
      i019.\u0275\u0275elementEnd()();
      i019.\u0275\u0275template(8, ManageUsersComponent_div_8_Template, 4, 0, "div", 6)(9, ManageUsersComponent_div_9_Template, 2, 1, "div", 7)(10, ManageUsersComponent_div_10_Template, 26, 1, "div", 8);
      i019.\u0275\u0275elementEnd();
      i019.\u0275\u0275elementStart(11, "div", 9)(12, "div", 10)(13, "div", 11)(14, "h2", 12);
      i019.\u0275\u0275text(15);
      i019.\u0275\u0275elementEnd();
      i019.\u0275\u0275elementStart(16, "button", 13);
      i019.\u0275\u0275listener("click", function ManageUsersComponent_Template_button_click_16_listener() {
        return ctx.cancelForm();
      });
      i019.\u0275\u0275text(17, "\xD7");
      i019.\u0275\u0275elementEnd()();
      i019.\u0275\u0275elementStart(18, "div", 14)(19, "form", 15);
      i019.\u0275\u0275listener("ngSubmit", function ManageUsersComponent_Template_form_ngSubmit_19_listener() {
        return ctx.saveForm();
      });
      i019.\u0275\u0275elementStart(20, "div", 16)(21, "label");
      i019.\u0275\u0275text(22, "Felhaszn\xE1l\xF3n\xE9v");
      i019.\u0275\u0275elementEnd();
      i019.\u0275\u0275elementStart(23, "input", 17);
      i019.\u0275\u0275twoWayListener("ngModelChange", function ManageUsersComponent_Template_input_ngModelChange_23_listener($event) {
        i019.\u0275\u0275twoWayBindingSet(ctx.formModel.username, $event) || (ctx.formModel.username = $event);
        return $event;
      });
      i019.\u0275\u0275elementEnd()();
      i019.\u0275\u0275elementStart(24, "div", 16)(25, "label");
      i019.\u0275\u0275text(26, "Email c\xEDm");
      i019.\u0275\u0275elementEnd();
      i019.\u0275\u0275elementStart(27, "input", 18);
      i019.\u0275\u0275twoWayListener("ngModelChange", function ManageUsersComponent_Template_input_ngModelChange_27_listener($event) {
        i019.\u0275\u0275twoWayBindingSet(ctx.formModel.email, $event) || (ctx.formModel.email = $event);
        return $event;
      });
      i019.\u0275\u0275elementEnd()();
      i019.\u0275\u0275elementStart(28, "div", 16)(29, "label");
      i019.\u0275\u0275text(30, "Szerepk\xF6r");
      i019.\u0275\u0275elementEnd();
      i019.\u0275\u0275elementStart(31, "div", 19)(32, "select", 20);
      i019.\u0275\u0275twoWayListener("ngModelChange", function ManageUsersComponent_Template_select_ngModelChange_32_listener($event) {
        i019.\u0275\u0275twoWayBindingSet(ctx.formModel.role, $event) || (ctx.formModel.role = $event);
        return $event;
      });
      i019.\u0275\u0275elementStart(33, "option", 21);
      i019.\u0275\u0275text(34, "User");
      i019.\u0275\u0275elementEnd();
      i019.\u0275\u0275elementStart(35, "option", 22);
      i019.\u0275\u0275text(36, "Admin");
      i019.\u0275\u0275elementEnd()()()();
      i019.\u0275\u0275template(37, ManageUsersComponent_div_37_Template, 4, 1, "div", 23);
      i019.\u0275\u0275elementStart(38, "div", 24)(39, "button", 25);
      i019.\u0275\u0275listener("click", function ManageUsersComponent_Template_button_click_39_listener() {
        return ctx.cancelForm();
      });
      i019.\u0275\u0275text(40, "M\xE9gse");
      i019.\u0275\u0275elementEnd();
      i019.\u0275\u0275elementStart(41, "button", 26);
      i019.\u0275\u0275text(42);
      i019.\u0275\u0275elementEnd()()()()()()();
    }
    if (rf & 2) {
      i019.\u0275\u0275advance(8);
      i019.\u0275\u0275property("ngIf", ctx.loading);
      i019.\u0275\u0275advance();
      i019.\u0275\u0275property("ngIf", ctx.error);
      i019.\u0275\u0275advance();
      i019.\u0275\u0275property("ngIf", !ctx.loading);
      i019.\u0275\u0275advance();
      i019.\u0275\u0275classProp("active", ctx.isFormOpen);
      i019.\u0275\u0275advance(4);
      i019.\u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Felhaszn\xE1l\xF3 Szerkeszt\xE9se" : "\xDAj Felhaszn\xE1l\xF3", " ");
      i019.\u0275\u0275advance(8);
      i019.\u0275\u0275twoWayProperty("ngModel", ctx.formModel.username);
      i019.\u0275\u0275advance(4);
      i019.\u0275\u0275twoWayProperty("ngModel", ctx.formModel.email);
      i019.\u0275\u0275advance(5);
      i019.\u0275\u0275twoWayProperty("ngModel", ctx.formModel.role);
      i019.\u0275\u0275advance(5);
      i019.\u0275\u0275property("ngIf", !ctx.isEditing);
      i019.\u0275\u0275advance(5);
      i019.\u0275\u0275textInterpolate1(" ", ctx.isEditing ? "Ment\xE9s" : "L\xE9trehoz\xE1s", " ");
    }
  }, dependencies: [CommonModule10, i24.NgClass, i24.NgComponentOutlet, i24.NgForOf, i24.NgIf, i24.NgTemplateOutlet, i24.NgStyle, i24.NgSwitch, i24.NgSwitchCase, i24.NgSwitchDefault, i24.NgPlural, i24.NgPluralCase, FormsModule6, i36.\u0275NgNoValidate, i36.NgSelectOption, i36.\u0275NgSelectMultipleOption, i36.DefaultValueAccessor, i36.NumberValueAccessor, i36.RangeValueAccessor, i36.CheckboxControlValueAccessor, i36.SelectControlValueAccessor, i36.SelectMultipleControlValueAccessor, i36.RadioControlValueAccessor, i36.NgControlStatus, i36.NgControlStatusGroup, i36.RequiredValidator, i36.MinLengthValidator, i36.MaxLengthValidator, i36.PatternValidator, i36.CheckboxRequiredValidator, i36.EmailValidator, i36.MinValidator, i36.MaxValidator, i36.NgModel, i36.NgModelGroup, i36.NgForm, RouterModule5, i46.RouterOutlet, i46.RouterLink, i46.RouterLinkActive, i46.\u0275EmptyOutletComponent, i24.AsyncPipe, i24.UpperCasePipe, i24.LowerCasePipe, i24.JsonPipe, i24.SlicePipe, i24.DecimalPipe, i24.PercentPipe, i24.TitleCasePipe, i24.CurrencyPipe, i24.DatePipe, i24.I18nPluralPipe, i24.I18nSelectPipe, i24.KeyValuePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  --primary: #00f0ff;\n  --secondary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --bg-input: #111827;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --border-color: rgba(255, 255, 255, 0.1);\n  --accent-green: #10b981;\n  --accent-red: #ff003c;\n}\n.manage-users-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  background-image:\n    radial-gradient(\n      circle at 50% 0%,\n      #1a2332 0%,\n      var(--bg-dark) 80%);\n  color: var(--text-main);\n  font-family:\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  padding-bottom: 4rem;\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n  text-align: center;\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  display: inline-block;\n}\n.decoration-line[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 4px;\n  background: var(--primary);\n  margin: 0.5rem auto 1rem auto;\n  box-shadow: 0 0 10px var(--primary);\n  border-radius: 2px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  margin: 0;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.table-container.glass-panel[_ngcontent-%COMP%] {\n  background: rgba(15, 22, 35, 0.6);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n  overflow-x: auto;\n}\n.styled-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  min-width: 800px;\n}\n.styled-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.3);\n  color: var(--text-muted);\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.8rem;\n  letter-spacing: 1px;\n  padding: 1.2rem 1.5rem;\n  border-bottom: 1px solid var(--border-color);\n}\n.styled-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.02);\n  vertical-align: middle;\n  font-size: 0.95rem;\n}\n.data-row[_ngcontent-%COMP%] {\n  transition: background-color 0.2s;\n}\n.data-row[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.03);\n}\n.col-id[_ngcontent-%COMP%] {\n  width: 80px;\n  color: var(--text-muted);\n  font-family: monospace;\n}\n.id-badge[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 0.8rem;\n}\n.username[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #fff;\n}\n.email-text[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n}\n.col-role[_ngcontent-%COMP%] {\n  width: 120px;\n}\n.role-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  min-width: 80px;\n}\n.role-badge.role-admin[_ngcontent-%COMP%] {\n  background: rgba(112, 0, 255, 0.2);\n  color: #d8b4fe;\n  border: 1px solid rgba(112, 0, 255, 0.4);\n  box-shadow: 0 0 10px rgba(112, 0, 255, 0.2);\n}\n.role-badge.role-user[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.2);\n  color: #6ee7b7;\n  border: 1px solid rgba(16, 185, 129, 0.4);\n}\n.col-date[_ngcontent-%COMP%] {\n  width: 150px;\n  color: var(--text-muted);\n  font-size: 0.9rem;\n}\n.col-actions[_ngcontent-%COMP%] {\n  width: 120px;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  transition: all 0.2s;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  text-transform: uppercase;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-muted);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fff;\n}\n.btn-add[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: #000;\n  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);\n}\n.btn-add[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0 25px rgba(0, 240, 255, 0.5);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: var(--secondary);\n  color: #fff;\n  box-shadow: 0 0 15px rgba(112, 0, 255, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0 25px rgba(112, 0, 255, 0.5);\n  transform: translateY(-2px);\n}\n.btn-icon[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  font-size: 1.2rem;\n  cursor: pointer;\n  padding: 6px;\n  border-radius: 6px;\n  transition: background 0.2s;\n}\n.btn-icon.edit[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 240, 255, 0.1);\n}\n.btn-icon.delete[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 0, 60, 0.1);\n}\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n  z-index: 1000;\n  display: none;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.modal-overlay.active[_ngcontent-%COMP%] {\n  display: flex;\n  opacity: 1;\n}\n.modal-container[_ngcontent-%COMP%] {\n  background: var(--bg-input);\n  border: 1px solid var(--secondary);\n  border-radius: 16px;\n  width: 90%;\n  max-width: 500px;\n  padding: 2rem;\n  box-shadow: 0 0 50px rgba(112, 0, 255, 0.2);\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease;\n  position: relative;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  padding-bottom: 1rem;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 0;\n  color: #fff;\n  font-weight: 700;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #94a3b8;\n  font-size: 2rem;\n  cursor: pointer;\n  line-height: 1;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n.user-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.2rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  color: #cbd5e1;\n  margin-bottom: 0.5rem;\n  font-size: 0.9rem;\n  font-weight: 600;\n}\n.input-field[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.8rem;\n  background: #0f1623;\n  border: 1px solid #334155;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.2s;\n}\n.input-field[_ngcontent-%COMP%]:focus {\n  border-color: var(--secondary);\n  box-shadow: 0 0 0 3px rgba(112, 0, 255, 0.1);\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  margin-top: 1.5rem;\n}\n.loading-state[_ngcontent-%COMP%], \n.error-msg[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem;\n  color: var(--text-muted);\n}\n.error-msg[_ngcontent-%COMP%] {\n  color: var(--accent-red);\n}\n.loader[_ngcontent-%COMP%] {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: stretch;\n  }\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n  .col-email[_ngcontent-%COMP%], \n   .col-date[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=manage-users.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i019.\u0275setClassMetadata(ManageUsersComponent, [{
    type: Component10,
    args: [{ selector: "app-manage-users", standalone: true, imports: [CommonModule10, FormsModule6, RouterModule5], template: `<div class="manage-users-page">\r
  <div class="content-wrapper">\r
\r
    <!-- Header -->\r
    <header class="page-header">\r
      <h1 class="title">Felhaszn\xE1l\xF3k Kezel\xE9se</h1>\r
      <div class="decoration-line"></div>\r
      <p class="subtitle">Regisztr\xE1lt fi\xF3kok karbantart\xE1sa</p>\r
    </header>\r
\r
    <!-- Loading State -->\r
    <div *ngIf="loading" class="loading-state">\r
      <div class="loader"></div>\r
      <p>Adatok bet\xF6lt\xE9se...</p>\r
    </div>\r
\r
    <!-- Error State -->\r
    <div *ngIf="error" class="error-msg">\r
      {{ error }}\r
    </div>\r
\r
    <div *ngIf="!loading" class="content-container">\r
      \r
      <!-- Toolbar (Vissza \xE9s Hozz\xE1ad\xE1s gombok) -->\r
      <div class="toolbar">\r
        <button class="btn btn-secondary" routerLink="/admin-dashboard">\r
          \u2190 Vissza a Dashboardra\r
        </button>\r
        \r
        <!-- Felt\xE9telezem, hogy az openEditForm param\xE9ter n\xE9lk\xFCl h\xEDvva \xFAj felhaszn\xE1l\xF3t hoz l\xE9tre -->\r
        <button class="btn btn-add" (click)="openEditForm()">\r
          <span class="icon">+</span> \xDAj Felhaszn\xE1l\xF3\r
        </button>\r
      </div>\r
\r
      <!-- Users Table -->\r
      <div class="table-container glass-panel">\r
        <table class="styled-table">\r
          <thead>\r
            <tr>\r
              <th class="col-id">ID</th>\r
              <th class="col-user">Felhaszn\xE1l\xF3n\xE9v</th>\r
              <th class="col-email">Email</th>\r
              <th class="col-role text-center">Szerepk\xF6r</th>\r
              <th class="col-date text-right">L\xE9trehozva</th>\r
              <th class="col-actions text-right">M\u0171veletek</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            <tr *ngFor="let user of users" class="data-row">\r
              \r
              <td class="col-id">\r
                <span class="id-badge">#{{ user.id }}</span>\r
              </td>\r
              \r
              <td class="col-user">\r
                <span class="username">{{ user.username }}</span>\r
              </td>\r
              \r
              <td class="col-email">\r
                <span class="email-text">{{ user.email }}</span>\r
              </td>\r
\r
              <td class="col-role text-center">\r
                <span class="role-badge" \r
                      [class.role-admin]="user.role === 'Admin'"\r
                      [class.role-user]="user.role === 'User'">\r
                  {{ user.role }}\r
                </span>\r
              </td>\r
\r
              <td class="col-date text-right">\r
                {{ user.createdAt | date:'yyyy. MM. dd.' }}\r
              </td>\r
\r
              <td class="col-actions text-right">\r
                <div class="action-buttons">\r
                  <button class="btn-icon edit" (click)="openEditForm(user)" title="Szerkeszt\xE9s">\r
                    \u270F\uFE0F\r
                  </button>\r
                  <button class="btn-icon delete" (click)="deleteUser(user.id)" title="T\xF6rl\xE9s">\r
                    \u{1F5D1}\uFE0F\r
                  </button>\r
                </div>\r
              </td>\r
\r
            </tr>\r
          </tbody>\r
        </table>\r
      </div>\r
\r
    </div>\r
\r
  </div>\r
\r
  <!-- MODAL OVERLAY -->\r
  <div class="modal-overlay" [class.active]="isFormOpen">\r
    <div class="modal-container">\r
      \r
      <div class="modal-header">\r
        <h2 class="modal-title">\r
          {{ isEditing ? 'Felhaszn\xE1l\xF3 Szerkeszt\xE9se' : '\xDAj Felhaszn\xE1l\xF3' }}\r
        </h2>\r
        <button class="btn-close" (click)="cancelForm()">\xD7</button>\r
      </div>\r
\r
      <div class="modal-body">\r
        <form (ngSubmit)="saveForm()" class="user-form">\r
\r
          <div class="form-group">\r
            <label>Felhaszn\xE1l\xF3n\xE9v</label>\r
            <input type="text" [(ngModel)]="formModel.username" name="username" class="input-field" required />\r
          </div>\r
\r
          <div class="form-group">\r
            <label>Email c\xEDm</label>\r
            <input type="email" [(ngModel)]="formModel.email" name="email" class="input-field" required />\r
          </div>\r
\r
          <div class="form-group">\r
            <label>Szerepk\xF6r</label>\r
            <div class="select-wrapper">\r
              <select [(ngModel)]="formModel.role" name="role" class="input-field select-field">\r
                <option value="User">User</option>\r
                <option value="Admin">Admin</option>\r
              </select>\r
            </div>\r
          </div>\r
\r
          <!-- Jelsz\xF3 csak hozz\xE1ad\xE1skor -->\r
          <div class="form-group" *ngIf="!isEditing">\r
            <label>Jelsz\xF3</label>\r
            <input type="password" [(ngModel)]="formModel.password" name="password" class="input-field" required />\r
          </div>\r
\r
          <div class="modal-footer">\r
            <button type="button" class="btn btn-secondary" (click)="cancelForm()">M\xE9gse</button>\r
            <button type="submit" class="btn btn-primary">\r
              {{ isEditing ? 'Ment\xE9s' : 'L\xE9trehoz\xE1s' }}\r
            </button>\r
          </div>\r
\r
        </form>\r
      </div>\r
\r
    </div>\r
  </div>\r
\r
</div>`, styles: ['/* src/app/features/admin-pages/manage-users/manage-users.css */\n:host {\n  display: block;\n  --primary: #00f0ff;\n  --secondary: #7000ff;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --bg-input: #111827;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --border-color: rgba(255, 255, 255, 0.1);\n  --accent-green: #10b981;\n  --accent-red: #ff003c;\n}\n.manage-users-page {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  background-image:\n    radial-gradient(\n      circle at 50% 0%,\n      #1a2332 0%,\n      var(--bg-dark) 80%);\n  color: var(--text-main);\n  font-family:\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  padding-bottom: 4rem;\n}\n.content-wrapper {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.page-header {\n  margin-bottom: 3rem;\n  text-align: center;\n}\n.title {\n  font-size: 2.5rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      #fff);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  display: inline-block;\n}\n.decoration-line {\n  width: 80px;\n  height: 4px;\n  background: var(--primary);\n  margin: 0.5rem auto 1rem auto;\n  box-shadow: 0 0 10px var(--primary);\n  border-radius: 2px;\n}\n.subtitle {\n  color: var(--text-muted);\n  margin: 0;\n}\n.toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.table-container.glass-panel {\n  background: rgba(15, 22, 35, 0.6);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);\n  overflow-x: auto;\n}\n.styled-table {\n  width: 100%;\n  border-collapse: collapse;\n  min-width: 800px;\n}\n.styled-table th {\n  background-color: rgba(0, 0, 0, 0.3);\n  color: var(--text-muted);\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.8rem;\n  letter-spacing: 1px;\n  padding: 1.2rem 1.5rem;\n  border-bottom: 1px solid var(--border-color);\n}\n.styled-table td {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.02);\n  vertical-align: middle;\n  font-size: 0.95rem;\n}\n.data-row {\n  transition: background-color 0.2s;\n}\n.data-row:hover {\n  background-color: rgba(255, 255, 255, 0.03);\n}\n.col-id {\n  width: 80px;\n  color: var(--text-muted);\n  font-family: monospace;\n}\n.id-badge {\n  background: rgba(255, 255, 255, 0.05);\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-size: 0.8rem;\n}\n.username {\n  font-weight: 700;\n  color: #fff;\n}\n.email-text {\n  color: var(--text-muted);\n}\n.col-role {\n  width: 120px;\n}\n.role-badge {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  min-width: 80px;\n}\n.role-badge.role-admin {\n  background: rgba(112, 0, 255, 0.2);\n  color: #d8b4fe;\n  border: 1px solid rgba(112, 0, 255, 0.4);\n  box-shadow: 0 0 10px rgba(112, 0, 255, 0.2);\n}\n.role-badge.role-user {\n  background: rgba(16, 185, 129, 0.2);\n  color: #6ee7b7;\n  border: 1px solid rgba(16, 185, 129, 0.4);\n}\n.col-date {\n  width: 150px;\n  color: var(--text-muted);\n  font-size: 0.9rem;\n}\n.col-actions {\n  width: 120px;\n}\n.action-buttons {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n}\n.btn {\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 0.9rem;\n  transition: all 0.2s;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  text-transform: uppercase;\n}\n.btn-secondary {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-muted);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.btn-secondary:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fff;\n}\n.btn-add {\n  background: var(--primary);\n  color: #000;\n  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);\n}\n.btn-add:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0 25px rgba(0, 240, 255, 0.5);\n}\n.btn-primary {\n  background: var(--secondary);\n  color: #fff;\n  box-shadow: 0 0 15px rgba(112, 0, 255, 0.3);\n}\n.btn-primary:hover {\n  box-shadow: 0 0 25px rgba(112, 0, 255, 0.5);\n  transform: translateY(-2px);\n}\n.btn-icon {\n  background: transparent;\n  border: none;\n  font-size: 1.2rem;\n  cursor: pointer;\n  padding: 6px;\n  border-radius: 6px;\n  transition: background 0.2s;\n}\n.btn-icon.edit:hover {\n  background: rgba(0, 240, 255, 0.1);\n}\n.btn-icon.delete:hover {\n  background: rgba(255, 0, 60, 0.1);\n}\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n  z-index: 1000;\n  display: none;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.modal-overlay.active {\n  display: flex;\n  opacity: 1;\n}\n.modal-container {\n  background: var(--bg-input);\n  border: 1px solid var(--secondary);\n  border-radius: 16px;\n  width: 90%;\n  max-width: 500px;\n  padding: 2rem;\n  box-shadow: 0 0 50px rgba(112, 0, 255, 0.2);\n  animation: slideUp 0.3s ease;\n  position: relative;\n}\n@keyframes slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n  padding-bottom: 1rem;\n}\n.modal-title {\n  font-size: 1.5rem;\n  margin: 0;\n  color: #fff;\n  font-weight: 700;\n}\n.btn-close {\n  background: none;\n  border: none;\n  color: #94a3b8;\n  font-size: 2rem;\n  cursor: pointer;\n  line-height: 1;\n}\n.btn-close:hover {\n  color: #fff;\n}\n.user-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.2rem;\n}\n.form-group label {\n  display: block;\n  color: #cbd5e1;\n  margin-bottom: 0.5rem;\n  font-size: 0.9rem;\n  font-weight: 600;\n}\n.input-field {\n  width: 100%;\n  padding: 0.8rem;\n  background: #0f1623;\n  border: 1px solid #334155;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 1rem;\n  outline: none;\n  transition: all 0.2s;\n}\n.input-field:focus {\n  border-color: var(--secondary);\n  box-shadow: 0 0 0 3px rgba(112, 0, 255, 0.1);\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  margin-top: 1.5rem;\n}\n.loading-state,\n.error-msg {\n  text-align: center;\n  padding: 3rem;\n  color: var(--text-muted);\n}\n.error-msg {\n  color: var(--accent-red);\n}\n.loader {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 768px) {\n  .toolbar {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: stretch;\n  }\n  .btn {\n    width: 100%;\n    justify-content: center;\n  }\n  .col-email,\n  .col-date {\n    display: none;\n  }\n}\n/*# sourceMappingURL=manage-users.css.map */\n'] }]
  }], () => [{ type: UserService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i019.\u0275setClassDebugInfo(ManageUsersComponent, { className: "ManageUsersComponent", filePath: "src/app/features/admin-pages/manage-users/manage-users.ts", lineNumber: 14 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Fadmin-pages%2Fmanage-users%2Fmanage-users.ts%40ManageUsersComponent";
  function ManageUsersComponent_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i019.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i019.\u0275\u0275replaceMetadata(ManageUsersComponent, m.default, [i019, i24, i36, i46, user_profile_service_exports], [CommonModule10, FormsModule6, RouterModule5, Component10], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && ManageUsersComponent_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && ManageUsersComponent_HmrLoad(d.timestamp)));
})();

// src/app/features/statistics-pages/top-rated/top-rated-movies.ts
import { Component as Component11 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { CommonModule as CommonModule11 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import { FormsModule as FormsModule7 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
import * as i020 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i25 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import * as i37 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_forms.js?v=3f3fab55";
function TopRatedMovies_ng_container_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    i020.\u0275\u0275elementStart(0, "div", 11)(1, "strong");
    i020.\u0275\u0275text(2, "Hiba t\xF6rt\xE9nt:");
    i020.\u0275\u0275elementEnd();
    i020.\u0275\u0275elementStart(3, "span");
    i020.\u0275\u0275text(4);
    i020.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = i020.\u0275\u0275nextContext(2);
    i020.\u0275\u0275advance(4);
    i020.\u0275\u0275textInterpolate1(" ", ctx_r0.error);
  }
}
function TopRatedMovies_ng_container_8_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    i020.\u0275\u0275elementStart(0, "div", 12);
    i020.\u0275\u0275element(1, "div", 13);
    i020.\u0275\u0275elementStart(2, "p");
    i020.\u0275\u0275text(3, "Lista bet\xF6lt\xE9se...");
    i020.\u0275\u0275elementEnd()();
  }
}
function TopRatedMovies_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    i020.\u0275\u0275elementContainerStart(0);
    i020.\u0275\u0275template(1, TopRatedMovies_ng_container_8_div_1_Template, 5, 1, "div", 10)(2, TopRatedMovies_ng_container_8_ng_template_2_Template, 4, 0, "ng-template", null, 1, i020.\u0275\u0275templateRefExtractor);
    i020.\u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const loading_r2 = i020.\u0275\u0275reference(3);
    const ctx_r0 = i020.\u0275\u0275nextContext();
    i020.\u0275\u0275advance();
    i020.\u0275\u0275property("ngIf", ctx_r0.error)("ngIfElse", loading_r2);
  }
}
function TopRatedMovies_ng_template_9_div_0_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    i020.\u0275\u0275elementStart(0, "div", 31);
    i020.\u0275\u0275text(1);
    i020.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r3 = i020.\u0275\u0275nextContext().index;
    i020.\u0275\u0275classProp("gold", i_r3 === 0)("silver", i_r3 === 1)("bronze", i_r3 === 2);
    i020.\u0275\u0275advance();
    i020.\u0275\u0275textInterpolate1(" #", i_r3 + 1, " ");
  }
}
function TopRatedMovies_ng_template_9_div_0_div_1_span_9_Template(rf, ctx) {
  if (rf & 1) {
    i020.\u0275\u0275elementStart(0, "span", 32);
    i020.\u0275\u0275text(1);
    i020.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const genre_r4 = ctx.$implicit;
    i020.\u0275\u0275advance();
    i020.\u0275\u0275textInterpolate(genre_r4);
  }
}
function TopRatedMovies_ng_template_9_div_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    i020.\u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    i020.\u0275\u0275element(2, "img", 19)(3, "div", 20);
    i020.\u0275\u0275template(4, TopRatedMovies_ng_template_9_div_0_div_1_div_4_Template, 2, 7, "div", 21);
    i020.\u0275\u0275elementEnd();
    i020.\u0275\u0275elementStart(5, "div", 22)(6, "h3", 23);
    i020.\u0275\u0275text(7);
    i020.\u0275\u0275elementEnd();
    i020.\u0275\u0275elementStart(8, "div", 24);
    i020.\u0275\u0275template(9, TopRatedMovies_ng_template_9_div_0_div_1_span_9_Template, 2, 1, "span", 25);
    i020.\u0275\u0275elementEnd();
    i020.\u0275\u0275element(10, "div", 26);
    i020.\u0275\u0275elementStart(11, "div", 27)(12, "span", 28);
    i020.\u0275\u0275text(13, "\u2B50");
    i020.\u0275\u0275elementEnd();
    i020.\u0275\u0275elementStart(14, "span", 29);
    i020.\u0275\u0275text(15);
    i020.\u0275\u0275pipe(16, "number");
    i020.\u0275\u0275elementEnd();
    i020.\u0275\u0275elementStart(17, "span", 30);
    i020.\u0275\u0275text(18, "/10");
    i020.\u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const movie_r5 = ctx.$implicit;
    const i_r3 = ctx.index;
    i020.\u0275\u0275advance(2);
    i020.\u0275\u0275property("src", movie_r5.posterUrl, i020.\u0275\u0275sanitizeUrl)("alt", movie_r5.title);
    i020.\u0275\u0275advance(2);
    i020.\u0275\u0275property("ngIf", i_r3 < 3);
    i020.\u0275\u0275advance(2);
    i020.\u0275\u0275property("title", movie_r5.title);
    i020.\u0275\u0275advance();
    i020.\u0275\u0275textInterpolate(movie_r5.title);
    i020.\u0275\u0275advance(2);
    i020.\u0275\u0275property("ngForOf", movie_r5.genres);
    i020.\u0275\u0275advance(6);
    i020.\u0275\u0275textInterpolate(i020.\u0275\u0275pipeBind2(16, 7, movie_r5.averageRating, "1.1-1"));
  }
}
function TopRatedMovies_ng_template_9_div_0_Template(rf, ctx) {
  if (rf & 1) {
    i020.\u0275\u0275elementStart(0, "div", 15);
    i020.\u0275\u0275template(1, TopRatedMovies_ng_template_9_div_0_div_1_Template, 19, 10, "div", 16);
    i020.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i020.\u0275\u0275nextContext(2);
    i020.\u0275\u0275advance();
    i020.\u0275\u0275property("ngForOf", ctx_r0.movies);
  }
}
function TopRatedMovies_ng_template_9_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    i020.\u0275\u0275elementStart(0, "div", 33)(1, "div", 34);
    i020.\u0275\u0275text(2, "\u{1F3C6}");
    i020.\u0275\u0275elementEnd();
    i020.\u0275\u0275elementStart(3, "p");
    i020.\u0275\u0275text(4, "Nincs megjelen\xEDthet\u0151 toplista.");
    i020.\u0275\u0275elementEnd()();
  }
}
function TopRatedMovies_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    i020.\u0275\u0275template(0, TopRatedMovies_ng_template_9_div_0_Template, 2, 1, "div", 14)(1, TopRatedMovies_ng_template_9_ng_template_1_Template, 5, 0, "ng-template", null, 2, i020.\u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const empty_r6 = i020.\u0275\u0275reference(2);
    const ctx_r0 = i020.\u0275\u0275nextContext();
    i020.\u0275\u0275property("ngIf", ctx_r0.movies.length > 0)("ngIfElse", empty_r6);
  }
}
var TopRatedMovies = class _TopRatedMovies {
  movieService;
  movies = [];
  loading = true;
  error = "";
  constructor(movieService) {
    this.movieService = movieService;
  }
  ngOnInit() {
    this.movieService.getTopRated(10).subscribe({
      next: (data) => {
        this.movies = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Hopp\xE1, nem siker\xFClt bet\xF6lteni a toplist\xE1t.";
        this.loading = false;
      }
    });
  }
  static \u0275fac = function TopRatedMovies_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TopRatedMovies)(i020.\u0275\u0275directiveInject(StatisticsService));
  };
  static \u0275cmp = /* @__PURE__ */ i020.\u0275\u0275defineComponent({ type: _TopRatedMovies, selectors: [["app-top-rated-movies"]], decls: 11, vars: 2, consts: [["content", ""], ["loading", ""], ["empty", ""], [1, "page-container"], [1, "content-wrapper"], [1, "page-header"], [1, "title"], [1, "decoration-line"], [1, "subtitle"], [4, "ngIf", "ngIfElse"], ["class", "message-box error", 4, "ngIf", "ngIfElse"], [1, "message-box", "error"], [1, "message-box", "loading"], [1, "loader"], ["class", "media-grid", 4, "ngIf", "ngIfElse"], [1, "media-grid"], ["class", "media-card", 4, "ngFor", "ngForOf"], [1, "media-card"], [1, "poster-wrapper"], ["onerror", "this.src='https://placehold.co/400x600/0f1623/ffffff?text=No+Cover'", 1, "poster-image", 3, "src", "alt"], [1, "poster-overlay"], ["class", "rank-badge", 3, "gold", "silver", "bronze", 4, "ngIf"], [1, "card-body"], [1, "media-title", 3, "title"], [1, "tags-container"], ["class", "tag", 4, "ngFor", "ngForOf"], [1, "spacer"], [1, "rating-badge"], [1, "star"], [1, "score"], [1, "max"], [1, "rank-badge"], [1, "tag"], [1, "empty-state"], [1, "empty-icon"]], template: function TopRatedMovies_Template(rf, ctx) {
    if (rf & 1) {
      i020.\u0275\u0275elementStart(0, "div", 3)(1, "main", 4)(2, "header", 5)(3, "h1", 6);
      i020.\u0275\u0275text(4, "Top Rated Movies");
      i020.\u0275\u0275elementEnd();
      i020.\u0275\u0275element(5, "div", 7);
      i020.\u0275\u0275elementStart(6, "p", 8);
      i020.\u0275\u0275text(7, "A k\xF6z\xF6ss\xE9g legjobbra \xE9rt\xE9kelt filmjei");
      i020.\u0275\u0275elementEnd()();
      i020.\u0275\u0275template(8, TopRatedMovies_ng_container_8_Template, 4, 2, "ng-container", 9)(9, TopRatedMovies_ng_template_9_Template, 3, 2, "ng-template", null, 0, i020.\u0275\u0275templateRefExtractor);
      i020.\u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const content_r7 = i020.\u0275\u0275reference(10);
      i020.\u0275\u0275advance(8);
      i020.\u0275\u0275property("ngIf", ctx.loading || ctx.error)("ngIfElse", content_r7);
    }
  }, dependencies: [CommonModule11, i25.NgClass, i25.NgComponentOutlet, i25.NgForOf, i25.NgIf, i25.NgTemplateOutlet, i25.NgStyle, i25.NgSwitch, i25.NgSwitchCase, i25.NgSwitchDefault, i25.NgPlural, i25.NgPluralCase, FormsModule7, i37.\u0275NgNoValidate, i37.NgSelectOption, i37.\u0275NgSelectMultipleOption, i37.DefaultValueAccessor, i37.NumberValueAccessor, i37.RangeValueAccessor, i37.CheckboxControlValueAccessor, i37.SelectControlValueAccessor, i37.SelectMultipleControlValueAccessor, i37.RadioControlValueAccessor, i37.NgControlStatus, i37.NgControlStatusGroup, i37.RequiredValidator, i37.MinLengthValidator, i37.MaxLengthValidator, i37.PatternValidator, i37.CheckboxRequiredValidator, i37.EmailValidator, i37.MinValidator, i37.MaxValidator, i37.NgModel, i37.NgModelGroup, i37.NgForm, i25.AsyncPipe, i25.UpperCasePipe, i25.LowerCasePipe, i25.JsonPipe, i25.SlicePipe, i25.DecimalPipe, i25.PercentPipe, i25.TitleCasePipe, i25.CurrencyPipe, i25.DatePipe, i25.I18nPluralPipe, i25.I18nSelectPipe, i25.KeyValuePipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  --primary: #ffd700;\n  --secondary: #00f0ff;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --card-radius: 12px;\n}\n.page-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  background-image:\n    radial-gradient(\n      circle at 50% 0%,\n      #1a1805 0%,\n      var(--bg-dark) 80%);\n  color: var(--text-main);\n  font-family:\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n}\n.content-wrapper[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n  text-align: center;\n  animation: _ngcontent-%COMP%_fadeInDown 0.6s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      #fff,\n      var(--primary));\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  text-shadow: 0 0 30px rgba(255, 215, 0, 0.3);\n}\n.decoration-line[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 4px;\n  background: var(--primary);\n  margin: 0.5rem auto 1rem auto;\n  box-shadow: 0 0 15px var(--primary);\n  border-radius: 2px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 1.1rem;\n}\n.media-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 2rem;\n  animation: _ngcontent-%COMP%_fadeInUp 0.8s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.media-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(255, 215, 0, 0.1);\n  border-radius: var(--card-radius);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition:\n    transform 0.3s,\n    box-shadow 0.3s,\n    border-color 0.3s;\n  position: relative;\n  height: 100%;\n}\n.media-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 15px 40px rgba(255, 215, 0, 0.15);\n  border-color: rgba(255, 215, 0, 0.4);\n}\n.poster-wrapper[_ngcontent-%COMP%] {\n  height: 380px;\n  position: relative;\n  overflow: hidden;\n}\n.poster-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.5s;\n}\n.media-card[_ngcontent-%COMP%]:hover   .poster-image[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n}\n.poster-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background:\n    linear-gradient(\n      to top,\n      var(--bg-card) 0%,\n      transparent 50%);\n}\n.rank-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.7);\n  color: #fff;\n  font-weight: 900;\n  font-size: 1.1rem;\n  border-radius: 50%;\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);\n  z-index: 2;\n}\n.rank-badge.gold[_ngcontent-%COMP%] {\n  background: #ffd700;\n  color: #000;\n  border-color: #ffd700;\n  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);\n}\n.rank-badge.silver[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #000;\n  border-color: #e2e8f0;\n  box-shadow: 0 0 15px rgba(226, 232, 240, 0.5);\n}\n.rank-badge.bronze[_ngcontent-%COMP%] {\n  background: #cd7f32;\n  color: #000;\n  border-color: #cd7f32;\n  box-shadow: 0 0 15px rgba(205, 127, 50, 0.5);\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n.media-title[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  margin: 0 0 0.5rem 0;\n  color: #fff;\n  line-height: 1.2;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.tags-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.tag[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  padding: 4px 8px;\n  border-radius: 4px;\n  background: rgba(255, 215, 0, 0.1);\n  color: var(--primary);\n  border: 1px solid rgba(255, 215, 0, 0.2);\n  font-weight: 600;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.rating-badge[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  margin-top: auto;\n}\n.star[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.score[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 800;\n  color: var(--primary);\n}\n.max[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 0.9rem;\n  margin-top: 4px;\n}\n.empty-state[_ngcontent-%COMP%], \n.message-box[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-muted);\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n.error[_ngcontent-%COMP%] {\n  color: #ff8fa3;\n  border: 1px solid #ff003c;\n  background: rgba(255, 0, 60, 0.1);\n  border-radius: 8px;\n}\n.loader[_ngcontent-%COMP%] {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=top-rated-movies.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i020.\u0275setClassMetadata(TopRatedMovies, [{
    type: Component11,
    args: [{ selector: "app-top-rated-movies", standalone: true, imports: [CommonModule11, FormsModule7], template: `<div class="page-container">\r
  <main class="content-wrapper">\r
    \r
    <!-- Header -->\r
    <header class="page-header">\r
      <h1 class="title">Top Rated Movies</h1>\r
      <div class="decoration-line"></div>\r
      <p class="subtitle">A k\xF6z\xF6ss\xE9g legjobbra \xE9rt\xE9kelt filmjei</p>\r
    </header>\r
\r
    <!-- Loading & Error -->\r
    <ng-container *ngIf="loading || error; else content">\r
      <div *ngIf="error; else loading" class="message-box error">\r
        <strong>Hiba t\xF6rt\xE9nt:</strong> <span> {{ error }}</span>\r
      </div>\r
      <ng-template #loading>\r
        <div class="message-box loading">\r
          <div class="loader"></div>\r
          <p>Lista bet\xF6lt\xE9se...</p>\r
        </div>\r
      </ng-template>\r
    </ng-container>\r
\r
    <!-- Content Grid -->\r
    <ng-template #content>\r
      \r
      <div class="media-grid" *ngIf="movies.length > 0; else empty">\r
        <div class="media-card" *ngFor="let movie of movies; let i = index">\r
          \r
          <!-- Poster -->\r
          <div class="poster-wrapper">\r
            <img \r
              [src]="movie.posterUrl" \r
              [alt]="movie.title" \r
              class="poster-image"\r
              onerror="this.src='https://placehold.co/400x600/0f1623/ffffff?text=No+Cover'"\r
            />\r
            <div class="poster-overlay"></div>\r
            \r
            <!-- Top 3 Badge -->\r
            <div *ngIf="i < 3" class="rank-badge" [class.gold]="i===0" [class.silver]="i===1" [class.bronze]="i===2">\r
              #{{ i + 1 }}\r
            </div>\r
          </div>\r
\r
          <!-- Card Body -->\r
          <div class="card-body">\r
            <h3 class="media-title" [title]="movie.title">{{ movie.title }}</h3>\r
            \r
            <!-- Genres (Tag-k\xE9nt jelen\xEDtj\xFCk meg) -->\r
            <div class="tags-container">\r
              <span class="tag" *ngFor="let genre of movie.genres">{{ genre }}</span>\r
            </div>\r
\r
            <div class="spacer"></div>\r
\r
            <!-- Rating -->\r
            <div class="rating-badge">\r
              <span class="star">\u2B50</span> \r
              <span class="score">{{ movie.averageRating | number:'1.1-1' }}</span>\r
              <span class="max">/10</span>\r
            </div>\r
          </div>\r
\r
        </div>\r
      </div>\r
\r
      <ng-template #empty>\r
        <div class="empty-state">\r
          <div class="empty-icon">\u{1F3C6}</div>\r
          <p>Nincs megjelen\xEDthet\u0151 toplista.</p>\r
        </div>\r
      </ng-template>\r
\r
    </ng-template>\r
\r
  </main>\r
</div>`, styles: ['/* src/app/features/statistics-pages/top-rated/top-rated-movies.css */\n:host {\n  display: block;\n  --primary: #ffd700;\n  --secondary: #00f0ff;\n  --bg-dark: #050b14;\n  --bg-card: #0f1623;\n  --text-main: #ffffff;\n  --text-muted: #94a3b8;\n  --card-radius: 12px;\n}\n.page-container {\n  min-height: 100vh;\n  background-color: var(--bg-dark);\n  background-image:\n    radial-gradient(\n      circle at 50% 0%,\n      #1a1805 0%,\n      var(--bg-dark) 80%);\n  color: var(--text-main);\n  font-family:\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n}\n.content-wrapper {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.page-header {\n  margin-bottom: 3rem;\n  text-align: center;\n  animation: fadeInDown 0.6s ease;\n}\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.title {\n  font-size: 3rem;\n  font-weight: 900;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  margin: 0;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      #fff,\n      var(--primary));\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  text-shadow: 0 0 30px rgba(255, 215, 0, 0.3);\n}\n.decoration-line {\n  width: 100px;\n  height: 4px;\n  background: var(--primary);\n  margin: 0.5rem auto 1rem auto;\n  box-shadow: 0 0 15px var(--primary);\n  border-radius: 2px;\n}\n.subtitle {\n  color: var(--text-muted);\n  font-size: 1.1rem;\n}\n.media-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 2rem;\n  animation: fadeInUp 0.8s ease;\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.media-card {\n  background-color: var(--bg-card);\n  border: 1px solid rgba(255, 215, 0, 0.1);\n  border-radius: var(--card-radius);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transition:\n    transform 0.3s,\n    box-shadow 0.3s,\n    border-color 0.3s;\n  position: relative;\n  height: 100%;\n}\n.media-card:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 15px 40px rgba(255, 215, 0, 0.15);\n  border-color: rgba(255, 215, 0, 0.4);\n}\n.poster-wrapper {\n  height: 380px;\n  position: relative;\n  overflow: hidden;\n}\n.poster-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.5s;\n}\n.media-card:hover .poster-image {\n  transform: scale(1.05);\n}\n.poster-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background:\n    linear-gradient(\n      to top,\n      var(--bg-card) 0%,\n      transparent 50%);\n}\n.rank-badge {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.7);\n  color: #fff;\n  font-weight: 900;\n  font-size: 1.1rem;\n  border-radius: 50%;\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);\n  z-index: 2;\n}\n.rank-badge.gold {\n  background: #ffd700;\n  color: #000;\n  border-color: #ffd700;\n  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);\n}\n.rank-badge.silver {\n  background: #e2e8f0;\n  color: #000;\n  border-color: #e2e8f0;\n  box-shadow: 0 0 15px rgba(226, 232, 240, 0.5);\n}\n.rank-badge.bronze {\n  background: #cd7f32;\n  color: #000;\n  border-color: #cd7f32;\n  box-shadow: 0 0 15px rgba(205, 127, 50, 0.5);\n}\n.card-body {\n  padding: 1.5rem;\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n}\n.media-title {\n  font-size: 1.3rem;\n  margin: 0 0 0.5rem 0;\n  color: #fff;\n  line-height: 1.2;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.tags-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.tag {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  padding: 4px 8px;\n  border-radius: 4px;\n  background: rgba(255, 215, 0, 0.1);\n  color: var(--primary);\n  border: 1px solid rgba(255, 215, 0, 0.2);\n  font-weight: 600;\n}\n.spacer {\n  flex-grow: 1;\n}\n.rating-badge {\n  background: rgba(255, 255, 255, 0.05);\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  margin-top: auto;\n}\n.star {\n  font-size: 1.2rem;\n}\n.score {\n  font-size: 1.5rem;\n  font-weight: 800;\n  color: var(--primary);\n}\n.max {\n  color: var(--text-muted);\n  font-size: 0.9rem;\n  margin-top: 4px;\n}\n.empty-state,\n.message-box {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-muted);\n}\n.empty-icon {\n  font-size: 4rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n.error {\n  color: #ff8fa3;\n  border: 1px solid #ff003c;\n  background: rgba(255, 0, 60, 0.1);\n  border-radius: 8px;\n}\n.loader {\n  border: 3px solid rgba(255, 255, 255, 0.1);\n  border-top: 3px solid var(--primary);\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin: 0 auto 1rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=top-rated-movies.css.map */\n'] }]
  }], () => [{ type: StatisticsService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i020.\u0275setClassDebugInfo(TopRatedMovies, { className: "TopRatedMovies", filePath: "src/app/features/statistics-pages/top-rated/top-rated-movies.ts", lineNumber: 14 });
})();
(() => {
  const id = "src%2Fapp%2Ffeatures%2Fstatistics-pages%2Ftop-rated%2Ftop-rated-movies.ts%40TopRatedMovies";
  function TopRatedMovies_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i020.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i020.\u0275\u0275replaceMetadata(TopRatedMovies, m.default, [i020, i25, i37, statistics_service_exports], [CommonModule11, FormsModule7, Component11], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && TopRatedMovies_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && TopRatedMovies_HmrLoad(d.timestamp)));
})();

// src/app/app.routes.ts
var routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
    canActivate: [roleGuard("Admin")]
  },
  { path: "top-rated", component: TopRatedMovies },
  {
    path: "user-dashboard",
    component: UserDashboardComponent,
    canActivate: [roleGuard("User")]
  },
  {
    path: "favorites",
    component: UserFavoritesComponent,
    canActivate: [roleGuard("User")]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [roleGuard("User")]
  },
  {
    path: "recommendations",
    component: RecommendationsComponent,
    canActivate: [roleGuard("User")]
  },
  {
    path: "manage-movies",
    component: ManageMoviesComponent,
    canActivate: [roleGuard("Admin")]
  },
  {
    path: "manage-users",
    component: ManageUsersComponent,
    canActivate: [roleGuard("Admin")]
  },
  {
    path: "leaderboard",
    component: LeaderboardComponent,
    canActivate: [roleGuard("User")]
  },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "login" }
];

// src/app/app.config.ts
import { provideHttpClient, withInterceptors } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common_http.js?v=3f3fab55";

// src/app/core/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const isAuthEndpoint = req.url.includes("/auth/login") || req.url.includes("/auth/register");
  if (isAuthEndpoint) {
    return next(req);
  }
  const token = localStorage.getItem("token");
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      authInterceptor
    ]))
  ]
};

// src/app/app.ts
import { Component as Component13, signal } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { RouterOutlet as RouterOutlet7 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";

// src/app/shared/navbar/navbar.component.ts
import { Component as Component12 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import { CommonModule as CommonModule12 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
import { RouterModule as RouterModule6 } from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i021 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
import * as i26 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_router.js?v=3f3fab55";
import * as i38 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_common.js?v=3f3fab55";
function NavbarComponent_nav_0_div_7_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = i021.\u0275\u0275getCurrentView();
    i021.\u0275\u0275elementStart(0, "button", 11);
    i021.\u0275\u0275listener("click", function NavbarComponent_nav_0_div_7_button_13_Template_button_click_0_listener() {
      i021.\u0275\u0275restoreView(_r4);
      const ctx_r2 = i021.\u0275\u0275nextContext(3);
      return i021.\u0275\u0275resetView(ctx_r2.goToFavorites());
    });
    i021.\u0275\u0275elementStart(1, "span", 12);
    i021.\u0275\u0275text(2, "\u2665");
    i021.\u0275\u0275elementEnd();
    i021.\u0275\u0275text(3, " Kedvencek ");
    i021.\u0275\u0275elementEnd();
  }
}
function NavbarComponent_nav_0_div_7_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = i021.\u0275\u0275getCurrentView();
    i021.\u0275\u0275elementStart(0, "button", 11);
    i021.\u0275\u0275listener("click", function NavbarComponent_nav_0_div_7_button_14_Template_button_click_0_listener() {
      i021.\u0275\u0275restoreView(_r5);
      const ctx_r2 = i021.\u0275\u0275nextContext(3);
      return i021.\u0275\u0275resetView(ctx_r2.goToTopRated());
    });
    i021.\u0275\u0275elementStart(1, "span", 12);
    i021.\u0275\u0275text(2, "\u2B50");
    i021.\u0275\u0275elementEnd();
    i021.\u0275\u0275text(3, " Legjobbak ");
    i021.\u0275\u0275elementEnd();
  }
}
function NavbarComponent_nav_0_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = i021.\u0275\u0275getCurrentView();
    i021.\u0275\u0275elementStart(0, "div", 10)(1, "button", 11);
    i021.\u0275\u0275listener("click", function NavbarComponent_nav_0_div_7_Template_button_click_1_listener() {
      i021.\u0275\u0275restoreView(_r2);
      const ctx_r2 = i021.\u0275\u0275nextContext(2);
      return i021.\u0275\u0275resetView(ctx_r2.goToMovies());
    });
    i021.\u0275\u0275elementStart(2, "span", 12);
    i021.\u0275\u0275text(3, "\u{1F3AC}");
    i021.\u0275\u0275elementEnd();
    i021.\u0275\u0275text(4, " Filmek ");
    i021.\u0275\u0275elementEnd();
    i021.\u0275\u0275elementStart(5, "button", 11);
    i021.\u0275\u0275listener("click", function NavbarComponent_nav_0_div_7_Template_button_click_5_listener() {
      i021.\u0275\u0275restoreView(_r2);
      const ctx_r2 = i021.\u0275\u0275nextContext(2);
      return i021.\u0275\u0275resetView(ctx_r2.goToRecommendations());
    });
    i021.\u0275\u0275elementStart(6, "span", 12);
    i021.\u0275\u0275text(7, "\u2728");
    i021.\u0275\u0275elementEnd();
    i021.\u0275\u0275text(8, " Aj\xE1nlottak ");
    i021.\u0275\u0275elementEnd();
    i021.\u0275\u0275elementStart(9, "button", 11);
    i021.\u0275\u0275listener("click", function NavbarComponent_nav_0_div_7_Template_button_click_9_listener() {
      i021.\u0275\u0275restoreView(_r2);
      const ctx_r2 = i021.\u0275\u0275nextContext(2);
      return i021.\u0275\u0275resetView(ctx_r2.goToLeaderboard());
    });
    i021.\u0275\u0275elementStart(10, "span", 12);
    i021.\u0275\u0275text(11, "\u{1F3C6}");
    i021.\u0275\u0275elementEnd();
    i021.\u0275\u0275text(12, " Ranglista ");
    i021.\u0275\u0275elementEnd();
    i021.\u0275\u0275template(13, NavbarComponent_nav_0_div_7_button_13_Template, 4, 0, "button", 13)(14, NavbarComponent_nav_0_div_7_button_14_Template, 4, 0, "button", 13);
    i021.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = i021.\u0275\u0275nextContext(2);
    i021.\u0275\u0275advance(13);
    i021.\u0275\u0275property("ngIf", ctx_r2.role === "User");
    i021.\u0275\u0275advance();
    i021.\u0275\u0275property("ngIf", ctx_r2.role === "User");
  }
}
function NavbarComponent_nav_0_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = i021.\u0275\u0275getCurrentView();
    i021.\u0275\u0275elementStart(0, "button", 14);
    i021.\u0275\u0275listener("click", function NavbarComponent_nav_0_button_9_Template_button_click_0_listener() {
      i021.\u0275\u0275restoreView(_r6);
      const ctx_r2 = i021.\u0275\u0275nextContext(2);
      return i021.\u0275\u0275resetView(ctx_r2.goToProfile());
    });
    i021.\u0275\u0275elementStart(1, "span", 12);
    i021.\u0275\u0275text(2, "\u{1F464}");
    i021.\u0275\u0275elementEnd();
    i021.\u0275\u0275text(3, " Profil ");
    i021.\u0275\u0275elementEnd();
  }
}
function NavbarComponent_nav_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = i021.\u0275\u0275getCurrentView();
    i021.\u0275\u0275elementStart(0, "nav", 1)(1, "div", 2)(2, "div", 3)(3, "span", 4);
    i021.\u0275\u0275text(4, "MOVIE");
    i021.\u0275\u0275elementStart(5, "span", 5);
    i021.\u0275\u0275text(6, "APP");
    i021.\u0275\u0275elementEnd()()();
    i021.\u0275\u0275template(7, NavbarComponent_nav_0_div_7_Template, 15, 2, "div", 6);
    i021.\u0275\u0275elementStart(8, "div", 7);
    i021.\u0275\u0275template(9, NavbarComponent_nav_0_button_9_Template, 4, 0, "button", 8);
    i021.\u0275\u0275elementStart(10, "button", 9);
    i021.\u0275\u0275listener("click", function NavbarComponent_nav_0_Template_button_click_10_listener() {
      i021.\u0275\u0275restoreView(_r1);
      const ctx_r2 = i021.\u0275\u0275nextContext();
      return i021.\u0275\u0275resetView(ctx_r2.logout());
    });
    i021.\u0275\u0275text(11, " Kijelentkez\xE9s ");
    i021.\u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = i021.\u0275\u0275nextContext();
    i021.\u0275\u0275advance(7);
    i021.\u0275\u0275property("ngIf", ctx_r2.showUserNav);
    i021.\u0275\u0275advance(2);
    i021.\u0275\u0275property("ngIf", ctx_r2.showUserNav);
  }
}
var NavbarComponent = class _NavbarComponent {
  authService;
  router;
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  get role() {
    return this.authService.role;
  }
  get showUserNav() {
    const onAdminDashboard = this.router.url.startsWith("/admin-dashboard") || this.router.url.startsWith("/manage-movies") || this.router.url.startsWith("/manage-users");
    return !(this.role === "Admin" && onAdminDashboard);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  goToMovies() {
    this.router.navigate(["/user-dashboard"]);
  }
  goToProfile() {
    this.router.navigate(["/profile"]);
  }
  goToFavorites() {
    this.router.navigate(["/favorites"]);
  }
  goToRecommendations() {
    this.router.navigate(["/recommendations"]);
  }
  goToLeaderboard() {
    this.router.navigate(["/leaderboard"]);
  }
  goToTopRated() {
    this.router.navigate(["/top-rated"]);
  }
  static \u0275fac = function NavbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NavbarComponent)(i021.\u0275\u0275directiveInject(AuthService), i021.\u0275\u0275directiveInject(i26.Router));
  };
  static \u0275cmp = /* @__PURE__ */ i021.\u0275\u0275defineComponent({ type: _NavbarComponent, selectors: [["app-navbar"]], decls: 1, vars: 1, consts: [["class", "navbar", 4, "ngIf"], [1, "navbar"], [1, "nav-container"], [1, "nav-brand"], [1, "brand-text"], [1, "highlight"], ["class", "nav-links", 4, "ngIf"], [1, "nav-actions"], ["class", "nav-item profile-btn", "routerLinkActive", "active", 3, "click", 4, "ngIf"], [1, "btn-logout", 3, "click"], [1, "nav-links"], ["routerLinkActive", "active", 1, "nav-item", 3, "click"], [1, "icon"], ["class", "nav-item", "routerLinkActive", "active", 3, "click", 4, "ngIf"], ["routerLinkActive", "active", 1, "nav-item", "profile-btn", 3, "click"]], template: function NavbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      i021.\u0275\u0275template(0, NavbarComponent_nav_0_Template, 12, 2, "nav", 0);
    }
    if (rf & 2) {
      i021.\u0275\u0275property("ngIf", ctx.isLoggedIn);
    }
  }, dependencies: [CommonModule12, i38.NgClass, i38.NgComponentOutlet, i38.NgForOf, i38.NgIf, i38.NgTemplateOutlet, i38.NgStyle, i38.NgSwitch, i38.NgSwitchCase, i38.NgSwitchDefault, i38.NgPlural, i38.NgPluralCase, RouterModule6, i26.RouterOutlet, i26.RouterLink, i26.RouterLinkActive, i26.\u0275EmptyOutletComponent, i38.AsyncPipe, i38.UpperCasePipe, i38.LowerCasePipe, i38.JsonPipe, i38.SlicePipe, i38.DecimalPipe, i38.PercentPipe, i38.TitleCasePipe, i38.CurrencyPipe, i38.DatePipe, i38.I18nPluralPipe, i38.I18nSelectPipe, i38.KeyValuePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  --nav-bg: rgba(5, 11, 20, 0.95);\n  --primary: #00f0ff;\n  --text-main: #fff;\n  --text-muted: #94a3b8;\n  --border-color: rgba(255, 255, 255, 0.1);\n}\n.navbar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background-color: var(--nav-bg);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border-bottom: 1px solid var(--border-color);\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);\n}\n.nav-container[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 0.75rem 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.brand-text[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 900;\n  letter-spacing: 1px;\n  color: #fff;\n}\n.highlight[_ngcontent-%COMP%] {\n  color: var(--primary);\n}\n.nav-links[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n}\n.nav-item[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--text-muted);\n  font-size: 0.95rem;\n  font-weight: 600;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.nav-item[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background: rgba(255, 255, 255, 0.05);\n  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  color: var(--primary);\n  background: rgba(0, 240, 255, 0.1);\n  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);\n}\n.nav-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.btn-logout[_ngcontent-%COMP%] {\n  background: rgba(255, 0, 60, 0.1);\n  border: 1px solid rgba(255, 0, 60, 0.3);\n  color: #ff003c;\n  padding: 0.5rem 1.2rem;\n  border-radius: 6px;\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-logout[_ngcontent-%COMP%]:hover {\n  background: #ff003c;\n  color: #fff;\n  box-shadow: 0 0 15px #ff003c;\n}\n@media (max-width: 768px) {\n  .nav-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    padding: 1rem;\n  }\n  .nav-links[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 0.5rem;\n  }\n  .brand-text[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=navbar.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i021.\u0275setClassMetadata(NavbarComponent, [{
    type: Component12,
    args: [{ selector: "app-navbar", standalone: true, imports: [CommonModule12, RouterModule6], template: `<nav *ngIf="isLoggedIn" class="navbar">\r
  <div class="nav-container">\r
\r
    <div class="nav-brand">\r
      <span class="brand-text">MOVIE<span class="highlight">APP</span></span>\r
    </div>\r
\r
    <div class="nav-links" *ngIf="showUserNav">\r
      <button class="nav-item" (click)="goToMovies()" routerLinkActive="active">\r
        <span class="icon">\u{1F3AC}</span> Filmek\r
      </button>\r
\r
      <button class="nav-item" (click)="goToRecommendations()" routerLinkActive="active">\r
        <span class="icon">\u2728</span> Aj\xE1nlottak\r
      </button>\r
\r
      <button class="nav-item" (click)="goToLeaderboard()" routerLinkActive="active">\r
        <span class="icon">\u{1F3C6}</span> Ranglista\r
      </button>\r
\r
      <button *ngIf="role === 'User'" class="nav-item" (click)="goToFavorites()" routerLinkActive="active">\r
        <span class="icon">\u2665</span> Kedvencek\r
      </button>\r
\r
      <button *ngIf="role === 'User'" class="nav-item" (click)="goToTopRated()" routerLinkActive="active">\r
        <span class="icon">\u2B50</span> Legjobbak\r
      </button>\r
    </div>\r
\r
    <div class="nav-actions">\r
      <button\r
        class="nav-item profile-btn"\r
        *ngIf="showUserNav"\r
        (click)="goToProfile()"\r
        routerLinkActive="active">\r
        <span class="icon">\u{1F464}</span> Profil\r
      </button>\r
\r
      <button class="btn-logout" (click)="logout()">\r
        Kijelentkez\xE9s\r
      </button>\r
    </div>\r
\r
  </div>\r
</nav>\r
`, styles: ["/* src/app/shared/navbar/navbar.component.css */\n:host {\n  display: block;\n  --nav-bg: rgba(5, 11, 20, 0.95);\n  --primary: #00f0ff;\n  --text-main: #fff;\n  --text-muted: #94a3b8;\n  --border-color: rgba(255, 255, 255, 0.1);\n}\n.navbar {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background-color: var(--nav-bg);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border-bottom: 1px solid var(--border-color);\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);\n}\n.nav-container {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 0.75rem 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.brand-text {\n  font-size: 1.5rem;\n  font-weight: 900;\n  letter-spacing: 1px;\n  color: #fff;\n}\n.highlight {\n  color: var(--primary);\n}\n.nav-links {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n}\n.nav-item {\n  background: transparent;\n  border: none;\n  color: var(--text-muted);\n  font-size: 0.95rem;\n  font-weight: 600;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.nav-item .icon {\n  font-size: 1.1rem;\n}\n.nav-item:hover {\n  color: #fff;\n  background: rgba(255, 255, 255, 0.05);\n  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);\n}\n.nav-item.active {\n  color: var(--primary);\n  background: rgba(0, 240, 255, 0.1);\n  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);\n}\n.nav-actions {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.btn-logout {\n  background: rgba(255, 0, 60, 0.1);\n  border: 1px solid rgba(255, 0, 60, 0.3);\n  color: #ff003c;\n  padding: 0.5rem 1.2rem;\n  border-radius: 6px;\n  font-weight: 700;\n  text-transform: uppercase;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-logout:hover {\n  background: #ff003c;\n  color: #fff;\n  box-shadow: 0 0 15px #ff003c;\n}\n@media (max-width: 768px) {\n  .nav-container {\n    flex-direction: column;\n    gap: 1rem;\n    padding: 1rem;\n  }\n  .nav-links {\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 0.5rem;\n  }\n  .brand-text {\n    display: none;\n  }\n}\n/*# sourceMappingURL=navbar.component.css.map */\n"] }]
  }], () => [{ type: AuthService }, { type: i26.Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i021.\u0275setClassDebugInfo(NavbarComponent, { className: "NavbarComponent", filePath: "src/app/shared/navbar/navbar.component.ts", lineNumber: 13 });
})();
(() => {
  const id = "src%2Fapp%2Fshared%2Fnavbar%2Fnavbar.component.ts%40NavbarComponent";
  function NavbarComponent_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i021.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i021.\u0275\u0275replaceMetadata(NavbarComponent, m.default, [i021, i38, i26, auth_service_exports], [CommonModule12, RouterModule6, Component12], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && NavbarComponent_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && NavbarComponent_HmrLoad(d.timestamp)));
})();

// src/app/app.ts
import * as i022 from "/@fs/C:/Users/Máté/Desktop/code/MovieAppFrontend/MovieApp-frontend/.angular/cache/20.3.13/movieapp-frontend/vite/deps/@angular_core.js?v=3f3fab55";
var App = class _App {
  title = signal("movieapp-frontend", ...ngDevMode ? [{ debugName: "title" }] : []);
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ i022.\u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 2, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      i022.\u0275\u0275element(0, "app-navbar")(1, "router-outlet");
    }
  }, dependencies: [RouterOutlet7, NavbarComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i022.\u0275setClassMetadata(App, [{
    type: Component13,
    args: [{ selector: "app-root", standalone: true, imports: [RouterOutlet7, NavbarComponent], template: "<app-navbar></app-navbar>\r\n<router-outlet></router-outlet>" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i022.\u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 12 });
})();
(() => {
  const id = "src%2Fapp%2Fapp.ts%40App";
  function App_HmrLoad(t) {
    import(
      /* @vite-ignore */
      __vite__injectQuery(i022.\u0275\u0275getReplaceMetadataURL(id, t, import.meta.url), 'import')
    ).then((m) => m.default && i022.\u0275\u0275replaceMetadata(App, m.default, [i022], [RouterOutlet7, NavbarComponent, Component13], import.meta, id));
  }
  (typeof ngDevMode === "undefined" || ngDevMode) && App_HmrLoad(Date.now());
  (typeof ngDevMode === "undefined" || ngDevMode) && (import.meta.hot && import.meta.hot.on("angular:component-update", (d) => d.id === id && App_HmrLoad(d.timestamp)));
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tYWluLnRzIiwic3JjL2FwcC9hcHAuY29uZmlnLnRzIiwic3JjL2FwcC9jb3JlL2d1YXJkcy9hdXRoLmd1YXJkLnRzIiwic3JjL2FwcC9jb3JlL3NlcnZpY2VzL2F1dGguc2VydmljZS50cyIsInNyYy9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRzLnRzIiwic3JjL2FwcC9jb3JlL3V0aWxzL2p3dC51dGlsLnRzIiwic3JjL2FwcC9mZWF0dXJlcy9hdXRoL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC50cyIsInNyYy9hcHAvZmVhdHVyZXMvYXV0aC9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnQuaHRtbCIsInNyYy9hcHAvZmVhdHVyZXMvYXV0aC9wYWdlcy9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQudHMiLCJzcmMvYXBwL2ZlYXR1cmVzL2F1dGgvcGFnZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50Lmh0bWwiLCJzcmMvYXBwL2ZlYXR1cmVzL2Rhc2hib2FyZHMvYWRtaW4tZGFzaGJvYXJkL2FkbWluLWRhc2hib2FyZC4uY29tcG9uZW50LnRzIiwic3JjL2FwcC9mZWF0dXJlcy9kYXNoYm9hcmRzL2FkbWluLWRhc2hib2FyZC9hZG1pbi1kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwiLCJzcmMvYXBwL2ZlYXR1cmVzL2Rhc2hib2FyZHMvdXNlci1kYXNoYm9hcmQvdXNlci1kYXNoYm9hcmQuLmNvbXBvbmVudC50cyIsInNyYy9hcHAvZmVhdHVyZXMvZGFzaGJvYXJkcy91c2VyLWRhc2hib2FyZC91c2VyLWRhc2hib2FyZC5jb21wb25lbnQuaHRtbCIsInNyYy9hcHAvY29yZS9zZXJ2aWNlcy9tb3ZpZS5zZXJ2aWNlLnRzIiwic3JjL2FwcC9jb3JlL3NlcnZpY2VzL3JhdGluZy5zZXJ2aWNlLnRzIiwic3JjL2FwcC9jb3JlL3NlcnZpY2VzL2Zhdm9yaXRlLnNlcnZpY2UudHMiLCJzcmMvYXBwL2NvcmUvc2VydmljZXMvdmlldy1oaXN0b3J5LnNlcnZpY2UudHMiLCJzcmMvYXBwL2ZlYXR1cmVzL3VzZXItZmF2b3JpdGVzL3VzZXItZmF2b3JpdGVzLmNvbXBvbmVudC50cyIsInNyYy9hcHAvZmVhdHVyZXMvdXNlci1mYXZvcml0ZXMvdXNlci1mYXZvcml0ZXMuY29tcG9uZW50Lmh0bWwiLCJzcmMvYXBwL2ZlYXR1cmVzL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQudHMiLCJzcmMvYXBwL2ZlYXR1cmVzL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuaHRtbCIsInNyYy9hcHAvY29yZS9zZXJ2aWNlcy91c2VyLXByb2ZpbGUuc2VydmljZS50cyIsInNyYy9hcHAvZmVhdHVyZXMvcmVjb21tZW5kYXRpb24vcmVjb21tZW5kYXRpb24uY29tcG9uZW50LnRzIiwic3JjL2FwcC9mZWF0dXJlcy9yZWNvbW1lbmRhdGlvbi9yZWNvbW1lbmRhdGlvbi5jb21wb25lbnQuaHRtbCIsInNyYy9hcHAvY29yZS9zZXJ2aWNlcy9yZWNvbW1lbmRhdGlvbi5zZXJ2aWNlLnRzIiwic3JjL2FwcC9mZWF0dXJlcy9hZG1pbi1wYWdlcy9tYW5hZ2UtbW92aWVzL21hbmFnZS1tb3ZpZXMudHMiLCJzcmMvYXBwL2ZlYXR1cmVzL2FkbWluLXBhZ2VzL21hbmFnZS1tb3ZpZXMvbWFuYWdlLW1vdmllcy5odG1sIiwic3JjL2FwcC9jb3JlL3NlcnZpY2VzL2dlbnJlLnNlcnZpY2VzLnRzIiwic3JjL2FwcC9mZWF0dXJlcy9sZWFkZXJib2FyZC9sZWFkZXJib2FyZC5jb21wb25lbnQudHMiLCJzcmMvYXBwL2ZlYXR1cmVzL2xlYWRlcmJvYXJkL2xlYWRlcmJvYXJkLmNvbXBvbmVudC5odG1sIiwic3JjL2FwcC9jb3JlL3NlcnZpY2VzL3N0YXRpc3RpY3Muc2VydmljZS50cyIsInNyYy9hcHAvZmVhdHVyZXMvYWRtaW4tcGFnZXMvbWFuYWdlLXVzZXJzL21hbmFnZS11c2Vycy50cyIsInNyYy9hcHAvZmVhdHVyZXMvYWRtaW4tcGFnZXMvbWFuYWdlLXVzZXJzL21hbmFnZS11c2Vycy5odG1sIiwic3JjL2FwcC9mZWF0dXJlcy9zdGF0aXN0aWNzLXBhZ2VzL3RvcC1yYXRlZC90b3AtcmF0ZWQtbW92aWVzLnRzIiwic3JjL2FwcC9mZWF0dXJlcy9zdGF0aXN0aWNzLXBhZ2VzL3RvcC1yYXRlZC90b3AtcmF0ZWQtbW92aWVzLmh0bWwiLCJzcmMvYXBwL2FwcC5yb3V0ZXMudHMiLCJzcmMvYXBwL2NvcmUvaW50ZXJjZXB0b3JzL2F1dGguaW50ZXJjZXB0b3IudHMiLCJzcmMvYXBwL2FwcC50cyIsInNyYy9hcHAvYXBwLmh0bWwiLCJzcmMvYXBwL3NoYXJlZC9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC50cyIsInNyYy9hcHAvc2hhcmVkL25hdmJhci9uYXZiYXIuY29tcG9uZW50Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9vdHN0cmFwQXBwbGljYXRpb24gfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgYXBwQ29uZmlnIH0gZnJvbSAnLi9hcHAvYXBwLmNvbmZpZyc7XHJcbmltcG9ydCB7IEFwcCB9IGZyb20gJy4vYXBwL2FwcCc7XHJcblxyXG5ib290c3RyYXBBcHBsaWNhdGlvbihBcHAsIGFwcENvbmZpZylcclxuICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxuIiwiaW1wb3J0IHsgQXBwbGljYXRpb25Db25maWcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgcHJvdmlkZVJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4vYXBwLnJvdXRlcyc7XHJcbmltcG9ydCB7IHByb3ZpZGVIdHRwQ2xpZW50LCB3aXRoSW50ZXJjZXB0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBhdXRoSW50ZXJjZXB0b3IgfSBmcm9tICcuL2NvcmUvaW50ZXJjZXB0b3JzL2F1dGguaW50ZXJjZXB0b3InO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFwcENvbmZpZzogQXBwbGljYXRpb25Db25maWcgPSB7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBwcm92aWRlUm91dGVyKHJvdXRlcyksXHJcbiAgICBwcm92aWRlSHR0cENsaWVudChcclxuICAgICAgd2l0aEludGVyY2VwdG9ycyhbXHJcbiAgICAgICAgYXV0aEludGVyY2VwdG9yXHJcbiAgICAgIF0pXHJcbiAgICApXHJcbiAgXVxyXG59O1xyXG4iLCJpbXBvcnQgeyBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBDYW5BY3RpdmF0ZUZuIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvbGVHdWFyZCA9IChleHBlY3RlZFJvbGU6IHN0cmluZyk6IENhbkFjdGl2YXRlRm4gPT4ge1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY29uc3QgYXV0aFNlcnZpY2UgPSBpbmplY3QoQXV0aFNlcnZpY2UpO1xyXG4gICAgY29uc3Qgcm91dGVyID0gaW5qZWN0KFJvdXRlcik7XHJcblxyXG4gICAgaWYgKCFhdXRoU2VydmljZS5pc0xvZ2dlZEluKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdSb2xlR3VhcmQ6IE5pbmNzIGJlamVsZW50a2V6dmUsIMOhdGlyw6FuecOtdMOhcyAvbG9naW4tcmEnKTtcclxuICAgICAgcm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7IFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVzZXJSb2xlID0gYXV0aFNlcnZpY2Uucm9sZTtcclxuXHJcbiAgICBpZiAodXNlclJvbGUgPT09IGV4cGVjdGVkUm9sZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTsgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS53YXJuKGBSb2xlR3VhcmQ6IEpvZ29zdWxhdGxhbiBob3p6w6Fmw6lyw6lzICh2w6FydDogJHtleHBlY3RlZFJvbGV9LCBrYXBvdHQ6ICR7dXNlclJvbGV9KWApO1xyXG4gICAgaWYgKHVzZXJSb2xlID09PSAnQWRtaW4nKSB7XHJcbiAgICAgIHJvdXRlci5uYXZpZ2F0ZShbJy9hZG1pbi1kYXNoYm9hcmQnXSk7XHJcbiAgICB9IGVsc2UgaWYgKHVzZXJSb2xlID09PSAnVXNlcicpIHtcclxuICAgICAgcm91dGVyLm5hdmlnYXRlKFsnL3VzZXItZGFzaGJvYXJkJ10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXV0aFNlcnZpY2UubG9nb3V0KCk7XHJcbiAgICAgIHJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcbn07IiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0YXAgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRzJztcclxuaW1wb3J0IHsgQXV0aFJlc3BvbnNlRHRvLCBMb2dpbkR0bywgUmVnaXN0ZXJEdG8gfSBmcm9tICcuLi9tb2RlbHMvYXV0aC5tb2RlbHMnO1xyXG5pbXBvcnQgeyBnZXRSb2xlRnJvbVRva2VuIH0gZnJvbSAnLi4vdXRpbHMvand0LnV0aWwnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBiYXNlVXJsID0gYCR7ZW52aXJvbm1lbnQuYXBpVXJsfS9hdXRoYDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuICByZWdpc3RlcihkdG86IFJlZ2lzdGVyRHRvKTogT2JzZXJ2YWJsZTxBdXRoUmVzcG9uc2VEdG8+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxBdXRoUmVzcG9uc2VEdG8+KGAke3RoaXMuYmFzZVVybH0vcmVnaXN0ZXJgLCBkdG8pLnBpcGUoXHJcbiAgICAgIHRhcChyZXMgPT4gdGhpcy5zYXZlQXV0aChyZXMpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGxvZ2luKGR0bzogTG9naW5EdG8pOiBPYnNlcnZhYmxlPEF1dGhSZXNwb25zZUR0bz4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PEF1dGhSZXNwb25zZUR0bz4oYCR7dGhpcy5iYXNlVXJsfS9sb2dpbmAsIGR0bykucGlwZShcclxuICAgICAgdGFwKHJlcyA9PiB0aGlzLnNhdmVBdXRoKHJlcykpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc2F2ZUF1dGgocmVzOiBBdXRoUmVzcG9uc2VEdG8pIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHJlcy50b2tlbik7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KHJlcy51c2VyKSk7XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyJyk7XHJcbiAgfVxyXG5cclxuICBnZXQgdG9rZW4oKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XHJcbiAgfVxyXG5cclxuICBnZXQgdXNlcigpOiBhbnkgfCBudWxsIHtcclxuICAgIGNvbnN0IGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpO1xyXG4gICAgcmV0dXJuIGRhdGEgPyBKU09OLnBhcnNlKGRhdGEpIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGdldCBpc0xvZ2dlZEluKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhdGhpcy50b2tlbjtcclxuICB9XHJcblxyXG4gIGdldCByb2xlKCk6IHN0cmluZyB8IG51bGwge1xyXG4gIHJldHVybiBnZXRSb2xlRnJvbVRva2VuKHRoaXMudG9rZW4pO1xyXG59XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGVudmlyb25tZW50ID0ge1xyXG4gIHByb2R1Y3Rpb246IGZhbHNlLFxyXG4gIGFwaVVybDogJ2h0dHBzOi8vbG9jYWxob3N0OjcwNjYvYXBpJ1xyXG59O1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0Um9sZUZyb21Ub2tlbih0b2tlbjogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyB8IG51bGwge1xyXG4gIGlmICghdG9rZW4pIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBwYXlsb2FkID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcclxuICBpZiAoIXBheWxvYWQpIHJldHVybiBudWxsO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgZGVjb2RlZCA9IEpTT04ucGFyc2UoYXRvYihwYXlsb2FkKSk7XHJcblxyXG4gICAgcmV0dXJuIGRlY29kZWRbXCJyb2xlXCJdXHJcbiAgICAgICAgfHwgZGVjb2RlZFtcIlJvbGVcIl1cclxuICAgICAgICB8fCBkZWNvZGVkW1wicm9sZXNcIl1cclxuICAgICAgICB8fCBkZWNvZGVkW1wiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlXCJdXHJcbiAgICAgICAgfHwgbnVsbDtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2dpbkR0byB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvbW9kZWxzL2F1dGgubW9kZWxzJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWxvZ2luJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBSb3V0ZXJNb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCB7XHJcblxyXG4gIG1vZGVsOiBMb2dpbkR0byA9IHtcclxuICAgIGVtYWlsOiAnJyxcclxuICAgIHBhc3N3b3JkOiAnJ1xyXG4gIH07XHJcblxyXG4gIGlzTG9hZGluZyA9IGZhbHNlO1xyXG4gIGVycm9yID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7fVxyXG5cclxuICBzdWJtaXQoKSB7XHJcbiAgICB0aGlzLmVycm9yID0gJyc7XHJcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5hdXRoU2VydmljZS5sb2dpbih0aGlzLm1vZGVsKS5zdWJzY3JpYmUoe1xyXG4gICAgICBuZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgcm9sZSA9IHRoaXMuYXV0aFNlcnZpY2Uucm9sZTtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAocm9sZSA9PT0gJ0FkbWluJykge1xyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYWRtaW4tZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy91c2VyLWRhc2hib2FyZCddKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yOiBlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdMT0dJTiBFUlJPUjonLCBlcnIpO1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVyci5zdGF0dXMgPT09IDQwMVxyXG4gICAgICAgICAgPyAnSGliw6FzIGVtYWlsIHZhZ3kgamVsc3rDsydcclxuICAgICAgICAgIDogKGVyci5lcnJvcj8ubWVzc2FnZSA/PyAnVsOhcmF0bGFuIGhpYmEgdMO2cnTDqW50Jyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiYXV0aC1wYWdlXCI+XHJcbiAgPGRpdiBjbGFzcz1cImF1dGgtY2FyZFwiPlxyXG4gICAgXHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj7DnGR2w7Z6bMO8bmshPC9oMT5cclxuICAgICAgPHAgY2xhc3M9XCJzdWJ0aXRsZVwiPkplbGVudGtlenogYmUgYSBmacOza29kYmE8L3A+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2ICpuZ0lmPVwiaXNMb2FkaW5nXCIgY2xhc3M9XCJsb2FkaW5nLXN0YXRlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxmb3JtICpuZ0lmPVwiIWlzTG9hZGluZ1wiIChuZ1N1Ym1pdCk9XCJzdWJtaXQoKVwiIGNsYXNzPVwiYXV0aC1mb3JtXCI+XHJcbiAgICAgIFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsIEPDrW08L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBcclxuICAgICAgICAgIHR5cGU9XCJlbWFpbFwiIFxyXG4gICAgICAgICAgaWQ9XCJlbWFpbFwiXHJcbiAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLmVtYWlsXCIgXHJcbiAgICAgICAgICBuYW1lPVwiZW1haWxcIiBcclxuICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZmllbGRcIiBcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwicGVsZGFAZW1haWwuY29tXCJcclxuICAgICAgICAgIHJlcXVpcmVkIC8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5KZWxzesOzPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgXHJcbiAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIiBcclxuICAgICAgICAgIGlkPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5wYXNzd29yZFwiIFxyXG4gICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCIgXHJcbiAgICAgICAgICBjbGFzcz1cImlucHV0LWZpZWxkXCIgXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIuKAouKAouKAouKAouKAouKAouKAouKAolwiXHJcbiAgICAgICAgICByZXF1aXJlZCAvPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgKm5nSWY9XCJlcnJvclwiIGNsYXNzPVwiZXJyb3ItbXNnIGZhZGUtaW5cIj5cclxuICAgICAgICB7eyBlcnJvciB9fVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuLXN1Ym1pdFwiPlxyXG4gICAgICAgIEJlamVsZW50a2V6w6lzXHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgIDwvZm9ybT5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgPHA+TcOpZyBuaW5jcyBmacOza29kPyA8YSByb3V0ZXJMaW5rPVwiL3JlZ2lzdGVyXCIgY2xhc3M9XCJsaW5rXCI+UmVnaXN6dHLDoWxqIGl0dCE8L2E+PC9wPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gIDwvZGl2PlxyXG48L2Rpdj4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZWdpc3RlckR0byB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvbW9kZWxzL2F1dGgubW9kZWxzJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXJlZ2lzdGVyJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBSb3V0ZXJNb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWdpc3Rlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcmVnaXN0ZXIuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWdpc3RlckNvbXBvbmVudCB7XHJcblxyXG4gIG1vZGVsOiBSZWdpc3RlckR0byA9IHtcclxuICAgIHVzZXJuYW1lOiAnJyxcclxuICAgIGVtYWlsOiAnJyxcclxuICAgIHBhc3N3b3JkOiAnJ1xyXG4gIH07XHJcblxyXG4gIGlzTG9hZGluZyA9IGZhbHNlO1xyXG4gIGVycm9yID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7fVxyXG5cclxuICBzdWJtaXQoKSB7XHJcbiAgICB0aGlzLmVycm9yID0gJyc7XHJcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5hdXRoU2VydmljZS5yZWdpc3Rlcih0aGlzLm1vZGVsKS5zdWJzY3JpYmUoe1xyXG4gICAgICBuZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy91c2VyLWRhc2hib2FyZCddKTtcclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6IGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignUkVHSVNURVIgRVJST1I6JywgZXJyKTtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnIuZXJyb3I/Lm1lc3NhZ2UgPz8gJ0hpYmEgdMO2cnTDqW50IGEgcmVnaXN6dHLDoWNpw7Mgc29yw6FuLic7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiYXV0aC1wYWdlXCI+XHJcbiAgPGRpdiBjbGFzcz1cImF1dGgtY2FyZFwiPlxyXG4gICAgXHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj5Dc2F0bGFrb3p6IEhvenrDoW5rITwvaDE+XHJcbiAgICAgIDxwIGNsYXNzPVwic3VidGl0bGVcIj5Ib3p6IGzDqXRyZSBlZ3kgw7pqIGZpw7Nrb3Q8L3A+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2ICpuZ0lmPVwiaXNMb2FkaW5nXCIgY2xhc3M9XCJsb2FkaW5nLXN0YXRlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxmb3JtICpuZ0lmPVwiIWlzTG9hZGluZ1wiIChuZ1N1Ym1pdCk9XCJzdWJtaXQoKVwiIGNsYXNzPVwiYXV0aC1mb3JtXCI+XHJcbiAgICAgIFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJ1c2VybmFtZVwiPkZlbGhhc3puw6Fsw7Nuw6l2PC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiIFxyXG4gICAgICAgICAgaWQ9XCJ1c2VybmFtZVwiXHJcbiAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLnVzZXJuYW1lXCIgXHJcbiAgICAgICAgICBuYW1lPVwidXNlcm5hbWVcIiBcclxuICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZmllbGRcIiBcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiR2FtZXJUYWcxMjNcIlxyXG4gICAgICAgICAgcmVxdWlyZWQgLz5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsIEPDrW08L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBcclxuICAgICAgICAgIHR5cGU9XCJlbWFpbFwiIFxyXG4gICAgICAgICAgaWQ9XCJlbWFpbFwiXHJcbiAgICAgICAgICBbKG5nTW9kZWwpXT1cIm1vZGVsLmVtYWlsXCIgXHJcbiAgICAgICAgICBuYW1lPVwiZW1haWxcIiBcclxuICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZmllbGRcIiBcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwicGVsZGFAZW1haWwuY29tXCJcclxuICAgICAgICAgIHJlcXVpcmVkIC8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5KZWxzesOzPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgXHJcbiAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIiBcclxuICAgICAgICAgIGlkPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgWyhuZ01vZGVsKV09XCJtb2RlbC5wYXNzd29yZFwiIFxyXG4gICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCIgXHJcbiAgICAgICAgICBjbGFzcz1cImlucHV0LWZpZWxkXCIgXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIuKAouKAouKAouKAouKAouKAouKAouKAolwiXHJcbiAgICAgICAgICByZXF1aXJlZCAvPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgKm5nSWY9XCJlcnJvclwiIGNsYXNzPVwiZXJyb3ItbXNnIGZhZGUtaW5cIj5cclxuICAgICAgICB7eyBlcnJvciB9fVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuLXN1Ym1pdFwiPlxyXG4gICAgICAgIFJlZ2lzenRyw6FjacOzXHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgIDwvZm9ybT5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgPHA+TcOhciB2YW4gZmnDs2tvZD8gPGEgcm91dGVyTGluaz1cIi9sb2dpblwiIGNsYXNzPVwibGlua1wiPkplbGVudGtlenogYmUhPC9hPjwvcD5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuPC9kaXY+IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1hZG1pbi1kYXNoYm9hcmQnLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vYWRtaW4tZGFzaGJvYXJkLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hZG1pbi1kYXNoYm9hcmQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZG1pbkRhc2hib2FyZENvbXBvbmVudCB7XHJcblxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJhZG1pbi1wYWdlXCI+XHJcbiAgPGRpdiBjbGFzcz1cImNvbnRlbnQtd3JhcHBlclwiPlxyXG4gICAgXHJcbiAgICA8aGVhZGVyIGNsYXNzPVwicGFnZS1oZWFkZXJcIj5cclxuICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj5BZG1pbiBGZWzDvGxldDwvaDE+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJkZWNvcmF0aW9uLWxpbmVcIj48L2Rpdj5cclxuICAgICAgPHAgY2xhc3M9XCJzdWJ0aXRsZVwiPlJlbmRzemVyIGthcmJhbnRhcnTDoXNhIMOpcyBrZXplbMOpc2U8L3A+XHJcbiAgICA8L2hlYWRlcj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLWdyaWRcIj5cclxuICAgICAgXHJcbiAgICAgIDwhLS0gRmlsbWVrIEtlemVsw6lzZSBLw6FydHlhIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uLWNhcmRcIiByb3V0ZXJMaW5rPVwiL21hbmFnZS1tb3ZpZXNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1pY29uXCI+XHJcbiAgICAgICAgICA8c3Bhbj7wn46e77iPPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cclxuICAgICAgICAgIDxoMj5GaWxtZWsgS2V6ZWzDqXNlPC9oMj5cclxuICAgICAgICAgIDxwPsOaaiBmaWxtZWsgaG96esOhYWTDoXNhLCBzemVya2VzenTDqXNlLCB0w7ZybMOpc2Ugw6lzIG3FsWZham9rIGthcmJhbnRhcnTDoXNhLjwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1hcnJvd1wiPuKGkjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDwhLS0gRmVsaGFzem7DoWzDs2sgS2V6ZWzDqXNlIEvDoXJ0eWEgLS0+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb24tY2FyZFwiIHJvdXRlckxpbms9XCIvbWFuYWdlLXVzZXJzXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaWNvblwiPlxyXG4gICAgICAgICAgPHNwYW4+8J+RpDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+XHJcbiAgICAgICAgICA8aDI+RmVsaGFzem7DoWzDs2sgS2V6ZWzDqXNlPC9oMj5cclxuICAgICAgICAgIDxwPkZlbGhhc3puw6Fsw7NpIGZpw7Nrb2sgbGlzdMOhesOhc2EsIGpvZ29zdWx0c8OhZ29rIG3Ds2Rvc8OtdMOhc2Egw6lzIHRpbHTDoXMuPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWFycm93XCI+4oaSPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuPC9kaXY+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGZvcmtKb2luLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNb3ZpZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL21vdmllLm1vZGVscyc7XHJcbmltcG9ydCB7IE1vdmllU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvbW92aWUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBSYXRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9yYXRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IEZhdm9yaXRlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvZmF2b3JpdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFZpZXdIaXN0b3J5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdmlldy1oaXN0b3J5LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtdXNlci1kYXNoYm9hcmQnLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi91c2VyLWRhc2hib2FyZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdXNlci1kYXNoYm9hcmQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVc2VyRGFzaGJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgbW92aWVzOiBNb3ZpZVtdID0gW107XHJcblxyXG4gIG15UmF0aW5ncyA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XHJcbiAgbXlGYXZvcml0ZXMgPSBuZXcgU2V0PG51bWJlcj4oKTtcclxuICBteVNlZW4gPSBuZXcgU2V0PG51bWJlcj4oKTtcclxuXHJcbiAgaXNMb2FkaW5nID0gdHJ1ZTtcclxuICBlcnJvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHNlYXJjaFRlcm06IHN0cmluZyA9ICcnO1xyXG4gIHNlYXJjaEZpZWxkOiAnYWxsJyB8ICd0aXRsZScgfCAnZGlyZWN0b3InIHwgJ2dlbnJlJyA9ICdhbGwnO1xyXG4gIGlzU2VhcmNoRHJvcGRvd25PcGVuID0gZmFsc2U7XHJcblxyXG4gIGFsbEdlbnJlczogc3RyaW5nW10gPSBbXTtcclxuICBnZW5yZVN1Z2dlc3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xyXG4gIHNlbGVjdGVkR2VucmU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW92aWVTZXJ2aWNlOiBNb3ZpZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJhdGluZ1NlcnZpY2U6IFJhdGluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGZhdm9yaXRlU2VydmljZTogRmF2b3JpdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB2aWV3SGlzdG9yeVNlcnZpY2U6IFZpZXdIaXN0b3J5U2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB0aGlzLmVycm9yID0gbnVsbDtcclxuXHJcbiAgICBmb3JrSm9pbih7XHJcbiAgICAgIG1vdmllczogdGhpcy5tb3ZpZVNlcnZpY2UuZ2V0TW92aWVzKCksXHJcbiAgICAgIHJhdGluZ3M6IHRoaXMucmF0aW5nU2VydmljZS5nZXRNeVJhdGluZ3MoKSxcclxuICAgICAgZmF2b3JpdGVzOiB0aGlzLmZhdm9yaXRlU2VydmljZS5nZXRNeUZhdm9yaXRlcygpLFxyXG4gICAgICBzZWVuSGlzdG9yeTogdGhpcy52aWV3SGlzdG9yeVNlcnZpY2UuZ2V0TXlWaWV3SGlzdG9yeSgpXHJcbiAgICB9KS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignSGliYSBhIGRhc2hib2FyZCBhZGF0b2sgYmV0w7ZsdMOpc2Vrb3I6JywgZXJyKTtcclxuICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDAxIHx8IGVyci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgdGhpcy5lcnJvciA9IFwiTmluY3Mgam9nb3N1bHRzw6Fnb2QgYXogYWRhdG9rIG1lZ3Rla2ludMOpc8OpaGV6LlwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmVycm9yID0gXCJJc21lcmV0bGVuIGhpYmEgdMO2cnTDqW50IGF6IGFkYXRvayBiZXTDtmx0w6lzZSBrw7Z6YmVuLiAoVmFsw7NzesOtbsWxbGVnIEFQSSDDunR2b25hbCBoaWJhKVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2YobnVsbCk7XHJcbiAgICAgIH0pXHJcbiAgICApLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMubW92aWVzID0gZGF0YS5tb3ZpZXM7XHJcblxyXG4gICAgICBkYXRhLnJhdGluZ3MuZm9yRWFjaCgocjogYW55KSA9PiB0aGlzLm15UmF0aW5ncy5zZXQoci5tb3ZpZUlkLCByLnNjb3JlKSk7XHJcbiAgICAgIGRhdGEuZmF2b3JpdGVzLmZvckVhY2goKGY6IGFueSkgPT4gdGhpcy5teUZhdm9yaXRlcy5hZGQoZi5tb3ZpZUlkKSk7XHJcbiAgICAgIGRhdGEuc2Vlbkhpc3RvcnkuZm9yRWFjaCgoczogYW55KSA9PiB0aGlzLm15U2Vlbi5hZGQocy5tb3ZpZUlkKSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgZ2VucmVTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICAgICAgdGhpcy5tb3ZpZXMuZm9yRWFjaChtID0+IHtcclxuICAgICAgICBjb25zdCBuYW1lcyA9IHRoaXMuZ2V0TW92aWVHZW5yZU5hbWVzKG0pO1xyXG4gICAgICAgIG5hbWVzLmZvckVhY2goZ2VucmVOYW1lID0+IHtcclxuICAgICAgICAgIGlmIChnZW5yZU5hbWUpIGdlbnJlU2V0LmFkZChnZW5yZU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5hbGxHZW5yZXMgPSBBcnJheS5mcm9tKGdlbnJlU2V0KS5zb3J0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICBpc0Zhdm9yaXRlKG1vdmllSWQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubXlGYXZvcml0ZXMuaGFzKG1vdmllSWQpO1xyXG4gIH1cclxuICBwcml2YXRlIGdldE1vdmllR2VucmVOYW1lcyhtOiBNb3ZpZSk6IHN0cmluZ1tdIHtcclxuXHJcbiAgaWYgKChtIGFzIGFueSkuZ2VucmVzICYmIEFycmF5LmlzQXJyYXkoKG0gYXMgYW55KS5nZW5yZXMpKSB7XHJcbiAgICBcclxuICAgIHJldHVybiAoKG0gYXMgYW55KS5nZW5yZXMgYXMgc3RyaW5nW10pLm1hcCh4ID0+ICh4ID8/ICcnKS50b1N0cmluZygpKTtcclxuICB9XHJcblxyXG4gIFxyXG4gIGlmICgobSBhcyBhbnkpLmdlbnJlSWRzICYmIEFycmF5LmlzQXJyYXkoKG0gYXMgYW55KS5nZW5yZUlkcykpIHtcclxuICAgIGNvbnN0IGlkczogbnVtYmVyW10gPSAobSBhcyBhbnkpLmdlbnJlSWRzO1xyXG4gICBcclxuICAgIGlmICgodGhpcyBhcyBhbnkpLmdlbnJlcyAmJiBBcnJheS5pc0FycmF5KCh0aGlzIGFzIGFueSkuZ2VucmVzKSkge1xyXG4gICAgICByZXR1cm4gaWRzLm1hcChpZCA9PiB7XHJcbiAgICAgICAgY29uc3QgZm91bmQgPSAodGhpcyBhcyBhbnkpLmdlbnJlcy5maW5kKChnZzogYW55KSA9PiBnZy5pZCA9PT0gaWQpO1xyXG4gICAgICAgIHJldHVybiBmb3VuZCA/IGZvdW5kLm5hbWUgOiBgIyR7aWR9YDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaWRzLm1hcChpZCA9PiBgIyR7aWR9YCk7XHJcbiAgfVxyXG5cclxuICBcclxuICByZXR1cm4gW107XHJcbn1cclxuXHJcbiAgaXNTZWVuKG1vdmllSWQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubXlTZWVuLmhhcyhtb3ZpZUlkKTtcclxuICB9XHJcblxyXG4gIGdldFJhdGluZyhtb3ZpZUlkOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3Qgc2NvcmUgPSB0aGlzLm15UmF0aW5ncy5nZXQobW92aWVJZCkgfHwgMDtcclxuICAgIHJldHVybiBzY29yZSAvIDI7XHJcbiAgfVxyXG5cclxuICBvblJhdGUobW92aWVJZDogbnVtYmVyLCByYXRpbmc6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3Qgc2NvcmUgPSByYXRpbmcgKiAyO1xyXG4gICAgY29uc3Qgb2xkU2NvcmUgPSB0aGlzLm15UmF0aW5ncy5nZXQobW92aWVJZCkgfHwgMDtcclxuXHJcbiAgICB0aGlzLm15UmF0aW5ncy5zZXQobW92aWVJZCwgc2NvcmUpO1xyXG4gICAgdGhpcy5teVJhdGluZ3MgPSBuZXcgTWFwKHRoaXMubXlSYXRpbmdzKTtcclxuXHJcbiAgICB0aGlzLnJhdGluZ1NlcnZpY2UucmF0ZU1vdmllKHsgbW92aWVJZCwgc2NvcmUgfSkuc3Vic2NyaWJlKHtcclxuICAgICAgbmV4dDogKCkgPT4ge30sXHJcbiAgICAgIGVycm9yOiAoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignSGliYSBheiDDqXJ0w6lrZWzDqXMgbWVudMOpc2Vrb3IsIFVJIHZpc3N6YcOhbGzDrXR2YTonLCBlcnIpO1xyXG4gICAgICAgIHRoaXMubXlSYXRpbmdzLnNldChtb3ZpZUlkLCBvbGRTY29yZSk7XHJcbiAgICAgICAgdGhpcy5teVJhdGluZ3MgPSBuZXcgTWFwKHRoaXMubXlSYXRpbmdzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblRvZ2dsZUZhdm9yaXRlKG1vdmllSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3Qgd2FzRmF2b3JpdGUgPSB0aGlzLmlzRmF2b3JpdGUobW92aWVJZCk7XHJcblxyXG4gICAgaWYgKHdhc0Zhdm9yaXRlKSB7XHJcbiAgICAgIHRoaXMubXlGYXZvcml0ZXMuZGVsZXRlKG1vdmllSWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5teUZhdm9yaXRlcy5hZGQobW92aWVJZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm15RmF2b3JpdGVzID0gbmV3IFNldCh0aGlzLm15RmF2b3JpdGVzKTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0JCA9IHdhc0Zhdm9yaXRlXHJcbiAgICAgID8gdGhpcy5mYXZvcml0ZVNlcnZpY2UudW5mYXZvcml0ZU1vdmllKG1vdmllSWQpXHJcbiAgICAgIDogdGhpcy5mYXZvcml0ZVNlcnZpY2UuZmF2b3JpdGVNb3ZpZSh7IG1vdmllSWQgfSk7XHJcblxyXG4gICAgcmVxdWVzdCQuc3Vic2NyaWJlKHtcclxuICAgICAgbmV4dDogKCkgPT4ge30sXHJcbiAgICAgIGVycm9yOiAoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignSGliYSBhIGtlZHZlbmMgbWVudMOpc2Vrb3IsIFVJIHZpc3N6YcOhbGzDrXR2YTonLCBlcnIpO1xyXG4gICAgICAgIGlmICh3YXNGYXZvcml0ZSkge1xyXG4gICAgICAgICAgdGhpcy5teUZhdm9yaXRlcy5hZGQobW92aWVJZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubXlGYXZvcml0ZXMuZGVsZXRlKG1vdmllSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm15RmF2b3JpdGVzID0gbmV3IFNldCh0aGlzLm15RmF2b3JpdGVzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblRvZ2dsZVNlZW4obW92aWVJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCB3YXNTZWVuID0gdGhpcy5pc1NlZW4obW92aWVJZCk7XHJcblxyXG4gICAgaWYgKHdhc1NlZW4pIHtcclxuICAgICAgdGhpcy5teVNlZW4uZGVsZXRlKG1vdmllSWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5teVNlZW4uYWRkKG1vdmllSWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5teVNlZW4gPSBuZXcgU2V0KHRoaXMubXlTZWVuKTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0JCA9IHdhc1NlZW5cclxuICAgICAgPyB0aGlzLnZpZXdIaXN0b3J5U2VydmljZS5yZW1vdmVGcm9tU2Vlbihtb3ZpZUlkKVxyXG4gICAgICA6IHRoaXMudmlld0hpc3RvcnlTZXJ2aWNlLm1hcmtBc1NlZW4obW92aWVJZCk7XHJcblxyXG4gICAgcmVxdWVzdCQuc3Vic2NyaWJlKHtcclxuICAgICAgbmV4dDogKCkgPT4ge30sXHJcbiAgICAgIGVycm9yOiAoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignSGliYSBhIFxcXCJMw6F0dGFtXFxcIiBtZW50w6lzZWtvciwgVUkgdmlzc3phw6FsbMOtdHZhOicsIGVycik7XHJcbiAgICAgICAgaWYgKHdhc1NlZW4pIHtcclxuICAgICAgICAgIHRoaXMubXlTZWVuLmFkZChtb3ZpZUlkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5teVNlZW4uZGVsZXRlKG1vdmllSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm15U2VlbiA9IG5ldyBTZXQodGhpcy5teVNlZW4pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVNlYXJjaERyb3Bkb3duKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc1NlYXJjaERyb3Bkb3duT3BlbiA9ICF0aGlzLmlzU2VhcmNoRHJvcGRvd25PcGVuO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VhcmNoRmllbGQoZmllbGQ6ICdhbGwnIHwgJ3RpdGxlJyB8ICdkaXJlY3RvcicgfCAnZ2VucmUnKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlYXJjaEZpZWxkID0gZmllbGQ7XHJcbiAgICB0aGlzLmlzU2VhcmNoRHJvcGRvd25PcGVuID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKGZpZWxkICE9PSAnZ2VucmUnKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRHZW5yZSA9IG51bGw7XHJcbiAgICAgIHRoaXMuZ2VucmVTdWdnZXN0aW9ucyA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0U2VhcmNoRmllbGRMYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgc3dpdGNoICh0aGlzLnNlYXJjaEZpZWxkKSB7XHJcbiAgICAgIGNhc2UgJ3RpdGxlJzogcmV0dXJuICdDw61tJztcclxuICAgICAgY2FzZSAnZGlyZWN0b3InOiByZXR1cm4gJ1JlbmRlesWRJztcclxuICAgICAgY2FzZSAnZ2VucmUnOiByZXR1cm4gJ03FsWZhaic7XHJcbiAgICAgIGRlZmF1bHQ6IHJldHVybiAnTWluZGVuJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU2VhcmNoVGVybUNoYW5nZSh0ZXJtOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VhcmNoVGVybSA9IHRlcm07XHJcblxyXG4gICAgaWYgKHRoaXMuc2VhcmNoRmllbGQgPT09ICdnZW5yZScpIHtcclxuICAgICAgY29uc3QgdCA9IHRlcm0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICBpZiAoIXQpIHtcclxuICAgICAgICB0aGlzLmdlbnJlU3VnZ2VzdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkR2VucmUgPSBudWxsO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5nZW5yZVN1Z2dlc3Rpb25zID0gdGhpcy5hbGxHZW5yZXNcclxuICAgICAgICAuZmlsdGVyKGcgPT4gZy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHQpKTtcclxuXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRHZW5yZSA9IG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdlbnJlU3VnZ2VzdGlvbnMgPSBbXTtcclxuICAgICAgdGhpcy5zZWxlY3RlZEdlbnJlID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbGVjdEdlbnJlKGdlbnJlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRHZW5yZSA9IGdlbnJlO1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtID0gZ2VucmU7XHJcbiAgICB0aGlzLmdlbnJlU3VnZ2VzdGlvbnMgPSBbXTtcclxuICB9XHJcbnByaXZhdGUgZ2V0R2VucmVzKG1vdmllOiBNb3ZpZSk6IHN0cmluZ1tdIHtcclxuICByZXR1cm4gbW92aWUuZ2VucmVzPy5tYXAoZyA9PiBnLnRvTG93ZXJDYXNlKCkpID8/IFtdO1xyXG59XHJcbmdldCBmaWx0ZXJlZE1vdmllcygpOiBNb3ZpZVtdIHtcclxuICBjb25zdCB0ZXJtID0gdGhpcy5zZWFyY2hUZXJtLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAvLyAtLS0gR0VOUkUgRklMVEVSIC0tLVxyXG4gIGlmICh0aGlzLnNlYXJjaEZpZWxkID09PSAnZ2VucmUnKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRHZW5yZSkgcmV0dXJuIHRoaXMubW92aWVzO1xyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZEdlbnJlLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubW92aWVzLmZpbHRlcihtID0+XHJcbiAgICAgIHRoaXMuZ2V0R2VucmVzKG0pLnNvbWUoZ2VucmVOYW1lID0+IGdlbnJlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBzZWxlY3RlZClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0gw5xSRVMgS0VSRVPFkCAtLS1cclxuICBpZiAoIXRlcm0pIHJldHVybiB0aGlzLm1vdmllcztcclxuXHJcbiAgLy8gLS0tIMOBTFRBTMOBTk9TIEtFUkVTw4lTIC0tLVxyXG4gIHJldHVybiB0aGlzLm1vdmllcy5maWx0ZXIobW92aWUgPT4ge1xyXG4gICAgY29uc3QgdGl0bGUgPSBtb3ZpZS50aXRsZT8udG9Mb3dlckNhc2UoKSA/PyAnJztcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gbW92aWUuZGVzY3JpcHRpb24/LnRvTG93ZXJDYXNlKCkgPz8gJyc7XHJcbiAgICBjb25zdCBkaXJlY3RvciA9IG1vdmllLmRpcmVjdG9yPy50b0xvd2VyQ2FzZSgpID8/ICcnO1xyXG4gICAgY29uc3QgZ2VucmVOYW1lcyA9IHRoaXMuZ2V0R2VucmVzKG1vdmllKS5tYXAoZyA9PiBnLnRvTG93ZXJDYXNlKCkpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5zZWFyY2hGaWVsZCkge1xyXG4gICAgICBjYXNlICd0aXRsZSc6XHJcbiAgICAgICAgcmV0dXJuIHRpdGxlLmluY2x1ZGVzKHRlcm0pO1xyXG5cclxuICAgICAgY2FzZSAnZGlyZWN0b3InOlxyXG4gICAgICAgIHJldHVybiBkaXJlY3Rvci5pbmNsdWRlcyh0ZXJtKTtcclxuXHJcbiAgICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHRpdGxlLmluY2x1ZGVzKHRlcm0pIHx8XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbi5pbmNsdWRlcyh0ZXJtKSB8fFxyXG4gICAgICAgICAgZGlyZWN0b3IuaW5jbHVkZXModGVybSkgfHxcclxuICAgICAgICAgIGdlbnJlTmFtZXMuc29tZShnID0+IGcuaW5jbHVkZXModGVybSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuXHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImRhc2hib2FyZC1wYWdlXCI+XHJcbiAgPG1haW4gY2xhc3M9XCJjb250ZW50LXdyYXBwZXJcIj5cclxuXHJcbiAgICA8aGVhZGVyIGNsYXNzPVwicGFnZS1oZWFkZXJcIj5cclxuICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj5GaWxtZWs8L2gxPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZGVjb3JhdGlvbi1saW5lXCI+PC9kaXY+XHJcbiAgICA8L2hlYWRlcj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXNlY3Rpb25cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1iYXJcIj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJmaWx0ZXItdG9nZ2xlLWJ0blwiIChjbGljayk9XCJ0b2dnbGVTZWFyY2hEcm9wZG93bigpXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImZpbHRlci1sYWJlbFwiPnt7IGdldFNlYXJjaEZpZWxkTGFiZWwoKSB9fTwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsdGVyLWFycm93XCI+4pa8PC9zcGFuPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIGNsYXNzPVwic2VhcmNoLWlucHV0XCJcclxuICAgICAgICAgIFtuZ01vZGVsXT1cInNlYXJjaFRlcm1cIlxyXG4gICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25TZWFyY2hUZXJtQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJLZXJlc8Opcy4uLlwiIC8+XHJcblxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2VhcmNoLWljb24tYnRuXCI+XHJcbiAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PGNpcmNsZSBjeD1cIjExXCIgY3k9XCIxMVwiIHI9XCI4XCI+PC9jaXJjbGU+PGxpbmUgeDE9XCIyMVwiIHkxPVwiMjFcIiB4Mj1cIjE2LjY1XCIgeTI9XCIxNi42NVwiPjwvbGluZT48L3N2Zz5cclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGRpdiAqbmdJZj1cImlzU2VhcmNoRHJvcGRvd25PcGVuXCIgY2xhc3M9XCJkcm9wZG93bi1tZW51IGZhZGUtaW5cIj5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRTZWFyY2hGaWVsZCgnYWxsJylcIj5NaW5kZW48L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRTZWFyY2hGaWVsZCgndGl0bGUnKVwiPkPDrW08L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRTZWFyY2hGaWVsZCgnZGlyZWN0b3InKVwiPlJlbmRlesWRPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0U2VhcmNoRmllbGQoJ2dlbnJlJylcIj5NxbFmYWo8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiAqbmdJZj1cInNlYXJjaEZpZWxkID09PSAnZ2VucmUnICYmIGdlbnJlU3VnZ2VzdGlvbnMubGVuZ3RoID4gMCAmJiBzZWFyY2hUZXJtXCIgY2xhc3M9XCJzdWdnZXN0aW9ucy1tZW51IGZhZGUtaW5cIj5cclxuICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGcgb2YgZ2VucmVTdWdnZXN0aW9uc1wiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInN1Z2dlc3Rpb24taXRlbVwiIChjbGljayk9XCJzZWxlY3RHZW5yZShnKVwiPlxyXG4gICAgICAgICAgICB7eyBnIH19XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzTG9hZGluZyB8fCBlcnJvcjsgZWxzZSBtb3ZpZXNDb250ZW50XCI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJlcnJvcjsgZWxzZSBsb2FkaW5nXCIgY2xhc3M9XCJtZXNzYWdlLWJveCBlcnJvclwiPlxyXG4gICAgICAgIDxzdHJvbmc+SGliYSB0w7ZydMOpbnQ6PC9zdHJvbmc+XHJcbiAgICAgICAgPHNwYW4+IHt7IGVycm9yIH19PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxuZy10ZW1wbGF0ZSAjbG9hZGluZz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibWVzc2FnZS1ib3ggbG9hZGluZ1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PlxyXG4gICAgICAgICAgPHA+UmVuZHN6ZXIgYmV0w7ZsdMOpc2UuLi48L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgI21vdmllc0NvbnRlbnQ+XHJcblxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyZWRNb3ZpZXMubGVuZ3RoID4gMDsgZWxzZSBub01vdmllc1wiIGNsYXNzPVwibWVkaWEtZ3JpZFwiPlxyXG4gICAgICAgIFxyXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IG1vdmllIG9mIGZpbHRlcmVkTW92aWVzXCIgY2xhc3M9XCJtZWRpYS1jYXJkXCI+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0ZXItd3JhcHBlclwiPlxyXG4gICAgICAgICAgICA8aW1nIFtzcmNdPVwibW92aWUucG9zdGVyVXJsXCIgXHJcbiAgICAgICAgICAgICAgICAgW2FsdF09XCJtb3ZpZS50aXRsZVwiIFxyXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwicG9zdGVyLWltYWdlXCJcclxuICAgICAgICAgICAgICAgICBvbmVycm9yPVwidGhpcy5zcmM9J2h0dHBzOi8vcGxhY2Vob2xkLmNvLzQwMHg2MDAvMGYxNjIzL2ZmZmZmZj90ZXh0PU5vK0NvdmVyJ1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdGVyLW92ZXJsYXlcIj48L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgPGgyIGNsYXNzPVwibWVkaWEtdGl0bGVcIiBbdGl0bGVdPVwibW92aWUudGl0bGVcIj57eyBtb3ZpZS50aXRsZSB9fTwvaDI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtZWRpYS15ZWFyXCI+e3sgbW92aWUucmVsZWFzZVllYXIgfX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGgzIGNsYXNzPVwibWVkaWEtZGlyZWN0b3JcIj5SZW5kZXp0ZToge3sgbW92aWUuZGlyZWN0b3IgfHwgJ0lzbWVyZXRsZW4nIH19PC9oMz5cclxuXHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwibWVkaWEtZGVzY1wiPlxyXG4gICAgICAgICAgICAgIHt7IG1vdmllLmRlc2NyaXB0aW9uIH19XHJcbiAgICAgICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBnZW5yZSBvZiBtb3ZpZS5nZW5yZXNcIiBjbGFzcz1cInRhZ1wiPlxyXG4gICAgICAgICAgICAgICAge3sgZ2VucmUgfX1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnMtcGFuZWxcIj5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmF0aW5nLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj5SYXRpbmc6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXJzXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IHN0YXIgb2YgWzEsMiwzLDQsNV1cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25SYXRlKG1vdmllLmlkLCBzdGFyKVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwic3Rhci1idG5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiZ2V0UmF0aW5nKG1vdmllLmlkKSA+PSBzdGFyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cInt7c3Rhcn19IGNzaWxsYWdcIj5cclxuICAgICAgICAgICAgICAgICAgICDimIVcclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnMtcm93XCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJvblRvZ2dsZUZhdm9yaXRlKG1vdmllLmlkKVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tZmF2b3JpdGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzRmF2b3JpdGUobW92aWUuaWQpXCI+XHJcbiAgICAgICAgICAgICAgICAgIHt7IGlzRmF2b3JpdGUobW92aWUuaWQpID8gJ+KZpSBLZWR2ZW5jJyA6ICfimaEgSG96esOhYWTDoXMnIH19XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwib25Ub2dnbGVTZWVuKG1vdmllLmlkKVwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc2VlblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNTZWVuKG1vdmllLmlkKVwiPlxyXG4gICAgICAgICAgICAgICAgICB7eyBpc1NlZW4obW92aWUuaWQpID8gJ/CfkYEgTMOhdHRhbScgOiAn4peLIE1lZ27DqXplbScgfX1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8bmctdGVtcGxhdGUgI25vTW92aWVzPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1zdGF0ZVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImVtcHR5LWljb25cIj7iiIU8L2Rpdj5cclxuICAgICAgICAgIDxwPk5pbmNzIHRhbMOhbGF0IGEga2VyZXPDqXNpIGZlbHTDqXRlbGVrIGFsYXBqw6FuLjwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvbWFpbj5cclxuPC9kaXY+IiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0YXAgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRzJztcclxuaW1wb3J0IHsgQ3JlYXRlTW92aWVEdG8sIE1vdmllLCBVcGRhdGVNb3ZpZUR0byB9IGZyb20gJy4uL21vZGVscy9tb3ZpZS5tb2RlbHMnO1xyXG5pbXBvcnQgeyBHZW5yZSB9IGZyb20gJy4uL21vZGVscy9nZW5yZS5tb2RlbHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSYXRlTW92aWVEdG8ge1xyXG4gIG1vdmllSWQ6IG51bWJlcjtcclxuICByYXRpbmc6IG51bWJlcjsgXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVNb3ZpZUR0byB7XHJcbiAgbW92aWVJZDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZpZXdIaXN0b3J5RHRvIHtcclxuICBtb3ZpZUlkOiBudW1iZXI7XHJcbn1cclxuXHJcblxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTW92aWVTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBtb3ZpZVVybCA9IGAke2Vudmlyb25tZW50LmFwaVVybH0vTW92aWVgO1xyXG4gIHByaXZhdGUgcmF0aW5nVXJsID0gYCR7ZW52aXJvbm1lbnQuYXBpVXJsfS9SYXRpbmdgO1xyXG4gIHByaXZhdGUgZmF2b3JpdGVVcmwgPSBgJHtlbnZpcm9ubWVudC5hcGlVcmx9L0Zhdm9yaXRlYDtcclxuICBwcml2YXRlIHZpZXdIaXN0b3J5VXJsID0gYCR7ZW52aXJvbm1lbnQuYXBpVXJsfS9WaWV3SGlzdG9yeWA7XHJcblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxyXG5cclxuICBnZXRNb3ZpZXMoKTogT2JzZXJ2YWJsZTxNb3ZpZVtdPiB7XHJcbiAgICBjb25zb2xlLmxvZygnTW92aWVTZXJ2aWNlOiBGaWxtZWsgbGVrw6lyw6lzZS4uLicpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TW92aWVbXT4odGhpcy5tb3ZpZVVybCkucGlwZShcclxuICAgICAgICB0YXAocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQVBJIHbDoWxhc3o6JywgcmVzcG9uc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG59XHJcblxyXG4gIHJhdGVNb3ZpZShkdG86IFJhdGVNb3ZpZUR0byk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5yYXRpbmdVcmwsIGR0bykucGlwZShcclxuICAgICAgdGFwKCgpID0+IGNvbnNvbGUubG9nKGBGaWxtIMOpcnTDqWtlbHZlOiAke2R0by5tb3ZpZUlkfSwgw4lydMOpa2Vsw6lzOiAke2R0by5yYXRpbmd9YCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZmF2b3JpdGVNb3ZpZShkdG86IEZhdm9yaXRlTW92aWVEdG8pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuZmF2b3JpdGVVcmwsIGR0bykucGlwZShcclxuICAgICAgdGFwKCgpID0+IGNvbnNvbGUubG9nKGBGaWxtIGtlZHZlbmNla2hleiBhZHZhOiAke2R0by5tb3ZpZUlkfWApKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG1hcmtBc1NlZW4oZHRvOiBWaWV3SGlzdG9yeUR0byk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy52aWV3SGlzdG9yeVVybCwgZHRvKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4gY29uc29sZS5sb2coYEZpbG0gbMOhdG90dG5hayBqZWzDtmx2ZTogJHtkdG8ubW92aWVJZH1gKSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGdldEJ5SWQoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8TW92aWU+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PE1vdmllPihgJHt0aGlzLm1vdmllVXJsfS8ke2lkfWApO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKG1vdmllOiBDcmVhdGVNb3ZpZUR0byk6IE9ic2VydmFibGU8Q3JlYXRlTW92aWVEdG8+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxDcmVhdGVNb3ZpZUR0bz4odGhpcy5tb3ZpZVVybCwgbW92aWUpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGlkOiBudW1iZXIsIG1vdmllOiBVcGRhdGVNb3ZpZUR0byk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQ8dm9pZD4oYCR7dGhpcy5tb3ZpZVVybH0vJHtpZH1gLCBtb3ZpZSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8dm9pZD4oYCR7dGhpcy5tb3ZpZVVybH0vJHtpZH1gKS5waXBlKHRhcCgoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBGaWxtIHTDtnLDtmx2ZTogJHtpZH1gKTtcclxuICAgIH0pKTtcclxuICB9XHJcbiAgXHJcbn1cclxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIHRhcCwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRzJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7IFxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVSYXRpbmdEdG8ge1xyXG4gIG1vdmllSWQ6IG51bWJlcjsgXHJcbiAgc2NvcmU6IG51bWJlcjsgXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlclJhdGluZyB7XHJcbiAgbW92aWVJZDogbnVtYmVyO1xyXG4gIHNjb3JlOiBudW1iZXI7IFxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSYXRpbmdTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJhdGluZ1VybCA9IGAke2Vudmlyb25tZW50LmFwaVVybH0vUmF0aW5nYDtcclxuXHJcbiAgcHJpdmF0ZSBhdXRoU2VydmljZSA9IGluamVjdChBdXRoU2VydmljZSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XHJcblxyXG4gIGdldE15UmF0aW5ncygpOiBPYnNlcnZhYmxlPFVzZXJSYXRpbmdbXT4ge1xyXG4gICAgY29uc3QgdXNlcklkID0gdGhpcy5hdXRoU2VydmljZS51c2VyPy5pZDsgXHJcbiAgICBcclxuICAgIGlmICghdXNlcklkKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignUmF0aW5nU2VydmljZTogTmluY3MgdXNlcklkLCDDqXJ0w6lrZWzDqXNlayBsZWvDqXLDqXNlIHNpa2VydGVsZW4uJyk7XHJcbiAgICAgIHJldHVybiBvZihbXSk7IFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFVzZXJSYXRpbmdbXT4oYCR7dGhpcy5yYXRpbmdVcmx9L3VzZXIvJHt1c2VySWR9YCk7XHJcbiAgfVxyXG5cclxuICByYXRlTW92aWUoZHRvOiBDcmVhdGVSYXRpbmdEdG8pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgY29uc3QgdXNlcklkID0gdGhpcy5hdXRoU2VydmljZS51c2VyPy5pZDtcclxuICAgIFxyXG4gICAgaWYgKCF1c2VySWQpIHtcclxuICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gbmV3IEVycm9yKCdBIGZlbGhhc3puw6Fsw7MgbmluY3MgYmVqZWxlbnRrZXp2ZS4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke3RoaXMucmF0aW5nVXJsfS8ke3VzZXJJZH1gLCBkdG8pLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiBjb25zb2xlLmxvZyhgRmlsbSDDqXJ0w6lrZWx2ZTogJHtkdG8ubW92aWVJZH0sIMOJcnTDqWtlbMOpczogJHtkdG8uc2NvcmV9YCkpXHJcbiAgICApO1xyXG4gIH1cclxufSIsImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0YXAsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50cyc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZU1vdmllRHRvIHtcclxuICBtb3ZpZUlkOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlckZhdm9yaXRlIHtcclxuICBpZDogbnVtYmVyOyBcclxuICBtb3ZpZUlkOiBudW1iZXI7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZhdm9yaXRlU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBmYXZvcml0ZVVybCA9IGAke2Vudmlyb25tZW50LmFwaVVybH0vRmF2b3JpdGVgO1xyXG4gIHByaXZhdGUgYXV0aFNlcnZpY2UgPSBpbmplY3QoQXV0aFNlcnZpY2UpOyBcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgZ2V0TXlGYXZvcml0ZXMoKTogT2JzZXJ2YWJsZTxVc2VyRmF2b3JpdGVbXT4ge1xyXG4gICAgY29uc3QgdXNlcklkID0gdGhpcy5hdXRoU2VydmljZS51c2VyPy5pZDtcclxuICAgIGlmICghdXNlcklkKSB7XHJcbiAgICAgIHJldHVybiBvZihbXSk7IFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8VXNlckZhdm9yaXRlW10+KGAke3RoaXMuZmF2b3JpdGVVcmx9L3VzZXIvJHt1c2VySWR9YCk7XHJcbiAgfVxyXG5cclxuICBmYXZvcml0ZU1vdmllKGR0bzogRmF2b3JpdGVNb3ZpZUR0byk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1c2VySWQgPSB0aGlzLmF1dGhTZXJ2aWNlLnVzZXI/LmlkO1xyXG4gICAgaWYgKCF1c2VySWQpIHtcclxuICAgICAgcmV0dXJuIHRocm93RXJyb3IoKCkgPT4gbmV3IEVycm9yKCdOaW5jcyB1c2VyIElEIGEga2VkdmVuYyBob3p6w6FhZMOhc8OhaG96LicpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHt0aGlzLmZhdm9yaXRlVXJsfS8ke3VzZXJJZH1gLCBkdG8pLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiBjb25zb2xlLmxvZyhgRmlsbSBrZWR2ZW5jZWtoZXogYWR2YTogJHtkdG8ubW92aWVJZH1gKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICB1bmZhdm9yaXRlTW92aWUobW92aWVJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVzZXJJZCA9IHRoaXMuYXV0aFNlcnZpY2UudXNlcj8uaWQ7XHJcbiAgICBpZiAoIXVzZXJJZCkge1xyXG4gICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBuZXcgRXJyb3IoJ05pbmNzIHVzZXIgSUQgYSBrZWR2ZW5jIHTDtnJsw6lzw6loZXouJykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYCR7dGhpcy5mYXZvcml0ZVVybH0vJHt1c2VySWR9LyR7bW92aWVJZH1gKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4gY29uc29sZS5sb2coYEZpbG0ga2VkdmVuY2VrYsWRbCB0w7Zyw7ZsdmU6ICR7bW92aWVJZH1gKSlcclxuICAgICk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIHRhcCwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRzJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZpZXdIaXN0b3J5RHRvIHtcclxuICBtb3ZpZUlkOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlclZpZXdIaXN0b3J5IHtcclxuICBpZDogbnVtYmVyOyBcclxuICBtb3ZpZUlkOiBudW1iZXI7XHJcbiAgdmlld2VkT246IHN0cmluZzsgXHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpZXdIaXN0b3J5U2VydmljZSB7XHJcbiAgcHJpdmF0ZSB2aWV3SGlzdG9yeVVybCA9IGAke2Vudmlyb25tZW50LmFwaVVybH0vVmlld0hpc3RvcnlgO1xyXG4gIHByaXZhdGUgYXV0aFNlcnZpY2UgPSBpbmplY3QoQXV0aFNlcnZpY2UpOyBcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgZ2V0TXlWaWV3SGlzdG9yeSgpOiBPYnNlcnZhYmxlPFVzZXJWaWV3SGlzdG9yeVtdPiB7XHJcbiAgICBjb25zdCB1c2VySWQgPSB0aGlzLmF1dGhTZXJ2aWNlLnVzZXI/LmlkO1xyXG4gICAgaWYgKCF1c2VySWQpIHtcclxuICAgICAgcmV0dXJuIG9mKFtdKTsgXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxVc2VyVmlld0hpc3RvcnlbXT4oYCR7dGhpcy52aWV3SGlzdG9yeVVybH0vdXNlci8ke3VzZXJJZH1gKTtcclxuICB9XHJcblxyXG4gIG1hcmtBc1NlZW4obW92aWVJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVzZXJJZCA9IHRoaXMuYXV0aFNlcnZpY2UudXNlcj8uaWQ7XHJcbiAgICBpZiAoIXVzZXJJZCkge1xyXG4gICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBuZXcgRXJyb3IoJ05pbmNzIHVzZXIgSUQgYSBcImzDoXR0YW1cIiBqZWzDtmzDqXNoZXouJykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke3RoaXMudmlld0hpc3RvcnlVcmx9LyR7dXNlcklkfS8ke21vdmllSWR9YCwge30pLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiBjb25zb2xlLmxvZyhgRmlsbSBsw6F0b3R0bmFrIGplbMO2bHZlOiAke21vdmllSWR9YCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbVNlZW4obW92aWVJZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IHVzZXJJZCA9IHRoaXMuYXV0aFNlcnZpY2UudXNlcj8uaWQ7XHJcbiAgICBpZiAoIXVzZXJJZCkge1xyXG4gICAgICByZXR1cm4gdGhyb3dFcnJvcigoKSA9PiBuZXcgRXJyb3IoJ05pbmNzIHVzZXIgSUQgYSBcImzDoXR0YW1cIiB0w7ZybMOpc8OpaGV6LicpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGAke3RoaXMudmlld0hpc3RvcnlVcmx9LyR7dXNlcklkfS8ke21vdmllSWR9YCkucGlwZShcclxuICAgICAgdGFwKCgpID0+IGNvbnNvbGUubG9nKGBGaWxtIFwibMOhdHRhbVwiIGplbMO2bMOpcyB0w7Zyw7ZsdmU6ICR7bW92aWVJZH1gKSlcclxuICAgICk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZm9ya0pvaW4sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE1vdmllIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvbW92aWUubW9kZWxzJztcclxuaW1wb3J0IHsgTW92aWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9tb3ZpZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmF2b3JpdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9mYXZvcml0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC11c2VyLWZhdm9yaXRlcycsXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vdXNlci1mYXZvcml0ZXMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3VzZXItZmF2b3JpdGVzLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlckZhdm9yaXRlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIG1vdmllczogTW92aWVbXSA9IFtdO1xyXG4gIGlzTG9hZGluZyA9IHRydWU7XHJcbiAgZXJyb3I6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW92aWVTZXJ2aWNlOiBNb3ZpZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGZhdm9yaXRlU2VydmljZTogRmF2b3JpdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuZXJyb3IgPSBudWxsO1xyXG5cclxuICAgIGZvcmtKb2luKHtcclxuICAgICAgbW92aWVzOiB0aGlzLm1vdmllU2VydmljZS5nZXRNb3ZpZXMoKSxcclxuICAgICAgZmF2b3JpdGVzOiB0aGlzLmZhdm9yaXRlU2VydmljZS5nZXRNeUZhdm9yaXRlcygpXHJcbiAgICB9KVxyXG4gICAgLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdIaWJhIGEga2VkdmVuY2VrIGJldMO2bHTDqXNla29yOicsIGVycik7XHJcbiAgICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwMSB8fCBlcnIuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3IgPSAnTmluY3Mgam9nb3N1bHRzw6Fnb2QgYXogYWRhdG9rIG1lZ3Rla2ludMOpc8OpaGV6Lic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXJyb3IgPSAnSXNtZXJldGxlbiBoaWJhIHTDtnJ0w6ludCBhIGtlZHZlbmNlayBiZXTDtmx0w6lzZSBrw7Z6YmVuLic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZihudWxsKTtcclxuICAgICAgfSlcclxuICAgIClcclxuICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XHJcbiAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBmYXZJZHMgPSBuZXcgU2V0PG51bWJlcj4oZGF0YS5mYXZvcml0ZXMubWFwKGYgPT4gZi5tb3ZpZUlkKSk7XHJcbiAgICAgIHRoaXMubW92aWVzID0gZGF0YS5tb3ZpZXMuZmlsdGVyKG0gPT4gZmF2SWRzLmhhcyhtLmlkKSk7XHJcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21GYXZvcml0ZXMobW92aWVJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBvbGRNb3ZpZXMgPSBbLi4udGhpcy5tb3ZpZXNdO1xyXG4gICAgdGhpcy5tb3ZpZXMgPSB0aGlzLm1vdmllcy5maWx0ZXIobSA9PiBtLmlkICE9PSBtb3ZpZUlkKTtcclxuXHJcbiAgICB0aGlzLmZhdm9yaXRlU2VydmljZS51bmZhdm9yaXRlTW92aWUobW92aWVJZCkuc3Vic2NyaWJlKHtcclxuICAgICAgbmV4dDogKCkgPT4ge1xyXG4gICAgICB9LFxyXG4gICAgICBlcnJvcjogKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0hpYmEgYSBrZWR2ZW5jIHTDtnJsw6lzZWtvciwgVUkgdmlzc3phw6FsbMOtdHZhOicsIGVycik7XHJcbiAgICAgICAgdGhpcy5tb3ZpZXMgPSBvbGRNb3ZpZXM7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwicGFnZS1jb250YWluZXJcIj5cclxuICA8bWFpbiBjbGFzcz1cImNvbnRlbnQtd3JhcHBlclwiPlxyXG4gICAgXHJcbiAgICA8aGVhZGVyIGNsYXNzPVwicGFnZS1oZWFkZXJcIj5cclxuICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj5LZWR2ZW5jIEZpbG1qZWltPC9oMT5cclxuICAgICAgPGRpdiBjbGFzcz1cImRlY29yYXRpb24tbGluZVwiPjwvZGl2PlxyXG4gICAgPC9oZWFkZXI+XHJcblxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzTG9hZGluZyB8fCBlcnJvcjsgZWxzZSBmYXZvcml0ZXNDb250ZW50XCI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJlcnJvcjsgZWxzZSBsb2FkaW5nXCIgY2xhc3M9XCJtZXNzYWdlLWJveCBlcnJvclwiPlxyXG4gICAgICAgIDxzdHJvbmc+SGliYSB0w7ZydMOpbnQ6PC9zdHJvbmc+IDxzcGFuPiB7eyBlcnJvciB9fTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxuZy10ZW1wbGF0ZSAjbG9hZGluZz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibWVzc2FnZS1ib3ggbG9hZGluZ1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRlclwiPjwvZGl2PlxyXG4gICAgICAgICAgPHA+S2VkdmVuY2VrIGJldMO2bHTDqXNlLi4uPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgPG5nLXRlbXBsYXRlICNmYXZvcml0ZXNDb250ZW50PlxyXG4gICAgICBcclxuICAgICAgPGRpdiAqbmdJZj1cIm1vdmllcy5sZW5ndGggPiAwOyBlbHNlIG5vRmF2b3JpdGVzXCIgY2xhc3M9XCJtZWRpYS1ncmlkXCI+XHJcbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgbW92aWUgb2YgbW92aWVzXCIgY2xhc3M9XCJtZWRpYS1jYXJkXCI+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3N0ZXItd3JhcHBlclwiPlxyXG4gICAgICAgICAgICA8aW1nIFtzcmNdPVwibW92aWUucG9zdGVyVXJsXCIgXHJcbiAgICAgICAgICAgICAgICAgW2FsdF09XCJtb3ZpZS50aXRsZVwiIFxyXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwicG9zdGVyLWltYWdlXCJcclxuICAgICAgICAgICAgICAgICBvbmVycm9yPVwidGhpcy5zcmM9J2h0dHBzOi8vcGxhY2Vob2xkLmNvLzQwMHg2MDAvMGYxNjIzL2ZmZmZmZj90ZXh0PU5vK0NvdmVyJ1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdGVyLW92ZXJsYXlcIj48L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgPGgyIGNsYXNzPVwibWVkaWEtdGl0bGVcIiBbdGl0bGVdPVwibW92aWUudGl0bGVcIj57eyBtb3ZpZS50aXRsZSB9fTwvaDI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtZWRpYS15ZWFyXCI+e3sgbW92aWUucmVsZWFzZVllYXIgfX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGgzIGNsYXNzPVwibWVkaWEtZGlyZWN0b3JcIj5SZW5kZXp0ZToge3sgbW92aWUuZGlyZWN0b3IgfHwgJ0lzbWVyZXRsZW4nIH19PC9oMz5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuICpuZ0Zvcj1cImxldCBnZW5yZSBvZiBtb3ZpZS5nZW5yZXNcIiBjbGFzcz1cInRhZ1wiPnt7IGdlbnJlIH19PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zLXBhbmVsXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlRnJvbUZhdm9yaXRlcyhtb3ZpZS5pZClcIiBjbGFzcz1cImJ0biBidG4tcmVtb3ZlXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb25cIj7wn5eRPC9zcGFuPiBFbHTDoXZvbMOtdMOhc1xyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxuZy10ZW1wbGF0ZSAjbm9GYXZvcml0ZXM+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImVtcHR5LXN0YXRlXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZW1wdHktaWNvblwiPvCfkpQ8L2Rpdj5cclxuICAgICAgICAgIDxwPkplbGVubGVnIG5pbmNzIGVneWV0bGVuIGtlZHZlbmMgZmlsbWVkIHNlbS48L3A+XHJcbiAgICAgICAgICA8cCBjbGFzcz1cInN1Yi10ZXh0XCI+SmVsw7ZsaiBtZWcgcMOhcmF0IGEgZsWRb2xkYWxvbiE8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICA8L21haW4+XHJcbjwvZGl2PiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcclxuLy8gSkFWw41UVkE6IEhlbHllcyBpbXBvcnQgYSB1c2VyLnNlcnZpY2UtYsWRbCAobmVtIHVzZXItcHJvZmlsZS5zZXJ2aWNlKVxyXG5pbXBvcnQgeyBVc2VyU2VydmljZSwgVXNlclByb2ZpbGUgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItcHJvZmlsZS5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXByb2ZpbGUnLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9maWxlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wcm9maWxlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHByb2ZpbGU6IFVzZXJQcm9maWxlIHwgbnVsbCA9IG51bGw7XHJcbiAgaXNMb2FkaW5nID0gdHJ1ZTtcclxuICBlcnJvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcbiAgc3VjY2Vzczogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgLy8gSkFWw41UVkE6IFVzZXJBcGlTZXJ2aWNlIC0+IFVzZXJTZXJ2aWNlXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdGhpcy5hdXRoU2VydmljZS51c2VyO1xyXG5cclxuICAgIGlmICghY3VycmVudFVzZXIpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCaXp0b3PDrXRqdWssIGhvZ3kgYXogSUQgc3rDoW0gbGVneWVuIChiYWNrZW5kIGludC1ldCB2w6FyKVxyXG4gICAgY29uc3QgaWQgPSBOdW1iZXIoY3VycmVudFVzZXIuaWQpO1xyXG5cclxuICAgIGlmIChpc05hTihpZCkpIHtcclxuICAgICAgICB0aGlzLmVycm9yID0gXCLDiXJ2w6lueXRlbGVuIGZlbGhhc3puw6Fsw7NpIGF6b25vc8OtdMOzLlwiO1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlckJ5SWQoaWQpLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6ICh1c2VyKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlID0gdXNlcjtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgICBlcnJvcjogKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2ZpbCBiZXTDtmx0w6lzaSBoaWJhOicsIGVycik7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IChlcnIuc3RhdHVzID09PSA0MDEgfHwgZXJyLnN0YXR1cyA9PT0gNDAzKVxyXG4gICAgICAgICAgPyAnTmluY3Mgam9nb3N1bHRzw6Fnb2QgYSBwcm9maWwgbWVndGVraW50w6lzw6loZXouJ1xyXG4gICAgICAgICAgOiAnTmVtIHNpa2Vyw7xsdCBiZXTDtmx0ZW5pIGEgcHJvZmlsdC4nO1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TYXZlKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLnByb2ZpbGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZXJyb3IgPSBudWxsO1xyXG4gICAgdGhpcy5zdWNjZXNzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLnVwZGF0ZVVzZXIodGhpcy5wcm9maWxlKS5zdWJzY3JpYmUoe1xyXG4gICAgICBuZXh0OiAodXBkYXRlZCkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvZmlsZSA9IHVwZGF0ZWQ7XHJcblxyXG4gICAgICAgIC8vIE9wY2lvbsOhbGlzOiBMb2NhbFN0b3JhZ2UgZnJpc3PDrXTDqXNlLCBoYSBhIHVzZXIgb2JqZWt0dW0gc3RydWt0w7pyw6FqYSBlZ3llemlrXHJcbiAgICAgICAgLy8gVmlnecOheno6IGEgJ3VzZXInIGEgbG9naW4gdsOhbGFzesOhYsOzbCwgYSAndXBkYXRlZCcgYSBwcm9maWxiw7NsIGrDtm4sIGxlaGV0IGVsdMOpcsOpc1xyXG4gICAgICAgIC8vIGNvbnN0IGN1cnJlbnRVc2VyID0gdGhpcy5hdXRoU2VydmljZS51c2VyO1xyXG4gICAgICAgIC8vIGlmIChjdXJyZW50VXNlcikge1xyXG4gICAgICAgIC8vICAgIGNvbnN0IG1lcmdlZFVzZXIgPSB7IC4uLmN1cnJlbnRVc2VyLCAuLi51cGRhdGVkIH07XHJcbiAgICAgICAgLy8gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeShtZXJnZWRVc2VyKSk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICB0aGlzLnN1Y2Nlc3MgPSAnUHJvZmlsIHNpa2VyZXNlbiBmcmlzc8OtdHZlLic7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2lrZXLDvHplbmV0IGVsdMO8bnRldMOpc2UgMyBtw6Fzb2RwZXJjIG3Dumx2YVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MgPSBudWxsO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgICB9LFxyXG4gICAgICBlcnJvcjogKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2ZpbCBtZW50w6lzaSBoaWJhOicsIGVycik7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVyci5lcnJvcj8ubWVzc2FnZSA/PyAnTmVtIHNpa2Vyw7xsdCBmcmlzc8OtdGVuaSBhIHByb2ZpbHQuJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59IiwiPGRpdiBjbGFzcz1cInByb2ZpbGUtcGFnZVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJwcm9maWxlLWNhcmRcIj5cclxuICAgIFxyXG4gICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhdmF0YXItcGxhY2Vob2xkZXJcIj5cclxuICAgICAgICA8c3Bhbj57eyBwcm9maWxlPy51c2VybmFtZT8uY2hhckF0KDApIHx8ICdVJyB9fTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxoMSBjbGFzcz1cInRpdGxlXCI+UHJvZmlsb208L2gxPlxyXG4gICAgICA8cCBjbGFzcz1cInN1YnRpdGxlXCI+QWRhdGFpZCBrZXplbMOpc2U8L3A+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2ICpuZ0lmPVwiaXNMb2FkaW5nXCIgY2xhc3M9XCJsb2FkaW5nLXN0YXRlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgKm5nSWY9XCIhaXNMb2FkaW5nICYmIGVycm9yXCIgY2xhc3M9XCJlcnJvci1tc2dcIj5cclxuICAgICAge3sgZXJyb3IgfX1cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgKm5nSWY9XCJzdWNjZXNzXCIgY2xhc3M9XCJzdWNjZXNzLW1zZ1wiPlxyXG4gICAgICB7eyBzdWNjZXNzIH19XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8Zm9ybSAqbmdJZj1cIiFpc0xvYWRpbmcgJiYgcHJvZmlsZVwiIChuZ1N1Ym1pdCk9XCJvblNhdmUoKVwiIGNsYXNzPVwicHJvZmlsZS1mb3JtXCI+XHJcbiAgICAgIFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbD5GZWxoYXN6bsOhbMOzbsOpdjwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgWyhuZ01vZGVsKV09XCJwcm9maWxlLnVzZXJuYW1lXCIgbmFtZT1cInVzZXJuYW1lXCIgY2xhc3M9XCJpbnB1dC1maWVsZFwiIC8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICA8bGFiZWw+RW1haWwgQ8OtbTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIFsobmdNb2RlbCldPVwicHJvZmlsZS5lbWFpbFwiIG5hbWU9XCJlbWFpbFwiIGNsYXNzPVwiaW5wdXQtZmllbGRcIiAvPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsPlN6ZXJlcGvDtnI8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgW25nTW9kZWxdPVwicHJvZmlsZS5yb2xlXCIgbmFtZT1cInJvbGVcIiBkaXNhYmxlZCBjbGFzcz1cImlucHV0LWZpZWxkIGRpc2FibGVkXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbD5SZWdpc3p0csOhY2nDszwvbGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbbmdNb2RlbF09XCIocHJvZmlsZS5jcmVhdGVkQXQgfCBkYXRlOid5eXl5Lk1NLmRkJylcIiBuYW1lPVwiY3JlYXRlZEF0XCIgZGlzYWJsZWQgY2xhc3M9XCJpbnB1dC1maWVsZCBkaXNhYmxlZFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4tc2F2ZVwiPlxyXG4gICAgICAgIFbDoWx0b3p0YXTDoXNvayBNZW50w6lzZVxyXG4gICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICA8L2Zvcm0+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVc2VyUHJvZmlsZSB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICB1c2VybmFtZTogc3RyaW5nO1xyXG4gIGVtYWlsOiBzdHJpbmc7XHJcbiAgcm9sZTogc3RyaW5nO1xyXG4gIGNyZWF0ZWRBdDogc3RyaW5nO1xyXG4gIHBhc3N3b3JkPzogc3RyaW5nO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBiYXNlVXJsID0gYCR7ZW52aXJvbm1lbnQuYXBpVXJsfS91c2VyYDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxyXG5cclxuICBnZXRVc2VyQnlJZChpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxVc2VyUHJvZmlsZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8VXNlclByb2ZpbGU+KGAke3RoaXMuYmFzZVVybH0vJHtpZH1gKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVVzZXIodXNlcjogVXNlclByb2ZpbGUpOiBPYnNlcnZhYmxlPFVzZXJQcm9maWxlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dDxVc2VyUHJvZmlsZT4oYCR7dGhpcy5iYXNlVXJsfS8ke3VzZXIuaWR9YCwgdXNlcik7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVVc2VyKHVzZXI6IFVzZXJQcm9maWxlKTogT2JzZXJ2YWJsZTxVc2VyUHJvZmlsZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFVzZXJQcm9maWxlPihgJHt0aGlzLmJhc2VVcmx9YCwgdXNlcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVVc2VyKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlPHZvaWQ+KGAke3RoaXMuYmFzZVVybH0vJHtpZH1gKTtcclxuICB9XHJcblxyXG4gIGdldEFsbFVzZXJzKCk6IE9ic2VydmFibGU8VXNlclByb2ZpbGVbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8VXNlclByb2ZpbGVbXT4oYCR7dGhpcy5iYXNlVXJsfWApO1xyXG4gIH1cclxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGZvcmtKb2luLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNb3ZpZSB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL21vdmllLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlY29tbWVuZGF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvcmVjb21tZW5kYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFJhdGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3JhdGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmF2b3JpdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9mYXZvcml0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmlld0hpc3RvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy92aWV3LWhpc3Rvcnkuc2VydmljZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtcmVjb21tZW5kYXRpb25zJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWNvbW1lbmRhdGlvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcmVjb21tZW5kYXRpb24uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZWNvbW1lbmRhdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBtb3ZpZXM6IE1vdmllW10gPSBbXTtcclxuXHJcbiAgbXlSYXRpbmdzID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcclxuICBteUZhdm9yaXRlcyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xyXG4gIG15U2VlbiA9IG5ldyBTZXQ8bnVtYmVyPigpO1xyXG5cclxuICBpc0xvYWRpbmcgPSB0cnVlO1xyXG4gIGVycm9yOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBjdXJyZW50VXNlcklkOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlY29tbWVuZGF0aW9uU2VydmljZTogUmVjb21tZW5kYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByYXRpbmdTZXJ2aWNlOiBSYXRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBmYXZvcml0ZVNlcnZpY2U6IEZhdm9yaXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgdmlld0hpc3RvcnlTZXJ2aWNlOiBWaWV3SGlzdG9yeVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgY3VycmVudFVzZXIgPSB0aGlzLmF1dGhTZXJ2aWNlLnVzZXI7XHJcblxyXG4gICAgaWYgKCFjdXJyZW50VXNlcikge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VyLmlkO1xyXG4gICAgdGhpcy5sb2FkUmVjb21tZW5kYXRpb25zKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvYWRSZWNvbW1lbmRhdGlvbnMoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudFVzZXJJZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5lcnJvciA9IG51bGw7XHJcblxyXG4gICAgZm9ya0pvaW4oe1xyXG4gICAgICByZWNvbW1lbmRhdGlvbnM6IHRoaXMucmVjb21tZW5kYXRpb25TZXJ2aWNlLmdldFJlY29tbWVuZGF0aW9ucyh0aGlzLmN1cnJlbnRVc2VySWQsIDEwKSxcclxuICAgICAgcmF0aW5nczogdGhpcy5yYXRpbmdTZXJ2aWNlLmdldE15UmF0aW5ncygpLFxyXG4gICAgICBmYXZvcml0ZXM6IHRoaXMuZmF2b3JpdGVTZXJ2aWNlLmdldE15RmF2b3JpdGVzKCksXHJcbiAgICAgIHNlZW5IaXN0b3J5OiB0aGlzLnZpZXdIaXN0b3J5U2VydmljZS5nZXRNeVZpZXdIaXN0b3J5KClcclxuICAgIH0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0hpYmEgYXogYWrDoW5sw6Fzb2sgYmV0w7ZsdMOpc2Vrb3I6JywgZXJyKTtcclxuICAgICAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDQpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICdKZWxlbmxlZyBuaW5jcyBlbMOpZyBhZGF0IGFqw6FubMOhc29raG96LiDDiXJ0w6lrZWxqIMOpcyBuw6l6eiBtZWcgbsOpaMOhbnkgZmlsbWV0ISc7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGVyci5zdGF0dXMgPT09IDQwMSB8fCBlcnIuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICdOaW5jcyBqb2dvc3VsdHPDoWdvZCBheiBhasOhbmxvdHQgZmlsbWVrIG1lZ3Rla2ludMOpc8OpaGV6Lic7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yID0gJ0lzbWVyZXRsZW4gaGliYSB0w7ZydMOpbnQgYXogYWrDoW5sw6Fzb2sgYmV0w7ZsdMOpc2Uga8O2emJlbi4nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1vdmllcyA9IGRhdGEucmVjb21tZW5kYXRpb25zO1xyXG5cclxuICAgICAgICB0aGlzLm15UmF0aW5ncyA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5teUZhdm9yaXRlcyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMubXlTZWVuID0gbmV3IFNldDxudW1iZXI+KCk7XHJcblxyXG4gICAgICAgIGRhdGEucmF0aW5ncy5mb3JFYWNoKChyOiBhbnkpID0+IHRoaXMubXlSYXRpbmdzLnNldChyLm1vdmllSWQsIHIuc2NvcmUpKTtcclxuICAgICAgICBkYXRhLmZhdm9yaXRlcy5mb3JFYWNoKChmOiBhbnkpID0+IHRoaXMubXlGYXZvcml0ZXMuYWRkKGYubW92aWVJZCkpO1xyXG4gICAgICAgIGRhdGEuc2Vlbkhpc3RvcnkuZm9yRWFjaCgoczogYW55KSA9PiB0aGlzLm15U2Vlbi5hZGQocy5tb3ZpZUlkKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaXNGYXZvcml0ZShtb3ZpZUlkOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm15RmF2b3JpdGVzLmhhcyhtb3ZpZUlkKTtcclxuICB9XHJcblxyXG4gIGlzU2Vlbihtb3ZpZUlkOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm15U2Vlbi5oYXMobW92aWVJZCk7XHJcbiAgfVxyXG5cclxuICBnZXRSYXRpbmcobW92aWVJZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IHNjb3JlID0gdGhpcy5teVJhdGluZ3MuZ2V0KG1vdmllSWQpIHx8IDA7XHJcbiAgICByZXR1cm4gc2NvcmUgLyAyO1xyXG4gIH1cclxuXHJcbiAgb25SYXRlKG1vdmllSWQ6IG51bWJlciwgcmF0aW5nOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNjb3JlID0gcmF0aW5nICogMjtcclxuICAgIGNvbnN0IG9sZFNjb3JlID0gdGhpcy5teVJhdGluZ3MuZ2V0KG1vdmllSWQpIHx8IDA7XHJcblxyXG4gICAgdGhpcy5teVJhdGluZ3Muc2V0KG1vdmllSWQsIHNjb3JlKTtcclxuICAgIHRoaXMubXlSYXRpbmdzID0gbmV3IE1hcCh0aGlzLm15UmF0aW5ncyk7XHJcblxyXG4gICAgdGhpcy5yYXRpbmdTZXJ2aWNlLnJhdGVNb3ZpZSh7IG1vdmllSWQsIHNjb3JlIH0pLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6ICgpID0+IHt9LFxyXG4gICAgICBlcnJvcjogKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0hpYmEgYXogw6lydMOpa2Vsw6lzIG1lbnTDqXNla29yLCBVSSB2aXNzemHDoWxsw610dmE6JywgZXJyKTtcclxuICAgICAgICB0aGlzLm15UmF0aW5ncy5zZXQobW92aWVJZCwgb2xkU2NvcmUpO1xyXG4gICAgICAgIHRoaXMubXlSYXRpbmdzID0gbmV3IE1hcCh0aGlzLm15UmF0aW5ncyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25Ub2dnbGVGYXZvcml0ZShtb3ZpZUlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IHdhc0Zhdm9yaXRlID0gdGhpcy5pc0Zhdm9yaXRlKG1vdmllSWQpO1xyXG5cclxuICAgIGlmICh3YXNGYXZvcml0ZSkge1xyXG4gICAgICB0aGlzLm15RmF2b3JpdGVzLmRlbGV0ZShtb3ZpZUlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubXlGYXZvcml0ZXMuYWRkKG1vdmllSWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5teUZhdm9yaXRlcyA9IG5ldyBTZXQodGhpcy5teUZhdm9yaXRlcyk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCQgPSB3YXNGYXZvcml0ZVxyXG4gICAgICA/IHRoaXMuZmF2b3JpdGVTZXJ2aWNlLnVuZmF2b3JpdGVNb3ZpZShtb3ZpZUlkKVxyXG4gICAgICA6IHRoaXMuZmF2b3JpdGVTZXJ2aWNlLmZhdm9yaXRlTW92aWUoeyBtb3ZpZUlkIH0pO1xyXG5cclxuICAgIHJlcXVlc3QkLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6ICgpID0+IHt9LFxyXG4gICAgICBlcnJvcjogKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0hpYmEgYSBrZWR2ZW5jIG1lbnTDqXNla29yLCBVSSB2aXNzemHDoWxsw610dmE6JywgZXJyKTtcclxuICAgICAgICBpZiAod2FzRmF2b3JpdGUpIHtcclxuICAgICAgICAgIHRoaXMubXlGYXZvcml0ZXMuYWRkKG1vdmllSWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm15RmF2b3JpdGVzLmRlbGV0ZShtb3ZpZUlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5teUZhdm9yaXRlcyA9IG5ldyBTZXQodGhpcy5teUZhdm9yaXRlcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25Ub2dnbGVTZWVuKG1vdmllSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3Qgd2FzU2VlbiA9IHRoaXMuaXNTZWVuKG1vdmllSWQpO1xyXG5cclxuICAgIGlmICh3YXNTZWVuKSB7XHJcbiAgICAgIHRoaXMubXlTZWVuLmRlbGV0ZShtb3ZpZUlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubXlTZWVuLmFkZChtb3ZpZUlkKTtcclxuICAgIH1cclxuICAgIHRoaXMubXlTZWVuID0gbmV3IFNldCh0aGlzLm15U2Vlbik7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCQgPSB3YXNTZWVuXHJcbiAgICAgID8gdGhpcy52aWV3SGlzdG9yeVNlcnZpY2UucmVtb3ZlRnJvbVNlZW4obW92aWVJZClcclxuICAgICAgOiB0aGlzLnZpZXdIaXN0b3J5U2VydmljZS5tYXJrQXNTZWVuKG1vdmllSWQpO1xyXG5cclxuICAgIHJlcXVlc3QkLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6ICgpID0+IHtcclxuICAgICAgICBpZiAoIXdhc1NlZW4pIHtcclxuICAgICAgICAgIHRoaXMubG9hZFJlY29tbWVuZGF0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6IChlcnIpID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdIaWJhIGEgXCJMw6F0dGFtXCIgbWVudMOpc2Vrb3IsIFVJIHZpc3N6YcOhbGzDrXR2YTonLCBlcnIpO1xyXG4gICAgICAgIGlmICh3YXNTZWVuKSB7XHJcbiAgICAgICAgICB0aGlzLm15U2Vlbi5hZGQobW92aWVJZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubXlTZWVuLmRlbGV0ZShtb3ZpZUlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5teVNlZW4gPSBuZXcgU2V0KHRoaXMubXlTZWVuKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJwYWdlLWNvbnRhaW5lclwiPlxyXG4gIDxtYWluIGNsYXNzPVwiY29udGVudC13cmFwcGVyXCI+XHJcbiAgICBcclxuICAgIDxoZWFkZXIgY2xhc3M9XCJwYWdlLWhlYWRlclwiPlxyXG4gICAgICA8aDEgY2xhc3M9XCJ0aXRsZVwiPk5la2VkIEFqw6FubGp1azwvaDE+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJkZWNvcmF0aW9uLWxpbmVcIj48L2Rpdj5cclxuICAgICAgPHAgY2xhc3M9XCJzdWJ0aXRsZVwiPkF6IEFJIHN6ZXJpbnQgZXplayB0ZXRzemVuaSBmb2duYWsgbmVrZWQ8L3A+XHJcbiAgICA8L2hlYWRlcj5cclxuXHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNMb2FkaW5nIHx8IGVycm9yOyBlbHNlIHJlY0NvbnRlbnRcIj5cclxuICAgICAgPGRpdiAqbmdJZj1cImVycm9yOyBlbHNlIGxvYWRpbmdcIiBjbGFzcz1cIm1lc3NhZ2UtYm94IGVycm9yXCI+XHJcbiAgICAgICAgPHN0cm9uZz5IaWJhIHTDtnJ0w6ludDo8L3N0cm9uZz4gPHNwYW4+IHt7IGVycm9yIH19PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPG5nLXRlbXBsYXRlICNsb2FkaW5nPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlLWJveCBsb2FkaW5nXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PC9kaXY+XHJcbiAgICAgICAgICA8cD5BSSBlbGVtesOpcyBmdXR0YXTDoXNhLi4uPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgPG5nLXRlbXBsYXRlICNyZWNDb250ZW50PlxyXG4gICAgICBcclxuICAgICAgPGRpdiAqbmdJZj1cIm1vdmllcy5sZW5ndGggPiAwOyBlbHNlIG5vUmVjc1wiIGNsYXNzPVwibWVkaWEtZ3JpZFwiPlxyXG4gICAgICAgIFxyXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IG1vdmllIG9mIG1vdmllc1wiIGNsYXNzPVwibWVkaWEtY2FyZFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3Rlci13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgIDxpbWcgW3NyY109XCJtb3ZpZS5wb3N0ZXJVcmxcIiBbYWx0XT1cIm1vdmllLnRpdGxlXCIgY2xhc3M9XCJwb3N0ZXItaW1hZ2VcIiBvbmVycm9yPVwidGhpcy5zcmM9J2h0dHBzOi8vcGxhY2Vob2xkLmNvLzQwMHg2MDAvMGYxNjIzL2ZmZmZmZj90ZXh0PU5vK0NvdmVyJ1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdGVyLW92ZXJsYXlcIj48L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgPGgyIGNsYXNzPVwibWVkaWEtdGl0bGVcIiBbdGl0bGVdPVwibW92aWUudGl0bGVcIj57eyBtb3ZpZS50aXRsZSB9fTwvaDI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwibWVkaWEtZGVzY1wiPnt7IG1vdmllLmRlc2NyaXB0aW9uIH19PC9wPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8bmctdGVtcGxhdGUgI25vUmVjcz5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZW1wdHktc3RhdGVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1pY29uXCI+8J+kljwvZGl2PlxyXG4gICAgICAgICAgPHA+TcOpZyB0YW51bGp1ayBheiDDrXpsw6lzZWRldC48L3A+XHJcbiAgICAgICAgICA8cCBjbGFzcz1cInN1Yi10ZXh0XCI+w4lydMOpa2VsaiB0w7ZiYiBmaWxtZXQsIGhvZ3kgcG9udG9zYWJiIGFqw6FubMOhc29rYXQga2FwaGFzcyE8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICA8L21haW4+XHJcbjwvZGl2PiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudHMnO1xyXG5pbXBvcnQgeyBNb3ZpZSB9IGZyb20gJy4uL21vZGVscy9tb3ZpZS5tb2RlbHMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVjb21tZW5kYXRpb25TZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBiYXNlVXJsID0gYCR7ZW52aXJvbm1lbnQuYXBpVXJsfS9yZWNvbW1lbmRhdGlvbmA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgZ2V0UmVjb21tZW5kYXRpb25zKHVzZXJJZDogbnVtYmVyLCBjb3VudDogbnVtYmVyID0gMTApOiBPYnNlcnZhYmxlPE1vdmllW10+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PE1vdmllW10+KGAke3RoaXMuYmFzZVVybH0vJHt1c2VySWR9YCwge1xyXG4gICAgICBwYXJhbXM6IHsgY291bnQgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBNb3ZpZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL21vdmllLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHZW5yZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2dlbnJlLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgTW92aWUsIENyZWF0ZU1vdmllRHRvLCBVcGRhdGVNb3ZpZUR0byB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL21vdmllLm1vZGVscyc7XHJcbmltcG9ydCB7IEdlbnJlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tb2RlbHMvZ2VucmUubW9kZWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLW1hbmFnZS1tb3ZpZXMnLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJvdXRlck1vZHVsZV0sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21hbmFnZS1tb3ZpZXMuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWFuYWdlLW1vdmllcy5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFuYWdlTW92aWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgbW92aWVzOiBNb3ZpZVtdID0gW107XHJcbiAgZ2VucmVzOiBHZW5yZVtdID0gW107XHJcbiAgaXNGb3JtT3BlbiA9IGZhbHNlO1xyXG4gIGVkaXRpbmdNb3ZpZTogTW92aWUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgZm9ybU1vZGVsOiBDcmVhdGVNb3ZpZUR0byB8IFVwZGF0ZU1vdmllRHRvID0ge1xyXG4gICAgdGl0bGU6ICcnLFxyXG4gICAgZGVzY3JpcHRpb246ICcnLFxyXG4gICAgcmVsZWFzZVllYXI6IDIwMDAsXHJcbiAgICBwb3N0ZXJVcmw6ICcnLFxyXG4gICAgZGlyZWN0b3I6ICcnLFxyXG4gICAgZ2VucmVJZHM6IFtdXHJcbiAgfTtcclxuXHJcbiAgaXNMb2FkaW5nID0gdHJ1ZTtcclxuICBlcnJvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIC8vIEtlcmVzw6lzXHJcbiAgc2VhcmNoVGVybTogc3RyaW5nID0gJyc7XHJcbiAgc2VhcmNoRmllbGQ6ICdhbGwnIHwgJ3RpdGxlJyB8ICdkaXJlY3RvcicgfCAnZ2VucmUnID0gJ2FsbCc7XHJcbiAgaXNTZWFyY2hEcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuXHJcbiAgYWxsR2VucmVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIGdlbnJlU3VnZ2VzdGlvbnM6IHN0cmluZ1tdID0gW107XHJcbiAgc2VsZWN0ZWRHZW5yZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb3ZpZVNlcnZpY2U6IE1vdmllU2VydmljZSxcclxuICAgIHByaXZhdGUgZ2VucmVTZXJ2aWNlOiBHZW5yZVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2FkTW92aWVzKCk7XHJcbiAgICB0aGlzLmxvYWRHZW5yZXMoKTtcclxuICB9XHJcblxyXG4gIGxvYWRNb3ZpZXMoKSB7XHJcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB0aGlzLm1vdmllU2VydmljZS5nZXRNb3ZpZXMoKS5zdWJzY3JpYmUoe1xyXG4gICAgICBuZXh0OiAocmVzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5tb3ZpZXMgPSByZXM7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6ICgpID0+IHtcclxuICAgICAgICB0aGlzLmVycm9yID0gJ05lbSBzaWtlcsO8bHQgYmV0w7ZsdGVuaSBhIGZpbG1la2V0Lic7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsb2FkR2VucmVzKCkge1xyXG4gICAgdGhpcy5nZW5yZVNlcnZpY2UuZ2V0R2VucmVzKCkuc3Vic2NyaWJlKHtcclxuICAgICAgbmV4dDogKHJlcykgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2VucmVzID0gcmVzO1xyXG4gICAgICAgIHRoaXMuYWxsR2VucmVzID0gdGhpcy5nZW5yZXMubWFwKGcgPT4gZy5uYW1lKS5zb3J0KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9ICdOZW0gc2lrZXLDvGx0IGJldMO2bHRlbmkgYSBtxbFmYWpva2F0Lic7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gS0VSRVPDiVNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgdG9nZ2xlU2VhcmNoRHJvcGRvd24oKTogdm9pZCB7XHJcbiAgICB0aGlzLmlzU2VhcmNoRHJvcGRvd25PcGVuID0gIXRoaXMuaXNTZWFyY2hEcm9wZG93bk9wZW47XHJcbiAgfVxyXG5cclxuICBzZXRTZWFyY2hGaWVsZChmaWVsZDogJ2FsbCcgfCAndGl0bGUnIHwgJ2RpcmVjdG9yJyB8ICdnZW5yZScpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VhcmNoRmllbGQgPSBmaWVsZDtcclxuICAgIHRoaXMuaXNTZWFyY2hEcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldFNlYXJjaEZpZWxkTGFiZWwoKTogc3RyaW5nIHtcclxuICAgIHN3aXRjaCAodGhpcy5zZWFyY2hGaWVsZCkge1xyXG4gICAgICBjYXNlICd0aXRsZSc6IHJldHVybiAnQ8OtbSc7XHJcbiAgICAgIGNhc2UgJ2RpcmVjdG9yJzogcmV0dXJuICdSZW5kZXrFkSc7XHJcbiAgICAgIGNhc2UgJ2dlbnJlJzogcmV0dXJuICdNxbFmYWonO1xyXG4gICAgICBkZWZhdWx0OiByZXR1cm4gJ01pbmRlbic7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblNlYXJjaFRlcm1DaGFuZ2UodGVybTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSB0ZXJtO1xyXG5cclxuICAgIGlmICh0aGlzLnNlYXJjaEZpZWxkID09PSAnZ2VucmUnKSB7XHJcbiAgICAgIGNvbnN0IHQgPSB0ZXJtLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBpZiAoIXQpIHJldHVybjtcclxuXHJcbiAgICAgIHRoaXMuZ2VucmVTdWdnZXN0aW9ucyA9IHRoaXMuYWxsR2VucmVzLmZpbHRlcihnID0+XHJcbiAgICAgICAgZy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHQpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZWxlY3RHZW5yZShnZW5yZU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gIGNvbnN0IGdlbnJlID0gdGhpcy5nZW5yZXMuZmluZChnID0+IGcubmFtZSA9PT0gZ2VucmVOYW1lKTtcclxuICBpZiAoIWdlbnJlKSByZXR1cm47XHJcbiAgdGhpcy5zZWxlY3RlZEdlbnJlID0gZ2VucmUuaWQudG9TdHJpbmcoKTsgIFxyXG4gIHRoaXMuc2VhcmNoVGVybSA9IGdlbnJlTmFtZTtcclxuICB0aGlzLmdlbnJlU3VnZ2VzdGlvbnMgPSBbXTtcclxufVxyXG5wcml2YXRlIGdldEdlbnJlcyhtb3ZpZTogTW92aWUpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIG1vdmllLmdlbnJlcz8ubWFwKGcgPT4gZy50b0xvd2VyQ2FzZSgpKSA/PyBbXTtcclxufVxyXG5cclxuZ2V0IGZpbHRlcmVkTW92aWVzKCk6IE1vdmllW10ge1xyXG4gIGNvbnN0IHRlcm0gPSB0aGlzLnNlYXJjaFRlcm0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gIC8vIC0tLSBHRU5SRSBGSUxURVIgLS0tXHJcbiAgaWYgKHRoaXMuc2VhcmNoRmllbGQgPT09ICdnZW5yZScpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RlZEdlbnJlKSByZXR1cm4gdGhpcy5tb3ZpZXM7XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkR2VucmUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5tb3ZpZXMuZmlsdGVyKG0gPT5cclxuICAgICAgdGhpcy5nZXRHZW5yZXMobSkuc29tZShnZW5yZU5hbWUgPT4gZ2VucmVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHNlbGVjdGVkKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIC0tLSDDnFJFUyBLRVJFU8WQIC0tLVxyXG4gIGlmICghdGVybSkgcmV0dXJuIHRoaXMubW92aWVzO1xyXG5cclxuICAvLyAtLS0gw4FMVEFMw4FOT1MgS0VSRVPDiVMgLS0tXHJcbiAgcmV0dXJuIHRoaXMubW92aWVzLmZpbHRlcihtb3ZpZSA9PiB7XHJcbiAgICBjb25zdCB0aXRsZSA9IG1vdmllLnRpdGxlPy50b0xvd2VyQ2FzZSgpID8/ICcnO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBtb3ZpZS5kZXNjcmlwdGlvbj8udG9Mb3dlckNhc2UoKSA/PyAnJztcclxuICAgIGNvbnN0IGRpcmVjdG9yID0gbW92aWUuZGlyZWN0b3I/LnRvTG93ZXJDYXNlKCkgPz8gJyc7XHJcbiAgICBjb25zdCBnZW5yZU5hbWVzID0gdGhpcy5nZXRHZW5yZXMobW92aWUpLm1hcChnID0+IGcudG9Mb3dlckNhc2UoKSk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLnNlYXJjaEZpZWxkKSB7XHJcbiAgICAgIGNhc2UgJ3RpdGxlJzpcclxuICAgICAgICByZXR1cm4gdGl0bGUuaW5jbHVkZXModGVybSk7XHJcblxyXG4gICAgICBjYXNlICdkaXJlY3Rvcic6XHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yLmluY2x1ZGVzKHRlcm0pO1xyXG5cclxuICAgICAgY2FzZSAnYWxsJzpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgdGl0bGUuaW5jbHVkZXModGVybSkgfHxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uLmluY2x1ZGVzKHRlcm0pIHx8XHJcbiAgICAgICAgICBkaXJlY3Rvci5pbmNsdWRlcyh0ZXJtKSB8fFxyXG4gICAgICAgICAgZ2VucmVOYW1lcy5zb21lKGcgPT4gZy5pbmNsdWRlcyh0ZXJtKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5nZXRHZW5yZU5hbWUoaWQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHRoaXMuZ2VucmVzLmZpbmQoZyA9PiBnLmlkID09PSBpZCk/Lm5hbWUgPz8gJ0lzbWVyZXRsZW4nO1xyXG59XHJcblxyXG5vbkdlbnJlQ2hlY2tib3hDaGFuZ2VkKGV2ZW50OiBFdmVudCwgZ2VucmVJZDogbnVtYmVyKSB7XHJcbiAgY29uc3QgY2hlY2tlZCA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZDtcclxuICBpZiAoY2hlY2tlZCkge1xyXG4gICAgaWYgKCF0aGlzLmZvcm1Nb2RlbC5nZW5yZUlkcy5pbmNsdWRlcyhnZW5yZUlkKSkgdGhpcy5mb3JtTW9kZWwuZ2VucmVJZHMucHVzaChnZW5yZUlkKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3QgaWR4ID0gdGhpcy5mb3JtTW9kZWwuZ2VucmVJZHMuaW5kZXhPZihnZW5yZUlkKTtcclxuICAgIGlmIChpZHggIT09IC0xKSB0aGlzLmZvcm1Nb2RlbC5nZW5yZUlkcy5zcGxpY2UoaWR4LCAxKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE3FsEZBSiBWw4FMQVNaVMOBUyDigJMgSUQta2V0IHTDoXJvbHVuayFcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgb25HZW5yZUNoYW5nZShnZW5yZUlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5mb3JtTW9kZWwuZ2VucmVJZHMuaW5kZXhPZihnZW5yZUlkKTtcclxuXHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMuZm9ybU1vZGVsLmdlbnJlSWRzLnB1c2goZ2VucmVJZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm1Nb2RlbC5nZW5yZUlkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUExBS8OBVCBLRVpFTMOJU0VcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgb25GaWxlQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF07XHJcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgcmVhZGVyLm9ubG9hZCA9IChlOiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5mb3JtTW9kZWwucG9zdGVyVXJsID0gZS50YXJnZXQucmVzdWx0O1xyXG4gICAgfTtcclxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gRk9STSBOWUlUw4FTXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIGFkZE1vdmllKCkge1xyXG4gICAgdGhpcy5pc0Zvcm1PcGVuID0gdHJ1ZTtcclxuICAgIHRoaXMuZWRpdGluZ01vdmllID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmZvcm1Nb2RlbCA9IHtcclxuICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJycsXHJcbiAgICAgIHJlbGVhc2VZZWFyOiAyMDAwLFxyXG4gICAgICBwb3N0ZXJVcmw6ICcnLFxyXG4gICAgICBkaXJlY3RvcjogJycsXHJcbiAgICAgIGdlbnJlSWRzOiBbXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGVkaXRNb3ZpZShtb3ZpZTogTW92aWUpIHtcclxuICAgIHRoaXMuaXNGb3JtT3BlbiA9IHRydWU7XHJcbiAgICB0aGlzLmVkaXRpbmdNb3ZpZSA9IG1vdmllO1xyXG5cclxuICAgIHRoaXMuZm9ybU1vZGVsID0ge1xyXG4gICAgICBpZDogbW92aWUuaWQsXHJcbiAgICAgIHRpdGxlOiBtb3ZpZS50aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb246IG1vdmllLmRlc2NyaXB0aW9uLFxyXG4gICAgICByZWxlYXNlWWVhcjogbW92aWUucmVsZWFzZVllYXIsXHJcbiAgICAgIHBvc3RlclVybDogbW92aWUucG9zdGVyVXJsLFxyXG4gICAgICBkaXJlY3RvcjogbW92aWUuZGlyZWN0b3IgfHwgJycsXHJcbiAgICAgIGdlbnJlSWRzOiBtb3ZpZS5nZW5yZUlkcyB8fCBbXSAgIC8vIEZPTlRPUyEhXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTUVOVMOJU1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBzYXZlTW92aWUoKSB7XHJcbiAgICBpZiAoIXRoaXMuZWRpdGluZ01vdmllKSB7XHJcbiAgICAgIC8vIMOaaiBmaWxtXHJcbiAgICAgIGNvbnN0IGR0bzogQ3JlYXRlTW92aWVEdG8gPSB7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMuZm9ybU1vZGVsLnRpdGxlLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmZvcm1Nb2RlbC5kZXNjcmlwdGlvbixcclxuICAgICAgICByZWxlYXNlWWVhcjogdGhpcy5mb3JtTW9kZWwucmVsZWFzZVllYXIsXHJcbiAgICAgICAgcG9zdGVyVXJsOiB0aGlzLmZvcm1Nb2RlbC5wb3N0ZXJVcmwsXHJcbiAgICAgICAgZGlyZWN0b3I6IHRoaXMuZm9ybU1vZGVsLmRpcmVjdG9yLFxyXG4gICAgICAgIGdlbnJlSWRzOiB0aGlzLmZvcm1Nb2RlbC5nZW5yZUlkc1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5tb3ZpZVNlcnZpY2UuY3JlYXRlKGR0bykuc3Vic2NyaWJlKHtcclxuICAgICAgICBuZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmlzRm9ybU9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubG9hZE1vdmllcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTemVya2VzenTDqXNcclxuICAgICAgY29uc3QgZHRvOiBVcGRhdGVNb3ZpZUR0byA9IHtcclxuICAgICAgICBpZDogdGhpcy5lZGl0aW5nTW92aWUuaWQsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuZm9ybU1vZGVsLnRpdGxlLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmZvcm1Nb2RlbC5kZXNjcmlwdGlvbixcclxuICAgICAgICByZWxlYXNlWWVhcjogdGhpcy5mb3JtTW9kZWwucmVsZWFzZVllYXIsXHJcbiAgICAgICAgcG9zdGVyVXJsOiB0aGlzLmZvcm1Nb2RlbC5wb3N0ZXJVcmwsXHJcbiAgICAgICAgZGlyZWN0b3I6IHRoaXMuZm9ybU1vZGVsLmRpcmVjdG9yLFxyXG4gICAgICAgIGdlbnJlSWRzOiB0aGlzLmZvcm1Nb2RlbC5nZW5yZUlkc1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5tb3ZpZVNlcnZpY2UudXBkYXRlKHRoaXMuZWRpdGluZ01vdmllLmlkLCBkdG8pLnN1YnNjcmliZSh7XHJcbiAgICAgICAgbmV4dDogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc0Zvcm1PcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxvYWRNb3ZpZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xvc2VGb3JtKCkge1xyXG4gICAgdGhpcy5pc0Zvcm1PcGVuID0gZmFsc2U7XHJcbiAgICB0aGlzLmVkaXRpbmdNb3ZpZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBkZWxldGVNb3ZpZShpZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoY29uZmlybSgnQml6dG9zYW4gdMO2csO2bG5pIHN6ZXJldG7DqWQ/JykpIHtcclxuICAgICAgdGhpcy5tb3ZpZVNlcnZpY2UuZGVsZXRlKGlkKS5zdWJzY3JpYmUoe1xyXG4gICAgICAgIG5leHQ6ICgpID0+IHRoaXMubG9hZE1vdmllcygpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiYWRtaW4tcGFnZVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250ZW50LXdyYXBwZXJcIj5cclxuICAgIFxyXG4gICAgPCEtLSBIZWFkZXIgLS0+XHJcbiAgICA8aGVhZGVyIGNsYXNzPVwicGFnZS1oZWFkZXJcIj5cclxuICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj5GaWxtIEtlemVsxZE8L2gxPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZGVjb3JhdGlvbi1saW5lXCI+PC9kaXY+XHJcbiAgICAgIDxwIGNsYXNzPVwic3VidGl0bGVcIj5BZG1pbmlzenRyw6FjacOzcyBmZWzDvGxldDwvcD5cclxuICAgIDwvaGVhZGVyPlxyXG5cclxuICAgIDwhLS0gU2VhcmNoICYgVG9vbGJhciAtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b29sYmFyLXNlY3Rpb25cIj5cclxuICAgICAgXHJcbiAgICAgIDwhLS0gU2VhcmNoIEJhciAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1iYXJcIj5cclxuICAgICAgICBcclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImZpbHRlci10b2dnbGUtYnRuXCIgKGNsaWNrKT1cInRvZ2dsZVNlYXJjaERyb3Bkb3duKClcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsdGVyLWxhYmVsXCI+e3sgZ2V0U2VhcmNoRmllbGRMYWJlbCgpIH19PC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWx0ZXItYXJyb3dcIj7ilrw8L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgY2xhc3M9XCJzZWFyY2gtaW5wdXRcIlxyXG4gICAgICAgICAgW25nTW9kZWxdPVwic2VhcmNoVGVybVwiXHJcbiAgICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvblNlYXJjaFRlcm1DaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIktlcmVzw6lzLi4uXCIgLz5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1pY29uLXdyYXBwZXJcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvblwiPvCflI08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwhLS0gRHJvcGRvd24gbWVudSAtLT5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTZWFyY2hEcm9wZG93bk9wZW5cIiBjbGFzcz1cImRyb3Bkb3duLW1lbnUgZmFkZS1pblwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAoY2xpY2spPVwic2V0U2VhcmNoRmllbGQoJ2FsbCcpXCI+TWluZGVuPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIChjbGljayk9XCJzZXRTZWFyY2hGaWVsZCgndGl0bGUnKVwiPkPDrW08L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldFNlYXJjaEZpZWxkKCdkaXJlY3RvcicpXCI+UmVuZGV6xZE8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNldFNlYXJjaEZpZWxkKCdnZW5yZScpXCI+TcWxZmFqPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwhLS0gR2VucmUgc3VnZ2VzdGlvbnMgLS0+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cInNlYXJjaEZpZWxkID09PSAnZ2VucmUnICYmIGdlbnJlU3VnZ2VzdGlvbnMubGVuZ3RoID4gMCAmJiBzZWFyY2hUZXJtXCIgY2xhc3M9XCJzdWdnZXN0aW9ucy1tZW51IGZhZGUtaW5cIj5cclxuICAgICAgICAgIDxidXR0b24gKm5nRm9yPVwibGV0IGcgb2YgZ2VucmVTdWdnZXN0aW9uc1wiIGNsYXNzPVwic3VnZ2VzdGlvbi1pdGVtXCIgKGNsaWNrKT1cInNlbGVjdEdlbnJlKGcpXCI+XHJcbiAgICAgICAgICAgIHt7IGcgfX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8IS0tIEFjdGlvbiBCdXR0b25zIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uLWJ1dHRvbnNcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiByb3V0ZXJMaW5rPVwiL2FkbWluLWRhc2hib2FyZFwiPlxyXG4gICAgICAgICAg4oaQIFZpc3N6YSBhIERhc2hib2FyZHJhXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tYWRkXCIgKGNsaWNrKT1cImFkZE1vdmllKClcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvblwiPis8L3NwYW4+IMOaaiBGaWxtXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgXHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDwhLS0gTW92aWUgR3JpZCAtLT5cclxuICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXJlZE1vdmllcy5sZW5ndGggPiAwOyBlbHNlIGVtcHR5U3RhdGVcIiBjbGFzcz1cIm1lZGlhLWdyaWRcIj5cclxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgbW92aWUgb2YgZmlsdGVyZWRNb3ZpZXNcIiBjbGFzcz1cIm1lZGlhLWNhcmRcIj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBvc3Rlci13cmFwcGVyXCI+XHJcbiAgICAgICAgICA8aW1nIFxyXG4gICAgICAgICAgICBbc3JjXT1cIm1vdmllLnBvc3RlclVybCB8fCAnaHR0cHM6Ly9wbGFjZWhvbGQuY28vNDAweDYwMC8wZjE2MjMvZmZmZmZmP3RleHQ9Tm8rUG9zdGVyJ1wiXHJcbiAgICAgICAgICAgIFthbHRdPVwibW92aWUudGl0bGVcIlxyXG4gICAgICAgICAgICBjbGFzcz1cInBvc3Rlci1pbWFnZVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInBvc3Rlci1vdmVybGF5XCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRtaW4tYmFkZ2VcIj5JRDoge3sgbW92aWUuaWQgfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxoMiBjbGFzcz1cIm1lZGlhLXRpdGxlXCIgW3RpdGxlXT1cIm1vdmllLnRpdGxlXCI+e3sgbW92aWUudGl0bGUgfX08L2gyPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1lZGlhLXllYXJcIj57eyBtb3ZpZS5yZWxlYXNlWWVhciB9fTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxoMyBjbGFzcz1cIm1lZGlhLWRpcmVjdG9yXCI+UmVuZGV6dGU6IHt7IG1vdmllLmRpcmVjdG9yIHx8ICdJc21lcmV0bGVuJyB9fTwvaDM+XHJcblxyXG4gICAgICAgICAgPHAgY2xhc3M9XCJtZWRpYS1kZXNjXCIgW3RpdGxlXT1cIm1vdmllLmRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgIHt7IG1vdmllLmRlc2NyaXB0aW9uIH19XHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYXRpbmctcm93XCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmF0aW5nLXN0YXJcIj7irZA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicmF0aW5nLXZhbHVlXCI+e3sgbW92aWUuYXZlcmFnZVJhdGluZyB9fS8xMDwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZ1wiICpuZ0Zvcj1cImxldCBnZW5yZSBvZiBtb3ZpZS5nZW5yZXNcIj5cclxuICAgICAgICAgICAgICB7eyBnZW5yZSB9fVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+PC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1lZGl0XCIgKGNsaWNrKT1cImVkaXRNb3ZpZShtb3ZpZSlcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb25cIj7inI/vuI88L3NwYW4+IFN6ZXJrZXN6dMOpc1xyXG4gICAgICAgICAgICA8L2J1dHRvbj48YnI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlbGV0ZVwiIChjbGljayk9XCJkZWxldGVNb3ZpZShtb3ZpZS5pZClcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb25cIj7wn5eR77iPPC9zcGFuPiBUw7ZybMOpc1xyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8IS0tIEVtcHR5IFN0YXRlIC0tPlxyXG4gICAgPG5nLXRlbXBsYXRlICNlbXB0eVN0YXRlPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZW1wdHktbWVzc2FnZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1pY29uXCI+8J+TrTwvZGl2PlxyXG4gICAgICAgIDxwPk5pbmNzZW5layBtZWdqZWxlbsOtdGhldMWRIGZpbG1lay48L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgPC9kaXY+XHJcblxyXG4gIDwhLS0gTU9EQUwgT1ZFUkxBWSAtLT5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtb3ZlcmxheVwiIFtjbGFzcy5hY3RpdmVdPVwiaXNGb3JtT3BlblwiIChjbGljayk9XCJjbG9zZUZvcm0oKVwiPiA8IS0tIEtsaWtrIGEgaMOhdHTDqXJyZSBiZXrDoXJqYSAob3BjaW9uw6FsaXMpIC0tPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRhaW5lclwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj4gPCEtLSBNZWdha2Fkw6FseW96emEgYSBiZXrDoXLDoXN0IGhhIGEgZm9ybXJhIGthdHRpbnRhc3ogLS0+XHJcbiAgICAgIFxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgPGgyIGNsYXNzPVwibW9kYWwtdGl0bGVcIj57eyBlZGl0aW5nTW92aWUgPyAnRmlsbSBTemVya2VzenTDqXNlJyA6ICfDmmogRmlsbSBIb3p6w6FhZMOhc2EnIH19PC9oMj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLWNsb3NlXCIgKGNsaWNrKT1cImNsb3NlRm9ybSgpXCI+w5c8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8Zm9ybSAobmdTdWJtaXQpPVwic2F2ZU1vdmllKClcIiBjbGFzcz1cIm1vZGFsLWZvcm1cIj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbD5Dw61tPC9sYWJlbD5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFsobmdNb2RlbCldPVwiZm9ybU1vZGVsLnRpdGxlXCIgbmFtZT1cInRpdGxlXCIgY2xhc3M9XCJpbnB1dC1maWVsZFwiIHJlcXVpcmVkIHBsYWNlaG9sZGVyPVwiUGwuIEVyZWRldFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPk1lZ2plbGVuw6lzaSDDqXY8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIFsobmdNb2RlbCldPVwiZm9ybU1vZGVsLnJlbGVhc2VZZWFyXCIgbmFtZT1cInJlbGVhc2VZZWFyXCIgY2xhc3M9XCJpbnB1dC1maWVsZFwiIHBsYWNlaG9sZGVyPVwiMjAxMFwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbD5SZW5kZXrFkTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFsobmdNb2RlbCldPVwiZm9ybU1vZGVsLmRpcmVjdG9yXCIgbmFtZT1cImRpcmVjdG9yXCIgY2xhc3M9XCJpbnB1dC1maWVsZFwiIHBsYWNlaG9sZGVyPVwiQ2hyaXN0b3BoZXIgTm9sYW5cIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGFiZWw+UG9zenRlciBVUkw8L2xhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgWyhuZ01vZGVsKV09XCJmb3JtTW9kZWwucG9zdGVyVXJsXCIgbmFtZT1cInBvc3RlclVybFwiIGNsYXNzPVwiaW5wdXQtZmllbGRcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vLi4uXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgIDxsYWJlbD5MZcOtcsOhczwvbGFiZWw+XHJcbiAgICAgICAgICA8dGV4dGFyZWEgWyhuZ01vZGVsKV09XCJmb3JtTW9kZWwuZGVzY3JpcHRpb25cIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBjbGFzcz1cImlucHV0LWZpZWxkIHRleHRhcmVhXCIgcmVxdWlyZWQgcGxhY2Vob2xkZXI9XCJSw7Z2aWQgdGFydGFsb20uLi5cIj48L3RleHRhcmVhPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgPGxhYmVsPk3FsWZham9rPC9sYWJlbD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnZW5yZS1ncmlkXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCAqbmdGb3I9XCJsZXQgZyBvZiBnZW5yZXNcIiBjbGFzcz1cImdlbnJlLWNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cIihmb3JtTW9kZWwuZ2VucmVJZHMgfHwgW10pLmluY2x1ZGVzKGcuaWQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbkdlbnJlQ2hlY2tib3hDaGFuZ2VkKCRldmVudCwgZy5pZClcIiAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hlY2tib3gtbGFiZWxcIj57eyBnLm5hbWUgfX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIChjbGljayk9XCJjbG9zZUZvcm0oKVwiPk3DqWdzZTwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj5cclxuICAgICAgICAgICAge3sgZWRpdGluZ01vdmllID8gJ03Ds2Rvc8OtdMOhc29rIE1lbnTDqXNlJyA6ICdGaWxtIEzDqXRyZWhvesOhc2EnIH19XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDwvZm9ybT5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuPC9kaXY+IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEdlbnJlIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvZ2VucmUubW9kZWxzJztcclxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnRzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHZW5yZVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgZ2VucmVVcmwgPSBgJHtlbnZpcm9ubWVudC5hcGlVcmx9L0dlbnJlYDsgIC8vIEJhY2tlbmQgQVBJIFVSTFxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XHJcblxyXG4gIC8vIE3FsWZham9rIGxla8OpcsOpc2VcclxuICBnZXRHZW5yZXMoKTogT2JzZXJ2YWJsZTxHZW5yZVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxHZW5yZVtdPih0aGlzLmdlbnJlVXJsKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU3RhdGlzdGljc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3N0YXRpc3RpY3Muc2VydmljZSc7XHJcbmltcG9ydCB7IFVzZXJTdGF0aXN0aWNzIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvc3RhdGlzdGljcy5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcclxuXHJcbmludGVyZmFjZSBMZWFkZXJib2FyZEl0ZW0gZXh0ZW5kcyBVc2VyU3RhdGlzdGljcyB7XHJcbiAgcG9pbnRzOiBudW1iZXI7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWxlYWRlcmJvYXJkJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sZWFkZXJib2FyZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGVhZGVyYm9hcmQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMZWFkZXJib2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGl0ZW1zOiBMZWFkZXJib2FyZEl0ZW1bXSA9IFtdO1xyXG4gIGlzTG9hZGluZyA9IHRydWU7XHJcbiAgZXJyb3I6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjdXJyZW50VXNlcklkOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0YXRpc3RpY3NTZXJ2aWNlOiBTdGF0aXN0aWNzU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmF1dGhTZXJ2aWNlLnVzZXI7XHJcbiAgICB0aGlzLmN1cnJlbnRVc2VySWQgPSB1c2VyID8gdXNlci5pZCA6IG51bGw7XHJcblxyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5lcnJvciA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5zdGF0aXN0aWNzU2VydmljZS5nZXRNb3N0QWN0aXZlVXNlcnMoNTApLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IGRhdGFcclxuICAgICAgICAgIC5tYXAodSA9PiAoe1xyXG4gICAgICAgICAgICAuLi51LFxyXG4gICAgICAgICAgICBwb2ludHM6IHUudG90YWxSYXRpbmdzICogMyArIHUudG90YWxGYXZvcml0ZXMgKiAyICsgdS50b3RhbFZpZXdzICogMVxyXG4gICAgICAgICAgfSkpXHJcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5wb2ludHMgLSBhLnBvaW50cyB8fCBhLnVzZXJuYW1lLmxvY2FsZUNvbXBhcmUoYi51c2VybmFtZSkpO1xyXG5cclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgICBlcnJvcjogKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0hpYmEgYSByYW5nbGlzdGEgYmV0w7ZsdMOpc2Vrb3I6JywgZXJyKTtcclxuICAgICAgICB0aGlzLmVycm9yID0gJ05lbSBzaWtlcsO8bHQgYmV0w7ZsdGVuaSBhIHJhbmdsaXN0w6F0Lic7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpc0N1cnJlbnRVc2VyKGl0ZW06IExlYWRlcmJvYXJkSXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXJJZCAhPT0gbnVsbCAmJiBpdGVtLnVzZXJJZCA9PT0gdGhpcy5jdXJyZW50VXNlcklkO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwibGVhZGVyYm9hcmQtcGFnZVwiPlxyXG4gIDxtYWluIGNsYXNzPVwiY29udGVudC13cmFwcGVyXCI+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImhlYWRlci1zZWN0aW9uXCI+XHJcbiAgICAgIDxoMSBjbGFzcz1cInBhZ2UtdGl0bGVcIj5GZWxoYXN6bsOhbMOzaSBSYW5nbGlzdGE8L2gxPlxyXG4gICAgICA8cCBjbGFzcz1cInNjb3JpbmctaW5mb1wiPlxyXG4gICAgICAgIFBvbnRzesOhbcOtdMOhczogPHNwYW4gY2xhc3M9XCJoaWdobGlnaHQtcnVsZVwiPjPDlyDDqXJ0w6lrZWzDqXMgKyAyw5cga2VkdmVuYyArIDHDlyBtZWd0ZWtpbnTDqXM8L3NwYW4+XHJcbiAgICAgIDwvcD5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgKm5nSWY9XCJpc0xvYWRpbmdcIiBjbGFzcz1cInN0YXR1cy1tZXNzYWdlIGxvYWRpbmdcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIj48L2Rpdj5cclxuICAgICAgPHNwYW4+UmFuZ2xpc3RhIGJldMO2bHTDqXNlLi4uPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiAqbmdJZj1cImVycm9yICYmICFpc0xvYWRpbmdcIiBjbGFzcz1cImVycm9yLWFsZXJ0XCI+XHJcbiAgICAgIHt7IGVycm9yIH19XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2ICpuZ0lmPVwiIWlzTG9hZGluZyAmJiAhZXJyb3JcIiBjbGFzcz1cImxlYWRlcmJvYXJkLWNvbnRlbnRcIj5cclxuXHJcbiAgICAgIDxkaXYgKm5nSWY9XCJpdGVtcy5sZW5ndGggPT09IDBcIiBjbGFzcz1cInN0YXR1cy1tZXNzYWdlIGVtcHR5XCI+XHJcbiAgICAgICAgTcOpZyBuaW5jcyBlbMOpZyBha3Rpdml0w6FzIGEgcmFuZ2xpc3TDoWhvei5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiaXRlbXMubGVuZ3RoID4gMFwiIGNsYXNzPVwidGFibGUtY29udGFpbmVyIGdsYXNzLXBhbmVsXCI+XHJcbiAgICAgICAgPHRhYmxlIGNsYXNzPVwic3R5bGVkLXRhYmxlXCI+XHJcbiAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICA8dGggY2xhc3M9XCJjb2wtcmFua1wiPiM8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cImNvbC11c2VyXCI+RmVsaGFzem7DoWzDszwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoIGNsYXNzPVwiY29sLXN0YXQgdGV4dC1jZW50ZXJcIj7DiXJ0w6lrZWzDqXNlazwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoIGNsYXNzPVwiY29sLXN0YXQgdGV4dC1jZW50ZXJcIj5LZWR2ZW5jZWs8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cImNvbC1zdGF0IHRleHQtY2VudGVyXCI+TWVndGVraW50w6lzZWs8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cImNvbC1wb2ludHMgdGV4dC1yaWdodFwiPlBvbnQ8L3RoPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgICAgICAgICAgIFtjbGFzcy5jdXJyZW50LXVzZXItcm93XT1cImlzQ3VycmVudFVzZXIoaXRlbSlcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkYXRhLXJvd1wiPlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNvbC1yYW5rXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInJhbmstYmFkZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLnJhbmstMV09XCJpID09PSAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5yYW5rLTJdPVwiaSA9PT0gMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MucmFuay0zXT1cImkgPT09IDJcIj5cclxuICAgICAgICAgICAgICAgICAge3sgaSArIDEgfX1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNvbC11c2VyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXNlci1pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidXNlcm5hbWVcIj57eyBpdGVtLnVzZXJuYW1lIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImlzQ3VycmVudFVzZXIoaXRlbSlcIiBjbGFzcz1cImJhZGdlLXlvdVwiPlRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjb2wtc3RhdCB0ZXh0LWNlbnRlciB0ZXh0LWRpbVwiPlxyXG4gICAgICAgICAgICAgICAge3sgaXRlbS50b3RhbFJhdGluZ3MgfX1cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNvbC1zdGF0IHRleHQtY2VudGVyIHRleHQtZGltXCI+XHJcbiAgICAgICAgICAgICAgICB7eyBpdGVtLnRvdGFsRmF2b3JpdGVzIH19XHJcbiAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjb2wtc3RhdCB0ZXh0LWNlbnRlciB0ZXh0LWRpbVwiPlxyXG4gICAgICAgICAgICAgICAge3sgaXRlbS50b3RhbFZpZXdzIH19XHJcbiAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjb2wtcG9pbnRzIHRleHQtcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicG9pbnRzLXZhbHVlXCI+e3sgaXRlbS5wb2ludHMgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgPC90YWJsZT5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L21haW4+XHJcbjwvZGl2PiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudHMnO1xyXG5pbXBvcnQgeyBVc2VyU3RhdGlzdGljcyB9IGZyb20gJy4uL21vZGVscy9zdGF0aXN0aWNzLm1vZGVscyc7XHJcbmltcG9ydCB7IFRvcFJhdGVkTW92aWUgfSBmcm9tICcuLi9tb2RlbHMvc3RhdGlzdGljcy5tb2RlbHMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRpc3RpY3NTZXJ2aWNlIHtcclxuXHJcbiAgXHJcblxyXG4gIHByaXZhdGUgYmFzZVVybCA9IGAke2Vudmlyb25tZW50LmFwaVVybH0vc3RhdGlzdGljc2A7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgZ2V0TW9zdEFjdGl2ZVVzZXJzKGNvdW50OiBudW1iZXIgPSAyMCk6IE9ic2VydmFibGU8VXNlclN0YXRpc3RpY3NbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8VXNlclN0YXRpc3RpY3NbXT4oYCR7dGhpcy5iYXNlVXJsfS9hY3RpdmUtdXNlcnM/Y291bnQ9JHtjb3VudH1gKTtcclxuICB9XHJcbiAgZ2V0VG9wUmF0ZWQoY291bnQ6IG51bWJlciA9IDEwKTogT2JzZXJ2YWJsZTxUb3BSYXRlZE1vdmllW10+IHtcclxuICByZXR1cm4gdGhpcy5odHRwLmdldDxUb3BSYXRlZE1vdmllW10+KGAke3RoaXMuYmFzZVVybH0vdG9wLXJhdGVkP2NvdW50PSR7Y291bnR9YCwge1xyXG4gICAgcGFyYW1zOiB7IGNvdW50OiBjb3VudCB9XHJcbiAgfSk7XHJcbn1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBVc2VyU2VydmljZSwgVXNlclByb2ZpbGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItcHJvZmlsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1tYW5hZ2UtdXNlcnMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tYW5hZ2UtdXNlcnMuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWFuYWdlLXVzZXJzLmNzcyddLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIFJvdXRlck1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hbmFnZVVzZXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgdXNlcnM6IFVzZXJQcm9maWxlW10gPSBbXTtcclxuICBsb2FkaW5nID0gdHJ1ZTtcclxuICBlcnJvcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIC8vIE1vZGFsIMOhbGxhcG90YVxyXG4gIGlzRm9ybU9wZW4gPSBmYWxzZTtcclxuICBpc0VkaXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgLy8gRm9ybSBtb2RlbGwgaW5pY2lhbGl6w6Fsw6FzYVxyXG4gIGZvcm1Nb2RlbDogVXNlclByb2ZpbGUgPSB7XHJcbiAgICBpZDogMCxcclxuICAgIHVzZXJuYW1lOiAnJyxcclxuICAgIGVtYWlsOiAnJyxcclxuICAgIHJvbGU6ICdVc2VyJyxcclxuICAgIHBhc3N3b3JkOiAnJyxcclxuICAgIGNyZWF0ZWRBdDogJydcclxuICB9O1xyXG5cclxuICAvLyBGSUdZRUxFTTogSGEgYSB0ZSBzZXJ2aWNlLWVkIG5ldmUgVXNlckFwaVNlcnZpY2UsIGNzZXLDqWxkIGtpIGl0dCBhIHTDrXB1c3QhXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyQXBpOiBVc2VyU2VydmljZSkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvYWRVc2VycygpO1xyXG4gIH1cclxuXHJcbiAgbG9hZFVzZXJzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMudXNlckFwaS5nZXRBbGxVc2VycygpLnN1YnNjcmliZSh7XHJcbiAgICAgIG5leHQ6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgdGhpcy51c2VycyA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9ICdOZW0gc2lrZXLDvGx0IGJldMO2bHRlbmkgYSBmZWxoYXN6bsOhbMOza2F0Lic7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gPT09PT0gRUdZSUVTw41URVRUIEZPUk0gTUVHTllJVMOBUyAoSkFWw41UVkEpID09PT09XHJcbiAgLy8gQSB1c2VyIHBhcmFtw6l0ZXIgbW9zdCBvcGNpb27DoWxpcyAoPykuIFxyXG4gIC8vIEhhIHZhbiB1c2VyLCBha2tvciBTWkVSS0VTWlTDiVMuIEhhIG5pbmNzLCBha2tvciBIT1paw4FBRMOBUy5cclxuICBvcGVuRWRpdEZvcm0odXNlcj86IFVzZXJQcm9maWxlKSB7XHJcbiAgICB0aGlzLmlzRm9ybU9wZW4gPSB0cnVlO1xyXG4gICAgXHJcbiAgICBpZiAodXNlcikge1xyXG4gICAgICAvLyBTemVya2VzenTDqXMgbcOzZFxyXG4gICAgICB0aGlzLmlzRWRpdGluZyA9IHRydWU7XHJcbiAgICAgIC8vIE3DoXNvbGF0IGvDqXN6w610w6lzZSBheiBhZGF0b2tyw7NsIChob2d5IG5lIMOtcmp1ayBmZWzDvGwgYSB0w6FibMOhemF0b3QgYXpvbm5hbClcclxuICAgICAgdGhpcy5mb3JtTW9kZWwgPSB7IC4uLnVzZXIsIHBhc3N3b3JkOiAnJyB9OyBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEhvenrDoWFkw6FzIG3Ds2QgKFJlc2V0KVxyXG4gICAgICB0aGlzLmlzRWRpdGluZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmZvcm1Nb2RlbCA9IHtcclxuICAgICAgICBpZDogMCxcclxuICAgICAgICB1c2VybmFtZTogJycsXHJcbiAgICAgICAgZW1haWw6ICcnLFxyXG4gICAgICAgIHJvbGU6ICdVc2VyJyxcclxuICAgICAgICBwYXNzd29yZDogJycsIC8vIEplbHN6w7Mga8O2dGVsZXrFkSBsZXN6IMO6aiB1c2VybsOpbFxyXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PSBNRU5Uw4lTIChLw5Zaw5ZTIEbDnEdHVsOJTlkpID09PT09XHJcbiAgc2F2ZUZvcm0oKSB7XHJcbiAgICBpZiAodGhpcy5pc0VkaXRpbmcpIHtcclxuICAgICAgLy8gVVBEQVRFXHJcbiAgICAgIHRoaXMudXNlckFwaS51cGRhdGVVc2VyKHRoaXMuZm9ybU1vZGVsKS5zdWJzY3JpYmUoe1xyXG4gICAgICAgIG5leHQ6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNGb3JtT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5sb2FkVXNlcnMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiAoZXJyKSA9PiBjb25zb2xlLmVycm9yKCdIaWJhIGZyaXNzw610w6lza29yOicsIGVycilcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBDUkVBVEVcclxuICAgICAgdGhpcy51c2VyQXBpLmNyZWF0ZVVzZXIodGhpcy5mb3JtTW9kZWwpLnN1YnNjcmliZSh7XHJcbiAgICAgICAgbmV4dDogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc0Zvcm1PcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxvYWRVc2VycygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IChlcnIpID0+IGNvbnNvbGUuZXJyb3IoJ0hpYmEgbMOpdHJlaG96w6Fza29yOicsIGVycilcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGVVc2VyKGlkOiBudW1iZXIpIHtcclxuICAgIGlmICghY29uZmlybSgnQml6dG9zIHTDtnJsw7ZkIGEgZmVsaGFzem7DoWzDs3Q/JykpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnVzZXJBcGkuZGVsZXRlVXNlcihpZCkuc3Vic2NyaWJlKHtcclxuICAgICAgbmV4dDogKCkgPT4ge1xyXG4gICAgICAgIC8vIFVJIGZyaXNzw610w6lzZSBrw6lyw6lzIG7DqWxrw7xsXHJcbiAgICAgICAgdGhpcy51c2VycyA9IHRoaXMudXNlcnMuZmlsdGVyKHUgPT4gdS5pZCAhPT0gaWQpO1xyXG4gICAgICB9LFxyXG4gICAgICBlcnJvcjogKGVycikgPT4gY29uc29sZS5lcnJvcignSGliYSB0w7ZybMOpc2tvcjonLCBlcnIpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNhbmNlbEZvcm0oKSB7XHJcbiAgICB0aGlzLmlzRm9ybU9wZW4gPSBmYWxzZTtcclxuICB9XHJcbn0iLCI8ZGl2IGNsYXNzPVwibWFuYWdlLXVzZXJzLXBhZ2VcIj5cclxuICA8ZGl2IGNsYXNzPVwiY29udGVudC13cmFwcGVyXCI+XHJcblxyXG4gICAgPCEtLSBIZWFkZXIgLS0+XHJcbiAgICA8aGVhZGVyIGNsYXNzPVwicGFnZS1oZWFkZXJcIj5cclxuICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj5GZWxoYXN6bsOhbMOzayBLZXplbMOpc2U8L2gxPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZGVjb3JhdGlvbi1saW5lXCI+PC9kaXY+XHJcbiAgICAgIDxwIGNsYXNzPVwic3VidGl0bGVcIj5SZWdpc3p0csOhbHQgZmnDs2tvayBrYXJiYW50YXJ0w6FzYTwvcD5cclxuICAgIDwvaGVhZGVyPlxyXG5cclxuICAgIDwhLS0gTG9hZGluZyBTdGF0ZSAtLT5cclxuICAgIDxkaXYgKm5nSWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJsb2FkaW5nLXN0YXRlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj5cclxuICAgICAgPHA+QWRhdG9rIGJldMO2bHTDqXNlLi4uPC9wPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPCEtLSBFcnJvciBTdGF0ZSAtLT5cclxuICAgIDxkaXYgKm5nSWY9XCJlcnJvclwiIGNsYXNzPVwiZXJyb3ItbXNnXCI+XHJcbiAgICAgIHt7IGVycm9yIH19XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2ICpuZ0lmPVwiIWxvYWRpbmdcIiBjbGFzcz1cImNvbnRlbnQtY29udGFpbmVyXCI+XHJcbiAgICAgIFxyXG4gICAgICA8IS0tIFRvb2xiYXIgKFZpc3N6YSDDqXMgSG96esOhYWTDoXMgZ29tYm9rKSAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cInRvb2xiYXJcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiByb3V0ZXJMaW5rPVwiL2FkbWluLWRhc2hib2FyZFwiPlxyXG4gICAgICAgICAg4oaQIFZpc3N6YSBhIERhc2hib2FyZHJhXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPCEtLSBGZWx0w6l0ZWxlemVtLCBob2d5IGF6IG9wZW5FZGl0Rm9ybSBwYXJhbcOpdGVyIG7DqWxrw7xsIGjDrXZ2YSDDumogZmVsaGFzem7DoWzDs3QgaG96IGzDqXRyZSAtLT5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1hZGRcIiAoY2xpY2spPVwib3BlbkVkaXRGb3JtKClcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvblwiPis8L3NwYW4+IMOaaiBGZWxoYXN6bsOhbMOzXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPCEtLSBVc2VycyBUYWJsZSAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLWNvbnRhaW5lciBnbGFzcy1wYW5lbFwiPlxyXG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInN0eWxlZC10YWJsZVwiPlxyXG4gICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgPHRoIGNsYXNzPVwiY29sLWlkXCI+SUQ8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cImNvbC11c2VyXCI+RmVsaGFzem7DoWzDs27DqXY8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cImNvbC1lbWFpbFwiPkVtYWlsPC90aD5cclxuICAgICAgICAgICAgICA8dGggY2xhc3M9XCJjb2wtcm9sZSB0ZXh0LWNlbnRlclwiPlN6ZXJlcGvDtnI8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCBjbGFzcz1cImNvbC1kYXRlIHRleHQtcmlnaHRcIj5Mw6l0cmVob3p2YTwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoIGNsYXNzPVwiY29sLWFjdGlvbnMgdGV4dC1yaWdodFwiPk3FsXZlbGV0ZWs8L3RoPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCB1c2VyIG9mIHVzZXJzXCIgY2xhc3M9XCJkYXRhLXJvd1wiPlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNvbC1pZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpZC1iYWRnZVwiPiN7eyB1c2VyLmlkIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiY29sLXVzZXJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidXNlcm5hbWVcIj57eyB1c2VyLnVzZXJuYW1lIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiY29sLWVtYWlsXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVtYWlsLXRleHRcIj57eyB1c2VyLmVtYWlsIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcblxyXG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNvbC1yb2xlIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInJvbGUtYmFkZ2VcIiBcclxuICAgICAgICAgICAgICAgICAgICAgIFtjbGFzcy5yb2xlLWFkbWluXT1cInVzZXIucm9sZSA9PT0gJ0FkbWluJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbY2xhc3Mucm9sZS11c2VyXT1cInVzZXIucm9sZSA9PT0gJ1VzZXInXCI+XHJcbiAgICAgICAgICAgICAgICAgIHt7IHVzZXIucm9sZSB9fVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvdGQ+XHJcblxyXG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImNvbC1kYXRlIHRleHQtcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgIHt7IHVzZXIuY3JlYXRlZEF0IHwgZGF0ZToneXl5eS4gTU0uIGRkLicgfX1cclxuICAgICAgICAgICAgICA8L3RkPlxyXG5cclxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJjb2wtYWN0aW9ucyB0ZXh0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uLWJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1pY29uIGVkaXRcIiAoY2xpY2spPVwib3BlbkVkaXRGb3JtKHVzZXIpXCIgdGl0bGU9XCJTemVya2VzenTDqXNcIj5cclxuICAgICAgICAgICAgICAgICAgICDinI/vuI9cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4taWNvbiBkZWxldGVcIiAoY2xpY2spPVwiZGVsZXRlVXNlcih1c2VyLmlkKVwiIHRpdGxlPVwiVMO2cmzDqXNcIj5cclxuICAgICAgICAgICAgICAgICAgICDwn5eR77iPXHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC90ZD5cclxuXHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgIDwvdGFibGU+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuXHJcbiAgPCEtLSBNT0RBTCBPVkVSTEFZIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1vdmVybGF5XCIgW2NsYXNzLmFjdGl2ZV09XCJpc0Zvcm1PcGVuXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCI+XHJcbiAgICAgIFxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgPGgyIGNsYXNzPVwibW9kYWwtdGl0bGVcIj5cclxuICAgICAgICAgIHt7IGlzRWRpdGluZyA/ICdGZWxoYXN6bsOhbMOzIFN6ZXJrZXN6dMOpc2UnIDogJ8OaaiBGZWxoYXN6bsOhbMOzJyB9fVxyXG4gICAgICAgIDwvaDI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1jbG9zZVwiIChjbGljayk9XCJjYW5jZWxGb3JtKClcIj7DlzwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgPGZvcm0gKG5nU3VibWl0KT1cInNhdmVGb3JtKClcIiBjbGFzcz1cInVzZXItZm9ybVwiPlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbD5GZWxoYXN6bsOhbMOzbsOpdjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFsobmdNb2RlbCldPVwiZm9ybU1vZGVsLnVzZXJuYW1lXCIgbmFtZT1cInVzZXJuYW1lXCIgY2xhc3M9XCJpbnB1dC1maWVsZFwiIHJlcXVpcmVkIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICA8bGFiZWw+RW1haWwgY8OtbTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBbKG5nTW9kZWwpXT1cImZvcm1Nb2RlbC5lbWFpbFwiIG5hbWU9XCJlbWFpbFwiIGNsYXNzPVwiaW5wdXQtZmllbGRcIiByZXF1aXJlZCAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPlN6ZXJlcGvDtnI8L2xhYmVsPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c2VsZWN0IFsobmdNb2RlbCldPVwiZm9ybU1vZGVsLnJvbGVcIiBuYW1lPVwicm9sZVwiIGNsYXNzPVwiaW5wdXQtZmllbGQgc2VsZWN0LWZpZWxkXCI+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVXNlclwiPlVzZXI8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBZG1pblwiPkFkbWluPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPCEtLSBKZWxzesOzIGNzYWsgaG96esOhYWTDoXNrb3IgLS0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiICpuZ0lmPVwiIWlzRWRpdGluZ1wiPlxyXG4gICAgICAgICAgICA8bGFiZWw+SmVsc3rDszwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBbKG5nTW9kZWwpXT1cImZvcm1Nb2RlbC5wYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIGNsYXNzPVwiaW5wdXQtZmllbGRcIiByZXF1aXJlZCAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cImNhbmNlbEZvcm0oKVwiPk3DqWdzZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPlxyXG4gICAgICAgICAgICAgIHt7IGlzRWRpdGluZyA/ICdNZW50w6lzJyA6ICdMw6l0cmVob3rDoXMnIH19XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG48L2Rpdj4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdGF0aXN0aWNzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvc3RhdGlzdGljcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVG9wUmF0ZWRNb3ZpZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL3N0YXRpc3RpY3MubW9kZWxzJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC10b3AtcmF0ZWQtbW92aWVzJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vdG9wLXJhdGVkLW1vdmllcy5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90b3AtcmF0ZWQtbW92aWVzLmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb3BSYXRlZE1vdmllcyBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIG1vdmllczogVG9wUmF0ZWRNb3ZpZVtdID0gW107XHJcbiAgbG9hZGluZyA9IHRydWU7XHJcbiAgZXJyb3IgPSAnJztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb3ZpZVNlcnZpY2U6IFN0YXRpc3RpY3NTZXJ2aWNlKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMubW92aWVTZXJ2aWNlLmdldFRvcFJhdGVkKDEwKS5zdWJzY3JpYmUoe1xyXG4gICAgICBuZXh0OiAoZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMubW92aWVzID0gZGF0YTtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6ICgpID0+IHtcclxuICAgICAgICB0aGlzLmVycm9yID0gJ0hvcHDDoSwgbmVtIHNpa2Vyw7xsdCBiZXTDtmx0ZW5pIGEgdG9wbGlzdMOhdC4nO1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcblxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJwYWdlLWNvbnRhaW5lclwiPlxyXG4gIDxtYWluIGNsYXNzPVwiY29udGVudC13cmFwcGVyXCI+XHJcbiAgICBcclxuICAgIDwhLS0gSGVhZGVyIC0tPlxyXG4gICAgPGhlYWRlciBjbGFzcz1cInBhZ2UtaGVhZGVyXCI+XHJcbiAgICAgIDxoMSBjbGFzcz1cInRpdGxlXCI+VG9wIFJhdGVkIE1vdmllczwvaDE+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJkZWNvcmF0aW9uLWxpbmVcIj48L2Rpdj5cclxuICAgICAgPHAgY2xhc3M9XCJzdWJ0aXRsZVwiPkEga8O2esO2c3PDqWcgbGVnam9iYnJhIMOpcnTDqWtlbHQgZmlsbWplaTwvcD5cclxuICAgIDwvaGVhZGVyPlxyXG5cclxuICAgIDwhLS0gTG9hZGluZyAmIEVycm9yIC0tPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxvYWRpbmcgfHwgZXJyb3I7IGVsc2UgY29udGVudFwiPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiZXJyb3I7IGVsc2UgbG9hZGluZ1wiIGNsYXNzPVwibWVzc2FnZS1ib3ggZXJyb3JcIj5cclxuICAgICAgICA8c3Ryb25nPkhpYmEgdMO2cnTDqW50Ojwvc3Ryb25nPiA8c3Bhbj4ge3sgZXJyb3IgfX08L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8bmctdGVtcGxhdGUgI2xvYWRpbmc+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtYm94IGxvYWRpbmdcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkZXJcIj48L2Rpdj5cclxuICAgICAgICAgIDxwPkxpc3RhIGJldMO2bHTDqXNlLi4uPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgPCEtLSBDb250ZW50IEdyaWQgLS0+XHJcbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnQ+XHJcbiAgICAgIFxyXG4gICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtZ3JpZFwiICpuZ0lmPVwibW92aWVzLmxlbmd0aCA+IDA7IGVsc2UgZW1wdHlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtY2FyZFwiICpuZ0Zvcj1cImxldCBtb3ZpZSBvZiBtb3ZpZXM7IGxldCBpID0gaW5kZXhcIj5cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgPCEtLSBQb3N0ZXIgLS0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdGVyLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgPGltZyBcclxuICAgICAgICAgICAgICBbc3JjXT1cIm1vdmllLnBvc3RlclVybFwiIFxyXG4gICAgICAgICAgICAgIFthbHRdPVwibW92aWUudGl0bGVcIiBcclxuICAgICAgICAgICAgICBjbGFzcz1cInBvc3Rlci1pbWFnZVwiXHJcbiAgICAgICAgICAgICAgb25lcnJvcj1cInRoaXMuc3JjPSdodHRwczovL3BsYWNlaG9sZC5jby80MDB4NjAwLzBmMTYyMy9mZmZmZmY/dGV4dD1ObytDb3ZlcidcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9zdGVyLW92ZXJsYXlcIj48L2Rpdj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDwhLS0gVG9wIDMgQmFkZ2UgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpIDwgM1wiIGNsYXNzPVwicmFuay1iYWRnZVwiIFtjbGFzcy5nb2xkXT1cImk9PT0wXCIgW2NsYXNzLnNpbHZlcl09XCJpPT09MVwiIFtjbGFzcy5icm9uemVdPVwiaT09PTJcIj5cclxuICAgICAgICAgICAgICAje3sgaSArIDEgfX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8IS0tIENhcmQgQm9keSAtLT5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgPGgzIGNsYXNzPVwibWVkaWEtdGl0bGVcIiBbdGl0bGVdPVwibW92aWUudGl0bGVcIj57eyBtb3ZpZS50aXRsZSB9fTwvaDM+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8IS0tIEdlbnJlcyAoVGFnLWvDqW50IGplbGVuw610asO8ayBtZWcpIC0tPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFncy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhZ1wiICpuZ0Zvcj1cImxldCBnZW5yZSBvZiBtb3ZpZS5nZW5yZXNcIj57eyBnZW5yZSB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+PC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8IS0tIFJhdGluZyAtLT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhdGluZy1iYWRnZVwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3RhclwiPuKtkDwvc3Bhbj4gXHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzY29yZVwiPnt7IG1vdmllLmF2ZXJhZ2VSYXRpbmcgfCBudW1iZXI6JzEuMS0xJyB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1heFwiPi8xMDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPG5nLXRlbXBsYXRlICNlbXB0eT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZW1wdHktc3RhdGVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1pY29uXCI+8J+PhjwvZGl2PlxyXG4gICAgICAgICAgPHA+TmluY3MgbWVnamVsZW7DrXRoZXTFkSB0b3BsaXN0YS48L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgPC9tYWluPlxyXG48L2Rpdj4iLCJpbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyByb2xlR3VhcmQgfSBmcm9tICcuL2NvcmUvZ3VhcmRzL2F1dGguZ3VhcmQnO1xyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZXMvYXV0aC9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZXMvYXV0aC9wYWdlcy9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgQWRtaW5EYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuLi9hcHAvZmVhdHVyZXMvZGFzaGJvYXJkcy9hZG1pbi1kYXNoYm9hcmQvYWRtaW4tZGFzaGJvYXJkLi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBVc2VyRGFzaGJvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9mZWF0dXJlcy9kYXNoYm9hcmRzL3VzZXItZGFzaGJvYXJkL3VzZXItZGFzaGJvYXJkLi5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgVXNlckZhdm9yaXRlc0NvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZXMvdXNlci1mYXZvcml0ZXMvdXNlci1mYXZvcml0ZXMuY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7IFByb2ZpbGVDb21wb25lbnQgfSBmcm9tICcuL2ZlYXR1cmVzL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgUmVjb21tZW5kYXRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9mZWF0dXJlcy9yZWNvbW1lbmRhdGlvbi9yZWNvbW1lbmRhdGlvbi5jb21wb25lbnQnO1xyXG5cclxuaW1wb3J0IHsgTWFuYWdlTW92aWVzQ29tcG9uZW50IH0gZnJvbSAnLi4vYXBwL2ZlYXR1cmVzL2FkbWluLXBhZ2VzL21hbmFnZS1tb3ZpZXMvbWFuYWdlLW1vdmllcyc7XHJcblxyXG5pbXBvcnQgeyBMZWFkZXJib2FyZENvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZXMvbGVhZGVyYm9hcmQvbGVhZGVyYm9hcmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWFuYWdlVXNlcnNDb21wb25lbnQgfSBmcm9tICcuL2ZlYXR1cmVzL2FkbWluLXBhZ2VzL21hbmFnZS11c2Vycy9tYW5hZ2UtdXNlcnMnO1xyXG4vKmltcG9ydCB7TW9zdFZpZXdlZFBhZ2V9IGZyb20gXCIuLi9hcHAvZmVhdHVyZXMvc3RhdGlzdGljcy1wYWdlcy9cIjsqL1xyXG5pbXBvcnQge1RvcFJhdGVkTW92aWVzfSBmcm9tIFwiLi4vYXBwL2ZlYXR1cmVzL3N0YXRpc3RpY3MtcGFnZXMvdG9wLXJhdGVkL3RvcC1yYXRlZC1tb3ZpZXNcIjtcclxuLyppbXBvcnQge01vc3RGYXZvcml0ZWRQYWdlfSBmcm9tIFwiLi9wYWdlcy9Nb3N0RmF2b3JpdGVkUGFnZVwiO1xyXG5pbXBvcnQge1BvcHVsYXJHZW5yZXNQYWdlfSBmcm9tIFwiLi9wYWdlcy9Qb3B1bGFyR2VucmVzUGFnZVwiOyovXHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgeyBwYXRoOiAnbG9naW4nLCBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50IH0sXHJcbiAgeyBwYXRoOiAncmVnaXN0ZXInLCBjb21wb25lbnQ6IFJlZ2lzdGVyQ29tcG9uZW50IH0sXHJcblxyXG4gIHsgXHJcbiAgICBwYXRoOiAnYWRtaW4tZGFzaGJvYXJkJywgXHJcbiAgICBjb21wb25lbnQ6IEFkbWluRGFzaGJvYXJkQ29tcG9uZW50LCBcclxuICAgIGNhbkFjdGl2YXRlOiBbcm9sZUd1YXJkKCdBZG1pbicpXSBcclxuICB9LFxyXG4gXHJcbiAge3BhdGg6ICd0b3AtcmF0ZWQnLCBjb21wb25lbnQ6IFRvcFJhdGVkTW92aWVzfSxcclxuIFxyXG5cclxuXHJcbiAgeyBcclxuICAgIHBhdGg6ICd1c2VyLWRhc2hib2FyZCcsIFxyXG4gICAgY29tcG9uZW50OiBVc2VyRGFzaGJvYXJkQ29tcG9uZW50LCBcclxuICAgIGNhbkFjdGl2YXRlOiBbcm9sZUd1YXJkKCdVc2VyJyldIFxyXG4gIH0sXHJcblxyXG4gIHsgXHJcbiAgICBwYXRoOiAnZmF2b3JpdGVzJyxcclxuICAgIGNvbXBvbmVudDogVXNlckZhdm9yaXRlc0NvbXBvbmVudCxcclxuICAgIGNhbkFjdGl2YXRlOiBbcm9sZUd1YXJkKCdVc2VyJyldXHJcbiAgfSxcclxuXHJcbiAgeyBcclxuICAgIHBhdGg6ICdwcm9maWxlJyxcclxuICAgIGNvbXBvbmVudDogUHJvZmlsZUNvbXBvbmVudCxcclxuICAgY2FuQWN0aXZhdGU6IFtyb2xlR3VhcmQoJ1VzZXInKV1cclxuICB9LFxyXG5cclxuICB7XHJcbiAgICBwYXRoOiAncmVjb21tZW5kYXRpb25zJyxcclxuICAgIGNvbXBvbmVudDogUmVjb21tZW5kYXRpb25zQ29tcG9uZW50LFxyXG4gICAgY2FuQWN0aXZhdGU6IFtyb2xlR3VhcmQoJ1VzZXInKV1cclxuICB9LFxyXG5cclxuICB7IHBhdGg6ICdtYW5hZ2UtbW92aWVzJyxcclxuICAgIGNvbXBvbmVudDogTWFuYWdlTW92aWVzQ29tcG9uZW50LFxyXG4gICAgY2FuQWN0aXZhdGU6IFtyb2xlR3VhcmQoJ0FkbWluJyldIFxyXG4gIH0sXHJcbiAgeyBwYXRoOiAnbWFuYWdlLXVzZXJzJyxcclxuICAgIGNvbXBvbmVudDogTWFuYWdlVXNlcnNDb21wb25lbnQsXHJcbiAgICBjYW5BY3RpdmF0ZTogW3JvbGVHdWFyZCgnQWRtaW4nKV0gXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gIHBhdGg6ICdsZWFkZXJib2FyZCcsXHJcbiAgY29tcG9uZW50OiBMZWFkZXJib2FyZENvbXBvbmVudCxcclxuICBjYW5BY3RpdmF0ZTogW3JvbGVHdWFyZCgnVXNlcicpXVxyXG59LFxyXG4gIFxyXG5cclxuICB7IHBhdGg6ICcnLCByZWRpcmVjdFRvOiAnbG9naW4nLCBwYXRoTWF0Y2g6ICdmdWxsJyB9LFxyXG4gIHsgcGF0aDogJyoqJywgcmVkaXJlY3RUbzogJ2xvZ2luJyB9XHJcbl07IiwiaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yRm4gfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aEludGVyY2VwdG9yOiBIdHRwSW50ZXJjZXB0b3JGbiA9IChyZXEsIG5leHQpID0+IHtcclxuICBjb25zdCBpc0F1dGhFbmRwb2ludCA9XHJcbiAgICByZXEudXJsLmluY2x1ZGVzKCcvYXV0aC9sb2dpbicpIHx8IHJlcS51cmwuaW5jbHVkZXMoJy9hdXRoL3JlZ2lzdGVyJyk7XHJcblxyXG4gIGlmIChpc0F1dGhFbmRwb2ludCkge1xyXG4gICAgLy8gbG9naW4vcmVnaXN0ZXIga8OpcsOpc2VrcmUgTkUga8O8bGRqw7xuayBBdXRob3JpemF0aW9uIGZlamzDqWN0XHJcbiAgICByZXR1cm4gbmV4dChyZXEpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcclxuICBpZiAodG9rZW4pIHtcclxuICAgIHJlcSA9IHJlcS5jbG9uZSh7XHJcbiAgICAgIHNldEhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV4dChyZXEpO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIHNpZ25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXJPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBOYXZiYXJDb21wb25lbnQgfSBmcm9tICcuL3NoYXJlZC9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1yb290JyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtSb3V0ZXJPdXRsZXQsIE5hdmJhckNvbXBvbmVudF0sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC5odG1sJyxcclxuICBzdHlsZVVybDogJy4vYXBwLmNzcydcclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRpdGxlID0gc2lnbmFsKCdtb3ZpZWFwcC1mcm9udGVuZCcpO1xyXG59XHJcbiIsIjxhcHAtbmF2YmFyPjwvYXBwLW5hdmJhcj5cclxuPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtbmF2YmFyJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZV0sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25hdmJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbmF2YmFyLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmF2YmFyQ29tcG9uZW50IHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICApIHt9XHJcblxyXG4gIGdldCBpc0xvZ2dlZEluKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UuaXNMb2dnZWRJbjtcclxuICB9XHJcblxyXG4gIGdldCByb2xlKCk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2Uucm9sZTtcclxuICB9XHJcblxyXG4gICBnZXQgc2hvd1VzZXJOYXYoKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBvbkFkbWluRGFzaGJvYXJkID0gdGhpcy5yb3V0ZXIudXJsLnN0YXJ0c1dpdGgoJy9hZG1pbi1kYXNoYm9hcmQnKSB8fFxyXG4gICAgdGhpcy5yb3V0ZXIudXJsLnN0YXJ0c1dpdGgoJy9tYW5hZ2UtbW92aWVzJykgfHxcclxuICAgIHRoaXMucm91dGVyLnVybC5zdGFydHNXaXRoKCcvbWFuYWdlLXVzZXJzJyk7XHJcbiAgICByZXR1cm4gISh0aGlzLnJvbGUgPT09ICdBZG1pbicgJiYgb25BZG1pbkRhc2hib2FyZCk7XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpO1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgfVxyXG5cclxuICBnb1RvTW92aWVzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdXNlci1kYXNoYm9hcmQnXSk7IFxyXG4gIH1cclxuXHJcbiAgZ29Ub1Byb2ZpbGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wcm9maWxlJ10pO1xyXG4gIH1cclxuXHJcbiAgZ29Ub0Zhdm9yaXRlcygpOiB2b2lkIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Zhdm9yaXRlcyddKTtcclxuICB9XHJcblxyXG4gIGdvVG9SZWNvbW1lbmRhdGlvbnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9yZWNvbW1lbmRhdGlvbnMnXSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgZ29Ub0xlYWRlcmJvYXJkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbGVhZGVyYm9hcmQnXSk7XHJcbiAgfVxyXG4gIGdvVG9Ub3BSYXRlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3RvcC1yYXRlZCddKTtcclxuICB9XHJcbn0iLCI8bmF2ICpuZ0lmPVwiaXNMb2dnZWRJblwiIGNsYXNzPVwibmF2YmFyXCI+XHJcbiAgPGRpdiBjbGFzcz1cIm5hdi1jb250YWluZXJcIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwibmF2LWJyYW5kXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiYnJhbmQtdGV4dFwiPk1PVklFPHNwYW4gY2xhc3M9XCJoaWdobGlnaHRcIj5BUFA8L3NwYW4+PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cIm5hdi1saW5rc1wiICpuZ0lmPVwic2hvd1VzZXJOYXZcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cIm5hdi1pdGVtXCIgKGNsaWNrKT1cImdvVG9Nb3ZpZXMoKVwiIHJvdXRlckxpbmtBY3RpdmU9XCJhY3RpdmVcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImljb25cIj7wn46sPC9zcGFuPiBGaWxtZWtcclxuICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwibmF2LWl0ZW1cIiAoY2xpY2spPVwiZ29Ub1JlY29tbWVuZGF0aW9ucygpXCIgcm91dGVyTGlua0FjdGl2ZT1cImFjdGl2ZVwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvblwiPuKcqDwvc3Bhbj4gQWrDoW5sb3R0YWtcclxuICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwibmF2LWl0ZW1cIiAoY2xpY2spPVwiZ29Ub0xlYWRlcmJvYXJkKClcIiByb3V0ZXJMaW5rQWN0aXZlPVwiYWN0aXZlXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uXCI+8J+Phjwvc3Bhbj4gUmFuZ2xpc3RhXHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgPGJ1dHRvbiAqbmdJZj1cInJvbGUgPT09ICdVc2VyJ1wiIGNsYXNzPVwibmF2LWl0ZW1cIiAoY2xpY2spPVwiZ29Ub0Zhdm9yaXRlcygpXCIgcm91dGVyTGlua0FjdGl2ZT1cImFjdGl2ZVwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvblwiPuKZpTwvc3Bhbj4gS2VkdmVuY2VrXHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgPGJ1dHRvbiAqbmdJZj1cInJvbGUgPT09ICdVc2VyJ1wiIGNsYXNzPVwibmF2LWl0ZW1cIiAoY2xpY2spPVwiZ29Ub1RvcFJhdGVkKClcIiByb3V0ZXJMaW5rQWN0aXZlPVwiYWN0aXZlXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uXCI+4q2QPC9zcGFuPiBMZWdqb2JiYWtcclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwibmF2LWFjdGlvbnNcIj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIGNsYXNzPVwibmF2LWl0ZW0gcHJvZmlsZS1idG5cIlxyXG4gICAgICAgICpuZ0lmPVwic2hvd1VzZXJOYXZcIlxyXG4gICAgICAgIChjbGljayk9XCJnb1RvUHJvZmlsZSgpXCJcclxuICAgICAgICByb3V0ZXJMaW5rQWN0aXZlPVwiYWN0aXZlXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uXCI+8J+RpDwvc3Bhbj4gUHJvZmlsXHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1sb2dvdXRcIiAoY2xpY2spPVwibG9nb3V0KClcIj5cclxuICAgICAgICBLaWplbGVudGtlesOpc1xyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuPC9uYXY+XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVMsNEJBQTRCOzs7QUNDckMsU0FBUyxxQkFBcUI7OztBQ0Q5QixTQUFTLGNBQWM7QUFDdkIsU0FBUyxjQUE2Qjs7O0FDQXRDOzs7O1NBQVMsa0JBQWtCO0FBQzNCLFNBQXFCLFdBQVc7OztBQ0Z6QixJQUFNLGNBQWM7RUFDekIsWUFBWTtFQUNaLFFBQVE7Ozs7QUNGSixTQUFVLGlCQUFpQixPQUFvQjtBQUNuRCxNQUFJLENBQUM7QUFBTyxXQUFPO0FBRW5CLFFBQU0sVUFBVSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbEMsTUFBSSxDQUFDO0FBQVMsV0FBTztBQUVyQixNQUFJO0FBQ0YsVUFBTSxVQUFVLEtBQUssTUFBTSxLQUFLLE9BQU8sQ0FBQztBQUV4QyxXQUFPLFFBQVEsTUFBTSxLQUNkLFFBQVEsTUFBTSxLQUNkLFFBQVEsT0FBTyxLQUNmLFFBQVEsOERBQThELEtBQ3RFO0VBQ1QsUUFBUTtBQUNOLFdBQU87RUFDVDtBQUNGOzs7OztBRk5NLElBQU8sY0FBUCxNQUFPLGFBQVc7RUFJRjtFQUZaLFVBQVUsR0FBRyxZQUFZLE1BQU07RUFFdkMsWUFBb0IsTUFBZ0I7QUFBaEIsU0FBQSxPQUFBO0VBQW1CO0VBRXZDLFNBQVMsS0FBZ0I7QUFDdkIsV0FBTyxLQUFLLEtBQUssS0FBc0IsR0FBRyxLQUFLLE9BQU8sYUFBYSxHQUFHLEVBQUUsS0FDdEUsSUFBSSxTQUFPLEtBQUssU0FBUyxHQUFHLENBQUMsQ0FBQztFQUVsQztFQUVBLE1BQU0sS0FBYTtBQUNqQixXQUFPLEtBQUssS0FBSyxLQUFzQixHQUFHLEtBQUssT0FBTyxVQUFVLEdBQUcsRUFBRSxLQUNuRSxJ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R0FBQSxDQUFBLEdBQUEsb0JBQUEsU0FBQSxHQUFBLENBQUEsUUFBQSxVQUFBLFNBQUEsbUJBQUEsR0FBQSxTQUFBLEdBQUEsU0FBQSxTQUFBLEdBQUEsQ0FBQSxRQUFBLFVBQUEsR0FBQSxtQkFBQSxHQUFBLE9BQUEsR0FBQSxDQUFBLFNBQUEscUJBQUEsR0FBQSxRQUFBLFVBQUEsR0FBQSxDQUFBLEdBQUEsZUFBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLGVBQUEsU0FBQSxHQUFBLENBQUEsR0FBQSxRQUFBLEdBQUEsQ0FBQSxTQUFBLGNBQUEsR0FBQSxRQUFBLFVBQUEsR0FBQSxDQUFBLEdBQUEsWUFBQSxHQUFBLENBQUEsU0FBQSxjQUFBLEdBQUEsU0FBQSxTQUFBLEdBQUEsQ0FBQSxHQUFBLFlBQUEsR0FBQSxDQUFBLEdBQUEsZ0JBQUEsR0FBQSxDQUFBLFdBQUEsdUVBQUEsR0FBQSxnQkFBQSxHQUFBLE9BQUEsS0FBQSxHQUFBLENBQUEsR0FBQSxnQkFBQSxHQUFBLENBQUEsR0FBQSxXQUFBLEdBQUEsQ0FBQSxHQUFBLGFBQUEsR0FBQSxDQUFBLEdBQUEsZUFBQSxHQUFBLE9BQUEsR0FBQSxDQUFBLEdBQUEsWUFBQSxHQUFBLENBQUEsR0FBQSxnQkFBQSxHQUFBLENBQUEsR0FBQSxZQUFBLEdBQUEsQ0FBQSxHQUFBLGdCQUFBLEdBQUEsQ0FBQSxTQUFBLE9BQUEsR0FBQSxTQUFBLFNBQUEsR0FBQSxDQUFBLEdBQUEsUUFBQSxHQUFBLENBQUEsR0FBQSxlQUFBLEdBQUEsQ0FBQSxHQUFBLGdCQUFBLEdBQUEsQ0FBQSxHQUFBLE9BQUEsR0FBQSxDQUFBLEdBQUEsT0FBQSxHQUFBLENBQUEsU0FBQSxZQUFBLEdBQUEsVUFBQSxTQUFBLFNBQUEsR0FBQSxTQUFBLFNBQUEsR0FBQSxDQUFBLEdBQUEsYUFBQSxHQUFBLENBQUEsR0FBQSxPQUFBLGdCQUFBLEdBQUEsT0FBQSxHQUFBLENBQUEsR0FBQSxPQUFBLFlBQUEsR0FBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLEtBQUEsR0FBQSxDQUFBLEdBQUEsWUFB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QUEsQ0FBQSxRQUFBLFFBQUEsZUFBQSxpQkFBQSxHQUFBLGdCQUFBLEdBQUEsaUJBQUEsU0FBQSxHQUFBLENBQUEsR0FBQSxxQkFBQSxHQUFBLENBQUEsR0FBQSxNQUFBLEdBQUEsQ0FBQSxTQUFBLHlCQUFBLEdBQUEsTUFBQSxHQUFBLENBQUEsU0FBQSw0QkFBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLEdBQUEsZ0JBQUEsR0FBQSxDQUFBLGNBQUEsb0JBQUEsR0FBQSxPQUFBLGVBQUEsR0FBQSxDQUFBLEdBQUEsT0FBQSxXQUFBLEdBQUEsT0FBQSxHQUFBLENBQUEsU0FBQSxjQUFBLEdBQUEsUUFBQSxVQUFBLEdBQUEsQ0FBQSxHQUFBLGlCQUFBLEdBQUEsT0FBQSxHQUFBLENBQUEsR0FBQSxtQkFBQSxHQUFBLE9BQUEsR0FBQSxDQUFBLEdBQUEsY0FBQSxHQUFBLENBQUEsR0FBQSxhQUFBLEdBQUEsQ0FBQSxHQUFBLGFBQUEsR0FBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLGNBQUEsR0FBQSxVQUFBLEdBQUEsQ0FBQSxHQUFBLFlBQUEsR0FBQSxDQUFBLFFBQUEsUUFBQSxRQUFBLFNBQUEsWUFBQSxJQUFBLGVBQUEsY0FBQSxHQUFBLGVBQUEsR0FBQSxpQkFBQSxTQUFBLEdBQUEsQ0FBQSxHQUFBLFVBQUEsR0FBQSxDQUFBLFFBQUEsVUFBQSxRQUFBLGVBQUEsZUFBQSxRQUFBLEdBQUEsZUFBQSxHQUFBLGlCQUFBLFNBQUEsR0FBQSxDQUFBLFFBQUEsUUFBQSxRQUFBLFlBQUEsZUFBQSxxQkFBQSxHQUFBLGVBQUEsR0FBQSxpQkFBQSxTQUFBLEdBQUEsQ0FBQSxRQUFBLFFBQUEsUUFBQSxhQUFBLGVBQUEsZUFBQSxHQUFBLGVBQUEsR0FBQSxpQkFBQSxTQUFBLEdBQUEsQ0FBQSxRQUFBLGVBQUEsWUFBQSxJQUFBLGVBQUEsd0JBQUEsR0FBQSxlQUFBLFlBQUEsR0FBQSxpQkFBQSxTQUFBLEdBQUEsQ0FBQSxHQUFBLFlBQUEsR0FBQSxDQUFBLFNBQUEsa0JBQUEsR0FBQSxTQUFBLFNBQUEsR0FBQSxDQUFBLEdBQUEsY0FBQSxHQUFBLENBQUEsUUFBQSxVQUFBLEdBQUEsT0FBQSxpQkFBQSxHQUFBLE9BQUEsR0FBQSxDQUFBLFFBQUEsVUFBQSxHQUFBLE9BQUEsYUFBQSxHQUFBLENBQUEsR0FBQSxpQkFBQSxTQUFBLEdBQUEsQ0FBQSxHQUFBLGlCQUFBLEdBQUEsT0FBQSxHQUFBLENBQUEsR0FBQSxvQkFBQSxTQUFBLEdBQUEsQ0FBQSxTQUFBLG1CQUFBLEdBQUEsU0FBQSxHQUFBLFNBQUEsU0FBQSxHQUFBLENBQUEsR0FBQSxtQkFBQSxHQUFBLE9BQUEsR0FBQSxDQUFBLEdBQUEsWUFBQSxHQUFBLENBQUEsU0FBQSxjQUFBLEdBQUEsU0FBQSxTQUFBLEdBQUEsQ0FBQSxHQUFBLFlBQUEsR0FBQSxDQUFBLEdBQUEsZ0JBQUEsR0FBQSxDQUFBLEdBQUEsZ0JBQUEsR0FBQSxPQUFBLEtBQUEsR0FBQSxDQUFBLEdBQUEsZ0JBQUEsR0FBQSxDQUFBLEdBQUEsYUFBQSxHQUFBLENBQUEsR0FBQSxXQUFBLEdBQUEsQ0FBQSxHQUFBLGFBQUEsR0FBQSxDQUFBLEdBQUEsZUFBQSxHQUFBLE9BQUEsR0FBQSxDQUFBLEdBQUEsWUFBQSxHQUFBLENBQUEsR0FBQSxnQkFBQSxHQUFBLENBQUEsR0FBQSxjQUFBLEdBQUEsT0FBQSxHQUFBLENBQUEsR0FBQSxZQUFBLEdBQUEsQ0FBQSxHQUFBLGFBQUEsR0FBQSxDQUFBLEdBQUEsY0FBQSxHQUFBLENBQUEsR0FBQSxnQkFBQSxHQUFBLENBQUEsU0FBQSxPQUFBLEdBQUEsU0FBQSxTQUFBLEdBQUEsQ0FBQSxHQUFBLFFBQUEsR0FBQSxDQUFBLEdBQUEsY0FBQSxHQUFBLENBQUEsR0FBQSxPQUFBLFlBQUEsR0FBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLE9BQUEsY0FBQSxHQUFBLE9BQUEsR0FBQSxDQUFBLEdBQUEsS0FBQSxHQUFBLENBQUEsR0FBQSxlQUFBLEdBQUEsQ0FBQSxHQUFBLFlBQUEsR0FBQSxDQUFBLEdBQUEsZ0JBQUEsR0FBQSxDQUFBLFFBQUEsWUFBQSxHQUFBLFVB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R0FBQSxDQUFBLEdBQUEsZ0JBQUEsR0FBQSxDQUFBLEdBQUEsaUJBQUEsR0FBQSxDQUFBLEdBQUEsYUFBQSxHQUFBLENBQUEsR0FBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLGlCQUFBLEdBQUEsQ0FBQSxHQUFBLFVBQUEsR0FBQSxDQUFBLEdBQUEsUUFBQSxVQUFBLEdBQUEsQ0FBQSxTQUFBLHFCQUFBLEdBQUEsUUFBQSxVQUFBLEdBQUEsQ0FBQSxHQUFBLGVBQUEsT0FBQSxHQUFBLENBQUEsR0FBQSxlQUFBLFNBQUEsR0FBQSxDQUFBLEdBQUEsUUFBQSxHQUFBLENBQUEsU0FBQSxjQUFBLEdBQUEsUUFBQSxVQUFBLEdBQUEsQ0FBQSxHQUFBLFlBQUEsR0FBQSxDQUFBLFNBQUEsY0FBQSxHQUFBLFNBQUEsU0FBQSxHQUFBLENBQUEsR0FBQSxZQUFBLEdBQUEsQ0FBQSxHQUFBLGdCQUFBLEdBQUEsQ0FBQSxXQUFBLHVFQUFBLEdBQUEsZ0JBQUEsR0FBQSxPQUFBLEtBQUEsR0FBQSxDQUFBLEdBQUEsZ0JBQUEsR0FBQSxDQUFBLFNBQUEsY0FBQSxHQUFBLFFBQUEsVUFBQSxVQUFBLEdBQUEsTUFBQSxHQUFBLENBQUEsR0FBQSxXQUFBLEdBQUEsQ0FBQSxHQUFBLGVBQUEsR0FBQSxPQUFBLEdBQUEsQ0FBQSxHQUFBLGdCQUFBLEdBQUEsQ0FBQSxTQUFBLE9BQUEsR0FBQSxTQUFBLFNBQUEsR0FBQSxDQUFBLEdBQUEsUUFBQSxHQUFBLENBQUEsR0FBQSxjQUFBLEdBQUEsQ0FBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLEdBQUEsT0FBQSxHQUFBLENBQUEsR0FBQSxLQUFBLEdBQUEsQ0FBQSxHQUFBLFlBQUEsR0FBQSxDQUFBLEdBQUEsS0FBQSxHQUFBLENBQUEsR0FBQSxhQUFBLEdBQUEsQ0FBQSxHQUFBLFlBQUEsQ0FBQSxHQUFBLFVBQUEsU0FBQSx3QkFBQSxJQUFBLEtBQUE7QUFBQSxRQUFBLEtBQUEsR0FBQTtBQ2IzQixNQUFBLDhCQUFBLEdBQUEsT0FBQSxDQUFBLEVBQTRCLEdBQUEsUUFBQSxDQUFBLEVB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QUE7OEVBQUgsTUFBRyxXQUFBLENBQUEsQ0FBQSxVQUFBLENBQUEsR0FBQSxPQUFBLEdBQUEsTUFBQSxHQUFBLFVBQUEsU0FBQSxhQUFBLElBQUEsS0FBQTtBQUFBLFFBQUEsS0FBQSxHQUFBO0FDWGhCLE1BQUEseUJBQUEsR0FBQSxZQUFBLEVBQXlCLEdBQUEsZUFBQTs7b0JET2JJLGVBQWMsZUFBZSxHQUFBLGVBQUEsRUFBQSxDQUFBOzs7aUZBSTVCLEtBQUcsQ0FBQTtVQVBmQzt1QkFDVyxZQUFVLFlBQ1IsTUFBSSxTQUNQLENBQUNELGVBQWMsZUFBZSxHQUFDLFVBQUEsK0RBQUEsQ0FBQTs7OztrRkFJN0IsS0FBRyxFQUFBLFdBQUEsT0FBQSxVQUFBLGtCQUFBLFlBQUEsR0FBQSxDQUFBO0FBQUEsR0FBQTs7Ozs7OztnRUFBSCxLQUFHLEVBQUEsU0FBQSxDQUFBRSxJQUFBLEdBQUEsQ0FBQUYsZUFBQSxpQkFBQUMsV0FBQSxHQUFBLGFBQUEsRUFBQSxDQUFBO0VBQUE7QUFBQSxHQUFBLE9BQUEsY0FBQSxlQUFBLGNBQUEsWUFBQSxLQUFBLElBQUEsQ0FBQTtBQUFBLEdBQUEsT0FBQSxjQUFBLGVBQUEsZUFBQSxZQUFBLE9BQUEsWUFBQSxJQUFBLEdBQUEsNEJBQUEsT0FBQSxFQUFBLE9BQUEsTUFBQSxZQUFBLEVBQUEsU0FBQSxDQUFBO0FBQUEsR0FBQTs7O0F0Q1BoQixxQkFBcUIsS0FBSyxTQUFTLEVBQ2hDLE1BQU0sQ0FBQyxRQUFRLFFBQVEsTUFBTSxHQUFHLENBQUM7IiwibmFtZXMiOlsiaTAiLCJDb21wb25lbnQiLCJGb3Jtc01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIlJvdXRlck1vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUm91dGVyTW9kdWxlIiwiQ29tcG9uZW50IiwiaTAiLCJpMyIsImk0IiwiaTIiLCJDb21wb25lbnQiLCJDb21tb25Nb2R1bGUiLCJSb3V0ZXJNb2R1bGUiLCJpMCIsImkxIiwiaTIiLCJDb21wb25lbnQiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIm9mIiwiSW5qZWN0YWJsZSIsInRhcCIsInRhcCIsIkluamVjdGFibGUiLCJJbmplY3RhYmxlIiwiaW5qZWN0IiwidGFwIiwiaW5qZWN0IiwidGFwIiwiSW5qZWN0YWJsZSIsIkluamVjdGFibGUiLCJpbmplY3QiLCJ0YXAiLCJvZiIsInRocm93RXJyb3IiLCJpbmplY3QiLCJvZiIsInRocm93RXJyb3IiLCJ0YXAiLCJJbmplY3RhYmxlIiwiSW5qZWN0YWJsZSIsImluamVjdCIsInRhcCIsIm9mIiwidGhyb3dFcnJvciIsImluamVjdCIsIm9mIiwidGhyb3dFcnJvciIsInRhcCIsIkluamVjdGFibGUiLCJvZiIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiQ29tcG9uZW50IiwiaTAiLCJDb21wb25lbnQiLCJDb21tb25Nb2R1bGUiLCJjYXRjaEVycm9yIiwiZm9ya0pvaW4iLCJvZiIsImZvcmtKb2luIiwiY2F0Y2hFcnJvciIsIm9mIiwiQ29tbW9uTW9kdWxlIiwiQ29tcG9uZW50IiwiaTAiLCJpNSIsImk0IiwiQ29tcG9uZW50IiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJJbmplY3RhYmxlIiwiSW5qZWN0YWJsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiQ29tcG9uZW50IiwiaTAiLCJpNCIsImk1IiwiaTMiLCJDb21wb25lbnQiLCJDb21tb25Nb2R1bGUiLCJjYXRjaEVycm9yIiwiZm9ya0pvaW4iLCJvZiIsIkluamVjdGFibGUiLCJJbmplY3RhYmxlIiwiZm9ya0pvaW4iLCJjYXRjaEVycm9yIiwib2YiLCJDb21tb25Nb2R1bGUiLCJDb21wb25lbnQiLCJpMCIsImk2IiwiQ29tcG9uZW50IiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSb3V0ZXJNb2R1bGUiLCJJbmplY3RhYmxlIiwiSW5qZWN0YWJsZSIsIl9jMCIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUm91dGVyTW9kdWxlIiwiQ29tcG9uZW50IiwiaTAiLCJpMyIsImk0IiwiaTUiLCJDb21wb25lbnQiLCJDb21tb25Nb2R1bGUiLCJJbmplY3RhYmxlIiwiSW5qZWN0YWJsZSIsIkNvbW1vbk1vZHVsZSIsIkNvbXBvbmVudCIsImkwIiwiaTMiLCJDb21wb25lbnQiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIlJvdXRlck1vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUm91dGVyTW9kdWxlIiwiQ29tcG9uZW50IiwiaTAiLCJpMiIsImkzIiwiaTQiLCJDb21wb25lbnQiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiQ29tcG9uZW50IiwiaTAiLCJpMiIsImkzIiwiQ29tcG9uZW50IiwiUm91dGVyT3V0bGV0IiwiQ29tcG9uZW50IiwiQ29tbW9uTW9kdWxlIiwiUm91dGVyTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiUm91dGVyTW9kdWxlIiwiQ29tcG9uZW50IiwiaTAiLCJpMyIsImkyIiwiUm91dGVyT3V0bGV0IiwiQ29tcG9uZW50IiwiaTAiXX0=