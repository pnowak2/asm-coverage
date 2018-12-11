export const safeMap = <T, U>(fn: (x: T) => U, defaultValue?: U[]) => (list: T[]): U[] => (list && list.map(fn)) || defaultValue;
