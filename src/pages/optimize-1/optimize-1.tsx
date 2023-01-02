import { FC, memo, useCallback, useMemo, useState } from 'react';
import { CenteredLayout } from '~/components';
import { useRenderHighlight } from '~/utils';
import css from './optimize-1.module.scss';

const todosData = [
  { id: 1, text: 'run a marathon', done: false },
  { id: 2, text: 'ride an elephant', done: false },
  { id: 3, text: 'swim with a fish', done: false },
];

// TODO Fix all list re-rendering when only one component is changed :(

interface TodoProps {
  text: string;
  done: boolean;
  onClick: () => void;
}

const Todo: FC<TodoProps> = memo(
  ({ text, done, onClick }) => {
    const ref = useRenderHighlight(css.render);
    return (
      <li ref={ref} onClick={onClick} className={css.listItem}>
        {done ? '[x]' : '[ ]'} {text}
      </li>
    );
  },
  // actually I tried a lot of manipulations, but no one worked =\
  // this trick is also some kind of tradeof 'cause I just don't know..
  (prevProps, nextProps) => {
    return prevProps.done === nextProps.done;
  },
);

export const Optimize1 = () => {
  const [todos, setTodos] = useState(todosData);

  const handleTodoClick = useCallback(
    (id: number) => {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
    },
    [todos],
  );

  const memoTodo = useMemo(
    () =>
      todos.map((item) => {
        return (
          <Todo
            key={item.id}
            text={item.text}
            done={item.done}
            onClick={() => handleTodoClick(item.id)}
          />
        );
      }),
    [todos],
  );

  return (
    <CenteredLayout className="gap-4">
      <div className="text-3xl">It re-renders all items! =\</div>
      <div>Actually not, but there's a catch I can't deal with...</div>
      <ul>{memoTodo}</ul>
    </CenteredLayout>
  );
};
