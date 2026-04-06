export const formatDate = (dateStr: string, locale: string) => {
  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date
    .toLocaleString(locale, { month: "short", year: "numeric" })
    .replace(".", "")
    .toUpperCase();
};
