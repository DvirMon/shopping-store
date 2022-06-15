export interface User {
  isAdmin?: boolean;
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  street?: string;
}
// export class User {
//   constructor(
//      isAdmin?: boolean,
//     public _id?: string,
//     public email?: string,
//     public firstName?: string,
//     public lastName?: string,
//     public city?: string,
//     public street?: string
//   ) {}

//   // public fillName(): string {
//   //   return `${this.firstName} ${this.lastName}}`;
//   // }

//   // get fillname() {
//   //   return `${this.firstName} ${this.lastName}}`;
//   // }
// }
