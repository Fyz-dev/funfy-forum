import { FieldErrors, FieldValues } from 'react-hook-form';

const findInputError = (
  errors: FieldErrors<FieldValues>,
  name: string | undefined,
): { error: { message: string } } | undefined => {
  if (name === undefined) return undefined;

  const filtered = Object.keys(errors)
    .filter(key => key === name)
    .reduce(
      (cur, key) => {
        return Object.assign(cur, { error: errors[key] });
      },
      {} as { error: { message: string } },
    );

  return Object.keys(filtered).length ? filtered : undefined;
};

export default findInputError;
