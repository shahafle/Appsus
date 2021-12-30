import { ComposeTodoLine } from "./ComposeTodoLine.jsx"

export class ComposeTodos extends React.Component {
   state = {
      lines: ['todo1', 'todo2']
   }

   handleTodoChange = (newTxt, lineIdx) => {
      let { lines } = this.state;
      lines[lineIdx] = newTxt;
      lines = this.clearEmptyLines(lines)
      lines.push('')
      this.setState({ lines });
   }

   clearEmptyLines = (lines) => {
      return lines.filter(line => (typeof line === 'string' && line !== ''))
   }


   render() {
      const { lines } = this.state

      return <React.Fragment>
         <label htmlFor="" >Todos</label>
         {lines.map((line, i) => <ComposeTodoLine key={i} lineIdx={i} line={line} handleTodoChange={this.handleTodoChange} />)}
      </React.Fragment>
   }
}