export class StarsRate extends React.Component {
   state = {
      rate: 0
   }
   componentDidMount = () => {
      const { rate } = this.props
      this.setState({ rate })
   }
   getStarClass = (starNum) => {
      const { rate } = this.state
      return (starNum <= rate) ? 'fas' : 'far';
   }
   handleStarClick = (rate) => {
      const { onStarClick } = this.props
      if (!onStarClick) return;
      this.setState({ rate });
      onStarClick(rate)
   }

   render() {
      const { handleStarClick } = this;
      return <div className="stars-container">
         <i className={this.getStarClass(1) + ' fa-star'} onClick={() => { handleStarClick(1) }}></i>
         <i className={this.getStarClass(2) + ' fa-star'} onClick={() => { handleStarClick(2) }}></i>
         <i className={this.getStarClass(3) + ' fa-star'} onClick={() => { handleStarClick(3) }}></i>
         <i className={this.getStarClass(4) + ' fa-star'} onClick={() => { handleStarClick(4) }}></i>
         <i className={this.getStarClass(5) + ' fa-star'} onClick={() => { handleStarClick(5) }}></i>
      </div>
   }
}