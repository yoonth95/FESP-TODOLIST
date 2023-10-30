// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

// 들어가야할 요소
// 이전 버튼(button)
// 양식 - title, content, Deadline, importantCheckBox
// 전송 버튼(submit)
//

const TodoRegist = function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  // 전체 등록 최상위 박스
  const contents = document.createElement("div");
  contents.setAttribute("id", "contents");
  // 양식 폼 박스
  const form = document.createElement("form");
  form.setAttribute("id", "todo-form");

  // 라벨링
  const labelTitle = document.createElement("label");
  labelTitle.setAttribute("for", "input-title");
  labelTitle.classList = "label-title";
  labelTitle.innerText = "제목";

  const labelContent = document.createElement("label");
  labelContent.setAttribute("for", "input-content");
  labelContent.classList = "label-content";
  labelContent.innerText = "내용";

  const labelDeadline = document.createElement("label");
  labelDeadline.setAttribute("for", "input-deadline");
  labelDeadline.classList = "label-deadline";
  labelDeadline.innerText = "완료날짜";

  const labelImportant = document.createElement("label");
  labelImportant.setAttribute("for", "input-important");
  labelImportant.classList = "label-important";
  labelImportant.innerText = "중요";

  // 인풋양식
  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("id", "input-title");
  inputTitle.type = "text";
  inputTitle.required;
  inputTitle.placeholder = "할일 제목을 입력하세요";

  const inputContent = document.createElement("input");
  inputContent.setAttribute("id", "input-content");
  inputContent.type = "text";
  inputContent.required;
  inputContent.placeholder = "할일의 상세 내용을 입력하세요";

  const inputDeadline = document.createElement("input");
  inputDeadline.setAttribute("id", "input-deadline");
  inputDeadline.type = "date";
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  // 날짜 변환
  let format =
    year +
    "-" +
    ("00" + month.toString()).slice(-2) +
    "-" +
    ("00" + day.toString()).slice(-2);
  inputDeadline.value = format;

  const inputImportant = document.createElement("input");
  inputImportant.setAttribute("id", "input-important");
  inputImportant.type = "checkbox";

  // acitve 박스
  // 전송 버튼
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("class", "submit-button");
  submitBtn.type = "submit";
  submitBtn.innerText = "등록";
  // 취소 버튼(이전 버튼)
  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("class", "cancel-button");
  cancelBtn.type = "button";
  cancelBtn.innerText = "취소";

  // Dom 추가

  const titleEl = document.createElement("div");
  titleEl.setAttribute("class", "title-box");
  titleEl.appendChild(labelTitle);
  titleEl.appendChild(inputTitle);
  form.appendChild(titleEl);

  const contentEl = document.createElement("div");
  contentEl.setAttribute("class", "content-box");
  contentEl.appendChild(labelContent);
  contentEl.appendChild(inputContent);
  form.appendChild(contentEl);

  const deadlineEl = document.createElement("div");
  deadlineEl.setAttribute("class", "deadline-box");
  deadlineEl.appendChild(labelDeadline);
  deadlineEl.appendChild(inputDeadline);
  form.appendChild(deadlineEl);

  const importantEl = document.createElement("div");
  importantEl.setAttribute("class", "important-box");
  importantEl.appendChild(labelImportant);
  importantEl.appendChild(inputImportant);
  form.appendChild(importantEl);

  const activeEl = document.createElement("div");
  activeEl.setAttribute("class", "active-box");
  activeEl.appendChild(submitBtn);
  activeEl.appendChild(cancelBtn);
  form.appendChild(activeEl);

  contents.appendChild(form);

  page.appendChild(Header("TODO App 등록"));
  page.appendChild(contents);
  page.appendChild(Footer());

  return page;
};

TodoRegist();

export default TodoRegist;
