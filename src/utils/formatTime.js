import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export const convertMonthToName = (month) => {
  const date = new Date();
  date.setMonth(month - 1);

  return date.toLocaleString('en-US', { month: 'long' });
};

export const getDayOfMonth = (month, year) => {
  const date = new Date(year, month, 1);

  date.setDate(date.getDate() - 1);

  return date.getDate();
};

export const getArrayDayofMonth = (numberOfMonth, month, year) => {
  const dayOfMonth = [];
  for (let i = 1; i <= numberOfMonth; i += 1) {
    if (i < 10) {
      dayOfMonth.push(`${month}/0${i}/${year}`);
    } else {
      dayOfMonth.push(`${month}/${i}/${year}`);
    }
  }
  return dayOfMonth;
};
