type ErrorMessagePropsType = {
  errorMessage: string
}

const TextError: React.FC<ErrorMessagePropsType> = ({ errorMessage }: ErrorMessagePropsType) => (
  <span className="text-red-600 block">{errorMessage}</span>
)

export default TextError
