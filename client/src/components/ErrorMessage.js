export default function ErrorMessage ({text}) {
  return (
    <div className="container d-flex justify-content-center">
      <h3 className="error text-danger">There are no {text} at the moment... please check back soon or add one yourself!</h3>
    </div>
  )
}
