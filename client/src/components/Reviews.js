import React, { useContext } from 'react';
import StarRating from './StarRating';
import ErrorMessage from './ErrorMessage';
import { BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import StoresContext from '../context/StoresContext';

export default function Reviews ({reviews}) {
  const {user} = useContext(StoresContext);
  const history = useNavigate();

  if(reviews.length === 0) {
    return (
      <ErrorMessage text={"reviews"} />
    );
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/reviews/${id}/deleteReview`, {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json'
        }
      });
      if(!response.ok) throw new Error (`bad server response ${response.status}`);
      const jsonData = await response.json();
      reviews.filter((review) => {
        return review.id !== jsonData.id
      })
      history(0);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 mb-2 w-100">
      {reviews?.map(({id, name, rating, review}) => {
        if (user.username === name) {
          return (
          <div key={id} className="card text-white mb-3 mx-auto p-2 border-0">
            <div className="card-header d-flex justify-content-between bg-primary">
              <span>{name}</span>
              <span className="d-flex flex-nowrap"><StarRating rating={rating} /></span>
            </div>
            <div className="card-body bg-primary rounded-bottom d-flex justify-content-between">
              <p className="card-text">{review}</p>
              <div className="trash-icon">
                <BsFillTrashFill onClick={() => handleDelete(id)}/>
              </div>
            </div>
          </div>
        )
        } else {
          return (
          <div key={id} className="card text-white mb-3 mx-auto p-2 border-0">
            <div className="card-header d-flex justify-content-between bg-primary">
              <span>{name}</span>
              <span className="d-flex flex-nowrap"><StarRating rating={rating} /></span>
            </div>
            <div className="card-body bg-primary rounded-bottom">
              <p className="card-text">{review}</p>
            </div>
          </div>
        )
        }
      })}
    </div>
  )
}
