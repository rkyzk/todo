import React from "react";
import tblStyles from "../styles/TodoTable.module.css";
import styles from "../styles/CompleteTodos.module.css";

export const CompleteTodos = (props) => {
  const { todoList, setTodoList, completeTodos, setCompleteTodos } = props;

  // completeTodosより項目削除
  const deleteTodo = (idx) => {
    let newArr = [...completeTodos];
    newArr.splice(idx, 1);
    setCompleteTodos(newArr);
  };

  // 項目を未完了リストに戻す
  const putBackItem = (item, idx) => {
    setTodoList([...todoList, { ...item, status: "進行中" }]);
    deleteTodo(idx);
  };

  // completeTodosテーブルのコンテンツ
  const list = completeTodos.map((item, idx) => {
    return (
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.details}</td>
        <td style={{ textAlign: "center" }}>{item.status}</td>
        <td style={{ textAlign: "center" }}>{item.priority}</td>
        <td>{item.deadline.slice(0, 10)}</td>
        <td>{item.createdOn}</td>
        <td>
          <button onClick={() => putBackItem(item, idx)}>戻す</button>
        </td>
        <td>
          <button onClick={() => deleteTodo(idx)}>削除</button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2 style={{ marginTop: "80px", textAlign: "center" }}>完了Todo</h2>
      <table className={styles.CompleteTodos}>
        <thead>
          <tr>
            <th className={tblStyles.Title}>タイトル</th>
            <th className={tblStyles.Details}>詳細</th>
            <th className={tblStyles.Status}>ステータス</th>
            <th className={tblStyles.Priority}>重要度</th>
            <th className={tblStyles.Deadline}>期日</th>
            <th className={tblStyles.CreatedOn}>記入日</th>
            <th className={tblStyles.BtnCell}></th>
            <th className={tblStyles.BtnCell}></th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </>
  );
};
