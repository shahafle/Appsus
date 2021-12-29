const { Link } = ReactRouterDOM


export class AppHeader extends React.Component {
   state = {
      search: ''
   }

   handleChange = ({ target }) => {
      this.setState({ search: target.value });
   }

   get appRoute() {
      const { app } = this.props;
      if (app === 'email') return 'email/email_inbox'
      if (app === 'keep') return 'keep/board'
      if (app === 'books') return 'book/store'
   }

   render() {
      return <header className="main-header flex space-between">
         <div>
            <img className="logo" src="" />
            <h1 className="app-name">Header</h1>
         </div>

         <form className="search-bar">
            <input type="text" placeholder="Search" name="search" onChange={this.handleChange} value={this.state.search} />
            <Link to={`/${this.appRoute}/?search=${this.state.search}`}><button>Go</button></Link>
         </form>

         <button>Apps</button>

      </header >
   }
}