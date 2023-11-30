import { FieldErrors, FieldValues } from 'react-hook-form';

interface ErrorResult {
  message: string;
  isInvalid: boolean;
}

const nullObj: ErrorResult = { message: '', isInvalid: false };

export const findInputError = (
  errors: FieldErrors<FieldValues>,
  name: string | undefined,
): ErrorResult => {
  if (name === undefined) return nullObj;

  const filtered = Object.keys(errors)
    .filter(key => key === name)
    .reduce((cur, key) => {
      return Object.assign(cur, errors[key]);
    }, {} as ErrorResult);

  return Object.keys(filtered).length
    ? { ...filtered, isInvalid: true }
    : nullObj;
};
