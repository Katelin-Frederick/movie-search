type LabelPropTypes = {
  label: string
  name: string | undefined
} & React.ComponentProps<'label'>

const Label = ({ label, name, ...rest }: LabelPropTypes) => {
  return (
    <label className='text-white' htmlFor={name} {...rest}>{label}</label>
  )
}

export default Label