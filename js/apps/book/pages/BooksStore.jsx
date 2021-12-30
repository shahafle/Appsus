import { BooksList } from "../cmps/BooksList.jsx";
import { booksService } from "../services/books.service.js";
import { BooksFilter } from "../cmps/BookFilter.jsx";

export class BooksStore extends React.Component {
    state = {
        books: [],
        filterBy: null
    }

    removeEventBus


    componentDidMount() {
        let currSearch = new URLSearchParams(this.props.location.search).get('search');
        currSearch = (currSearch === null) ? '' : currSearch;
        this.setState((prevState) => ({
            filterBy: { ...prevState.filterBy, 'name': currSearch }
        }), this.loadBooks)
    }

    componentDidUpdate(prevProps) {
        if (new URLSearchParams(prevProps.location.search).get('search') !== new URLSearchParams(this.props.location.search).get('search')) {
            let currSearch = new URLSearchParams(this.props.location.search).get('search');
            currSearch = (currSearch === null) ? '' : currSearch;
            this.setState((prevState) => ({
                filterBy: { ...prevState.filterBy, 'name': currSearch }
            }), this.loadBooks)
        }
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