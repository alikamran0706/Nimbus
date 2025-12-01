import { Field, ErrorMessage, useField, useFormikContext } from 'formik'

type InputFieldProps = {
  name: string
  label?: string | React.ReactNode
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
}

export const InputField = ({
  name,
  label,
  type = 'text',
  placeholder,
  required,
  disabled,
  readOnly,
}: InputFieldProps) => {
  const [field, meta] = useField(name)
  const { submitCount } = useFormikContext()

  const showError = !!meta.error && (meta.touched || submitCount > 0)

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Field
        {...field}
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        placeholder={placeholder}
        className={`input-field ${
          showError
            ? 'border-1 border-primary-600 ring-[0.2px] ring-primary-600 focus:ring-primary-600'
            : ''
        }`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-base placeholder:text-sm placeholder:text-gray-200 text-primary-600 mt-1"
      />
    </div>
  )
}
