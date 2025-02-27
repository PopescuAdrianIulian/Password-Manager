export class Password {
  public id: number;
  public username: string;
  public password: string;
  public websiteUrl: string;

  constructor(
    id: number,
    username: string,
    password: string,
    websiteUrl: string
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.websiteUrl = websiteUrl;
  }
}
