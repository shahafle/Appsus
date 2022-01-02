
const { Link } = ReactRouterDOM

export class BooksFilter extends React.Component {
   state = {
      filterBy: {
         name: '',
         maxPrice: 517
      }
   }
   handleChange = ({ target }) => {
      let { name, value } = target;
      value = (target.type === 'range') ? +value : value;
      this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [name]: value } }), () => {
         this.props.onSetFilter(this.state.filterBy)
      });
   }

   render() {
      const { name, maxPrice } = this.state.filterBy
      return <form className="books-filter flex column">
         {/* <div className="filter-field flex column">
            <label htmlFor="by-title">Title:</label>
            <input name="name" id="by-title" type="text" value={name} onChange={this.handleChange} />
         </div> */}

         <div className="filter-field flex column">
            <label htmlFor="by-price">Maximum price: <span className="max-price-preview">{maxPrice + '₪'}</span></label>
            <input name="maxPrice" id="by-price" type="range" min="10" max="517" value={maxPrice} onChange={this.handleChange} />
         </div>

         <Link to="/book/add_book"><button className="secondary-btn">Add google book</button></Link>
      </form >
   }
}