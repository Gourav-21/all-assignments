import { useEffect, useState } from "react";
import "./App.css";

function useTodo() {
  const [todos, setTodos] = useState([]);
  // fetch all todos from server
  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:3000/todos").then((res) => {
        res.json().then((data) => {
          setTodos(data);
        });
      });
    }, 1000);
  }, []);
  return todos;
}

function App() {
  const todos = useTodo();
  const [formData, setformData] = useState({});

  function handleChange(e){
    setformData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <>
      <form onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:3000/todos/", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)})
          }}>
        <input name="title" placeholder="title" onChange={handleChange} type="text"></input>
        <input name="description" placeholder="description" onChange={handleChange} type="text"></input>
        <button>create</button>
      </form>
      <div>
        {todos.map((todo) => {
          return (
            <>
              <Todo title={todo.title} description={todo.description} id={todo.id}></Todo>
            </>
          );
        })}
      </div>
    </>
  );
}

function Todo(props) {
  // Add a delete button here so user can delete a TODO.
  return (
    <div>
      {props.title}
      {" "+props.description}
      <button onClick={() => {
        fetch("http://localhost:3000/todos/" + props.id, {
          method: 'DELETE'
        })
      }} >delete</button>
      <br />
    </div>
  );
}

export default App;
