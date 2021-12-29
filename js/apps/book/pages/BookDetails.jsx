import { utilService } from '../../../services/util.service.js';
import { booksService } from "../services/books.service.js";
import { LongTxt } from "../../../cmps/LongTxt.jsx";
import { Loader } from "../../../cmps/Loader.jsx";
import { ReviewAdd } from "../cmps/ReviewAdd.jsx";
import { ReviewsList } from "../cmps/ReviewsList.jsx";

const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {
   state = {
      book: null
   }
   componentDidMount() {
      this.loadBook();
   }

   componentDidUpdate(prevProps) {
      console.log(prevProps);
      if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
         this.loadBook()
      }
   }

   loadBook = () => {
      const { bookId } = this.props.match.params;
      booksService.getBookById(bookId).then(book => {
         if (!book) return this.props.history.push('/')
         this.setState({ book })
      })
   }

   onReviewAdded = (review) => {
      this.setState((prevState) => ({ book: { ...prevState.book, 'reviews': [...prevState.book.reviews, review] } }))
   }

   onReviewDelete = (reviews) => {
      this.setState((prevState) => ({ book: { ...prevState.book, reviews } }))
   }

   render() {
      const { book } = this.state
      if (!book) return <Loader />
      const pageCount = book.pageCount;
      const readDurationTxt =
         (pageCount > 500) ? 'Long Reading' :
            (pageCount > 200) ? 'Decent Reading' :
               (pageCount < 100) ? 'Light Reading' : '';

      const bookAge = new Date().getFullYear() - book.publishedDate;
      const bookAgeText = (bookAge >= 10) ? ' (Veteran Book)' : (bookAge < 1) ? ' (New!)' : '';

      const price = utilService.getPrice(book.listPrice, true);
      const priceClass = (price < 20) ? 'green' : (price > 150) ? 'red' : ''


      return <main className="book-details main-layout">
         <h1>{book.title}</h1 >
         <h5 className="muted">{book.authors.join(', ')}</h5>
         <h3>{book.subtitle}</h3>
         <div className="categories flex">{book.categories.map(category => <span className="category" key={category}>{category}</span>)}
         </div>
         <img src={book.thumbnail} />

         <div>
            <Link to={`/book/${booksService.getNegBookId(book.id, -1)}`}>previous</Link>
            <Link to={`/book/${booksService.getNegBookId(book.id, 1)}`}>next</Link>
         </div>

         <div className="second-info flex column">

            <div className="detail">
               <label className="muted" >Price</label>
               <p className={priceClass}>{price + '₪'}</p>
            </div>

            <div className="detail">
               <label className="muted" >Description</label>
               <LongTxt text={book.description} />
            </div>

            <div className="detail">
               <label className="muted" >Published in</label>
               <p>{book.publishedDate + bookAgeText}</p>
            </div>

            <div className="detail">
               <label className="muted" >Language</label>
               <p>{book.language}</p>
            </div>

            {readDurationTxt && <span className="muted">{readDurationTxt}</span>}
         </div>
         <ReviewAdd bookId={book.id} onReviewAdded={this.onReviewAdded} />
         <ReviewsList reviews={book.reviews} bookId={book.id} onReviewDelete={this.onReviewDelete} />
         {/* <Link to="/book">
            <button className="back-btn primary-btn">Back</button>
         </Link> */}
      </main >
   }
}