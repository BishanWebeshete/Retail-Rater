import React from 'react';
import StarRating from './StarRating';

export default function Reviews ({reviews}) {
  return (
    <div className="row row-cols-3 mb-2">
      {reviews?.map((review) => {
        return (
          <div key={review.id} className="card text-white bg-primary mb-3 mr-3" style={{ maxWidth: "30%" }}>
            <div className="card-header d-flex justify-content-between">
              <span>{review.name}</span>
              <span><StarRating rating={review.rating} /></span>
            </div>
            <div className="card-body">
              <p className="card-text">{review.review}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
    }
// export default Reviews
      // {/* <div className="card text-white bg-primary mb-3 mr-3" style={{ maxWidth: "30%" }}>
      //   <div className="card-header d-flex justify-content-between">
      //     <span>Deborah</span>
      //     <span><StarRating rating={3}/></span>
      //   </div>
      //   <div className="card-body">
      //     <p className="card-text">This was the most amazing food i've ever had in my life</p>
      //   </div>
      // </div>
      // <div className="card text-white bg-primary mb-3 mr-3" style={{ maxWidth: "30%" }}>
      //   <div className="card-header d-flex justify-content-between">
      //     <span>Deborah</span>
      //     <span><StarRating rating={3} /></span>
      //   </div>
      //   <div className="card-body">
      //     <p className="card-text">This was the most amazing food i've ever had in my life</p>
      //   </div>
      // </div>
      // <div className="card text-white bg-primary mb-3 mr-3" style={{ maxWidth: "30%" }}>
      //   <div className="card-header d-flex justify-content-between">
      //     <span>Deborah</span>
      //     <span><StarRating rating={3} /></span>
      //   </div>
      //   <div className="card-body">
      //     <p className="card-text">This was the most amazing food i've ever had in my life</p>
      //   </div>
      // </div>
      // <div className="card text-white bg-primary mb-3 mr-3" style={{ maxWidth: "30%" }}>
      //   <div className="card-header d-flex justify-content-between">
      //     <span>Deborah</span>
      //     <span><StarRating rating={3} /></span>
      //   </div>
      //   <div className="card-body">
      //     <p className="card-text">This was the most amazing food i've ever had in my life</p>
      //   </div>
      // </div> */
// }