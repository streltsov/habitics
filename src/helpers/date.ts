import {
  endOfToday,
  endOfTomorrow,
  endOfWeek,
  addWeeks,
  formatRFC3339,
} from "date-fns";

export const MAX_DATE = new Date(8640000000000000);

export const getMaxDate = () => formatRFC3339(MAX_DATE);
export const getEndOfToday = () => formatRFC3339(endOfToday());
export const getEndOfTomorrow = () => formatRFC3339(endOfTomorrow());
export const getEndOfThisWeek = () => formatRFC3339(endOfWeek(new Date()));
export const getEndOfNextWeek = () =>
  formatRFC3339(endOfWeek(addWeeks(new Date(), 1)));
