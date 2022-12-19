import { useRouter } from 'next/router';
import { useState, FormEvent, FormEventHandler, useRef } from 'react';
import style from '../../styles/item.module.scss';
import { Todo } from '../../utils/types';


// Define Prop Interface
interface ShowProps {
  todo: Todo;
  url: string;
}

// Define Component
function Show(props: ShowProps) {
  // get the next router, so we can use router.push later
  const router = useRouter();

  const item = useRef<HTMLInputElement>(null);

  // set the todo as state for modification
  const [todo, setTodo] = useState<Todo>(props.todo);

  // メモの内容を編集する
  const handleUpdate: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

  };

  
  // function to complete a todo
  const handleComplete = async () => {
    if (!todo.completed) {
      // make copy of todo with completed set to true
      const newTodo: Todo = { ...todo, completed: true };
      // make api call to change completed in database
      await fetch(props.url + '/' + todo._id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        // send copy of todo with property
        body: JSON.stringify(newTodo),
      });
      // once data is updated update state so ui matches without needed to refresh
      setTodo(newTodo);
    }
    // if completed is already true this function won't do anything
  };

  // function for handling clicking the delete button
  const handleDelete = async () => {
    await fetch(props.url + '/' + todo._id, {
      method: 'delete',
    });
    //push user back to main page after deleting
    router.push('/');
  };

  //return JSX
  return (
    <div className={style.container}>
      <h1 className={style.h1}>{todo.item}</h1>
      <h2 className={style.h2}>{todo.completed ? '完了' : '未完了'}</h2>
      <div className={style.flex}>
      <button onClick={handleComplete} className={style.button}>
        完成
      </button>
      <button onClick={handleDelete} className={style.button}>
        削除
      </button>
      <button
        className={style.button}
        onClick={() => {
          router.push('/');
        }}
      >
        戻る
      </button>
      </div>
    </div>
  );
}

// Define Server Side Props
export async function getServerSideProps(context: any) {
  // fetch the todo, the param was received via context.query.id
  const res = await fetch(process.env.API_URL + '/' + context.query.id);
  const todo = await res.json();

  //return the serverSideProps the todo and the url from out env variables for frontend api calls
  return { props: { todo, url: process.env.API_URL } };
}

// export component
export default Show;
