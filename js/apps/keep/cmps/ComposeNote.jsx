import { ComposeTodos } from "composeTodos.jsx";
import { eventBusService } from "../../../services/event-bus.service.js";

export class ComposeNote extends React.Component {
   state = {
      fields: {
         title: '',
         txt: '',
         url: '',
         todos: []
      },
      type: 'txt',
      isOpen: false
   }

   removeEventBus

   componentDidMount() {
      this.removeEventBus = eventBusService.on('toggleNoteCompose', (isOpen) => {
         this.setState((prevState) => ({ ...prevState, isOpen }))
      })
   }

   componentWillUnmount() {
      this.removeEventBus();
   }

   handleFieldChange = ({ target }) => {
      this.setState(prevState => ({ ...prevState, fields: { ...prevState.fields, [target.name]: target.value } }))
   }

   onChangeType = (ev, type) => {
      ev.preventDefault()
      this.setState(prevState => ({ ...prevState, type }))
   }

   onToggleExtraFields = (isComposeOpen) => {
      eventBusService.emit('toggleScreen', isComposeOpen)
      this.setState(prevState => ({ ...prevState, isOpen: isComposeOpen }))
   }

   onCreateNote = (ev) => {
      ev.preventDefault();
      this.onToggleExtraFields(false);
      this.props.onAddNote(this.state)
         .then(() => {
            console.log('hi');
            this.setState(prevState => ({
               ...prevState, fields: ({
                  title: '',
                  txt: '',
                  url: '',
                  todos: []
               })
            }))
         })
         .catch(err => alert(err))
   }

   render() {
      const { type, isOpen } = this.state
      return <form className={`compose-note ${(isOpen) ? 'compose-open' : ''}`} onSubmit={(ev) => { this.onCreateNote(ev) }}>
         <div className={`compose-preview flex column ${(isOpen && type !== 'todos') ? 'compose-open' : ''}`}>

            <div className="compose-types flex">
               <button className={`fas fa-paragraph ${(type === 'txt' ? 'active' : '')}`} onClick={(ev) => this.onChangeType(ev, 'txt')}></button>
               <button className={`fas fa-image ${(type === 'img' ? 'active' : '')}`} onClick={(ev) => this.onChangeType(ev, 'img')}></button>
               <button className={`fas fa-tasks  ${(type === 'todos' ? 'active' : '')}`} onClick={(ev) => this.onChangeType(ev, 'todos')}></button>
            </div>
            <input type="text"
               name="title"
               placeholder="Title"
               onChange={this.handleFieldChange}
               onFocus={() => this.onToggleExtraFields(true)}
               className={` ${(isOpen && type !== 'todos') ? 'compose-open' : ''}`}
               value={this.state.fields.title} />
         </div>

         <div className={`flex column extra-fields ${(!this.state.isOpen) ? 'hidden' : ''}`}>

            {type === 'txt' && < textarea type="text" name="txt" placeholder="Compose your text" onChange={this.handleFieldChange} value={this.state.fields.txt} />}
            {type === 'img' && <input type="text" name="url" placeholder="Image url" onChange={this.handleFieldChange} value={this.state.fields.url} />}
            {type === 'todos' && <ComposeTodos handleFieldChange={this.handleFieldChange} />}

            <button className="notes-primary-btn">Create</button>
         </div>
      </form >
   }
}