import { BooksList } from "../cmps/BooksList.jsx";
import { booksService } from "../services/books.service.js";
import { BooksFilter } from "../cmps/BookFilter.jsx";

export class BooksStore extends React.Component {
    state = {
        books: [],
        filterBy: null
    }
    componentDidMount() {
        this.loadBooks();
    }
    loadBooks = () => {
        const { filterBy } = this.state;
        booksService.query(filterBy).then(books =>
            this.setState({ books }));
    }
    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }


    render() {
        const { books } = this.state;
        return <main className="main-books-app main-layout flex space-between">
            <BooksFilter onSetFilter={this.onSetFilter} />
            <BooksList books={books} />
        </main>
    }
}