# When is my next salary?

This is a small app that can tell you when your next salary payout is, taking holidays and weekends into account.

## How to

```js
const app = new App();

// Defaults to 25th / monthly
console.log(app.getNextPayday());
/*
{
  date: '02/25/2022',
  weekDay: 'Friday',
  weekEnd: false,
  isHoliday: false,
  holidayName: '',
  payday: '02/25/2022'
}
*/
```
