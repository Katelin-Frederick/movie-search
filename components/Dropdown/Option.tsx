type DropdownPropTypes = {
  label: string,
} & React.ComponentProps<'option'>

const Option = ({ label, ...rest }: DropdownPropTypes) => {
  return (
    <option {...rest}>{label}</option>
  )
}

export default Option