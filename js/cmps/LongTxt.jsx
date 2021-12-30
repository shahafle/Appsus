export class LongTxt extends React.Component {
   state = {
      isMoreShown: false
   }
   onToggleReadMore = () => {
      this.setState({ isMoreShown: !this.state.isMoreShown })
   }
   render() {
      const { text } = this.props;
      const txtToShow = (this.state.isMoreShown) ? text : text.slice(0, 100)
      const showBtnTxt = (this.state.isMoreShown) ? ' [hide]' : ' [...]'
      return <React.Fragment>
         <p>{txtToShow}
            {text.length > 100 && <button className="show-more-btn clear-button" onClick={this.onToggleReadMore}>{showBtnTxt}</button>}
         </p>
      </React.Fragment>

   }
}