import React, { useState, useEffect } from "react";
import "./todo.css";

function TODO() {
  const [todos, setTodos] = useState(
    JSON.parse(window.localStorage.getItem("todos")) || []
  );
  // toggle the item marked as done or not
  function toggle(index) {
    let newState = [...todos];
    let newObj = { ...newState[index], done: !todos[index].done };
    newState[index] = newObj;
    setTodos(newState);
  }
  // toggle all todo items
  function toggleAll() {
    let newState = [...todos];
    if (newState.every((val) => val.done === newState[0].done)) {
      newState.forEach((val) => (val.done = !val.done));
    } else {
      newState.forEach((val) => (val.done = true));
    }
    setTodos(newState);
  }
  // add new todo item
  function addItem(e) {
    e.preventDefault();
    setTodos([...todos, { text: e.target["new-item"].value, done: false }]);
    e.target["new-item"].value = "";
  }
  // clear all items done
  function clearCompleted() {
    let newState = [...todos];
    setTodos(newState.filter((val) => val.done === false));
  }
  // Count todo items left
  let todosLeft = todos.filter((val) => val.done === false).length;
  // filter todos according to endpoint
  const todosFilter = todos.filter((val) => {
    if (checkPath("active")) return val.done === false;
    if (checkPath("completed")) return val.done === true;
    return true;
  })
  // check endpoint
  function checkPath(path) {
    return window.location.pathname.includes(path);
  }
  function checkItem() {
    if(checkPath("active") && todosFilter.length === 0) return <div className="no-item">There is no active todo...</div>
    if(checkPath("completed") && todosFilter.length === 0) return <div className="no-item">There is no completed todo...</div>
    if(todosFilter.length === 0) return <div className="no-item">There is no todo...</div>
    return <></>
  }
  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={addItem}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              name="new-item"
              type="text"
            />
          </form>
        </header>

        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            onClick={toggleAll}
            type="checkbox"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {checkItem()}
            {
              todosFilter.map((val, index) => {
                return (
                  <li
                    key={`todos-${index}`}
                    className={val.done ? "completed" : ""}
                  >
                    <div className="view">
                      <input
                        id={`toggle[${index}]`}
                        className="toggle"
                        onClick={() => toggle(index)}
                        name="toggle"
                        checked={val.done}
                        onChange={() => {}}
                        type="checkbox"
                      />
                      <label>{val.text}</label>
                      <button
                        onClick={() =>
                          setTodos((prev) => {
                            let newState = [...prev];
                            newState.splice(index, 1);
                            return newState;
                          })
                        }
                        className="destroy"
                      ></button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>

        <footer className="footer" style={{display: todos.length > 0 ? "block" : "none"}}>
          <span className="todo-count">
            <strong>{todosLeft}</strong> {todosLeft > 1 ? "items" : "item"} left
          </span>

          <ul className="filters">
            <li>
              <a
                href="/"
                className={
                  checkPath("active") || checkPath("completed")
                    ? ""
                    : "selected"
                }
              >
                All
              </a>
            </li>
            <li>
              <a
                href="/active/"
                className={checkPath("active") ? "selected" : ""}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="/completed/"
                className={checkPath("completed") ? "selected" : ""}
              >
                Completed
              </a>
            </li>
          </ul>

          {todos.some((val) => val.done === true) ? (
            <button className="clear-completed" onClick={clearCompleted}>
              Clear completed
            </button>
          ) : (
            <></>
          )}
        </footer>
      </section>
      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default TODO;
