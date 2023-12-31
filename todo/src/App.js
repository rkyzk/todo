import styles from "./App.module.css";
import React, { useState, useEffect } from "react";

function App() {
  // 入力されたtodo項目を格納する
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    details: "",
    status: "",
    priority: "",
    deadline: "",
    createdOn: "",
  });

  /**
   * localStorageに保存されているtodoリストを初期値としてtodoListに設定

  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("todoList");
    if (savedTodoList) {
      return JSON.parse(savedTodoList);
    } else {
      return [];
    }
  });

  */

  const [todoList, setTodoList] = useState([
    {
      id: 1,
      title: "title",
      details: "details",
      status: "uhi",
      priority: "aha",
      deadline: "2024-01-31",
      createdOn: "2023-12-31",
    },
  ]);

  /**
   * date objectを"yyyy-mm-dd"のstringフォーマットに変換
   */
  const getDate = (dateObj) => {
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // 今日の日付を取得（記載日として利用）
  let currDate = getDate(new Date());

  /*
   * 入力された追加項目を変数に格納
   */
  const handleChange = (e) => {
    setTodo({
      ...todo,
      id: todoList.length + 1,
      [e.target.name]: e.target.value,
      createdOn: currDate,
    });
  };

  /*
   * 入力された追加項目を変数に格納
   */
  const handleAddItem = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodoList([...todoList, { ...todo }]);
    }
  };

  const handleEdit = (item) => {};
  const handleDelete = (item) => {};

  const useEffect = (() => {}, [todoList]);

  const list = todoList.map((item) => {
    return (
      <tbody>
        <tr>
          <td className={styles.idxWidth}>{todoList.indexOf(item)}</td>
          <td className={styles.Fitwidth}>{item.title}</td>
          <td>{item.details}</td>
          <td className={styles.Fitwidth}>{item.status}</td>
          <td className={styles.Fitwidth}>{item.priority}</td>
          <td className={styles.Fitwidth}>{item.deadline.slice(0, 10)}</td>
          <td className={styles.Fitwidth}>{item.createdOn}</td>
          <td className={styles.Fitwidth}>
            <button onClick={() => handleEdit(item)}>更新</button>
          </td>
          <td className={styles.Fitwidth}>
            <button onClick={() => handleDelete(item)}>削除</button>
          </td>
        </tr>
      </tbody>
    );
  });

  return (
    <div className={styles.App}>
      <h1>To Doリスト</h1>
      {todoList.length ? (
        <table className={styles.TodoTable}>
          <thead style={{ backgroundColor: "lightblue" }}>
            <tr>
              <th className={styles.idxWidth}>No</th>
              <th className={styles.Fitwidth}>タイトル</th>
              <th>詳細</th>
              <th className={styles.Fitwidth}>ステータス</th>
              <th className={styles.Fitwidth}>重要度</th>
              <th className={styles.Fitwidth}>期日</th>
              <th className={styles.Fitwidth}>記入日</th>
              <th className={styles.Fitwidth}></th>
              <th className={styles.Fitwidth}></th>
            </tr>
          </thead>
          {list}
        </table>
      ) : (
        <span style={{ fontSize: "20px" }}>To Doなし!</span>
      )}
      <h2 style={{ marginTop: "40px" }}>追加項目</h2>
      <form className={styles.NewItem} onSubmit={handleAddItem}>
        <label forhtml="title">
          <span>タイトル</span>
          <input
            name="title"
            type="text"
            value={todo.title}
            onChange={handleChange}
          />
        </label>
        <label forhtml="details">
          <span>詳細</span>
          <textarea
            name="details"
            type="text"
            value={todo.details}
            onChange={handleChange}
            rows="4"
            cols="25"
          ></textarea>
        </label>
        <label forhtml="status">
          <span>ステータス</span>
          <select name="status" id="status" onChange={handleChange}>
            <option value="未着手" defaultValue>
              未着手
            </option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
        </label>
        <label forhtml="priority">
          <span>重要度</span>
          <select name="priority" id="priority" onChange={handleChange}>
            <option value="最優先">最優先</option>
            <option value="高">高</option>
            <option value="普通" defaultValue>
              普通
            </option>
            <option value="低">低</option>
          </select>
        </label>
        <label forhtml="deadline">
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
