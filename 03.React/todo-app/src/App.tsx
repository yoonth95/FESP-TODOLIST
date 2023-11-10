import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import TodoList from "./pages/list/TodoList";
import TodoRegist from "./pages/info/TodoInfo";
import TodoInfo from "./pages/info/TodoInfo";
import TodoUpdate from "./pages/update/TodoUpdate";
import Error from "./pages/errors/Error";

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
    path: "/error",
    element: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
