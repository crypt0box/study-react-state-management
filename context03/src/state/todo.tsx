import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Todo } from "src/types";

const TODOS: Todo[] = [
  { id: 1, text: "foo", isDone: true },
  { id: 2, text: "bar", isDone: false },
];

export const TodosContext = createContext(TODOS);

export const TodosDispatchContext = createContext<{
  toggleIsDone: (id: Todo["id"]) => void;
  addTodo: (text: Todo["text"]) => void;
}>({
  toggleIsDone: () => {
    throw Error("No default value");
  },
  addTodo: () => {
    throw Error("No default value");
  },
});

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(TODOS);

  const toggleIsDone = useCallback((id: Todo["id"]) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
    });
  }, []);

  const addTodo = useCallback((text: Todo["text"]) => {
    setTodos((prevTodos) => {
      const newTodo = { id: prevTodos.length + 1, text, isDone: false };
      return [...prevTodos, newTodo];
    });
  }, []);

  const todosDispathValue = useMemo(() => {
    return {
      toggleIsDone,
      addTodo,
    };
  }, [toggleIsDone, addTodo]);

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={todosDispathValue}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
};
