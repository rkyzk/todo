import styles from "./App.module.css";
import React, { useState, useEffect } from "react";

function App() {
  // 入力されたtodo項目を格納する
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    details: "",
    status: "未着手",
    priority: "普通",
    deadline: "",
    createdOn: "",
  });

  // 入力されたtodoEdit項目を格納する
  const [todoEdit, setTodoEdit] = useState({
    id: 0,
    title: "",
    details: "",
    status: "",
    priority: "",
    deadline: "",
    createdOn: "",
  });

  /** 項目追加フォームのタイトルにスペースのみ入力されている場合
      trueに設定（バリデーション表示のため）*/
  const [titleValid, setTitleValid] = useState(false);

  /** 更新フォームのタイトルにスペースのみ入力されている場合
      trueに設定（バリデーション表示のため）*/
  const [editTitleValid, setEditTitleValid] = useState(false);

  // 更新中はtrueに設定
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
  });

  */

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

  /**
   * 追加フォームをクリアする
   */
  const clearAddTodoForm = () => {
    setTodo({
      id: 0,
      title: "",
      details: "",
      status: "未着手",
      priority: "普通",
      deadline: "",
      createdOn: "",
    });
  };

  /*
   * 入力された追加項目を変数todoに格納
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
   * 追加ボタン押下時にtodoの値をtodoListに追加
   */
  const handleAddItem = (e) => {
    e.preventDefault();
    if (todo.title.trim() !== "") {
      // タイトルのバリデーションを非表示にする
      setTitleValid(false);
      setTodoList([...todoList, { ...todo }]);
      // 追加項目フォームをクリアする
      clearAddTodoForm();
    } else {
      // タイトルが空の場合バリデーションを表示
      setTitleValid(true);
    }
  };

  /**
   * 更新フォームに入力された値を変数todoEditに格納
   */
  const handleChangeEditForm = (e) => {
    setTodoEdit({
      ...todoEdit,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * 保存押下時にtodoListの該当todoオブジェクトを更新
   */
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (todoEdit.title.trim() !== "") {
      // タイトルのバリデーションを非表示にする
      setEditTitleValid(false);
      setTodoList(
        todoList.map((obj) => {
          if (obj.id === todoEdit.id) {
            return { ...todoEdit };
          } else {
            return { ...obj };
          }
        })
      );
      setIsEditing(false);
    } else {
      // タイトルが空の場合バリデーションを表示
      setEditTitleValid(true);
    }
  };

  /**
   * 更新フォームを表示
   * @param {} item
   */
  const showEditForm = (item) => {
    setIsEditing(true);
    //　更新項目の値を画面より取得し変数todoに格納
    const { id, title, details, status, priority, deadline, createdOn } = item;
    setTodoEdit({
      id,
      title,
      details,
      status,
      priority,
      deadline,
      createdOn,
    });
  };

  /**
   * 「削除」がクリックされた際、項目をtodoListより削除する。
   */
  const handleDelete = (item) => {
    setTodoList(
      /**
       * 該当idの項目をtodoListよりフィルターで削除する。
       * mapメソッドでidが削除項目以上の項目のidを１減らす。
       */
      todoList
        .filter((elem) => elem.id !== item.id)
        .map((filteredElem) => {
          if (filteredElem.id > item.id) {
            return { ...filteredElem, id: filteredElem.id - 1 };
          } else {
            return { ...filteredElem };
          }
        })
    );
  };

  // todoテーブルを期日が近い順に並べ替える
  const handleSort = (e) => {
    if (e.target.textContent !== "x") {
      setTodoList([
        ...todoList.sort((a, b) => {
          return Date.parse(a.deadline) - Date.parse(b.deadline);
        }),
      ]);
      let btn = e.target;
      btn.textContent = "x";
    } else {
      // todoテーブルをインデックス順に並べる
      setTodoList([
        ...todoList.sort((a, b) => {
          return a.id - b.id;
        }),
      ]);
      let btn = e.target;
      btn.textContent = "↑";
    }
  };

  // todoのテーブルコンポーネント
  const list = todoList.map((item) => {
    return (
      <>
        {/** 更新中の項目 */}
        {isEditing && item.id === todoEdit.id ? (
          <tbody key={item.id}>
            <tr>
              <td className={styles.Idx}>{item.id}</td>
              <td colSpan="8">
                <form
                  onSubmit={handleSaveEdit}
                  className={styles.EditForm}
                  id="editForm"
                >
                  <div style={{ width: "155px" }}>
                    <input
                      name="title"
                      type="text"
                      value={todoEdit.title}
                      onChange={handleChangeEditForm}
                      style={{ width: "147px" }}
                      required
                    />
                    {editTitleValid && (
                      <span className={styles.Validation}>
                        タイトルを記載してください。
                      </span>
                    )}
                  </div>
                  <textarea
                    name="details"
                    type="text"
                    value={todoEdit.details}
                    onChange={handleChangeEditForm}
                    rows="4"
                    style={{ width: "247px" }}
                  ></textarea>
                  <select
                    name="status"
                    id="status"
                    onChange={handleChangeEditForm}
                    style={{ width: "98px" }}
                    value={todoEdit.status}
                  >
                    <option value="未着手">未着手</option>
                    <option value="進行中">進行中</option>
                    <option value="完了">完了</option>
                  </select>
                  <select
                    name="priority"
                    id="priority"
                    onChange={handleChangeEditForm}
                    style={{ width: "88px" }}
                    value={todoEdit.priority}
                  >
                    <option value="最優先">最優先</option>
                    <option value="高">高</option>
                    <option value="普通">普通</option>
                    <option value="低">低</option>
                  </select>
                  <input
                    type="datetime-local"
                    name="deadline"
                    onChange={handleChangeEditForm}
                    style={{ width: "110px" }}
                    value={todoEdit.deadline}
                  />
                  <button type="submit" style={{ marginLeft: "10px" }}>
                    保存
                  </button>
                  <button
                    type="button"
                    style={{ marginLeft: "3px" }}
                    onClick={() => setIsEditing(false)}
                  >
                    キャンセル
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody key={item.id}>
            {/** 更新中でない項目 */}
            <tr>
              <td className={styles.Idx}>{item.id}</td>
              <td className={styles.Title}>{item.title}</td>
              <td className={styles.Details}>{item.details}</td>
              <td className={styles.Status}>{item.status}</td>
              <td className={styles.Priority}>{item.priority}</td>
              <td className={styles.Deadline}>{item.deadline.slice(0, 10)}</td>
              <td className={styles.CreatedOn}>{item.createdOn}</td>
              <td className={styles.BtnCell}>
                <button onClick={() => showEditForm(item)}>更新</button>
              </td>
              <td className={styles.BtnCell}>
                <button onClick={() => handleDelete(item)}>削除</button>
              </td>
            </tr>
          </tbody>
        )}
      </>
    );
  });

  /**
   *
   */
  useEffect(() => {
    console.log("fired");
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className={styles.App}>
      <h1>To Doリスト</h1>
      {todoList.length ? (
        <table className={styles.TodoTable}>
          <thead style={{ backgroundColor: "lightblue" }}>
            <tr>
              <th className={styles.Idx}>No</th>
              <th className={styles.Title}>タイトル</th>
              <th className={styles.Details}>詳細</th>
              <th className={styles.Status}>ステータス</th>
              <th className={styles.Priority}>重要度</th>
              <th className={styles.Deadline}>
                期日
                <button
                  className={styles.Caret}
                  onClick={handleSort}
                  value="off"
                >
                  ↑
                </button>
              </th>
              <th className={styles.CreatedOn}>記入日</th>
              <th className={styles.BtnCell}></th>
              <th className={styles.BtnCell}></th>
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
            style={{ width: "180px" }}
            required
          />
          {titleValid && (
            <span className={styles.Validation}>
              タイトルを記載してください。
            </span>
          )}
        </label>
        <label forhtml="details">
          <span>詳細</span>
          <textarea
            name="details"
            type="text"
            value={todo.details}
            onChange={handleChange}
            rows="4"
            cols="28"
          ></textarea>
        </label>
        <label forhtml="status">
          <span>ステータス</span>
          <select
            name="status"
            id="status"
            onChange={handleChange}
            value={todo.status}
          >
            <option value="未着手" defaultValue>
              未着手
            </option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
        </label>
        <label forhtml="priority">
          <span>重要度</span>
          <select
            name="priority"
            id="priority"
            onChange={handleChange}
            value={todo.priority}
          >
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
            style={{ width: "160px" }}
            onChange={handleChange}
            value={todo.deadline}
          />
        </label>
        <button
          id="addBtn"
          type="submit"
          style={{ marginTop: "24px" }}
          disabled={isEditing ? true : false}
        >
          追加
        </button>
        <button
          type="button"
          style={{ marginTop: "24px" }}
          onClick={clearAddTodoForm}
          disabled={isEditing ? true : false}
        >
          クリア
        </button>
      </form>
    </div>
  );
}

export default App;
