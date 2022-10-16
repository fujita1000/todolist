import { ReactNode } from "react";

import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import style from './Layout.module.scss'
interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={style.container}>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout
