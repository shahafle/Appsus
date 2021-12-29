export class LongTxt extends React.Component {
   state = {
      isMoreShown: false
   }
   onToggleReadMore = () => {
      console.log('ho');
      this.setState({ isMoreShown: !this.state.isMoreShown })
   }
   render() {
      const { text } = this.props;
      const txtToShow = (this.state.isMoreShown) ? text : text.slice(0, 100)
      const showBtnTxt = (this.state.isMoreShown) ? ' [hide]' : ' [...]'
      return <React.Fragment>
         <p>{txtToShow}
            {text.length > 100 && <a className="show-more-btn" onClick={this.onToggleReadMore}>{showBtnTxt}</a>}
         </p>
      </React.Fragment>

   }
}