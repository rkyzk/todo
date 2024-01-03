import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/AddTodoForm.module.css";

export const AddTodoForm = (props) => {
  const { todoList, setTodoList, isEditing } = props;
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

  /** 追加フォームのタイトル入力欄にrefを設定 */
  const inputRef = useRef(null);
  /** 初回レンダリング時、追加フォームのタイトルにフォーカス */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  /** 項目追加フォームのタイトルにスペースのみ入力されている場合
      trueに設定（バリデーション表示のため）*/
  const [titleValid, setTitleValid] = useState(false);

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
   * 追加ボタン押下時にtodoをtodoListに追加
   */
  const handleAddItem = (e) => {
    e.preventDefault();
    if (todo.title.trim() !== "") {
      // タイトルのバリデーションを非表示にする
      setTitleValid(false);
      setTodoList([...todoList, todo]);
      // 追加項目フォームをクリアする
      clearAddTodoForm();
    } else {
      // タイトルが空の場合バリデーションを表示
      setTitleValid(true);
    }
  };

  return (
    <form className={styles.NewItem} onSubmit={handleAddItem}>
      <label forhtml="title">
        <span>タイトル</span>
        <input
          name="title"
          type="text"
          value={todo.title}
          ref={inputRef}
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
          rows="3"
          style={{ width: "245px" }}
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
        style={{ marginTop: "24px", marginLeft: "3px" }}
        onClick={clearAddTodoForm}
        disabled={isEditing ? true : false}
      >
        クリア
      </button>
    </form>
  );
};
