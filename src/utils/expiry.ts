export const hasExpired = (startDate: Date, waitTime: number): boolean =>
  new Date().getTime() - startDate.getTime() > waitTime;
