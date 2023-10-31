const TodoListItem = (item, checkboxes) => {
  const li = document.createElement("li");
  li.setAttribute("class", "todolist__item");

  // TODO: 클릭하면 important 속성 변경
  /* todoItem 중요버튼 */
  const importantButton = document.createElement("button");
  importantButton.setAttribute("class", `todolist__item--important-button ${!item.important ? null : "fill"}`);
  importantButton.addEventListener("click", () => {
    importantButton.classList.toggle("fill");
  });

  // TODO: 클릭하면 삭제
  /* todoItem 삭제 버튼 */
  const deleteButton = document.createElement("a");
  deleteButton.setAttribute("class", "todolist__item--delete-button");
  deleteButton.setAttribute("href", `?_id=${item._id}`);

  /* todoItem 상세보기 모달링크 */
  const todoInfoLink = document.createElement("a");
  todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
  todoInfoLink.setAttribute("class", "todolist__item--todo-info-link");
  todoInfoLink.setAttribute("for", `${item.title}`);
  const title = document.createTextNode(item.title);

  // TODO: 클릭하면 done 값 변경
  /* todoItem 체크박스 */
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "todolist__item--checkbox");
  checkbox.setAttribute("id", `${item.title}`);
  if (item.done) {
    checkbox.setAttribute("checked", true);
    /* item이 done일때 취소선 스타일링 */
    todoInfoLink.style.textDecoration = "line-through";
  }

  checkboxes.push(checkbox);
  todoInfoLink.addEventListener("click", function (event) {
    event.preventDefault();
    linkTo(todoInfoLink.getAttribute("href"));
  });

  todoInfoLink.appendChild(title);
  li.appendChild(importantButton);
  li.appendChild(checkbox);
  li.appendChild(todoInfoLink);
  li.appendChild(deleteButton);

  return li;
};

export default TodoListItem;
