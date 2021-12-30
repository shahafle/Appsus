export class ComposeNote extends React.Component {
   state = {
      note: {}
   }

   handleChange = ({ target }) => {
      this.setState(prevState => ({ note: { ...prevState.note, [target.name]: target.value } }))
   }

   render() {
      return <form>
         <input type="text" name="title" placeholder="Title" onChange={this.handleChange} />
         <input type="text" name="txt" placeholder="Compose your text" onChange={this.handleChange} />
         <input type="text" name="imgUrl" placeholder="Image url" onChange={this.handleChange} />
         <button onClick={(ev) => {
            ev.preventDefault();
            this.props.onAddNote(this.state.note)
         }}>Add</button>
      </form>
   }
}