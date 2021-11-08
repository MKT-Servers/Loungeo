/* eslint-disable object-curly-newline */
import React from 'react';
// import styled from 'styled-components';

const starShapes = [
  '../../images/empty star.png',
  '../../images/quarter star.png',
  '../../images/half star.png',
  '../../images/three quarter star.png',
  '../../images/filled star.png',
];

export default function StarRating({ ratingObj, submissionNotSelected, changeHover, setStar }) {
  let rating = ratingObj.average;
  const stars = [];
  while (stars.length < 5) {
    switch (true) {
      case (rating >= 1):
        stars.push(starShapes[4]);
        break;
      case (rating === 0.75):
        stars.push(starShapes[3]);
        break;
      case (rating === 0.5):
        stars.push(starShapes[2]);
        break;
      case (rating === 0.25):
        stars.push(starShapes[1]);
        break;
      case (rating <= 0):
        stars.push(starShapes[0]);
        break;
      default:
        break;
    }
    rating -= 1;
  }

  function onEnter(event, index) {
    if (event.key === 'Enter') {
      setStar(index);
    }
  }

  if (submissionNotSelected) {
    return (
      <span className="star-rating">
        {stars.map((star, index) => (
          <div
            style={{ display: 'inline-block', position: 'relative', cursor: 'pointer' }}
            className="star"
            onMouseEnter={() => changeHover(index + 1)}
            onMouseLeave={() => changeHover(0)}
            onClick={() => setStar(index + 1)}
            onKeyPress={(event) => onEnter(event, index + 1)}
            role="button"
            tabIndex={0}
          >
            <img src={star} alt="filled star" style={{ width: '15px' }} />
          </div>
        ))}
      </span>
    );
  }
  return (
    <span className="star-rating">
      {stars.map((star) => (
        <div style={{ display: 'inline-block', position: 'relative' }} className="star">
          <img src={star} alt="filled star" style={{ width: '15px' }} />
        </div>
      ))}
    </span>
  );
}
