import React, {useEffect, useContext, useState} from 'react';
import StoresContext from '../context/StoresContext';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';


function StoreList(props) {
  const { stores, setStores } = useContext(StoresContext)
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getStores() {
      try {
        const response = await fetch('/api/stores');
        if(!response.ok) {
          throw new Error(`Bad server response, ${response.status}`);
        }
        const jsonData = await response.json();
        setStores(jsonData.data.storeRatings);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getStores();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- Run once on mount
  }, []);

  const handleDelete = async (e, storeId) => {
    e.stopPropagation();
    try {
      const response = await fetch (`/api/stores/${storeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json'
        }
      });
      if(!response.ok) {
        throw new Error(`Bad server response, ${response.status}`);
      }
      const jsonData = await response.json();
      setStores(stores.filter((store) => {
        return (store.storeId !== jsonData.storeId)
      }))
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdate = (e, storeId) => {
    e.stopPropagation();
    history(`/stores/${storeId}/update`);
  }

  const handleStoreClick = (storeId) => {
    history(`/stores/${storeId}`);
  }

  const renderRating = (store) => {
    return (
      <>
        <StarRating rating={store.average_rating} />
        <span className="text-warning ml-1">({store.count ?? 0})</span>
      </>
    )
  }

  if (stores === undefined) {
    return (
      <ErrorMessage text={"stores"} />
    )
  }

  if(isLoading === true) {
    return (
      <LoadingSpinner />
    )
  }

  return(
    <div className="list-group container overflow-auto">
      <table className="table text-white">
        <thead className="bg-primary">
          <tr>
            <th scope="col">Store</th>
            <th scope="col">Location</th>
            <th scope="col">Expense</th>
            <th scope="col">Satisfaction</th>
            <th scope="col">Update</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody className="bg-dark">
          {stores.map(store => {
            return (
              <tr onClick={() => handleStoreClick(store.storeId)} key={store.storeId}>
                <td className="td">{store.name}</td>
                <td>{store.location}</td>
                <td>{"$".repeat(store.priceRange)}</td>
                <td>{renderRating(store)}</td>
                <td><button onClick={(e) => handleUpdate(e, store.storeId)} className="btn btn-warning"><AiFillEdit/></button></td>
                <td><button onClick={(e) => handleDelete(e, store.storeId)} className="btn btn-danger"><AiOutlineDelete/></button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default StoreList;
