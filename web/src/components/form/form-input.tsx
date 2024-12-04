import * as Form from '@radix-ui/react-form';
import { useFormContext } from 'react-hook-form';
import { FormFieldProps } from '../../types/form.types';
import { getNestedValue } from '@/lib/helper';
import { cn } from '@/lib/utils';

export const FormInput = ({
  name,
  label,
  error,
  isNumber,
  inputType,
  inputClass,
  ...props
}: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = getNestedValue(errors, name);
  const errorMessage = fieldError?.message as string;

  return (
    <Form.Field
      className={cn('form-field relative', {
        'mb-6': errorMessage,
      })}
      name={name}
    >
      {label && (
        <div className="mb-1 flex items-baseline justify-between">
          <Form.Label className="form-label">{label}</Form.Label>
        </div>
      )}
      <Form.Control asChild>
        <input
          type={inputType}
          className={cn(
            'w-full rounded-md border border-gray-500 px-3 py-2 outline-none',
            {
              'border-red-500 dark:border': errorMessage,
            },
          )}
          {...register(name, { ...(isNumber && { valueAsNumber: true }) })}
          {...props}
        />
      </Form.Control>
      {errorMessage && (
        <div className="absolute left-0 top-full">
          <Form.Message className="form-message ml-auto text-sm text-red-500">
            {errorMessage}
          </Form.Message>
        </div>
      )}
    </Form.Field>
  );
};
