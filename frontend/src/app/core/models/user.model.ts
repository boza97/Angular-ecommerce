export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    private _token: string,
    private _tokenEXpirationDate: Date
  ) {}

  get token() {
    if(!this._tokenEXpirationDate || new Date() > this._tokenEXpirationDate) {
      return null;
    }
    return this._token;
  }
}