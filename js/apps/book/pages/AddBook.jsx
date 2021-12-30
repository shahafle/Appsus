import { booksService } from "../services/books.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

export class AddBook extends React.Component {
   state = {
      search: '',
      results: []
   }
   handleChange = ({ target: { value } }) => {
      this.setState({ search: value })
   }
   onSearch = (ev) => {
      ev.preventDefault()
      booksService.getGoogleResults(this.state.search)
         .then(results => this.setState({ results: results || [] }))
   }
   onAddBook = (book) => {
      booksService.addBook(book)
         .then(() => eventBusService.emit('user-msg', { txt: `added !`, type: 'success' }))
   }

   render() {
      const { search, results } = this.state;
      return <main className="main-add-book">
         <h1>Add Google Book</h1>
         <form>
            <label htmlFor="by-title">Title:</label>
            <input name="title" id="by-title" type="text" value={search} onChange={this.handleChange} />
            <button onClick={this.onSearch}>Search</button>
         </form>
         <h3>Results</h3>

         {results.length > 0 && <section>
            {results.map(book => <div key={book.id}>
               <h4>{book.volumeInfo.title}</h4>
               <p className="muted">{(book.volumeInfo.authors) ? book.volumeInfo.authors.join(', ') : 'unknown'}</p>
               <button onClick={() => this.onAddBook(book)}>+</button>
            </div>
            )}
         </section>}

      </main>
   }
}