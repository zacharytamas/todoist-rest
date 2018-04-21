export const Not = (obj: string) => `!${obj.toString()}`;

export const Label = (name: string) => `@${name}`;

export const OR = (...filters: string[]) => `(${filters.join(' | ')})`;

export const AND = (...filters: string[]) => `(${filters.join(' & ')})`;

export const DATE = {
  dueAfter: (date: string) => `due after: ${date}`,
  dueBefore: (date: string) => `due before: ${date}`,
  dueNext: (date: string) => `next ${date}`,
  dueNextDays: (days: number) => this.dueNext(`${days} days`),
  noDate: 'no date',
  recurring: 'recurring',
  today: 'today'
};
