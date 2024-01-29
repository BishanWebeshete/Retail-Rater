import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StoresContext from '../context/StoresContext';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import LoadingSpinner from '../components/LoadingSpinner';
import Navbar from '../components/Navbar';

function StoreDetails () {
  const history = useNavigate();
  const {user, selectedStore, setSelectedStore} = useContext(StoresContext);
  const { id } = useParams();
  useEffect(() => {
    if(!user) history('/sign-in');
    setSelectedStore(undefined);
    async function getData () {
      try {
        const response = await fetch (`/api/stores/${id}`)
        if (!response.ok) {
          throw new Error (`Bad server response, ${response.status}`)
        }
        const jsonData = await response.json();
        setSelectedStore(jsonData.data);
      } catch(err) {
        console.error(err);
      }
    }
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- Run once on mount
  }, [user]);

  if (selectedStore === undefined) {
    return (
     <LoadingSpinner />
    )
  }

  return (
    <div>{selectedStore.store.name && (
      <>
        <Navbar />
        <div className="d-flex justify-content-center">
          <h1 className="text-center display-5 d-inline-block pb-2 mt-3">{selectedStore.store.name}</h1>
        </div>
        <div className="d-flex justify-content-center container">
          <Reviews reviews={selectedStore.reviews}/>
        </div>
        <div className="container">
          <AddReview />
        </div>
      </>
    )}</div>
  )
}
export default StoreDetails;
