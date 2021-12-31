export function ComposeTodoLine({ todoIdx, todo, handleTodoChange }) {
   return <input type="text" value={todo}
      onChange={(ev) => handleTodoChange(ev.target.value, todoIdx)}
      placeholder="Your task here..."
      className="todo-compose-line" />
}