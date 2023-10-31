// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import Button from "../../layout/Button.js";

const BASE_URL = "http://localhost:33088/api";

const TodoInfo = async function () {
  // 상세 할일 페이지 id
  const params = new URLSearchParams(location.search);
  const _id = params.get("_id");

  const page = document.createElement("div");
  page.setAttribute("id", "page");

  // 전체 등록 최상위 박스
  const contents = document.createElement("div");
  contents.setAttribute("id", "contents");
  // 디테일 컨테이너
  const detailContainer = document.createElement("div");
  detailContainer.setAttribute("id", "detail-container");

  // Label
  // const labelTitle = document.createElement("label");
  // labelTitle.setAttribute("for", "input-title");
  // labelTitle.classList = "label-title";
  // labelTitle.classList.add("register-label");
  // labelTitle.innerText = "제목";

  // const labelContent = document.createElement("label");
  // labelContent.setAttribute("for", "textarea-content");
  // labelContent.classList = "label-content";
  // labelContent.classList.add("register-label");
  // labelContent.innerText = "내용";

  const labelDeadline = document.createElement("label");
  labelDeadline.setAttribute("for", "input-deadline");
  labelDeadline.classList = "label-deadline";
  labelDeadline.classList.add("register-label");
  labelDeadline.innerText = "완료날짜";

  const labelImportant = document.createElement("label");
  labelImportant.setAttribute("for", "input-important");
  labelImportant.classList = "label-important";
  labelImportant.classList.add("register-label");
  labelImportant.innerText = "중요";

  // textbody
  const detailTitle = document.createElement("h3");
  detailTitle.setAttribute("id", "detail-title");

  const detailContent = document.createElement("p");
  detailContent.setAttribute("id", "detail-content");

  const detailDeadline = document.createElement("p");
  detailDeadline.setAttribute("id", "detail-deadline");

  const detailImportant = document.createElement("span");
  detailImportant.setAttribute("id", "detail-important");

  // Dom 추가
  // title div박스
  const titleEl = document.createElement("div");
  titleEl.setAttribute("class", "title-box");
  // titleEl.appendChild(labelTitle);
  titleEl.appendChild(detailTitle);
  detailContainer.appendChild(titleEl);

  // content div박스
  const contentEl = document.createElement("div");
  contentEl.setAttribute("class", "detail-content-box");
  // contentEl.appendChild(labelContent);
  contentEl.appendChild(detailContent);
  detailContainer.appendChild(contentEl);

  // deadline div박스
  const deadlineEl = document.createElement("div");
  deadlineEl.setAttribute("class", "deadline-box");
  deadlineEl.appendChild(labelDeadline);
  deadlineEl.appendChild(detailDeadline);
  detailContainer.appendChild(deadlineEl);

  // important div박스
  const importantEl = document.createElement("div");
  importantEl.setAttribute("class", "important-box");
  labelImportant.appendChild(detailImportant);
  importantEl.appendChild(labelImportant);

  detailContainer.appendChild(importantEl);

  // 수정/삭제 버튼 박스
  const activeEl = document.createElement("div");
  activeEl.setAttribute("class", "active-box");
  activeEl.appendChild(Button("edit-button", "click", "수정"));
  activeEl.appendChild(Button("delete-button", "click", "삭제"));
  detailContainer.appendChild(activeEl);

  contents.appendChild(detailContainer);

  const backButton = Button("cancel-button", "button", "뒤로가기", () => {
    window.location.pathname = "/";
  });

  // http => 상세todo조회
  const getDetailTodo = async () => {
    const response = await axios(`${BASE_URL}/todolist/${_id}`);
    const detailData = response.data.item;
    // 응답처리
    detailTitle.innerHTML = detailData.title;
    detailContent.innerHTML = detailData.content;
    detailDeadline.innerHTML = detailData.deadline;
    detailImportant.innerHTML = detailData.important;
  };

  getDetailTodo();

  page.appendChild(Header(`상세페이지 1`));
  page.appendChild(backButton);
  page.appendChild(contents);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
