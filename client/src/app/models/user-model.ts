export class UserModel {

  constructor(
    public _id?: string,
    public isAdmin?: boolean,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public token?: string,
    public city?: string,
    public street?: string,
  ) { }
}