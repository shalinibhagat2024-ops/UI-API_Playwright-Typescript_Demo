import { User } from "@model/users/user";
import { RandomUtil } from "@utils/random/RandomUtil";

import { UserBuilder } from "../builders/UserBuilder";

export class UserFactory {
  /**
   * Create user from JSON
   */
  public static fromJson(user: User): User {
    return new UserBuilder()
      .title(user.title!)
      .name(user.name)
      .email(RandomUtil.email())
      .password(user.password)
      .day(user.day!)
      .month(user.month!)
      .year(user.year!)
      .firstName(user.firstName!)
      .lastName(user.lastName!)
      .company(user.company!)
      .address1(user.address1!)
      .address2(user.address2!)
      .country(user.country!)
      .state(user.state!)
      .city(user.city!)
      .zipcode(user.zipcode!)
      .mobileNumber(user.mobileNumber!)
      .build();
  }
}
