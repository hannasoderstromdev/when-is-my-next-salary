import { sweden2022, Holiday } from "./sweden2022";

interface Payday {
  date: string;
  weekDay: Weekday;
  weekEnd: boolean;
  isHoliday: boolean;
  holidayName: string;
  payday: string;
}

enum Weekday {
  SUNDAY = "Sunday",
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
}

export enum SalaryIteration {
  MONTHLY = "Monthly",
  WEEKLY = "Weekly",
}

const months = [
  "January",
  "February",
  "Mars",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export class App {
  SALARY_ITERATIONS: SalaryIteration = SalaryIteration.MONTHLY;
  readonly SALARY_DATE = 25;
  SALARY_YEAR = 2022;
  readonly DATE_FORMAT: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  private getShortDate(date: Date): string {
    return date.toLocaleDateString("en-US", this.DATE_FORMAT);
  }

  private getWeekDay(date: Date): Weekday {
    const weekDays = [
      Weekday.SUNDAY,
      Weekday.MONDAY,
      Weekday.TUESDAY,
      Weekday.WEDNESDAY,
      Weekday.THURSDAY,
      Weekday.FRIDAY,
      Weekday.SATURDAY,
    ];

    return weekDays[date.getDay()];
  }

  private generatePayoutsMonthly(): Payday[] {
    const payouts = [];

    for (let i = 0; i < 12; i++) {
      const payday = new Date(this.SALARY_YEAR, i, this.SALARY_DATE);

      const dayOfTheWeek = payday.getDay();

      if (dayOfTheWeek > 0 && dayOfTheWeek < 6) {
        const holiday = sweden2022.find((holiday) => {
          return holiday.date === this.getShortDate(payday);
        });

        payouts.push({
          date: this.getShortDate(payday),
          weekDay: this.getWeekDay(payday),
          weekEnd: false,
          isHoliday: !!holiday,
          holidayName: holiday?.name || "",
          payday: this.getShortDate(payday),
        });
      } else {
        const daysPastFriday = dayOfTheWeek === 0 ? 2 : 1;

        const payout = {
          date: this.getShortDate(payday),
          weekDay: this.getWeekDay(payday),
          weekEnd: true,
          isHoliday: false,
          holidayName: "",
          payday: "",
        };

        payday.setDate(payday.getDate() - daysPastFriday);

        payout["payday"] = this.getShortDate(payday);

        payouts.push(payout);
      }
    }

    return payouts;
  }

  private generatePayoutsWeekly(): Payday[] {
    const payouts = [];

    // If Thursday is a holiday, check Wednesday,
    // If Wednesday is a holiday, check Tuesday,
    // if Tuesday is a holiday, check Monday
    // If Monday is a holiday, go to next Friday
    for (let week = 1; week <= 52; week++) {
      const currentDate = new Date(this.SALARY_YEAR, 0, 1);

      // Find first Friday of the current year
      while (currentDate.getDay() !== 4) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      let holiday: boolean | undefined | Holiday = true;

      for (let i = 1; i < sweden2022.length; i++) {
        holiday = sweden2022.find((holiday) => {
          const dateToCompare = new Date(currentDate.getDate() - 1);
          return holiday.date === this.getShortDate(dateToCompare);
        });
      }

      // If Friday is a holiday, check Thursday
      if (holiday) {
      }

      const payout = {
        date: "",
        weekDay: Weekday.FRIDAY,
        weekEnd: false,
        isHoliday: false,
        holidayName: "",
        payday: "",
      };
      payouts.push(payout);
    }

    return payouts;
  }

  setSalaryYear(year: number): void {
    const currentYear = new Date().getFullYear();

    if (year < 1900 || year > currentYear) {
      throw new Error(`Please enter a year between 1900 and ${currentYear}`);
    }

    this.SALARY_YEAR = year;
  }

  setSalaryIterations(iteration: SalaryIteration) {
    this.SALARY_ITERATIONS = iteration;
  }

  generatePayoutsForYear(): Payday[] {
    return this.SALARY_ITERATIONS === SalaryIteration.MONTHLY
      ? this.generatePayoutsMonthly()
      : this.generatePayoutsWeekly();
  }

  getNextPayday(): Payday | void {
    const payouts = this.generatePayoutsForYear();

    const currentMonth = new Date().getMonth();

    if (payouts.length > 0) {
      return payouts.find(
        (payout) => new Date(payout.date).getMonth() === currentMonth
      );
    }
  }
}

const app = new App();
console.log(app.getNextPayday());
