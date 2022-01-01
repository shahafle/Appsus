import { Loader } from './Loader.jsx'

const { Link, NavLink } = ReactRouterDOM


export class AppHeader extends React.Component {
   state = {
      search: '',
      isOpen: false

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


   toggleBtnClass = () => {
      this.setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
   }

   render() {

      const { isOpen } = this.state
      return <header >
         <div className="main-layout flex space-between align-center">

            <div className='brand-container flex'>
               <img className="logo" src="../../assets/img/green-logo.svg" />
               <h1 className="app-name">Trinity</h1>
            </div>
            {(this.props.app !== 'home') && <form className="search-bar">
               <input type="text" placeholder="Search" name="search" onChange={this.handleChange} value={this.state.search} />
               <Link to={`/${this.appRoute}/?search=${this.state.search}`}><button>Go</button></Link>
            </form>}
            <nav className="header-nav ">
               <div className={`${(isOpen) ? 'open' : ''} menu`} onClick={this.toggleBtnClass}>
                  <NavLink className={`${(isOpen) ? 'open' : ''} button fas fa-home clean-link`} to="/" ></NavLink>
                  <NavLink className={`${(isOpen) ? 'open' : ''} button fas fa-info-circle clean-link`} to="/about"></NavLink>
                  <NavLink className={`${(isOpen) ? 'open' : ''} button fas fa-book clean-link`} to="/book/store"></NavLink>
                  <NavLink className={`${(isOpen) ? 'open' : ''} button fas fa-sticky-note clean-link`} to="/keep/board"></NavLink>
                  <NavLink className={`${(isOpen) ? 'open' : ''} button fas fa-at clean-link`} to="/mail/mail_box"></NavLink>
               </div>
            </nav>


         </div>
      </header >
   }
}