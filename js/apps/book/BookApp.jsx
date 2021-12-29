import { AddBook } from './pages/AddBook.jsx';
import { BookDetails } from './pages/BookDetails.jsx';
import { BooksStore } from './pages/BooksStore.jsx';

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function BookApp() {
   return <Router>
      <React.Fragment>
         <Switch>
            <Route component={AddBook} path="/book/add_book" />
            <Route component={BookDetails} path="/book/store/:bookId" />
            <Route component={BooksStore} path="/book/store" />
         </Switch>
      </React.Fragment>
   </Router>
}