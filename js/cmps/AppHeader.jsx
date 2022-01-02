import { Loader } from './Loader.jsx'

const { Link, NavLink } = ReactRouterDOM


export class AppHeader extends React.Component {
   state = {
      search: '',
      isOpen: false,
      appColor: 'main'
   }


   componentDidMount() {
      let appColor = 'main';
      const { app } = this.props;
      if (app === 'notes') appColor = 'green';
      else if (app === 'mail') appColor = 'blue';
      else if (app === 'books') appColor = 'yellow';
      this.setState(prevState => ({ ...prevState, appColor }))
   }

   handleChange = ({ target }) => {
      this.setState({ search: target.value });
   }

   get appRoute() {
      const { app } = this.props;
      if (app === 'mail') return 'mail/mail_box'
      if (app === 'notes') return 'keep/board'
      if (app === 'books') return 'book/store'

   }


   toggleBtnClass = () => {
      this.setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
   }

   render() {

      const { isOpen, appColor } = this.state
      return <header className={appColor + '-header'} >
         <div className="main-layout flex space-between align-center haeder-container" >

            <div className='brand-container flex'>
               <NavLink className="flex" to="/">
                  <img className="logo" src={`assets/img/${appColor}-logo.svg`} />
                  <h1 className="app-name">Trinity <span className="logo-app-name">{this.props.app}</span></h1>
               </NavLink>
            </div>
            {(this.props.app !== 'home') && <form className="search-bar flex">
               <input type="text" placeholder="Search" name="search" onChange={this.handleChange} value={this.state.search} />
               <Link to={`/${this.appRoute}/?search=${this.state.search}`}><button className="fas fa-search"></button></Link>
            </form>}
            <nav className="header-nav ">
               <div className={`${(isOpen) ? 'open' : ''} menu`} onClick={this.toggleBtnClass}>
                  <NavLink className={`${(isOpen) ? 'open' : ''} button fas fa-home clean-link`} to="/" ></NavLink>
                  <NavLink className={`${(isOpen) ? 'open' : ''} button fas fa-sticky-note clean-link`} to="/keep/board"></NavLink>
                  <NavLink className={`${(isOpen) ? 'open' : ''} button fas fa-at clean-link`} to="/mail/mail_box"></NavLink>
                  <NavLink className={`${(isOpen) ? 'open' : ''} button fas fa-book clean-link`} to="/book/store"></NavLink>
                  <NavLink className={`${(isOpen) ? 'open' : ''} button fas fa-info-circle clean-link`} to="/about"></NavLink>
               </div>
            </nav>


         </div>
      </header >
   }
}