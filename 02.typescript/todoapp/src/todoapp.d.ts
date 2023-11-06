// 기본 타입 지정
export interface TodoItem {
  _id: number;
  title: string;
  content: string;
  done: boolean;
  important: boolean;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoListResponse {
  ok: number;
  items: TodoItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TodoResponse {
  ok: number;
  item: TodoItem;
}

export interface TodoErrorResponse {
  ok: number;
  error: {
    message: string;
  };
}
