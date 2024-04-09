import "@testing-library/jest-dom";
import userLogIn from "@/libs/userLogIn";
import getUserProfile from "@/libs/getUserProfile";
import { screen, render, waitFor } from "@testing-library/react";

describe("Remote User Log-In", () => {
  var logInPromise: any;
  var logInJsonResult: any;

  beforeAll(async () => {
    const email = "casassaddl@gmail.com";
    const password = "123456";
    logInPromise = userLogIn(email, password);
    logInJsonResult = await logInPromise;
  });

  it("userLogIn must return correct results", () => {
    expect(logInJsonResult.success).toBeTruthy();
  });
});
