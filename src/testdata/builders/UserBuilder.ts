import { User } from "@model/users/user";

export class UserBuilder {
  private readonly user: User = {} as User;

  public title(value: string): UserBuilder {
    this.user.title = value;
    return this;
  }

  public name(value: string): UserBuilder {
    this.user.name = value;
    return this;
  }

  public email(value: string): UserBuilder {
    this.user.email = value;
    return this;
  }

  public password(value: string): UserBuilder {
    this.user.password = value;
    return this;
  }

  public day(value: string): UserBuilder {
    this.user.day = value;
    return this;
  }

  public month(value: string): UserBuilder {
    this.user.month = value;
    return this;
  }

  public year(value: string): UserBuilder {
    this.user.year = value;
    return this;
  }

  public firstName(value: string): UserBuilder {
    this.user.firstName = value;
    return this;
  }

  public lastName(value: string): UserBuilder {
    this.user.lastName = value;
    return this;
  }

  public company(value: string): UserBuilder {
    this.user.company = value;
    return this;
  }

  public address1(value: string): UserBuilder {
    this.user.address1 = value;
    return this;
  }

  public address2(value: string): UserBuilder {
    this.user.address2 = value;
    return this;
  }

  public country(value: string): UserBuilder {
    this.user.country = value;
    return this;
  }

  public state(value: string): UserBuilder {
    this.user.state = value;
    return this;
  }

  public city(value: string): UserBuilder {
    this.user.city = value;
    return this;
  }

  public zipcode(value: string): UserBuilder {
    this.user.zipcode = value;
    return this;
  }

  public mobileNumber(value: string): UserBuilder {
    this.user.mobileNumber = value;
    return this;
  }

  public build(): User {
    return this.user;
  }
}
