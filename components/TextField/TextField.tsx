import { Field, ErrorMessage, FieldProps } from 'formik'
import TextError from '../TextError'

type TextFieldPropTypes = {
  label: string
} & React.ComponentProps<'input'>

const TextField = ({ label, name, ...rest }: TextFieldPropTypes) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>

      <Field name={name}>
        {({ field }: FieldProps) => (
          <div>
            <input
              className='border border-gray-700 rounded-sm px-2 py-2'
              {...rest}
              {...field}
            />

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

export default TextField