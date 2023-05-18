import UpdateStore from '../components/UpdateStore';
import Navbar from '../components/Navbar';

function UpdatePage () {
  return (
    <>
      <Navbar />
      <div>
        <div className="d-flex justify-content-center">
          <h1 className="text-center update-text mt-3 display-1 bg-secondary d-inline-block text-warning">Update Store</h1>
        </div>
        <UpdateStore />
      </div>
    </>
  )
}
export default UpdatePage;
