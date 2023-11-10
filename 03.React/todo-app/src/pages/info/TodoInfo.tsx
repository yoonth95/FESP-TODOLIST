import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BASE_URL from "@/api/BaseUrl";
import Button from "@/layout/Button";
import "./TodoInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const TodoInfo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const _id = params.get("_id");

  const [todoData, setTodoData] = useState({
    title: "",
    content: "",
    deadline: "",
    important: false,
  });
  const starColor = todoData.important ? "var(--star-color)" : "inherit";

  useEffect(() => {
    const getDetailTodo = async () => {
      const response: TodoItem = await axios(`${BASE_URL}/${_id}`);
      setTodoData({
        title: response.title,
        content: response.content,
        deadline: response.deadline,
        important: response.important,
      });

      if (todoData.important) {
        // starIcon.style.color = "var(--star-color)";
      }
    };

    getDetailTodo();
  }, [_id]);

  const deleteDetailTodo = async () => {
    if (confirm("삭제하시겠습니까?")) {
      const response = await axios.delete(`${BASE_URL}/${_id}`);
      if (response.data.ok === 1) {
        alert("삭제되었습니다!");
        navigate("/");
      }
    }
  };

  return (
    <>
      <button>뒤로가기</button>
      <div id="contents">
        <div id="detail-content">
          <div className="title-box">
            <h3 id="detail-title">{todoData.title}</h3>
          </div>
          <div className="content-box">
            <p id="detail-content">{todoData.content}</p>
          </div>
          <div className="deadline-box">
            <label
              htmlFor="input-deadline"
              className="label-deadline detail-label"
            >
              완료날짜
            </label>
            <p id="detail-deadline">{todoData.deadline}</p>
          </div>
          <div className="important-box">
            <label htmlFor="input-important" className="detail-label">
              중요
              <span id="detail-important">
                <FontAwesomeIcon
                  icon={faStar}
                  className="important"
                  style={{ color: starColor }}
                />
              </span>
            </label>
          </div>
          <div className="active-box">
            <Button className="edit-button" type="button" text="수정" />
            <Button
              className="delete-button"
              type="button"
              text="삭제"
              handleClick={() => deleteDetailTodo()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoInfo;
