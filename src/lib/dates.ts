export const getTodayISO = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateDisplay = (isoDate: string, lang: string): string => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat(lang, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(date);
};