const createCheckbox = () => {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "todolist__item--checkbox");

  /* todoItem 상세보기 모달링크 */
  const todoInfoLink = document.createElement("a");
  todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
  todoInfoLink.setAttribute("class", "todolist__item--todo-info-link");
  const title = document.createTextNode(item.title);

  return checkbox;
};

export default createCheckbox;
