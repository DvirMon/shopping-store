export class UserModel {

  constructor(
    public isAdmin?: boolean,
    public _id?: string,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public city?: string,
    public street?: string,
  ) { }
}