import React, { useState } from "react";
import styles from "../styles/TodoTable.module.css";

export const TodoTable = (props) => {
  // 各変数を取得
  const {
    todoList,
    setTodoList,
    isEditing,
    setIsEditing,
    completeTodos,
    setCompleteTodos,
  } = props;

  // 更新フォームに入力された内容を格納する
  const [todoEdit, setTodoEdit] = useState({
    id: 0,
    title: "",
    details: "",
    status: "",
    priority: "",
    deadline: "",
    createdOn: "",
  });

  /** 更新フォームのタイトルにスペースのみ入力されている場合
      trueに設定（バリデーション表示のため）*/
  const [editTitleValid, setEditTitleValid] = useState(false);

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
   * 完了項目はCompleteTodosに追加
   */
  const handleSaveEdit = (e, idx) => {
    e.preventDefault();
    if (todoEdit.title.trim() !== "") {
      // タイトルのバリデーションを非表示にする
      setEditTitleValid(false);
      //　ステータス完了の場合、completeTodosに追加
      if (todoEdit.status === "完了") {
        completeTodos.length > 0 // completeTodosがundefinedでなければ元のリストに追加
          ? setCompleteTodos([...completeTodos, todoEdit])
          : setCompleteTodos([todoEdit]);
        // todoListより項目を削除
        handleDelete(idx);
      } else {
        // ステータス完了でない場合、todoListを更新
        let newArr = [...todoList];
        newArr.splice(idx, 1, todoEdit);
        setTodoList(newArr);
      }
      setIsEditing(false);
    } else {
      // タイトルが空の場合バリデーションを表示
      setEditTitleValid(true);
    }
  };

  /**
   * 更新フォームを表示
   */
  const showEditForm = (item) => {
    setIsEditing(true);
    //　更新項目の値を画面より取得し変数todoに格納
    const { id, title, details, status, priority, deadline, createdOn } = item;
    var date;
    /**  期日に記入があり、YYYY-MM-DDのフォーマットである場合、
         T00:00 を追加（ないと日付が更新フォームに反映されない。）*/
    if (deadline.length === 10) {
      date = deadline + "T00:00";
    }
    setTodoEdit({
      id,
      title,
      details,
      status,
      priority,
      deadline: date || deadline,
      createdOn,
    });
  };

  /**
   * todoテーブルを期日が近い順に並べ替える
   */
  const handleSort = () => {
    setTodoList([
      ...todoList.sort((a, b) => {
        return Date.parse(a.deadline) - Date.parse(b.deadline);
      }),
    ]);
  };

  /**
   * 「削除」がクリックされた際、項目をtodoListより削除する。
   */
  const handleDelete = (idx) => {
    let newArr = [...todoList];
    newArr.splice(idx, 1);
    setTodoList(newArr);
  };

  // テーブルのコンテンツ（ヘッダー以下）
  const rows = todoList.map((item, idx) => {
    return (
      <>
        {/** 更新中の行 */}
        {isEditing && item.id === todoEdit.id ? (
          <tbody key={item.id}>
            <tr>
              <td colSpan="8">
                <form
                  onSubmit={(e) => handleSaveEdit(e, idx)}
                  className={styles.EditForm}
                  id="editForm"
                >
                  <div style={{ width: "155px" }}>
                    <input
                      name="title"
                      type="text"
                      value={todoEdit.title}
                      onChange={handleChangeEditForm}
                      style={{ width: "152px" }}
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
                    style={{ width: "256px" }}
                  ></textarea>
                  <select
                    name="status"
                    id="status"
                    onChange={handleChangeEditForm}
                    style={{ width: "100px" }}
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
                    style={{ width: "89px" }}
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
                    style={{ width: "120px" }}
                    value={todoEdit.deadline}
                  />
                  <button type="submit" style={{ marginLeft: "20px" }}>
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
            {/** 更新中ではない行 */}
            <tr>
              <td className={styles.Title}>{item.title}</td>
              <td className={styles.Details}>{item.details}</td>
              <td style={{ textAlign: "center" }}>{item.status}</td>
              <td style={{ textAlign: "center" }}>{item.priority}</td>
              <td>{item.deadline.slice(0, 10)}</td>
              <td>{item.createdOn}</td>
              <td style={{ textAlign: "center" }}>
                <button onClick={() => showEditForm(item)}>更新</button>
              </td>
              <td style={{ textAlign: "center" }}>
                <button onClick={() => handleDelete(idx)}>削除</button>
              </td>
            </tr>
          </tbody>
        )}
      </>
    );
  });

  return (
    <>
      <h2>未完了Todo</h2>
      {rows.length > 0 ? (
        <table className={styles.TodoTable}>
          <thead>
            <tr>
              <th className={styles.Title}>タイトル</th>
              <th className={styles.Details}>詳細</th>
              <th className={styles.Status}>ステータス</th>
              <th className={styles.Priority}>重要度</th>
              <th className={styles.Deadline}>
                期日
                <button
                  className={styles.Arrow}
                  onClick={handleSort}
                  value="off"
                >
                  ↑
                </button>
              </th>
              <th className={styles.CreatedOn}>記載日</th>
              <th className={styles.BtnCell}></th>
              <th className={styles.BtnCell}></th>
            </tr>
          </thead>
          {rows}
        </table>
      ) : (
        <span className={styles.NoTodo}>未完了のToDoなし!</span>
      )}
    </>
  );
};
