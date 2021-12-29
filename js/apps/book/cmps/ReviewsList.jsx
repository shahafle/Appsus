import { Loader } from "../../../cmps/Loader.jsx";
import { ReviewDisplay } from "./ReviewDisplay.jsx";
import { booksService } from "../services/books.service.js";

export class ReviewsList extends React.Component {
   state = {
      reviews: []
   }
   componentDidMount() {
      const { reviews } = this.props;
      this.setState({ reviews });
   }

   onDeleteReview = (reviewId) => {
      const { bookId, onReviewDelete } = this.props;
      booksService.deleteReview(bookId, reviewId)
         .then(reviews => {
            onReviewDelete(reviews)
         })
   }
   render() {
      const { reviews } = this.props;
      if (!reviews) return <Loader />;
      if (!reviews.length) return <h3>No reviews to show yet...</h3>
      return <section className="reviews-list">
         <h3>Reviews</h3>
         <ul>
            {reviews.map(review =>
               <ReviewDisplay key={review.id} review={review} onDeleteReview={this.onDeleteReview} />
            )}
         </ul>
      </section>
   }
}