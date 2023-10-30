// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

// 들어가야할 요소
// 이전 버튼(button)
// 양식 - title, content, Deadline, importantCheckBox
// 전송 버튼(submit)

const BASE_URL = "http://localhost:33088/api";

const TodoRegist = function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  // 전체 등록 최상위 박스
  const contents = document.createElement("div");
  contents.setAttribute("id", "contents");
  // 양식 폼 박스
  const form = document.createElement("form");
  form.setAttribute("id", "todo-form");

  // Label
  const labelTitle = document.createElement("label");
  labelTitle.setAttribute("for", "input-title");
  labelTitle.classList = "label-title";
  labelTitle.classList.add("register-label");
  labelTitle.innerText = "제목";

  const labelContent = document.createElement("label");
  labelContent.setAttribute("for", "textarea-content");
  labelContent.classList = "label-content";
  labelContent.classList.add("register-label");
  labelContent.innerText = "내용";

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

  // Input
  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("id", "input-title");
  inputTitle.classList.add("register-input");
  inputTitle.type = "text";
  inputTitle.required;
  inputTitle.placeholder = "할일 제목을 입력하세요";

  const textareaContent = document.createElement("textarea");
  textareaContent.setAttribute("id", "textarea-content");
  textareaContent.required;
  textareaContent.placeholder = "할일의 상세 내용을 입력하세요";

  const inputDeadline = document.createElement("input");
  inputDeadline.setAttribute("id", "input-deadline");
  inputDeadline.classList.add("register-input");
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
  inputImportant.classList.add("register-input");
  inputImportant.type = "checkbox";
  inputImportant.name = "input-important";

  // span -> 별표 아이콘
  const spanImportant = document.createElement("span");
  spanImportant.setAttribute("class", "check-true");

  // acitve 박스
  // 전송 버튼
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("class", "submit-button");
  submitBtn.classList.add("register-button");
  submitBtn.type = "submit";
  submitBtn.innerText = "등록";
  // 취소 버튼(이전 버튼)
  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("class", "cancel-button");
  cancelBtn.classList.add("register-button");
  cancelBtn.type = "button";
  cancelBtn.innerText = "취소";

  // Dom 추가
  // title div박스
  const titleEl = document.createElement("div");
  titleEl.setAttribute("class", "title-box");
  titleEl.appendChild(labelTitle);
  titleEl.appendChild(inputTitle);
  form.appendChild(titleEl);

  // content div박스
  const contentEl = document.createElement("div");
  contentEl.setAttribute("class", "content-box");
  contentEl.appendChild(labelContent);
  contentEl.appendChild(textareaContent);
  form.appendChild(contentEl);

  // deadline div박스
  const deadlineEl = document.createElement("div");
  deadlineEl.setAttribute("class", "deadline-box");
  deadlineEl.appendChild(labelDeadline);
  deadlineEl.appendChild(inputDeadline);
  form.appendChild(deadlineEl);

  // important div박스
  const importantEl = document.createElement("div");
  importantEl.setAttribute("class", "important-box");
  // label안에 input과 span추가
  labelImportant.appendChild(inputImportant);
  labelImportant.appendChild(spanImportant);
  importantEl.appendChild(labelImportant);
  form.appendChild(importantEl);

  // 등록/취소 버튼 박스
  const activeEl = document.createElement("div");
  activeEl.setAttribute("class", "active-box");
  activeEl.appendChild(submitBtn);
  activeEl.appendChild(cancelBtn);
  form.appendChild(activeEl);

  contents.appendChild(form);

  page.appendChild(Header("새로운 할일 등록하기"));
  page.appendChild(contents);
  page.appendChild(Footer());

  // 등록 이벤트
  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      title: inputTitle.value,
      content: textareaContent.value,
      deadline: inputDeadline.value,
      important: inputImportant.checked,
    };
    // http
    await axios.post(`${BASE_URL}/todolist`, body);

    window.location.pathname = "/";
  };
  submitBtn.addEventListener("click", handleSubmit);

  // 취소 이벤트
  cancelBtn.addEventListener("click", () => {
    window.location.pathname = "/";
  });

  return page;
};

export default TodoRegist;
