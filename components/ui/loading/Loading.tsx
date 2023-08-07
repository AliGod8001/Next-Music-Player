import styles from './Loading.module.scss'

const Loading = () => {
    return <div className={styles.backdrop}>
        <div className={styles.falling}></div>
    </div>
}

export default Loading;