import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import TodoList from "@/pages/list/TodoList";
import TodoRegist from "@/pages/regist/TodoRegist";
import TodoInfo from "@/pages/info/TodoInfo";
import TodoUpdate from "@/pages/update/TodoUpdate";
import Error from "@/pages/errors/Error";

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />,
  },
  {
    path: "/regist",
    element: <TodoRegist />,
  },
  {
    path: "/info",
    element: <TodoInfo />,
  },
  {
    path: "/edit",
    element: <TodoUpdate />,
  },
  {
    path: "/*",
    element: <Error />,
  },
]);

function App() {
  return <RouterProvider rotuer={router} />;
}

export default App;
