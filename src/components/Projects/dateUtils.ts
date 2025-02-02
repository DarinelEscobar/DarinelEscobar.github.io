export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date
    .toLocaleString("es-ES", { month: "short", year: "numeric" })
    .replace(".", "")
    .toUpperCase();
};
