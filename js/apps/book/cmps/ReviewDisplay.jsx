import { StarsRate } from "./StarsRate.jsx";

export function ReviewDisplay({ review, onDeleteReview }) {
   return <div className="review-display flex">
      <div className="review-details">
         <StarsRate rate={review.rate} />
         <h3>{review.headLine}</h3>
         <p>{review.txt}</p>
         <p>{review.readAt}</p>
      </div>
      <button className="fas fa-times-circle" onClick={() => { onDeleteReview(review.id) }}></button>
   </div>
}