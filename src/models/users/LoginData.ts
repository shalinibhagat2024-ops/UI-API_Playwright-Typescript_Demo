export interface LoginData {
  testCase: string;
  email: string;
  password: string;
  expectedResult: "success" | "failure" | "validation";
}
