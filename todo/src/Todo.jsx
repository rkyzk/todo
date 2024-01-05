import styles from "./Todo.module.css";
import React, { useState, useEffect } from "react";
import { TodoTable } from "./components/TodoTable";
import { AddTodoForm } from "./components/AddTodoForm";
import { CompleteTodos } from "./components/CompleteTodos";

/** Todoアプリの画面全体を表示 */
export const Todo = () => {
  /**　localStorageに保存されているtodoリストを
       初期値としてtodoListに設定 */
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("todoList");
    if (savedTodoList) {
      return JSON.parse(savedTodoList);
    } else {
      return [];
    }
  });

  // 完了todo項目を格納
  const [completeTodos, setCompleteTodos] = useState([]);

  // 項目更新中はtrueに設定
  const [isEditing, setIsEditing] = useState(false);

  /**
   * todoList更新時にlocal storageのtodoListを更新
   */
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className={styles.Todo}>
      <h1>To Do List</h1>
      <AddTodoForm
        todoList={todoList}
        setTodoList={setTodoList}
        isEditing={isEditing}
      />
      <TodoTable
        todoList={todoList}
        setTodoList={setTodoList}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        completeTodos={completeTodos}
        setCompleteTodos={setCompleteTodos}
      />
      {completeTodos.length > 0 && (
        <CompleteTodos
          todoList={todoList}
          setTodoList={setTodoList}
          completeTodos={completeTodos}
          setCompleteTodos={setCompleteTodos}
        />
      )}
    </div>
  );
};
