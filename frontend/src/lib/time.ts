import { DateTime } from 'luxon';

export function formatDate(dateISO: string) {
  return DateTime.fromISO(dateISO).toLocaleString(DateTime.DATETIME_SHORT);
}
