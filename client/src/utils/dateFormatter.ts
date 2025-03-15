type LocaleType = {
  weekday?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
};

const dateFormatterGuard = (date: string | Date): date is string => {
  return typeof date === "string";
};

export function dateFormatter(
  date: string,
  locale: string,
  settings: LocaleType
): string;

export function dateFormatter(
  date: Date,
  locale: string,
  settings: LocaleType
): string;

export function dateFormatter(
  date: string | Date,
  locale: string,
  settings: LocaleType
): string {
  const today = dateFormatterGuard(date) ? new Date(date) : date;
  // const today = typeof date === "string" ? new Date(date) : date;
  const formatter = new Intl.DateTimeFormat(locale, settings);

  return formatter.format(today);
}
