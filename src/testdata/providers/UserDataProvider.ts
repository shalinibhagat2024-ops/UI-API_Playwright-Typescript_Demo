import { EnvironmentManager } from "@core/config/EnvironmentManager";
import { TestDataSource } from "@core/constants/TestDataSource";
import { CsvReader } from "@core/helpers/dataReaders/CsvReader";
import { JsonReader } from "@core/helpers/dataReaders/JsonReader";
import { User } from "@model/users/user";

import { UserFactory } from "../factories/UserFactory";

export class UserDataProvider {
  /**
   * Entry Point
   */
  public static validUsers(): User[] {
    switch (EnvironmentManager.getTestDataSource()) {
      case TestDataSource.JSON:
        return this.validUsersFromJson();

      case TestDataSource.CSV:
        return this.validUsersFromCsv();

      default:
        throw new Error(`Unsupported Test Data Source : ${EnvironmentManager.getTestDataSource()}`);
    }
  }

  /**
   * JSON
   */
  private static validUsersFromJson(): User[] {
    const users = JsonReader.read<User[]>("users/validUsers.json");
    return users.map((user) => UserFactory.fromJson(user));
  }

  /**
   * CSV
   */
  private static validUsersFromCsv(): User[] {
    const users = CsvReader.read<User>("users/validUsers.csv");

    return users.map((user) => UserFactory.fromJson(user));
  }
}
