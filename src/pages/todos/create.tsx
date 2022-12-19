import { useRouter } from 'next/router';
import { FormEvent, FormEventHandler, useRef } from 'react';
import { Todo } from '../../utils/types';
import style from '@/styles/create.module.scss';

// Define props
interface CreateProps {
  url: string;
}

// Define Component
function Create(props: CreateProps) {
  // get the next route
  const router = useRouter();

  // 入力は1つだけなので、制御されないフォームを使用します。
  const item = useRef<HTMLTextAreaElement>(null);


  // 新規Todo作成機能
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    // 新規Todoの作成、変数の作成、item.currentがnullでないことの確認（型チェックのため
    let todo: Todo = { item: '', completed: false };
    if (null !== item.current) {
      todo = { item: item.current.value, completed: false };
    }

    // Make the API request
    await fetch(props.url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    // after api request, push back to main page
    router.push('/');
  };

  return (
    <div>
      <h1 className={style.h1}>メモ欄</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.button_con}>
          <textarea
            ref={item}
            name='txtname'
            className={style.textarea}
          ></textarea>
        </div>
        <div className={style.button_con}>
          <input type='submit' value='作成' className={style.button}></input>
        </div>
      </form>
    </div>
  );
}

// export getStaticProps to provie API_URL to component
export async function getStaticProps(context: any) {
  return {
    props: {
      url: process.env.API_URL,
    },
  };
}

// export component
export default Create;
