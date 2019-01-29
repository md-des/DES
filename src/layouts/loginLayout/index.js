import styles from './loginLayout.less';
import Link from 'umi/link';
export default props => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            {/* <span className={styles.title}>文档系统</span> */}
          </Link>
        </div>
        <div className={styles.desc}>...</div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};
