// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server: "http://localhost:3000/api",
  authServer : "http://localhost:4000/api",
  googlePlaceKey : "AIzaSyBrf8AcnsXLIzDA1EOT7pe5lnuuL6BWb60&libraries",
  googleReCaptchaKey : "6LeK_u4UAAAAAGHI-faKt1g5n42kTQ2cIeMONQar",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
