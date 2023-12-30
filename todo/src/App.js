import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const currentDate = new Date().getFullYear();
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    details: "",
    status: "",
    priority: "",
    deadline: "",
    createdOn: currentDate,
  });
  const [todoList, setTodoList] = useState([]);

  // 入力された追加項目を変数に格納
  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodoList([
        ...todoList,
        {
          id: todoList.length + 1,
          title: todoList.title,
          details: todoList.details,
          status: todoList.status,
          deadline: todoList.deadline,
        },
      ]);
    }
  };

  const handleEdit = (item) => {};
  const handleDelete = (item) => {};

  const list = todoList.map((item) => {
    return (
      <tr>
        <th>{todoList.indexOf(item)}</th>
        <th>{item.title}</th>
        <th>{item.details}</th>
        <th>{item.status}</th>
        <th>{item.importance}</th>
        <th>{item.deadline}</th>
        <th>{item.createdOn}</th>
        <th>
          <button onClick={() => handleEdit(item)}>更新</button>
        </th>
        <th>
          <button onClick={() => handleDelete(item)}>削除</button>
        </th>
      </tr>
    );
  });

  return (
    <div className="App">
      <h1>To Doリスト</h1>
      {todoList.length ? (
        <table className="TodoTable">
          <tr>
            <th>No.</th>
            <th>タイトル</th>
            <th>詳細</th>
            <th>ステータス</th>
            <th>重要度</th>
            <th>期日</th>
            <th>記入日</th>
            <th></th>
            <th></th>
          </tr>
          {list}
        </table>
      ) : (
        <span style={{ fontSize: "24px" }}>To Doなし!</span>
      )}
      <form class="NewItem" onSubmit={handleAddItem}>
        <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>追加項目</span>
        <label forHtml="title" style={{ marginLeft: "20px" }}>
          <span>タイトル</span>
          <input
            name="title"
            type="text"
            value={todo.title}
            onChange={handleChange}
          />
        </label>
        <label forHtml="details">
          <span>詳細</span>
          <textarea
            name="details"
            type="text"
            value={todo.details}
            onChange={handleChange}
            rows="4"
            cols="35"
          ></textarea>
        </label>
        <label forHtml="status">
          <span>ステータス</span>
          <select name="status" id="status">
            <option value="">ーー</option>
            <option value="not-started">未着手</option>
            <option value="wip">進行中</option>
            <option value="complete">完了</option>
          </select>
        </label>
        <label forHtml="priority">
          <span>重要度</span>
          <select name="priority" id="priority">
            <option value="urgent">最優先</option>
            <option value="importnat">高</option>
            <option value="normal" selected>
              普通
            </option>
            <option value="low">低</option>
          </select>
        </label>
        <label forHtml="deadline">
          <span>期日</span>
          <input
            type="datetime-local"
            name="deadline"
            onChange={handleChange}
          />
        </label>
        <button type="submit" style={{ marginTop: "24px" }}>
          追加
        </button>
      </form>
    </div>
  );
}

export default App;
