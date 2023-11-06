// 할일 목록
import { linkTo } from "../../Router";
import Button from "../../layout/Button";
import Footer from "../../layout/Footer";
import HandleDataFilter from "../../layout/HandleDataFilter";
import Header from "../../layout/Header";
import TodoListItem from "./TodoListItem";
import HandleDataAll from "../../layout/HandleDataAll";

import BASE_URL from "../../api/BaseUrl";

const TodoList = async function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const contents = document.createElement("div");
  contents.setAttribute("id", "contents");
  contents.setAttribute("class", "todo-container");

  const checkList = document.createElement("div");
  checkList.setAttribute("class", "todo-container__check-list");

  /* 필터버튼 */

  // 전체 데이터
  const dataResult = await axios(`${BASE_URL}`);
  const todolistData = dataResult?.data.items;

  const filterList = document.createElement("div");
  filterList.setAttribute("class", "filter-list");

  // 전체보기 필터
  const filterAll = Button("filter-list__item", "button", "전체보기", () =>
    HandleDataAll(".todolist", todolistData)
  );

  // 중요필터
  const filterImportant = Button("filter-list__item", "button", "중요", () =>
    HandleDataFilter(".todolist", todolistData, "important")
  );

  // 미완료 필터
  const filterIncomplete = Button("filter-list__item", "button", "미완료", () =>
    HandleDataFilter(".todolist", todolistData, "!done")
  );

  // 완료 필터
  const filterComplete = Button("filter-list__item", "button", "완료", () =>
    HandleDataFilter(".todolist", todolistData, "done")
  );

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

  // 전체완료 버튼텍스트
  const completedAll = document.createElement("button");
  completedAll.setAttribute("class", "completeAll");
  completedAll.innerHTML = "✅ 전체완료";
  completedAll.setAttribute("data-done", 0);

  // 전체삭제 버튼텍스트
  const deleteAll = document.createElement("button");
  deleteAll.setAttribute("class", "deleteAll");
  deleteAll.setAttribute("name", "deleteAll");
  deleteAll.innerHTML = "❌ 전체삭제";

  // 전체완료/전체삭제 체크리스트
  checkList.appendChild(completedAll);
  checkList.appendChild(deleteAll);

  // 서버 통신 로직
  // try {
  let response;
  response = await axios("http://localhost:33088/api/todolist");
  const todosResponse = response.data?.items;
  // 중요 아이템 리스트 컨테이너
  const importantList = document.createElement("ul");
  importantList.setAttribute("class", "important-list");
  // 일반 아이템 리스트 컨테이너
  const normalList = document.createElement("ul");
  normalList.setAttribute("class", "todolist");

  const checkboxList = [];
  todosResponse.forEach((item) => {
    /* todoItem 초기렌더링 */
    const li = TodoListItem(item, checkboxList);
    if (item.important) {
      importantList.style.display = "block";
      importantList.appendChild(li);
    } else {
      normalList.appendChild(li);
    }
  });

  const listAll = document.createElement("div");
  listAll.setAttribute("class", "todo-list-all");
  listAll.appendChild(importantList);
  listAll.appendChild(normalList);

  // contents 태그에 넣기(최상위)

  contents.appendChild(checkList);
  contents.appendChild(listAll);

  // 아이템 전체 완료 함수
  const handleAllDone = () => {
    /* 전체완료 체크박스 토글링 */
    let toggleCompletAll = Number(completedAll.dataset.done);

    toggleCompletAll = !toggleCompletAll;
    checkboxList.forEach((checkbox) => {
      checkbox.checked = toggleCompletAll;
      const todoInfoLink = checkbox.nextSibling;
      todoInfoLink.style.textDecoration = checkbox.checked
        ? "line-through"
        : "none";
      todosResponse.forEach(async (item) => {
        return await axios.patch(`${BASE_URL}/${item._id}`, {
          done: toggleCompletAll,
        });
      });
    });
  };
  completedAll.addEventListener("click", handleAllDone);

  // 아이템 전체 삭제 함수
  const handleAllDelete = () => {
    if (todosResponse.length === 0) {
      alert("삭제할 할일이 없어요~");
      return;
    }
    const result = confirm("전체 삭제하시겠습니까?");

    if (result) {
      const deleteResArr = todosResponse.map(async (item) => {
        await axios.delete(`${BASE_URL}/${item._id}`);
      });

      if (deleteResArr.length === todosResponse.length) {
        window.location.reload();
      }
    }
  };
  deleteAll.addEventListener("click", handleAllDelete);

  // 등록페이지 라우팅
  registButton.addEventListener("click", () => {
    linkTo("regist");
  });
  // } catch (err) {
  //   const error = document.createTextNode("일시적인 오류 발생");
  //   console.log(err);
  // }

  // UI 렌더
  page.appendChild(Header("TODOLIST"));
  page.appendChild(activeContainer);
  page.appendChild(contents);
  page.appendChild(Footer());

  return page;
};

export default TodoList;
