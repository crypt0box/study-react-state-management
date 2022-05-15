import { FC, useContext } from "react";
import { TodoContext } from "src/pages/_app";

type Props = {
  todoCount: number;
};

export const TodoCounter: FC<Props> = ({ todoCount }) => {
  const { todos } = useContext(TodoContext);
  return <h2>TODO: {todos.length}件</h2>;
};
