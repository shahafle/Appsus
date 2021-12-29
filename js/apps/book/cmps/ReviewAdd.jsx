import { booksService } from "../services/books.service.js";
import { StarsRate } from "./StarsRate.jsx";
import { eventBusService } from "../../../services/event-bus.service.js"

export class ReviewAdd extends React.Component {
   state = {
      review: {
         name: '',
         readAt: new Date().toLocaleDateString("en-US"),
         rate: 0,
         headLine: '',
         txt: ''
      }
   }

   onSubmitReview = (ev) => {
      ev.preventDefault();
      const { review } = this.state;
      const requierdFields = ['rate', 'name', 'headLine', 'txt']
      if (!requierdFields.every(reqField => review[reqField])) {
         eventBusService.emit('user-msg', { txt: ' Please fill all the required fields!', type: 'danger' });
         return;
      }
      booksService.addReview(this.props.bookId, review)
         .then(review => {
            this.props.onReviewAdded(review)
            eventBusService.emit('user-msg', { txt: 'Thank you for your review!', type: 'success' });
         })
   }

   handleRateChange = (newRate) => {
      this.setState((prevState) => ({
         review: { ...prevState.review, ['rate']: newRate }
      }))
   }

   handleChange = ({ target }) => {
      let { name, value } = target;
      if (target.type === 'date') {
         value = value.split('-')
         const year = value.shift();
         value.push(year);
         value = value.join('/')
      }
      this.setState((prevState) => ({
         review: { ...prevState.review, [name]: value }
      }))
   }

   render() {
      const { handleChange } = this;
      return <form className="add-review flex column">
         <p className="marked-field">Required Fields are marked</p>
         <div className="flex column">
            <label className="marked-field" htmlFor="name">Name</label>
            <input name="name" type="text" id="name" onChange={handleChange} />
         </div>

         <div className="flex column">
            <label htmlFor="read-at">Read at</label>
            <input type="date" id="read-at" name="readAt" onChange={handleChange} />
         </div>

         <div>
            <label className="marked-field" >Rate</label>
            <StarsRate rate={this.state.review.rate} onStarClick={this.handleRateChange} />
         </div>

         <div className="flex column">
            <label className="marked-field" htmlFor="head-line">Head line</label>
            <input type="text" id="head-line" name="headLine" onChange={handleChange} />
         </div>

         <div className="flex column">
            <label className="marked-field" htmlFor="review-txt">Your review</label>
            <textarea name="txt" id="review-txt" cols="30" rows="10" onChange={handleChange}></textarea>
         </div>
         <button className="primary-btn" onClick={this.onSubmitReview}>Send</button>
      </form>
   }
}