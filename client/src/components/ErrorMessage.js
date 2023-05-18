function ErrorMessage ({text}) {
  return (
    <div className="error-container bg-danger container">
      <h3 className="error text-white">There are no {text} at the moment... please check back soon or add one yourself!</h3>
    </div>
  )
}
export default ErrorMessage;
