function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{MZl4:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("fXoL"),a=n("lGQG"),o=n("bTqV"),i=function(){var e=function(){function e(t){_classCallCheck(this,e),this.authService=t}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"onClick",value:function(){this.authService.logout()}}]),e}();return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](a.a))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-account"]],decls:3,vars:0,consts:[["mat-raised-button","","type","button",3,"click"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"div"),r["\u0275\u0275elementStart"](1,"button",0),r["\u0275\u0275listener"]("click",(function(){return t.onClick()})),r["\u0275\u0275text"](2,"Logout"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]())},directives:[o.a],styles:["div[_ngcontent-%COMP%]{width:100%;margin:0;display:flex;justify-content:center;vertical-align:middle}div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{position:absolute;top:50%}"]}),e}()},S0Rf:function(e,t,n){"use strict";n.d(t,"a",(function(){return E}));var r=n("fXoL"),a=n("3Pt+"),o=n("qFsG"),i=n("lGQG"),s=n("tZre"),c=n("kmnG"),l=n("ofXK");function u(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"span",7),r["\u0275\u0275text"](1,".00"),r["\u0275\u0275elementEnd"]())}function d(e,t){if(1&e&&(r["\u0275\u0275elementContainerStart"](0),r["\u0275\u0275elementStart"](1,"span",5),r["\u0275\u0275text"](2,"$\xa0"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](3,u,2,0,"span",6),r["\u0275\u0275elementContainerEnd"]()),2&e){var n=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](3),r["\u0275\u0275property"]("ngIf","Price"===n.placeHolder)}}function f(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"mat-hint"),r["\u0275\u0275text"](1),r["\u0275\u0275elementEnd"]()),2&e){var n=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate"]("Please enter "+n.hint)}}function p(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"mat-hint"),r["\u0275\u0275text"](1),r["\u0275\u0275elementEnd"]()),2&e){var n=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate"](n.customHint)}}function h(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"mat-hint"),r["\u0275\u0275text"](1,"verifying in database..."),r["\u0275\u0275elementEnd"]())}function v(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"mat-hint"),r["\u0275\u0275text"](1,"Double click on the icon for auto complete"),r["\u0275\u0275elementEnd"]())}function m(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"mat-hint",8),r["\u0275\u0275text"](1,"Good job!"),r["\u0275\u0275elementEnd"]())}function g(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"mat-error"),r["\u0275\u0275text"](1),r["\u0275\u0275elementEnd"]()),2&e){var n=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate"](n.error)}}function b(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"mat-error"),r["\u0275\u0275text"](1),r["\u0275\u0275elementEnd"]()),2&e){var n=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate"](n.serverError)}}function y(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"mat-error"),r["\u0275\u0275text"](1),r["\u0275\u0275elementEnd"]()),2&e){var n=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate1"]("This ",n.placeHolder.toLocaleLowerCase()," is already in use")}}function x(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"mat-error"),r["\u0275\u0275text"](1,"No account with that address exist"),r["\u0275\u0275elementEnd"]())}function C(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"mat-error"),r["\u0275\u0275text"](1,"We only get AMEX, JBC Mastercard and VISA"),r["\u0275\u0275elementEnd"]())}var E=function(){var e=function(){function e(t,n){_classCallCheck(this,e),this.authService=t,this.messageServcie=n}return _createClass(e,[{key:"ngOnInit",value:function(){this.subscribeToSubject(),this.subscribeToControl()}},{key:"writeValue",value:function(e){this.value=e||""}},{key:"registerOnChange",value:function(e){this.onChange=e}},{key:"registerOnTouched",value:function(e){this.onTouched=e}},{key:"setDisabledState",value:function(e){this.disabled=e}},{key:"handleChange",value:function(e){this.value=e}},{key:"subscribeToSubject",value:function(){var e=this;this.authService.serverError.subscribe((function(t){e.serverError=t,e.serverError&&(e.control.setErrors({serverError:!0}),e.input.focus())}))}},{key:"subscribeToControl",value:function(){var e=this;this.control.statusChanges.subscribe((function(t){"VALID"===t&&e.input.focus()}))}},{key:"validate",value:function(){var e=this;this.error=this.messageServcie.getErrorMessage(this.control,this.placeHolder),this.control.valueChanges.subscribe((function(){e.error=e.messageServcie.getErrorMessage(e.control,e.placeHolder)}))}}]),e}();return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](i.a),r["\u0275\u0275directiveInject"](s.a))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-input"]],viewQuery:function(e,t){var n;1&e&&r["\u0275\u0275viewQuery"](o.b,!0),2&e&&r["\u0275\u0275queryRefresh"](n=r["\u0275\u0275loadQuery"]())&&(t.input=n.first)},inputs:{control:"control",type:"type",hint:"hint",controlName:"controlName",placeHolder:"placeHolder",customHint:"customHint",serverErrorMode:"serverErrorMode",loginHint:"loginHint",addressHint:"addressHint",pendingHint:"pendingHint"},features:[r["\u0275\u0275ProvidersFeature"]([{provide:a.i,useExisting:Object(r.forwardRef)((function(){return e})),multi:!0}])],decls:17,vars:18,consts:[["appearance","fill",1,"full-width"],["matInput","","control","control","autocomplete","off","required","",3,"type","disabled","formControl","name","input","focusout"],["input",""],[4,"ngIf"],["class","success",4,"ngIf"],["matPrefix",""],["matSuffix","",4,"ngIf"],["matSuffix",""],[1,"success"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"mat-form-field",0),r["\u0275\u0275elementStart"](1,"mat-label"),r["\u0275\u0275text"](2),r["\u0275\u0275pipe"](3,"titlecase"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](4,"input",1,2),r["\u0275\u0275listener"]("input",(function(e){return t.handleChange(e.target.value)}))("focusout",(function(){return t.validate()})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275template"](6,d,4,1,"ng-container",3),r["\u0275\u0275template"](7,f,2,1,"mat-hint",3),r["\u0275\u0275template"](8,p,2,1,"mat-hint",3),r["\u0275\u0275template"](9,h,2,0,"mat-hint",3),r["\u0275\u0275template"](10,v,2,0,"mat-hint",3),r["\u0275\u0275template"](11,m,2,0,"mat-hint",4),r["\u0275\u0275template"](12,g,2,1,"mat-error",3),r["\u0275\u0275template"](13,b,2,1,"mat-error",3),r["\u0275\u0275template"](14,y,2,1,"mat-error",3),r["\u0275\u0275template"](15,x,2,0,"mat-error",3),r["\u0275\u0275template"](16,C,2,0,"mat-error",3),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate"](r["\u0275\u0275pipeBind1"](3,16,t.placeHolder)),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("type",t.type)("disabled",t.disabled)("formControl",t.control)("name",t.type),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngIf","Price"===t.placeHolder),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",t.control.invalid&&!t.customHint),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",t.control.invalid&&t.customHint),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",t.control.pending),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",t.addressHint),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",t.control.valid),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",t.control.errors),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",(null==t.control.errors?null:t.control.errors.serverError)&&t.serverErrorMode),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",null==t.control.errors?null:t.control.errors.unique),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",null==t.control.errors?null:t.control.errors.exist),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",null==t.control.errors?null:t.control.errors.creditCard))},directives:[c.c,c.g,o.b,a.b,a.r,a.k,a.e,l.n,c.h,c.i,c.f,c.b],pipes:[l.v],styles:["mat-form-field[_ngcontent-%COMP%]{width:300px;display:inline-block}input[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none}span.hint[_ngcontent-%COMP%]{display:flex;width:100%;font-size:75%;padding-left:3%;padding-top:1%}mat-hint.success[_ngcontent-%COMP%]{color:green}"]}),e}()},l3hs:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var r=n("2Vo4"),a=n("LRne"),o=n("vkgz"),i=n("Kj3r"),s=n("/uUt"),c=n("eIep"),l=n("AytR"),u=n("fXoL"),d=n("tk/3"),f=function(){var e=function(){function e(t){_classCallCheck(this,e),this.http=t,this.productUrl=l.a.server+"/api/products/search",this.ordersUrl=l.a.server+"/api/orders/search",this.productsSearchEntries=new r.a([]),this.productsEntries$=this.productsSearchEntries.asObservable(),this.ordersSearchEntries=new r.a([]),this.orderEntries$=this.ordersSearchEntries.asObservable(),this.handlerRsults=new r.a(!1),this.results$=this.handlerRsults.asObservable()}return _createClass(e,[{key:"searchProducts",value:function(e){var t=this;return this.http.get(this.productUrl+"/"+e).pipe(Object(o.a)((function(e){return 0===e.length?t.handleError():t.handleProducts(e)})))}},{key:"searchOrders",value:function(e,t){var n=this;return this.http.get(this.ordersUrl+"/"+e+"/"+t).pipe(Object(o.a)((function(e){return t&&t.trim()&&!n.validFormat(t)?0===e.length?n.handleError():n.handleOrders(e):n.handleError()})))}},{key:"search",value:function(e){var t=this;return e.valueChanges.pipe(Object(i.a)(600),Object(s.a)(),Object(c.a)((function(e){return e&&e.trim()&&!t.validFormat(e)?t.searchProducts(e.trim().toLocaleLowerCase()):t.handleError()})))}},{key:"validFormat",value:function(e){return/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(e)}},{key:"handleError",value:function(){return this.handlerRsults.next(!0),this.productsSearchEntries.next([]),this.ordersSearchEntries.next([]),Object(a.a)([])}},{key:"handleProducts",value:function(e){return this.handlerRsults.next(!1),this.productsSearchEntries.next(e),Object(a.a)(e)}},{key:"handleOrders",value:function(e){return this.handlerRsults.next(!1),this.ordersSearchEntries.next(e),console.log(e),Object(a.a)(e)}}]),e}();return e.\u0275fac=function(t){return new(t||e)(u["\u0275\u0275inject"](d.b))},e.\u0275prov=u["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},o3vJ:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("fXoL"),a=n("l3hs"),o=n("ofXK");function i(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"span",4),r["\u0275\u0275text"](1),r["\u0275\u0275elementEnd"]()),2&e){var n=r["\u0275\u0275nextContext"](2);r["\u0275\u0275advance"](1),r["\u0275\u0275textInterpolate1"](' No results found for query "',n.value,'" ')}}function s(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"div",1),r["\u0275\u0275elementStart"](1,"div",2),r["\u0275\u0275element"](2,"img",3),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](3,"div",4),r["\u0275\u0275template"](4,i,2,1,"span",5),r["\u0275\u0275pipe"](5,"async"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e){var n=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](4),r["\u0275\u0275property"]("ngIf",r["\u0275\u0275pipeBind1"](5,1,n.results$)&&n.value)}}var c=function(){var e=function e(t){_classCallCheck(this,e),this.searchService=t,this.results$=this.searchService.results$};return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](a.a))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-search-image"]],inputs:{value:"value",searchEntries$:"searchEntries$",isMobile$:"isMobile$"},decls:3,vars:5,consts:[["class","search",4,"ngIf"],[1,"search"],[1,"img"],["src","https://gstatic.gitbook.com/images/7f9239ce726764aa22093884902e018d.svg","alt",""],[1,"text"],["class","text",4,"ngIf"]],template:function(e,t){if(1&e&&(r["\u0275\u0275template"](0,s,6,3,"div",0),r["\u0275\u0275pipe"](1,"async"),r["\u0275\u0275pipe"](2,"async")),2&e){var n=null,a=r["\u0275\u0275pipeBind1"](1,1,t.isMobile$)&&0===(null==(n=r["\u0275\u0275pipeBind1"](2,3,t.searchEntries$))?null:n.length);r["\u0275\u0275property"]("ngIf",a)}},directives:[o.n],pipes:[o.b],styles:["div.search[_ngcontent-%COMP%]{height:58vh;flex:1 1 0%;margin:0;display:flex;align-items:center;flex-direction:column;justify-content:center}div.search[_ngcontent-%COMP%]   div.img[_ngcontent-%COMP%]{margin-bottom:5%}div.search[_ngcontent-%COMP%]   div.text[_ngcontent-%COMP%]{width:100%;text-align:center}div.search[_ngcontent-%COMP%]   div.text[_ngcontent-%COMP%]   span.text[_ngcontent-%COMP%]{font-size:16px;font-family:Roboto,sans-serif;font-weight:500;line-height:1.5;z-index:10;color:#000}"]}),e}()},tZre:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("fXoL"),a=function(){var e=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getErrorMessage",value:function(e,t){return e.hasError("required")?"value is required ":e.hasError("min")?"Value in not valid ":"Password"===t||"Confirmation Password"===t?this.passwordCustomErrorMessage(e,t):e.hasError("maxlength")?"".concat(t," length must be less or equal to ").concat(e.errors.maxlength.requiredLength," characters long"):e.hasError("minlength")?"".concat(t," length must be at least ").concat(e.errors.minlength.requiredLength," characters long"):e.hasError("pattern")?"invalid ".concat(t," format"):void 0}},{key:"passwordCustomErrorMessage",value:function(e,t){return e.hasError("maxlength")||e.hasError("minlength")?t+" length must be 8-24 characters long":e.hasError("pattern")?" ".concat(t," must contain at least one lowercase, uppercase and numeric character"):void 0}},{key:"generate",value:function(){var e=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],t=function(e){return e[Math.floor(Math.random()*e.length)]},n="";n=(n=n.concat(t(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]))).concat(t(["0","1","2","3","4","5","6","7","8","9"]));for(var r=1;r<9;r++)n=n.concat(t(e));return n.split("").sort((function(){return.5-Math.random()})).join("")}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=r["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()}}]);