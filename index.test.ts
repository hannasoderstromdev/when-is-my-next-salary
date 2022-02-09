import { App } from "./index";

describe("setSalaryYear()", () => {
  it("does not allow years before 1900", () => {
    const app = new App();

    expect(() => app.setSalaryYear(1800)).toThrowError(
      "Please enter a year between 1900 and 2022"
    );
  });

  it("does not allow years in the future", () => {
    const app = new App();

    const nextYear = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    );

    expect(() => app.setSalaryYear(nextYear.getFullYear())).toThrowError(
      "Please enter a year between 1900 and 2022"
    );
  });
});

describe("generatePayoutsForYear()", () => {
  it("returns twelve payouts", () => {
    const app = new App();
    const payouts = app.generatePayoutsForYear();

    expect(payouts.length).toEqual(12);
  });

  it("returns payouts in the correct format", () => {
    const app = new App();
    const payouts = app.generatePayoutsForYear();

    payouts.map((payout) => {
      expect(payout).toEqual({
        date: expect.any(String),
        holidayName: expect.any(String),
        isHoliday: expect.any(Boolean),
        payday: expect.any(String),
        weekDay: expect.any(String),
        weekEnd: expect.any(Boolean),
      });
    });
  });
});
