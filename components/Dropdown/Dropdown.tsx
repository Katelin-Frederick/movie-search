import React from 'react'
import { Field, ErrorMessage, FieldProps } from 'formik'
import Option from './Option'
import TextError from '../TextError'

type OptionType = {
  value: string,
  label: string,
}

type DropdownPropTypes = {
  label: string,
  options: any[],
} & React.ComponentProps<'select'>

const Dropdown = ({ label, name, options, ...rest }: DropdownPropTypes) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>

      <Field name={name}>
        {({ field }: FieldProps) => (
          <div>
            <select
              className='border border-gray-700 rounded-sm px-2 py-2'
              {...rest}
              {...field}
            >
              {options.map((option, index) => (
                <Option key={index} {...option} />
              ))}
            </select>

            <ErrorMessage name={name!}>
              {(errorMessage) => (
                <TextError errorMessage={errorMessage} />
              )}
            </ErrorMessage>
          </div>
        )}
      </Field>
    </div>
  )
}

export default Dropdown