export const getLocalDate = (dateToFormat: string | Date, options?: Intl.DateTimeFormatOptions) =>
  new Date(dateToFormat).toLocaleString('es-PE', {
    dateStyle: 'long',
    timeStyle: 'short',
    formatMatcher: 'best fit',
    hour12: true,
    ...options,
  })
