import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import StoresContext from '../context/StoresContext';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import LoadingSpinner from '../components/LoadingSpinner';
import Navbar from '../components/Navbar';


function StoreDetails () {
  const {selectedStore, setSelectedStore} = useContext(StoresContext);
  const { id } = useParams();
  useEffect(() => {
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
  }, []);

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
          <h1 className="text-center display-1 d-inline-block bg-danger title">{selectedStore.store.name}</h1>
        </div>
        <div className="d-flex align-items-center justify-content-center container">
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
