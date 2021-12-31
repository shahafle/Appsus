import { eventBusService } from "../services/event-bus.service.js"

export class Screen extends React.Component {
   state = {
      isShown: false
   }

   componentDidMount() {
      eventBusService.on('toggleScreen', (isShown) => {
         this.setState({ isShown })
      })
   }

   render() {
      return <div
         className={`compose-note-screen ${(this.state.isShown) ? 'open' : ''}`}
         onClick={() => {
            eventBusService.emit('toggleScreen', false)
            eventBusService.emit('toggleNoteCompose', false)

         }}></div>
   }
}