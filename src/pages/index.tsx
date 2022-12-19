import Link from 'next/link';
import { Todo } from '../utils/types';
import style from "@/styles/Home.module.scss"

// コンポーネントプロップスの定義
interface IndexProps {
  todos: Array<Todo>;
}

// ページコンポーネントを定義する
function Index(props: IndexProps) {
  const { todos } = props;

  return (
    <div className={style.container}>
      <h1 className={style.h1}>Todo List ポートフォリオ用作品</h1>
      <Link href='/todos/create'>
        <div className={style.button_con}>
          <button className={style.button}>Todoを作成する</button>
        </div>
      </Link>
      {/* Todoのマッピング */}
      <div className={style.todo_con}>
        {todos.map((t) => (
          <div key={t._id}>
            <Link href={`/todos/${t._id}`}>
              <div className={style.todo}>
                <h3 style={{ cursor: 'pointer' }} className={style.h3}>
                  {t.item}
                </h3>
                <br />
                <p className={style.p}>- {t.completed ? '完了' : '未完了'}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// サーバーサイドのレンダリングのためのプロップスを取得する
export async function getServerSideProps() {
  // APIからtodoデータを取得する
  const res = await fetch(process.env.API_URL as string);
  const todos = await res.json();

  // プロップスを返す
  return {
    props: { todos },
  };
}

export default Index;
