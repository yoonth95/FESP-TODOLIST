import axios from "axios";

import { linkTo } from "../../Router";

import HandleDataAll from "../../layout/HandleDataAll";
import BASE_URL from "../../api/BaseUrl";

import "./TodoListItem.css";
import "../../global.css";

const TodoListItem = (item: TodoItem) => {
  const li = document.createElement("li");
  li.setAttribute("class", "todo-item");

  // TODO: 클릭하면 important 속성 변경
  /* todoItem 중요버튼 */
  const importantButton = document.createElement("button");
  importantButton.setAttribute(
    "class",
    `todo-item--important-button ${!item.important ? null : "fill"}`
  );

  // 중요토글 함수
  const handleToggleImportant = async () => {
    let result;
    importantButton.classList.toggle("fill");

    importantButton.classList.contains("fill")
      ? (result = true)
      : (result = false);

    await axios.patch(`${BASE_URL}/${item._id}`, {
      important: result,
    });

    const dataResult = await axios(`${BASE_URL}`);
    const todolistData = dataResult?.data.items;

    HandleDataAll(".todolist", todolistData);
  };

  importantButton.addEventListener("click", handleToggleImportant);

  // TODO: 클릭하면 삭제
  /* todoItem 삭제 버튼 */
  const deleteButton = document.createElement("a");
  deleteButton.setAttribute("class", "todo-item--delete-button");

  // todo아이템 삭제
  const handleDelete = async () => {
    const deleteResult = confirm("삭제하시겠습니까?");

    if (deleteResult) {
      await axios.delete(`${BASE_URL}/${item._id}`);
      window.location.reload();
    }
  };

  deleteButton.addEventListener("click", handleDelete);

  /* todoItem 상세보기*/
  const todoInfoLink = document.createElement("a");
  todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
  todoInfoLink.setAttribute("class", "todo-item--todoInfo-link");
  todoInfoLink.setAttribute("for", `${item.title}`);
  const title = document.createTextNode(item.title);

  // TODO: 클릭하면 done 값 변경
  /* todoItem 체크박스 */
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "todo-item--checkbox");
  checkbox.setAttribute("id", `${item.title}`);
  if (item.done) {
    checkbox.checked = true;
    /* item이 done일때 취소선 스타일링 */
    todoInfoLink.style.textDecoration = "line-through";
  }

  // 체크박스토글 함수
  const handleToggleDone = async () => {
    await axios.patch(`${BASE_URL}/${item._id}`, {
      done: checkbox.checked,
    });

    window.location.reload();
  };
  checkbox.addEventListener("click", handleToggleDone);

  // checkboxes.push(checkbox); // 왜 넣어진거지?

  todoInfoLink.addEventListener("click", function (event) {
    event.preventDefault();
    linkTo(todoInfoLink.getAttribute("href")!);
  });

  todoInfoLink.appendChild(title);
  li.appendChild(importantButton);
  li.appendChild(checkbox);
  li.appendChild(todoInfoLink);
  li.appendChild(deleteButton);

  return li;
};

export default TodoListItem;
