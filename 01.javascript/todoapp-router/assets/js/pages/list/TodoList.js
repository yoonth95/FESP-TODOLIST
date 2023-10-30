// 할일 목록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import {linkTo} from "../../Router.js";
import createCheckbox from "./checkbox.js";

const TodoList = async function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const contents = document.createElement("div");
  contents.setAttribute("id", "contents");
  contents.setAttribute("class", "todo-container");

  const checkList = document.createElement("div");
  checkList.setAttribute("class", "todo-container__check-list");

  const checkAll = document.createElement("input");
  checkAll.setAttribute("type", "checkbox");
  checkAll.setAttribute("id", "checkAll");

  /* 전체선택 레이블 */
  const checkAllLabel = document.createElement("label");
  checkAllLabel.setAttribute("for", "checkAll");
  checkAllLabel.setAttribute("class", "checkAllLabel");
  checkAllLabel.innerHTML = "전체선택";

  // 전체완료 버튼텍스트
  const completedAll = document.createElement("button");
  completedAll.setAttribute("class", "completeAll");
  completedAll.innerHTML = "전체완료";

  // 전체삭제 버튼텍스트
  const deleteAll = document.createElement("button");
  deleteAll.setAttribute("class", "deleteAll");
  deleteAll.setAttribute("name", "deleteAll");
  deleteAll.innerHTML = "전체삭제";

  /* 등록 버튼 */
  const registButton = document.createElement("button");
  registButton.setAttribute("class", "registButton");
  const btnTitle = document.createTextNode("등록");

  /* UI 렌더링 */
  checkList.appendChild(checkAll);
  checkList.appendChild(checkAllLabel);
  checkList.appendChild(completedAll);
  checkList.appendChild(deleteAll);

  let response;
  try {
    response = await axios("http://localhost:33088/api/todolist");

    /* 중요 아이템 리스트 컨테이너 */
    const importantList = document.createElement("ul");
    importantList.setAttribute("class", "important-list");

    const ul = document.createElement("ul");
    ul.setAttribute("class", "todolist");
    response.data?.items.forEach((item) => {
      /* todoItem 초기렌더링 */
      const li = document.createElement("li");
      li.setAttribute("class", "todolist__item");

      /* todoItem 중요버튼 */
      const importantButton = document.createElement("button");
      importantButton.setAttribute("class", "todolist__item--important-button");
      importantButton.addEventListener("click", () => {
        importantButton.classList.toggle("fill");
      });

      /* todoItem 삭제 버튼 */
      const deleteButton = document.createElement("a");
      deleteButton.setAttribute("class", "todolist__item--delete-button");
      deleteButton.setAttribute("href", `?_id=${item._id}`);

      /* todoItem 상세보기 모달링크 */
      const todoInfoLink = document.createElement("a");
      todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
      todoInfoLink.setAttribute("class", "todolist__item--todo-info-link");
      const title = document.createTextNode(item.title);

      /* todoItem 체크박스 */
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("class", "todolist__item--checkbox");
      checkbox.setAttribute("name", `${item.name}`);
      todoInfoLink.addEventListener("click", function (event) {
        // 브라우저의 기본 동작 취소(<a> 태그 동작 안하도록)
        event.preventDefault();
        linkTo(todoInfoLink.getAttribute("href"));
      });

      todoInfoLink.appendChild(title);
      li.appendChild(checkbox);
      li.appendChild(todoInfoLink);
      li.appendChild(importantButton);
      li.appendChild(deleteButton);
      ul.appendChild(li);
    });

    registButton.appendChild(btnTitle);
    contents.appendChild(registButton);
    contents.appendChild(importantList);
    contents.appendChild(checkList);
    contents.appendChild(ul);

    registButton.addEventListener("click", () => {
      linkTo("regist");
    });
  } catch (err) {
    const error = document.createTextNode("일시적인 오류 발생");
    contents.appendChild(error);
  }

  page.appendChild(Header("TODO App 목록 조회"));
  page.appendChild(contents);
  page.appendChild(Footer());
  return page;
};

export default TodoList;
