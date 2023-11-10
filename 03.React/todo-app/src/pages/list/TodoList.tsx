import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import BaseUrl from "@/api/BaseUrl";
import TodoListItem from "./TodoListItem";
import useDataFilter from "@/hooks/useDataFilter";

const TodoList = () => {
  // const { _id } = useParams();
  const navigate = useNavigate();
  const { filterData } = useDataFilter([]); // 필터링 커스텀 훅

  const [allTodos, setAllTodos] = useState<TodoList>([]);
  const [todos, setTodos] = useState<TodoList>([]);
  const [importantTodos, setImportantTodos] = useState<TodoList>([]);

  // get 요청
  const fetchData = async () => {
    try {
      const response = await axios(`${BaseUrl}`);
      const todosResponse = response.data?.items || [];
      setAllTodos(todosResponse);

      todosResponse.forEach((todo: TodoItem) => {
        if (todo.important) {
          setImportantTodos((prevTodo) => [...prevTodo, todo]);
        } else {
          setTodos((prevTodo) => [...prevTodo]);
        }
      });

      filterData(todosResponse, "");
    } catch (error) {
      console.error("데이터를 가져오는데 에러가 발생했습니다.", error);
    }
  };

  // 완료, 미완료 체크박스 함수
  const isCompleteCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    important: boolean,
    _id: number
  ): void => {
    if (important) {
      importantTodos.map((todo) => {
        return todo._id === _id ? { ...todo, done: e.target.checked } : todo;
      });
    } else {
      todos.map((todo) => {
        return todo._id === _id ? { ...todo, done: e.target.checked } : todo;
      });
    }
  };

  // 미완료, 완료, 중요 필터버튼 함수
  const dataFilterHandler = (todosData: TodoList, value: string) => {
    filterData(todosData, value);
  };

  // 전체보기 필터 함수
  const dataAllHanlder = (todosData: TodoList) => {
    filterData(todosData, "");
  };

  // 전체 완료 함수
  const allDoneHandler = async () => {
    // 통신해서 서버에 저장하는 for문 돌리기 -> promise all
    try {
      await Promise.allSettled(
        allTodos.map((item) =>
          axios.patch(`${BaseUrl}/${item._id}`, { done: !item.done })
        )
      );
    } catch (error) {
      console.error("Error updating todos:", error);
    }

    // 화면에 보여지는 애들 for문 돌리기
    // todos, importantTodo => done 전부 !done
  };

  // 전체 삭제 함수
  const allDeleteHandler = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="page">
      <div className="active-container">
        <div className="filter-list">
          <button
            type="button"
            className="filter-list_item common-button"
            onClick={() => dataAllHanlder(todos)}
          >
            전체보기
          </button>
          <button
            type="button"
            className="filter-list_item common-button"
            onClick={() => dataFilterHandler(todos, "!done")}
          >
            미완료
          </button>
          <button
            type="button"
            className="filter-list_item common-button"
            onClick={() => dataFilterHandler(todos, "done")}
          >
            완료
          </button>
          <button
            type="button"
            className="filter-list_item common-button"
            onClick={() => dataFilterHandler(todos, "important")}
          >
            중요
          </button>
        </div>
        <button
          type="button"
          className="registButton common-button"
          onClick={() => navigate("/regist")}
        >
          등록
        </button>
      </div>
      <div id="contents" className="todo-container">
        <div className="todo-container_controller">
          <button
            className="completeAll"
            data-done="0"
            onClick={allDoneHandler}
          >
            ✅ 전체완료
          </button>
          <button
            className="deleteAll"
            name="deleteAll"
            onClick={allDeleteHandler}
          >
            ❌ 전체삭제
          </button>
        </div>
        <div className="todo-list-all">
          {/* 중요 체크 todo */}
          <ul className="important-list">
            {importantTodos?.map((todo) => {
              return (
                <TodoListItem
                  key={todo._id}
                  isCompleteCheck={isCompleteCheck}
                  todo={todo}
                />
              );
            })}
          </ul>
          {/* 일반 todo */}
          <ul className="todolist">
            {todos?.map((todo) => {
              return (
                <TodoListItem
                  key={todo._id}
                  isCompleteCheck={isCompleteCheck}
                  todo={todo}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
