export default function LoadingSpinner () {
  return (
    <div className="loading-container d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}
