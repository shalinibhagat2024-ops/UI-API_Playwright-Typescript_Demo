import { JsonReader } from "@core/helpers/dataReaders/JsonReader";
import { LoginData } from "src/models/users/LoginData";

export class LoginFactory {
  public static getAll(): LoginData[] {
    return JsonReader.read<LoginData[]>("users/LoginTestData.json");
  }
}
