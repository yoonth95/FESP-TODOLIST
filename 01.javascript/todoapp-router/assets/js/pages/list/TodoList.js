// 할일 목록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import { linkTo } from "../../Router.js";
import Button from "../../layout/Button.js";
import TodoListItem from "./TodoListItem.js";

const BASE_URL = "http://localhost:33088/api";

const TodoList = async function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const contents = document.createElement("div");
  contents.setAttribute("id", "contents");
  contents.setAttribute("class", "todo-container");

  const checkList = document.createElement("div");
  checkList.setAttribute("class", "todo-container__check-list");

  // 전체완료 버튼텍스트
  const completedAll = document.createElement("button");
  completedAll.setAttribute("class", "completeAll");
  completedAll.innerHTML = "전체완료";
  completedAll.setAttribute("data-done", 0);

  // 전체삭제 버튼텍스트
  const deleteAll = document.createElement("button");
  deleteAll.setAttribute("class", "deleteAll");
  deleteAll.setAttribute("name", "deleteAll");
  deleteAll.innerHTML = "전체삭제";

  // 전체 데이터
  const dataResult = await axios(`${BASE_URL}/todolist`);

  // 필터리스트
  const filterList = document.createElement("div");
  filterList.setAttribute("class", "filter-list");
  const filterAll = Button("filter-list__item", "button", "전체보기");

  // 중요필터버튼
  const filterImportant = Button(
    "filter-list__item",
    "button",
    "중요"
    // handleImportantFilter
  );

  // 미완료 필터버튼
  const filterIncomplete = Button("filter-list__item", "button", "미완료");

  // 완료 필터버튼
  const filterComplete = Button("filter-list__item", "button", "완료");

  filterList.append(
    filterAll,
    filterImportant,
    filterIncomplete,
    filterComplete
  );

  // 등록버튼
  const registButton = Button("registButton", "button", "등록");

  // active 컨테이너 -> 필터링 버튼, 등록버튼
  const activeContainer = document.createElement("div");
  activeContainer.setAttribute("class", "active-container");

  activeContainer.appendChild(filterList);
  activeContainer.appendChild(registButton);

  // 전체완료/전체삭제 체크리스트
  checkList.appendChild(completedAll);
  checkList.appendChild(deleteAll);

  let response;
  try {
    response = await axios("http://localhost:33088/api/todolist");
    const todosResponse = response.data?.items;
    /* 중요 아이템 리스트 컨테이너 */
    const importantList = document.createElement("ul");
    importantList.setAttribute("class", "important-list");

    // TODO: item.deadline 봐서 만들어진 컨테이너가 없으면 생성하고, 있으면 있는 거에 li 만 만들어서 붙이기

    const ul = document.createElement("ul");
    ul.setAttribute("class", "todolist");
    // ul.setAttribute = ("data-deadline", `${item.createdAt}`);
    const checkboxList = [];
    todosResponse.forEach((item) => {
      /* todoItem 초기렌더링 */

      const li = TodoListItem(item, checkboxList);
      if (item.important) {
        importantList.style.display = "block";
        importantList.appendChild(li);
      } else {
        ul.appendChild(li);
      }
    });

    const listAll = document.createElement("div");
    listAll.setAttribute("class", "todo-list-all");
    listAll.appendChild(importantList);
    listAll.appendChild(ul);

    // contents 태그에 넣기(최상위)

    contents.appendChild(checkList);
    contents.appendChild(listAll);

    // 중요보기 필터
    async function handleImportantFilter() {
      const importantResult = todosResponse.filter((item) => item.important);

      ul.appendChild(TodoListItem(importantResult));
    }

    /* 전체완료 체크박스 토글링 */
    let toggleCompletAll = Number(completedAll.dataset.done);
    completedAll.addEventListener("click", () => {
      toggleCompletAll = !toggleCompletAll;
      checkboxList.forEach((checkbox) => {
        checkbox.checked = toggleCompletAll;
        const todoInfoLink = checkbox.nextSibling;
        todoInfoLink.style.textDecoration = checkbox.checked
          ? "line-through"
          : "none";
        response.data.items.forEach(async (item) => {
          return await axios.patch(`${BASE_URL}/todolist/${item._id}`, {
            done: toggleCompletAll,
          });
        });
      });
    });

    registButton.addEventListener("click", () => {
      linkTo("regist");
    });

    // 아이템 전체 삭제 함수
    const handleAllDelete = () => {
      if (todosResponse.length === 0) {
        alert("삭제할 할일이 없어요~");
        return;
      }
      const result = confirm("전체 삭제하시겠습니까?");

      if (result) {
        const deleteResArr = todosResponse.map(async (item) => {
          await axios.delete(`${BASE_URL}/todolist/${item._id}`);
        });

        if (deleteResArr.length === todosResponse.length) {
          window.location.reload();
        }
      }
    };

    deleteAll.addEventListener("click", handleAllDelete);
  } catch (err) {
    const error = document.createTextNode("일시적인 오류 발생");
    console.log(err);
  }

  // UI 렌더
  page.appendChild(Header("TODOLIST"));
  page.appendChild(activeContainer);
  page.appendChild(contents);
  page.appendChild(Footer());

  return page;
};

export default TodoList;
