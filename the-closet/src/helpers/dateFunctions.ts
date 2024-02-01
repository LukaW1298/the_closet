export function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const dayString: string = day < 10 ? "0" + String(day) : String(day);
  const monthString: string = month < 10 ? "0" + String(month) : String(month);

  return `${year}-${monthString}-${dayString}`;
}

export function prettifyDate(secSinceEpoch: number) {
  const date = new Date(secSinceEpoch);

  return date.toLocaleDateString();
}