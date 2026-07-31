import { EnvironmentManager } from "@core/config/EnvironmentManager";
import path from "path";
import { User } from "src/models/newUser/User";

import { JsonReader } from "../helpers/dataReaders/JsonReader";

export class TestDataManager {
  private static getData() {
    const environment = EnvironmentManager.getEnvironmentName();
    const filePath = path.join(process.cwd(), "src", "data", "testdata", environment, "users.json");
    return JsonReader.read<Record<string, User>>(filePath);
  }

  static getUser(name: string): User {
    return this.getData()[name];
  }

  public static getRegisterUser(name: string) {
    const environment = EnvironmentManager.getEnvironmentName();
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "testdata",
      environment,
      "registerUsers.json"
    );
    const data = JsonReader.read<any>(filePath);
    return data[name];
  }

  public static getProduct(name: string) {
    const environment = EnvironmentManager.getEnvironmentName();
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "testdata",
      environment,
      "products.json"
    );
    const data = JsonReader.read<any>(filePath);
    return data[name];
  }
}
