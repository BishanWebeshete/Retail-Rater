import React, { Fragment } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

export default function StarRating ({rating}) {
  const style = { color: "#F07E0F" }

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<AiFillStar key={i} style={style}/>)
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<BsStarHalf key={i} style={style}/>)
    }
    else {
      stars.push(<AiOutlineStar key={i} style={style}/>)
    }
  }
  return (
    <>
    {stars}
    </>
  )
}
