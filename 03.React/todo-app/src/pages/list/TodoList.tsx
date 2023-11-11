import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import BaseUrl from "../../api/BaseUrl";
import TodoListItem from "./TodoListItem";
import useDataFilter from "../../hooks/useDataFilter";

import "./TodoList.css";

const TodoList: React.FC = () => {
  // const { _id } = useParams();
  const navigate = useNavigate();
  const { filterData } = useDataFilter([]); // 필터링 커스텀 훅

  const [allTodos, setAllTodos] = useState<TodoList>([]);
  const [importantTodos, setImportantTodos] = useState<TodoList>([]);
  const [todos, setTodos] = useState<TodoList>([]);

  // get 요청
  const fetchData = useCallback(async () => {
    try {
      const response = await axios(`${BaseUrl}`);
      const todosResponse = response.data?.items || [];

      // 중요한 할 일과 일반 할 일을 분리
      const newImportantTodos: TodoItem[] = [];
      const newTodos: TodoItem[] = [];
      todosResponse.forEach((todo: TodoItem) => {
        todo.important ? newImportantTodos.push(todo) : newTodos.push(todo);
      });

      // 상태를 한 번에 업데이트
      setAllTodos(todosResponse);
      setImportantTodos(newImportantTodos);
      setTodos(newTodos);

      filterData(todosResponse, "");
    } catch (error) {
      console.error("데이터를 가져오는데 에러가 발생했습니다.", error);
    }
  }, []);

  /* active-container 함수들 */
  // 전체보기 필터 함수
  const dataAllHanlder = (todosData: TodoList) => {
    filterData(todosData, "");
  };

  // 미완료, 완료, 중요 탭 필터버튼 함수
  const dataFilterHandler = (todosData: TodoList, value: string) => {
    filterData(todosData, value);
  };

  /* todo-container 함수들 */
  // 전체 완료 함수
  const allDoneHandler = async () => {
    // 통신해서 서버에 저장하는 for문 돌리기 -> Promise.allSettled
    try {
      const allCheckRequset = await Promise.allSettled(
        allTodos.map((item) =>
          axios.patch(`${BaseUrl}/${item._id}`, { done: !item.done })
        )
      );

      // 화면에 보여지는 애들 for문 돌리기
      // todos, importantTodo => done 전부 !done 업데이트하기
      const updatedTodos = allTodos.map((todo, idx) => {
        if (allCheckRequset[idx].status === "fulfilled") {
          // patch요청 성공하면 done 값 토글
          return { ...todo, done: !todo.done };
        } else {
          return todo;
        }
      });

      setAllTodos([...updatedTodos]); // 렌더링 이슈 : 서버요청은 정상, 렌더링은 새로고침해야 적용됨 ->
    } catch (error) {
      console.error("항목을 모두 완료시키는데 요청 오류 발생", error);
    }
  };

  // 전체 삭제 함수
  const allDeleteHandler = async () => {
    try {
      const deleteConfirm = confirm("삭제하시겠습니까?");
      if (deleteConfirm) {
        // 서버에서 모든 항목 삭제시키기
        await Promise.allSettled(
          allTodos.map((todo) => axios.delete(`${BaseUrl}/${todo._id}`))
        );

        // 화면에서 삭제된 항목 표시
        setAllTodos([]);
        setImportantTodos([]);
        setTodos([]);
      }
    } catch (error) {
      console.error("항목을 전체 삭제하는데 요청 오류 발생", error);
    }
  };

  /* Item에 적용된 함수 */
  // 완료, 미완료 체크박스 함수
  const isCompleteCheck = async (
    e: React.ChangeEvent<HTMLInputElement>,
    important: boolean,
    _id: number
  ) => {
    if (important) {
      const newImportantTodos = importantTodos.map((todo) => {
        return todo._id === _id ? { ...todo, done: e.target.checked } : todo;
      });
      setImportantTodos([...newImportantTodos]);
    } else {
      const newTodos = todos.map((todo) => {
        return todo._id === _id ? { ...todo, done: e.target.checked } : todo;
      });
      setTodos([...newTodos]);
    }

    try {
      await axios.patch(`${BaseUrl}/${_id}`, {
        done: e.target.checked,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 삭제
  const deleteItem = async (_id: number, important: boolean) => {
    const deleteResult = confirm("삭제하시겠습니까?");

    if (deleteResult) {
      if (important) {
        const filterImportantTodo = importantTodos.filter(
          (todo) => todo._id !== _id
        );
        setImportantTodos([...filterImportantTodo]);
      } else {
        const filterTodo = todos.filter((todo) => todo._id !== _id);
        setTodos([...filterTodo]);
      }

      await axios.delete(`${BaseUrl}/${_id}`);
    }
  };

  // 중요 체크
  const importantItem = async (
    btn: React.MouseEvent<HTMLButtonElement>,
    _id: number,
    important: boolean
  ) => {
    if (important) {
      btn.currentTarget.classList.remove("fill");
      // 중요 항목에서 뺀 것
      const filterImportantTodos = importantTodos.filter(
        (todo) => todo._id !== _id
      );

      // 뺀 항목을 중요하지 않는 항목에 추가
      const popImportantTodo = importantTodos.find((todo) => todo._id === _id);
      if (popImportantTodo) {
        const updateTodos = [
          ...todos,
          { ...popImportantTodo, important: false },
        ];
        setTodos([...updateTodos]);
        setImportantTodos([...filterImportantTodos]);
        await axios.patch(`${BaseUrl}/${_id}`, {
          important: false,
        });
      }
    } else {
      btn.currentTarget.classList.add("fill");
      // 중요하지 않은 항목에서 뺀 것
      const filterTodos = todos.filter((todo) => todo._id !== _id);

      // 뺀 항목을 중요 항목에 추가
      const popTodo = todos.find((todo) => todo._id === _id);
      if (popTodo) {
        const updateImportantTodos = [
          ...importantTodos,
          { ...popTodo, important: true },
        ];
        setImportantTodos([...updateImportantTodos]);
        setTodos([...filterTodos]);
        await axios.patch(`${BaseUrl}/${_id}`, {
          important: true,
        });
      }
    }
  };

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
        <div className="todo-container__controller">
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
                  deleteItem={deleteItem}
                  importantItem={importantItem}
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
                  deleteItem={deleteItem}
                  importantItem={importantItem}
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
