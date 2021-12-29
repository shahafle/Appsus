import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM

export function BookPreview({ book }) {
   const price = utilService.getPrice(book.listPrice, true) + '₪'
   return <li className="book-preview">
      <Link to={`/book/store/${book.id}`} className="flex preview-container">
         <img src={book.thumbnail} />
         <div className="info-container flex column space-between">
            <div className="book-preview-info flex column">
               <h3>{book.title}</h3>
               <p className="author">{book.authors.join(', ')}</p>
               <p>{price} {book.listPrice.isOnSale && < span className="sale-tag">SALE</span>}</p>
            </div>
         </div>
      </Link>
   </li >
}