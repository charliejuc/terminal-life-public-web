const isDate = (date: unknown): date is Date =>
    typeof date === 'object' && date != null && date.constructor === Date

export const isValidDate = (date: unknown): date is Date =>
    isDate(date) && date.toString() !== 'Invalid Date'
