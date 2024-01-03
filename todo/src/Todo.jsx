import styles from "./Todo.module.css";
import React, { useState, useEffect } from "react";
import { TodoTable } from "./components/TodoTable";
import { AddTodoForm } from "./components/AddTodoForm";
import { CompleteTodos } from "./components/CompleteTodos";

export const Todo = () => {
  // 未完了todo項目を格納
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: "title",
      details: "details",
      status: "未着手",
      priority: "最優先",
      deadline: "2024-01-31",
      createdOn: "2023-12-31",
    },
  ]);

  // 完了todo項目を格納
  const [completeTodos, setCompleteTodos] = useState([]);

  // 項目更新中はtrueに設定
  const [isEditing, setIsEditing] = useState(false);

  /**
   * localStorageに保存されているtodoリストを初期値としてtodoListに設定

  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("todoList");
    if (savedTodoList) {
      return JSON.parse(savedTodoList);
    } else {
      return [];
    }
  }); */

  /**
   * todoList更新時にlocal storageのtodoListを更新
   */
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className={styles.Todo}>
      <h1>My To Do List</h1>
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
      <CompleteTodos
        todoList={todoList}
        setTodoList={setTodoList}
        completeTodos={completeTodos}
        setCompleteTodos={setCompleteTodos}
      />
    </div>
  );
};
