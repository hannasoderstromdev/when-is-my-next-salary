import { sweden2022 } from "./sweden2022";

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

class App {
  readonly SALARY_ITERATION = 12;
  readonly SALARY_DATE = 25;
  readonly SALARY_YEAR = 2022;
  readonly DATE_FORMAT: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  getShortDate(date: Date): string {
    const shortDate = date.toLocaleDateString("en-US", this.DATE_FORMAT);

    // const shortDate = `${date.getDay().toString()}/${(
    //   date.getMonth() + 1
    // ).toString()}/${date.getFullYear().toString()}`;

    return shortDate;
  }

  getWeekDay(date: Date): Weekday {
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

  generatePayouts(): Payday[] {
    const payouts = [];

    for (let i = 0; i < this.SALARY_ITERATION; i++) {
      const payday = new Date(this.SALARY_YEAR, i, this.SALARY_DATE);

      const dayOfTheWeek = payday.getDay();

      if (dayOfTheWeek > 0 && dayOfTheWeek < 6) {
        const holiday = sweden2022.find((holiday) => {
          return holiday.date === this.getShortDate(payday);
        });

        console.log(this.getShortDate(payday));

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

  getNextPayday(): Payday | {} {
    const today = new Date();

    const payouts = this.generatePayouts();

    return (
      payouts.find(
        (payout) => new Date(payout.date).getMonth() === today.getMonth()
      ) || {}
    );
  }
}

const app = new App();
console.log(app.getNextPayday());
