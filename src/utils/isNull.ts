export const isNull = (value: string) => !/^(?!\s*$)[^&#x20;]$/.test(value);
