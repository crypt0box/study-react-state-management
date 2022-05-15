import type { AppProps } from "next/app";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Layout } from "src/components/Layout";
import { Todo } from "src/types";

const TODOS: Todo[] = [
  { id: 1, text: "foo", isDone: true },
  { id: 2, text: "bar", isDone: false },
];

export const TodoContext = createContext<{
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}>({
  todos: TODOS,
  setTodos: () => {
    throw new Error("No default value");
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [todos, setTodos] = useState<Todo[]>(TODOS);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <Layout>
        <Component {...pageProps} todos={todos} setTodos={setTodos} />
      </Layout>
    </TodoContext.Provider>
  );
}
