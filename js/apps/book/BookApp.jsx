import { AddBook } from './pages/AddBook.jsx';
import { BookDetails } from './pages/BookDetails.jsx';
import { BooksStore } from './pages/BooksStore.jsx';
import { AppHeader } from '../../cmps/AppHeader.jsx';

const { Route, Switch } = ReactRouterDOM


export function BookApp() {
   return <React.Fragment>
      <AppHeader app="books" />
      <Switch>
         <Route component={AddBook} path="/book/add_book" />
         <Route component={BookDetails} path="/book/store/:bookId" />
         <Route component={BooksStore} path="/book/store" />
      </Switch>

   </React.Fragment>
}