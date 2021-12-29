import { BookPreview } from "./BookPreview.jsx";

export function BooksList({ books }) {
   return <section className="books-list">
      <ul>
         {books.map(book => <BookPreview key={book.id} book={book} />)}
      </ul>
   </section>
}