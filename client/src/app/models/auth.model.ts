export class AuthModel {

  public constructor(
    public _id?: string,
    public iAdmin?: boolean,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public token?: string,
    public city?: string,
    public street?: string,
 
  ) { }
}