import { ComposeTodoLine } from "./ComposeTodoLine.jsx"

export class ComposeTodos extends React.Component {
   state = {
      todos: ['task', '']
   }

   handleTodoChange = (newTxt, todoIdx) => {
      let { todos } = this.state;
      todos[todoIdx] = newTxt;
      todos = this.clearEmptyLines(todos);
      this.props.handleFieldChange({ target: { name: 'todos', value: todos } })
      todos.push('')
      this.setState({ todos });
   }

   clearEmptyLines = (todos) => {
      return todos.filter(todo => (typeof todo === 'string' && todo !== ''))
   }



   render() {
      const { todos } = this.state

      return <React.Fragment>
         {/* <label className="compose-todos-label muted" >Todos</label> */}
         {todos.map((todo, i) => <ComposeTodoLine key={i} todoIdx={i} todo={todo} handleTodoChange={this.handleTodoChange} />)}
      </React.Fragment>
   }
}