import { InputField } from './ui/InputField'
import { CheckboxField } from './ui/CheckboxField'
import React from 'react'

export type FieldConfig = {
  name: string
  label: string | React.ReactNode // ← this is the fix
  type: string
  placeholder?: string
  required?: boolean
  col?: number
  extraLink?: React.ReactNode
  disabled?: boolean
  readOnly?: boolean
}

type FormGeneratorProps = {
  fields: FieldConfig[]
}

export const FormGenerator = ({ fields }: FormGeneratorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fields.map((field, index) => {
        const commonProps = {
          key: field.name,
          name: field.name,
          label: field.label,
          extraLink: field.extraLink,
          disabled: field.disabled,
          readOnly: field.readOnly,
        }

        const className = field.col === 2 || !field.col ? 'sm:col-span-2' : ''

        return (
          <div key={field.name} className={className}>
            {field.type === 'checkbox' ? (
              <CheckboxField {...commonProps} />
            ) : (
              <InputField
                {...commonProps}
                key={index}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
