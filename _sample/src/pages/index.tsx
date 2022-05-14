import type { NextPage } from "next";

const TODOS = [
  { id: 1, text: "foo", isDone: true },
  { id: 2, text: "bar", isDone: false },
];
const Home: NextPage = () => {
  return (
    <div>
      <h3>TODO一覧</h3>
      {TODOS.map((todo) => (
        <div key={todo.id}>
          <label style={{ fontSize: "2rem" }}>
            <input
              type="checkbox"
              checked={todo.isDone}
              style={{ width: "1.5rem", height: "1.5rem" }}
            />
            {todo.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Home;
