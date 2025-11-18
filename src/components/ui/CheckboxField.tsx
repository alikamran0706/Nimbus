import { Field, ErrorMessage } from 'formik'

type CheckboxFieldProps = {
  name: string
  label: React.ReactNode
  error?: string
}

export const CheckboxField = ({ name, label, extraLink }: CheckboxFieldProps & {extraLink?: React.ReactNode}) => (
  <>
    <div className="flex justify-between items-center w-full">
      <div className="flex">
        <Field
          type="checkbox"
          name={name}
          id={name}
          className="h-4 w-4 text-primary-600 focus:ring-primary-600 border-gray-300 rounded"
        />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      </div>
      {extraLink && <div>{extraLink}</div>}
    </div>
    <ErrorMessage name={name} component="div" className="text-sm text-red-600 mt-1" />
  </>
)
