import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './Layout.module.scss'
export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start';
}

const Layout: React.FC<IPrimaryLayout> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout
