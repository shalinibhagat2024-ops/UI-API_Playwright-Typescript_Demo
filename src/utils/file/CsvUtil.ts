import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import fs from "fs";

export class CsvUtil {
  /**
   * Read CSV file.
   */
  public static read<T = Record<string, string>>(filePath: string): T[] {
    const content = fs.readFileSync(filePath, "utf8");

    return parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as T[];
  }

  /**
   * Write data to CSV.
   */
  public static write(filePath: string, data: Record<string, unknown>[]): void {
    const csv = stringify(data, {
      header: true,
    });

    fs.writeFileSync(filePath, csv);
  }

  /**
   * Convert objects to CSV string.
   */
  public static stringify(data: Record<string, unknown>[]): string {
    return stringify(data, {
      header: true,
    });
  }

  /**
   * Parse CSV string.
   */
  public static parse<T = Record<string, string>>(csv: string): T[] {
    return parse(csv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as T[];
  }
}

/*

Example CSV
Name,Age,City
John,30,New York
Alice,28,London
David,35,Sydney


const users = CsvUtil.read("downloads/users.csv");
console.log(users);

[
  {
    Name: "John",
    Age: "30",
    City: "New York"
  },
  {
    Name: "Alice",
    Age: "28",
    City: "London"
  }
]

Read Using Interface
interface User {

    Name: string;

    Age: string;

    City: string;

}

const users = CsvUtil.read<User>(
    "downloads/users.csv"
);

console.log(users[0].Name);

//Write CSV

CsvUtil.write("downloads/result.csv", [

    {
        Name: "Shalini",
        Age: 30,
        City: "Hyderabad"
    },

    {
        Name: "John",
        Age: 32,
        City: "Toronto"
    }

]);
Convert Object to CSV

const csv = CsvUtil.stringify(data);
console.log(csv);

Parse CSV String
const users = CsvUtil.parse(csvContent);

example

await exportButton.click();

const data = CsvUtil.read(
    "downloads/Products.csv"
);

expect(data.length).toBeGreaterThan(0);

expect(data[0].ProductName)
    .toBe("Blue Top");

*/
