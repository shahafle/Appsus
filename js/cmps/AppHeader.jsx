import {Loader} from './Loader.jsx'

const { Link,NavLink } = ReactRouterDOM


export class AppHeader extends React.Component {
   state = {
      search: ''
   }

   handleChange = ({ target }) => {
      this.setState({ search: target.value });
   }

   get appRoute() {
      const { app } = this.props;
      if (app === 'email') return 'mail/mail_box'
      if (app === 'keep') return 'keep/board'
      if (app === 'books') return 'book/store'
   }

   render() {
      return <header className="main-header flex space-between align-center">
         <div>
            <img className="logo" src="" />
            <h1 className="app-name">Header</h1>
         </div>
         <form className="search-bar">
            <input type="text" placeholder="Search" name="search" onChange={this.handleChange} value={this.state.search} />
            <Link to={`/${this.appRoute}/?search=${this.state.search}`}><button>Go</button></Link>
         </form>

         <nav className="header-nav ">
                    <NavLink className="clean-link" to="/" >Home</NavLink>
                    <NavLink className="clean-link" to="/about">About</NavLink>
                    <NavLink className="clean-link" to="/book/store">Book Shop</NavLink>
                    <NavLink className="clean-link" to="/keep/board">Keep</NavLink>
                    <NavLink className="clean-link" to="/mail/mail_box">Mail</NavLink>
                </nav>

      </header >
   }
}