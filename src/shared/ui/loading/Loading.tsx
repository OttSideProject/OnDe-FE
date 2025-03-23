import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}>
        <img src="/assets/images/icons/loading.svg" alt="로딩중..." />
      </div>
    </div>
  );
};

export default Loading;
