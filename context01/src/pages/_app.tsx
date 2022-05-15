import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import { Layout } from "src/components/Layout";
import { Todo } from "src/types";

const TODOS: Todo[] = [
  { id: 1, text: "foo", isDone: true },
  { id: 2, text: "bar", isDone: false },
];

export const ThemeContext = createContext<"light" | "dark">("light");
export const LangContext = createContext("ja");

export default function MyApp({ Component, pageProps }: AppProps) {
  const [todos, setTodos] = useState<Todo[]>(TODOS);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<"ja" | "en">("ja");

  return (
    <ThemeContext.Provider value={theme}>
      <LangContext.Provider value={lang}>
        <Layout todoCount={todos.length}>
          <button
            onClick={() => {
              setTheme((prev) => (prev === "light" ? "dark" : "light"));
              setLang((prev) => (prev === "ja" ? "en" : "ja"));
            }}
          >
            切り替え
          </button>
          <Component {...pageProps} todos={todos} setTodos={setTodos} />
        </Layout>
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}
