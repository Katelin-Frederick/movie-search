import { Field, ErrorMessage, FieldProps } from 'formik'
import Label from '../Label'
import TextError from '../TextError'

type TextFieldPropTypes = {
  className?: string
  label: string
} & React.ComponentProps<'input'>

const TextField = ({ className, label, name, ...rest }: TextFieldPropTypes) => (
  <div className={className}>
    <Label name={name} label={label} />

    <Field name={name}>
      {({ field }: FieldProps) => (
        <div>
          <input
            className="border border-gray-700 rounded-md px-2 py-2 w-full md:w-auto mt-2"
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

export default TextField
