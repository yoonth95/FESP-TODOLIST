// 할일 목록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import TodoRegist from "../regist/TodoRegist.js";
import TodoInfo from "../info/TodoInfo.js";

const TodoList = async function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const contents = document.createElement("div");
  contents.setAttribute("id", "content");
  contents.setAttribute("class", "todo-container");
  let response;
  try {
    response = await axios("http://localhost:33088/api/todolist");
    console.log(response);

    const ul = document.createElement("ul");
    ul.setAttribute("class", "todolist");
    response.data?.items.forEach((item) => {
      /* todoItem 초기렌더링 */
      const li = document.createElement("li");
      li.setAttribute("class", "todolist__item");
      li.setAttribute("checked", true);

      /* todoItem 중요버튼 */
      const importantButton = document.createElement("button");
      importantButton.setAttribute("id", "importantButton");

      /* todoItem 삭제 버튼 */
      const deleteButton = document.createElement("a");
      deleteButton.setAttribute("id", "deleteButton");
      deleteButton.setAttribute("href", `_id=${item._id}`);

      /* todoItem 상세보기 모달링크 */
      const todoInfoLink = document.createElement("a");
      todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
      todoInfoLink.setAttribute("class", "todolist__item--todo-info-link");
      const title = document.createTextNode(item.title);

      /* todoItem 체크박스 */
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("class", "todolist__item--checkbox");
      // checkbox.setAttribute("name", `${item.name}`);

      todoInfoLink.addEventListener("click", async function (event) {
        // 브라우저의 기본 동작 취소(<a> 태그 동작 안하도록)
        event.preventDefault();
        const infoPage = await TodoInfo({_id: item._id});
        document.querySelector("#page").replaceWith(infoPage);
      });

      todoInfoLink.appendChild(title);
      li.appendChild(checkbox);
      li.appendChild(todoInfoLink);
      li.appendChild(importantButton);
      li.appendChild(deleteButton);
      ul.appendChild(li);
    });
    contents.appendChild(ul);

    const btnRegist = document.createElement("button");
    const btnTitle = document.createTextNode("등록");
    btnRegist.appendChild(btnTitle);
    contents.appendChild(btnRegist);

    btnRegist.addEventListener("click", () => {
      const registPage = TodoRegist();
      document.querySelector("#page").replaceWith(registPage);
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
